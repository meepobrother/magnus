import { ast as graphql, VariableAst } from "@notadd/magnus-graphql";
import { ast } from "@notadd/magnus-grpc";
import { MagnusConfig } from '@notadd/magnus-core';
import { CollectionContext } from "./collection";
import { upperFirst } from 'lodash';
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
        pkg.syntax = `proto3`
        node.definitions.map(def => def.visit(this, pkg));
        pkg.children.push(this.query)
        pkg.children.push(this.mutation)
        pkg.children.push(this.subscription)
        this.messages.map(msg => pkg.children.push(msg))
        root.packages.push(pkg);
        this.root = root;
        return root;
    }
    query: any = new ast.Service();
    mutation: any = new ast.Service();
    subscription: any = new ast.Service();

    messages: ast.Message[] = [];
    constructor() {
        this.query.name = `Query`;
        this.mutation.name = `Mutation`;
        this.subscription.name = `Subscription`;
    }

    visitOperationDefinitionAst(node: graphql.OperationDefinitionAst, context: ast.Package) {
        const name = node.name.visit(this, context)
        const mth = new ast.Method();
        mth.decorator.unshift('rpc');
        mth.name = name;
        mth.parameter = `Grpc${upperFirst(mth.name)}Input`;
        const msg = new ast.Message();
        msg.name = mth.parameter;
        node.variableDefinitions.map((variable, index) => {
            msg.index = index;
            variable.visit(this, msg)
        });
        context.children.push(msg);
        const query = this.schema.hasDefinitionAst(upperFirst(node.operation));
        const def = (query as graphql.ObjectTypeDefinitionAst).getFields(mth.name);
        if (def) {
            const name = def.type.visit(this, mth);
            mth.type = name;
            const astDef = this.schema.hasDefinitionAst(name);
            if (astDef) astDef.visit(this, context)
        } else {
            throw new Error(`can not found def`)
        }
        if (node.operation === 'query') {
            this.query.methods.push(mth);
        }
        else if (node.operation === 'mutation') {
            this.mutation.methods.push(mth);
        }
        else {
            this.subscription.methods.push(mth);
        }
    }

    visitObjectTypeDefinitionAst(node: graphql.ObjectTypeDefinitionAst, context: ast.Message) {
        const name = node.name.visit(this, context);
        const message = new ast.Message();
        message.name = name;
        node.fields.map((field, index) => {
            field.index = index;
            field.visit(this, message);
        });
        this.addMessage(message);
    }

    visitFieldDefinitionAst(node: graphql.FieldDefinitionAst, context: ast.Message) {
        const field = new ast.Field();
        field.index = node.index;
        field.name = node.name.visit(this, ``);
        field.type = node.type.visit(this, field)
        context.fields.push(field);
    }

    visitSelectionSetAst(node: graphql.SelectionSetAst, contedxt: ast.Package) {
        const selections = node.selections.map(selection => selection.visit(this, context))
    }

    visitFieldAst(node: graphql.FieldAst, context: ast.Package) {
        const alias = node.alias && node.alias.visit(this, context);
        const name = node.name && node.name.visit(this, context);
        const selectionSet = node.selectionSet && node.selectionSet.visit(this, context);
    }

    visitVariableDefinitionAst(node: graphql.VariableDefinitionAst, context: ast.Message): any {
        const type = node.type.visit(this, context)
        const variable = node.variable.visit(this, context);
        const def = this.schema.hasDefinitionAst(type);
        if (def) def.visit(this, context);
        const field = new ast.Field();
        field.name = variable;
        field.type = type;
        field.index = context.index;
        context.fields.push(field);
    }

    visitVariableAst(node: VariableAst, context: ast.Package): any {
        return node.name.visit(this, context)
    }

    visitNameAst(node: graphql.NameAst, context: ast.Package) {
        return node.value;
    }

    visitInputObjectTypeDefinitionAst(node: graphql.InputObjectTypeDefinitionAst, context: any) {
        const message = new ast.Message();
        message.name = node.name.visit(this, ``);
        node.fields.map((field, index) => {
            field.index = index;
            field.visit(this, message);
        });
        this.addMessage(message);
    }
    addMessage(msg: ast.Message) {
        const exist = this.messages.find(it => it.name === msg.name)
        if (!exist) this.messages.push(msg)
    }
    visitInputValueDefinitionAst(node: graphql.InputValueDefinitionAst, context: ast.Message) {
        const field = new ast.Field();
        field.index = node.index;
        field.name = node.name && node.name.visit(this, ``);
        field.type = node.type.visit(this, field)
        context.fields.push(field);
    }
    visitListTypeAst(node: graphql.ListTypeAst, context: ast.Field): any {
        context.decorator && context.decorator.unshift("repeated");
        const type = node.type.visit(this, context)
        return type;
    }

    visitNonNullTypeAst(node: graphql.NonNullTypeAst, context: ast.Field): any {
        if (node.type instanceof graphql.NamedTypeAst) {
            return node.type.visit(this, context)
        } else {
            return node.type.visit(this, context)
        }
    }

    visitNamedTypeAst(node: graphql.NamedTypeAst, context: ast.Field): any {
        return node.name.visit(this, context)
    }
}
