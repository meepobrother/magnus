import { ast as graphql, VariableAst } from "@notadd/magnus-graphql";
import { ast } from "@notadd/magnus-grpc";
import { MagnusConfig } from "@notadd/magnus-core";
import { CollectionContext } from "./collection";
import { upperFirst } from "lodash";
export class ApiToProto implements graphql.Visitor {
  name: string = `ApiToProto`;
  root: ast.Root;
  config: MagnusConfig;
  documentAst: graphql.DocumentAst;
  schema: graphql.DocumentAst;
  visitDocumentAst(node: graphql.DocumentAst, context: CollectionContext) {
    this.documentAst = node;
    const root = new ast.Root();
    const pkg = new ast.Package();
    pkg.name = this.config.name;
    pkg.syntax = `proto3`;
    node.definitions.map(def => def.visit(this, pkg));
    if (this.query.methods.length > 0) {
      pkg.children.push(this.query);
    }
    if (this.mutation.methods.length > 0) {
      pkg.children.push(this.mutation);
    }
    if (this.subscription.methods.length > 0) {
      pkg.children.push(this.subscription);
    }
    this.messages.map(msg => pkg.children.push(msg));
    root.packages.push(pkg);
    this.root = root;
    return root;
  }
  query: ast.Service = new ast.Service();
  mutation: ast.Service = new ast.Service();
  subscription: ast.Service = new ast.Service();

  messages: ast.Message[] = [];
  constructor() {
    this.query.name = `Query`;
    this.mutation.name = `Mutation`;
    this.subscription.name = `Subscription`;
  }

  visitOperationDefinitionAst(
    node: graphql.OperationDefinitionAst,
    context: ast.Package
  ) {
    const name = node.name.visit(this, context);
    const mth = new ast.Method();
    mth.decorator.unshift("rpc");
    mth.name = name;
    mth.parameter = `Grpc${upperFirst(mth.name)}Input`;
    const msg = new ast.Message();
    msg.name = mth.parameter;
    node.variableDefinitions.map((variable, index) => {
      msg.index = index;
      variable.visit(this, msg);
    });
    context.children.push(msg);
    const query = this.schema.hasDefinitionAst(upperFirst(node.operation));
    const def = (query as graphql.ObjectTypeDefinitionAst).getFields(mth.name);
    if (def) {
      const name = def.type.visit(this, mth);
      mth.type = name;
      const astDef = this.schema.hasDefinitionAst(name);
      if (astDef) astDef.visit(this, context);
    } else {
      throw new Error(`can not found def`);
    }
    if (node.operation === "query") {
      this.query.methods.push(mth);
    } else if (node.operation === "mutation") {
      this.mutation.methods.push(mth);
    } else {
      this.subscription.methods.push(mth);
    }
  }
  _messages: Set<string> = new Set();
  visitScalarTypeDefinitionAst(
    node: graphql.ScalarTypeDefinitionAst,
    context: any
  ) {}
  visitObjectTypeDefinitionAst(
    node: graphql.ObjectTypeDefinitionAst,
    context: ast.Message
  ) {
    const name = node.name.visit(this, context);
    if (this._messages.has(name)) {
      return;
    }
    const message = new ast.Message();
    message.name = name;
    this._messages.add(name);
    node.fields.map((field, index) => {
      field.index = index;
      field.visit(this, message);
    });
    this.addMessage(message);
  }

  visitFieldDefinitionAst(
    node: graphql.FieldDefinitionAst,
    context: ast.Message
  ) {
    const field = new ast.Field();
    field.index = node.index;
    field.name = node.name.visit(this, ``);
    field.type = node.type.visit(this, field);
    const def = this.schema.hasDefinitionAst(field.type);
    if (def) def.visit(this, context);
    context.fields.push(field);
  }

  visitSelectionSetAst(node: graphql.SelectionSetAst, contedxt: ast.Package) {
    const selections = node.selections.map(selection =>
      selection.visit(this, context)
    );
  }

  visitFieldAst(node: graphql.FieldAst, context: ast.Package) {
    const alias = node.alias && node.alias.visit(this, context);
    const name = node.name && node.name.visit(this, context);
    const selectionSet =
      node.selectionSet && node.selectionSet.visit(this, context);
  }

  visitVariableDefinitionAst(
    node: graphql.VariableDefinitionAst,
    context: ast.Message
  ): any {
    const field = new ast.Field();
    const variable = node.variable.visit(this, field);
    const type = node.type.visit(this, field);
    const def = this.schema.hasDefinitionAst(type);
    if (def) def.visit(this, field);
    field.name = variable;
    field.type = type;
    field.index = context.index;
    context.fields.push(field);
  }

  visitVariableAst(node: VariableAst, context: ast.Package): any {
    return node.name.visit(this, context);
  }

  visitInputObjectTypeDefinitionAst(
    node: graphql.InputObjectTypeDefinitionAst,
    context: any
  ) {
    const message = new ast.Message();
    message.name = node.name.visit(this, ``);
    node.fields.map((field, index) => {
      field.index = index;
      field.visit(this, message);
    });
    this.addMessage(message);
  }
  addMessage(msg: ast.Message) {
    const exist = this.messages.find(it => it.name === msg.name);
    if (!exist) this.messages.push(msg);
  }
  visitInputValueDefinitionAst(
    node: graphql.InputValueDefinitionAst,
    context: ast.Message
  ) {
    const field = new ast.Field();
    field.index = node.index;
    field.name = node.name && node.name.visit(this, ``);
    field.type = node.type.visit(this, field);
    context.fields.push(field);
  }
  visitListTypeAst(node: graphql.ListTypeAst, context: ast.Field): any {
    console.log(context);
    context.decorator.unshift("repeated");
    const type = node.type.visit(this, context);
    return type;
  }

  visitNonNullTypeAst(node: graphql.NonNullTypeAst, context: ast.Field): any {
    if (node.type instanceof graphql.NamedTypeAst) {
      return node.type.visit(this, context);
    } else {
      return node.type.visit(this, context);
    }
  }

  visitNameAst(node: graphql.NameAst, context: any) {
    switch (node.value) {
      case "String":
      case "string":
        return `string`;
      case "Double":
        return "double";
      case "Float":
        return "float";
      case "Int":
      case "Int32":
        return `int32`;
      case "Uint32":
        return `uint32`;
      case "Sint32":
        return `sint32`;
      case "fixed32":
        return `fixed32`;
      case "Sfixed32":
        return `sfixed32`;
      case "Int64":
        return `int64`;
      case "Uint64":
        return `uint64`;
      case "Sint64":
        return `sint64`;
      case "Fixed64":
        return `fixed64`;
      case "Sfixed64":
        return `sfixed64`;
      case "Bool":
      case "Boolean":
        return `bool`;
      case "ID":
        return `int32`;
      case "Bytes":
        return `bytes`;
      default:
        return node.value;
    }
  }

  visitNamedTypeAst(node: graphql.NamedTypeAst, context: ast.Field): any {
    return node.name.visit(this, context);
  }
}
