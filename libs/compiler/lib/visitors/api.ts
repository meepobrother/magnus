import { ast } from "@notadd/magnus-graphql";
class ImportCore {
  parent: ImportCore;
  children: ImportCore[] = [];
  parameters: string[] = [];
  level: number = 0;
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

  findTop(): ImportCore {
    if (this.parent) return this.parent.findTop();
    return this;
  }

  create(name: string) {
    const core = new ImportCore(name);
    core.parent = this;
    core.level = this.level + 1;
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
  name: string = "ApiObjectTypeVisitor";
  doc: ast.DocumentAst;
  // 一个名称下面引用很多名称
  imports: Map<string, string[]> = new Map();

  api: ApiVisitor;

  visitScalarTypeDefinitionAst(
    node: ast.ScalarTypeDefinitionAst,
    context: any
  ): any {}

  visitNamedTypeAst(node: ast.NamedTypeAst, context: ImportCore): any {
    const name = node.name.value;
    // const parent = context.findParent(name);
    const core = context.create(name);
    const def = this.doc.hasDefinitionAst(name);
    if (def) {
      if (context.parent && context.level > 1) {
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

  visitFieldDefinitionAst(
    node: ast.FieldDefinitionAst,
    context: ImportCore
  ): any {
    const type = node.type.visit(this, context);
    if (type === "__magnus__parent__") {
      return ``;
    }
    if (node.arguments && node.arguments.length > 0) {
      // const args = node.arguments.map(arg => arg.visit(this, context));
      // const topName = context.findTop().name;
      // const items = this.api.parameters.get(topName)!.concat(...args);
      // this.api.parameters.set(topName, items);
      // return `\t\t${node.name.value} (${node.arguments.map(
      //   arg => `${arg.name.value}: $${arg.name.value}`
      // )}) ${type} \n`;
      return ``;
    }
    if (context.level > 2) {
      return ``;
    }
    if (type && type.length > 0) {
      return `\t\t${node.name.value} ${type} \n`;
    }
    return `\t\t${node.name.value}\n`;
  }
  visitInputValueDefinitionAst(
    node: ast.InputValueDefinitionAst,
    context: any
  ): any {
    return `$${node.name.value}: ${node.type.visit(this.api, context)}`;
  }

  visitListTypeAst(node: ast.ListTypeAst, context: any): any {
    return node.type.visit(this, context);
  }

  visitNonNullTypeAst(node: ast.NonNullTypeAst, context: any): any {
    return node.type.visit(this, context);
  }
}
export class ApiVisitor implements ast.Visitor {
  name: string = "ApiVisitor";
  objectType: ApiObjectTypeVisitor = new ApiObjectTypeVisitor();

  query: any;
  mutation: any;
  subscription: any;

  parameters: Map<string, string[]> = new Map();

  visitDocumentAst(node: ast.DocumentAst, context: any) {
    this.objectType.doc = node;
    this.objectType.api = this;
    node.definitions
      .filter(it => !!it)
      .map(def => {
        def.visit(this, context);
      });
    return context;
  }
  visitScalarTypeDefinitionAst(
    node: ast.ScalarTypeDefinitionAst,
    context: any
  ) {
    return undefined;
  }
  visitObjectTypeDefinitionAst(
    node: ast.ObjectTypeDefinitionAst,
    context: any
  ) {
    const nodeName = node.name.value;
    if (nodeName === "Query") {
      const query = context.query || {
        type: "query",
        list: []
      };
      node.fields.map(field => field.visit(this, query));
      this.query = query;
      return context;
    } else if (nodeName === "Mutation") {
      const mutation = context.mutation || {
        type: "mutation",
        list: []
      };
      node.fields.map(field => field.visit(this, mutation));
      this.mutation = mutation;
      return context;
    } else if (nodeName === "Subscription") {
      const subscription = context.subscription || {
        type: "subscription",
        list: []
      };
      node.fields.map(field => field.visit(this, subscription));
      this.subscription = subscription;
      return context;
    } else {
    }
  }

  visitInputObjectTypeDefinitionAst(
    node: ast.InputObjectTypeDefinitionAst,
    context: any
  ) {}

  visitFieldDefinitionAst(node: ast.FieldDefinitionAst, context: any) {
    const { type, name, arguments: args } = node;
    const ctx = new ImportCore(name.value);
    this.parameters.set(name.value, []);
    const objectType = type.visit(this.objectType, ctx);
    if (args && args.length > 0) {
      let graphql = `${context.type} ${name.value}(${args
        .map(arg => arg.visit(this, context))
        .concat(...new Set(this.parameters.get(name.value)!))
        .join(",")}){\n`;
      graphql += `\t${name.value}(${args.map(
        arg => `${arg.name.value}: $${arg.name.value}`
      )})`;
      graphql += objectType;
      graphql += `\n}\n`;
      context.list.push(graphql);
    } else {
      let graphql = `${context.type} ${name.value}{\n`;
      graphql += `\t${name.value}`;
      if (this.parameters.get(name.value)!.length > 0) {
        graphql += `(${[...new Set(this.parameters.get(name.value)!)].join(
          ","
        )})`;
      }
      graphql += objectType;
      graphql += `}\n`;
      context.list.push(graphql);
    }
    return context;
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
