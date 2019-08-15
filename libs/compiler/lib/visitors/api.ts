import { ast } from "@notadd/magnus-graphql";
import { writeFileSync } from "fs";
import { join } from "path";
class ImportCore {
  parent: ImportCore;
  children: ImportCore[] = [];
  constructor(public name: string) {}
  /**
   * 是否在某个
   * @param name
   */
  isInName(name: string): boolean {
    if (this.name === name) {
      return true;
    }
    if (this.parent) return this.parent.isInName(name);
    return false;
  }

  findParent(name: string): ImportCore | undefined {
    if (this.name === name) {
      return this;
    }
    if (this.parent) {
      const res = this.parent.findParent(name);
      if (res) return res;
    }
    return undefined;
  }

  create(name: string) {
    const core = new ImportCore(name);
    core.parent = this;
    this.children.push(core);
    return core;
  }

  getLength() {
    let length = 1;
    if (this.parent) length += this.parent.getLength();
    return length;
  }
}
export class ApiLevel implements ast.Visitor {
  name: string = "ApiLevel";
  visitNamedTypeAst(node: ast.NamedTypeAst, context: any) {
    return ``;
  }
}
export class ApiObjectTypeVisitor implements ast.Visitor {
  name: string = "ApiVisitor";
  doc: ast.DocumentAst;
  // 一个名称下面引用很多名称
  imports: Map<string, string[]> = new Map();
  visitNamedTypeAst(node: ast.NamedTypeAst, context: ImportCore): any {
    const name = node.name.value;
    const parent = context.parent;
    const core = context.create(name);
    const def = this.doc.hasDefinitionAst(name);
    if (def) {
      if (parent) {
        return `__magnus__parent__`;
      }
      const result = def.visit(this, core);
      return result;
    }
    return ``;
  }
  visitObjectTypeDefinitionAst(
    node: ast.ObjectTypeDefinitionAst,
    context: ImportCore
  ): any {
    const result = `{\n${node.fields
      .map(field => field.visit(this, context))
      .join("")}\t}\n`;
    return result;
  }

  visitFieldDefinitionAst(node: ast.FieldDefinitionAst, context: any): any {
    const type = node.type.visit(this, context);
    if (type === "__magnus__parent__") {
      return ``;
    }
    if (type) {
      return `\t\t${node.name.value} ${type} \n`;
    }
    return `\t\t${node.name.value}\n`;
  }

  visitListTypeAst(node: ast.ListTypeAst, context: any): any {
    return node.type.visit(this, context);
  }
}
export class ApiVisitor implements ast.Visitor {
  name: string = "ApiVisitor";
  objectType: ApiObjectTypeVisitor = new ApiObjectTypeVisitor();
  visitDocumentAst(node: ast.DocumentAst, context: any) {
    this.objectType.doc = node;
    node.definitions.map(def => def.visit(this, context));
    return context;
  }
  visitScalarTypeDefinitionAst(
    node: ast.ScalarTypeDefinitionAst,
    context: any
  ) {}
  visitObjectTypeDefinitionAst(
    node: ast.ObjectTypeDefinitionAst,
    context: any
  ) {
    const nodeName = node.name.value;
    if (nodeName === "Query") {
      debugger;
      context.query = context.query || {
        type: "query",
        list: []
      };
      node.fields.map(field => field.visit(this, context.query));
    } else if (nodeName === "Mutation") {
      context.mutation = context.mutation || {
        type: "query",
        list: []
      };
      node.fields.map(field => field.visit(this, context.mutation));
    } else if (nodeName === "Subscription") {
      context.subscription = context.subscription || {
        type: "query",
        list: []
      };
      node.fields.map(field => field.visit(this, context.subscription));
    } else {
    }
  }

  visitInputObjectTypeDefinitionAst(
    node: ast.InputObjectTypeDefinitionAst,
    context: any
  ) {}

  visitFieldDefinitionAst(node: ast.FieldDefinitionAst, context: any) {
    const { type, name, arguments: args } = node;
    if (args && args.length > 0) {
      let graphql = `${context.type} ${name.value}(${args
        .map(arg => arg.visit(this, context))
        .join(",")}){\n`;
      graphql += `\t${name.value}(${args.map(
        arg => `${arg.name.value}: $${arg.name.value}`
      )})`;
      graphql += type.visit(this.objectType, new ImportCore(name.value));
      graphql += `\n}\n`;
      context.list.push(graphql);
    } else {
      let graphql = `${context.type} ${name.value}{\n`;
      graphql += `\t${name.value}`;
      graphql += type.visit(this.objectType, new ImportCore(name.value));
      graphql += `}\n`;
      context.list.push(graphql);
    }
  }
  visitInputValueDefinitionAst(
    node: ast.InputValueDefinitionAst,
    context: any
  ): any {
    return `$${node.name.value}: ${node.type.visit(this, context)}`;
  }

  visitNamedTypeAst(node: ast.NamedTypeAst, context: any) {
    return node.name.value;
  }

  visitNonNullTypeAst(node: ast.NonNullTypeAst, context: any): any {
    return `${node.type.visit(this, context)}!`;
  }

  visitListTypeAst(node: ast.ListTypeAst, context: any): any {
    return `[${node.type.visit(this, context)}]`;
  }
}
