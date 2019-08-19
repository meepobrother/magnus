"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ImportCore {
    constructor(name) {
        this.name = name;
        this.children = [];
        this.parameters = [];
    }
    /**
     * 是否在某个
     * @param name
     */
    isInName(name) {
        if (this.name === name) {
            return true;
        }
        if (this.parent)
            return this.parent.isInName(name);
        return false;
    }
    findParent(name) {
        if (this.name === name) {
            return this;
        }
        if (this.parent) {
            const res = this.parent.findParent(name);
            if (res)
                return res;
        }
        return undefined;
    }
    findTop() {
        if (this.parent)
            return this.parent.findTop();
        return this;
    }
    create(name) {
        const core = new ImportCore(name);
        core.parent = this;
        this.children.push(core);
        return core;
    }
    getLength() {
        let length = 1;
        if (this.parent)
            length += this.parent.getLength();
        return length;
    }
}
class ApiLevel {
    constructor() {
        this.name = "ApiLevel";
    }
    visitNamedTypeAst(node, context) {
        return ``;
    }
}
exports.ApiLevel = ApiLevel;
class ApiObjectTypeVisitor {
    constructor() {
        this.name = "ApiObjectTypeVisitor";
        // 一个名称下面引用很多名称
        this.imports = new Map();
    }
    visitScalarTypeDefinitionAst(node, context) { }
    visitNamedTypeAst(node, context) {
        const name = node.name.value;
        const parent = context.findParent(name);
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
    visitObjectTypeDefinitionAst(node, context) {
        const result = `{\n${node.fields
            .map(field => field.visit(this, context))
            .join("")}\t}\n`;
        return result;
    }
    visitFieldDefinitionAst(node, context) {
        const type = node.type.visit(this, context);
        if (type === "__magnus__parent__") {
            return ``;
        }
        if (node.arguments && node.arguments.length > 0) {
            const args = node.arguments.map(arg => arg.visit(this, context));
            const topName = context.findTop().name;
            const items = this.api.parameters.get(topName).concat(...args);
            this.api.parameters.set(topName, items);
            return `\t\t${node.name.value} (${node.arguments.map(arg => `${arg.name.value}: $${arg.name.value}`)}) ${type} \n`;
        }
        if (type) {
            return `\t\t${node.name.value} ${type} \n`;
        }
        return `\t\t${node.name.value}\n`;
    }
    visitInputValueDefinitionAst(node, context) {
        return `$${node.name.value}: ${node.type.visit(this.api, context)}`;
    }
    visitListTypeAst(node, context) {
        return node.type.visit(this, context);
    }
    visitNonNullTypeAst(node, context) {
        return node.type.visit(this, context);
    }
}
exports.ApiObjectTypeVisitor = ApiObjectTypeVisitor;
class ApiVisitor {
    constructor() {
        this.name = "ApiVisitor";
        this.objectType = new ApiObjectTypeVisitor();
        this.parameters = new Map();
    }
    visitDocumentAst(node, context) {
        this.objectType.doc = node;
        this.objectType.api = this;
        node.definitions
            .filter(it => !!it)
            .map(def => {
            def.visit(this, context);
        });
        return context;
    }
    visitScalarTypeDefinitionAst(node, context) {
        return undefined;
    }
    visitObjectTypeDefinitionAst(node, context) {
        const nodeName = node.name.value;
        if (nodeName === "Query") {
            const query = context.query || {
                type: "query",
                list: []
            };
            node.fields.map(field => field.visit(this, query));
            this.query = query;
            return context;
        }
        else if (nodeName === "Mutation") {
            const mutation = context.mutation || {
                type: "mutation",
                list: []
            };
            node.fields.map(field => field.visit(this, mutation));
            this.mutation = mutation;
            return context;
        }
        else if (nodeName === "Subscription") {
            const subscription = context.subscription || {
                type: "subscription",
                list: []
            };
            node.fields.map(field => field.visit(this, subscription));
            this.subscription = subscription;
            return context;
        }
        else {
        }
    }
    visitInputObjectTypeDefinitionAst(node, context) { }
    visitFieldDefinitionAst(node, context) {
        const { type, name, arguments: args } = node;
        const ctx = new ImportCore(name.value);
        this.parameters.set(name.value, []);
        const objectType = type.visit(this.objectType, ctx);
        if (args && args.length > 0) {
            let graphql = `${context.type} ${name.value}(${args
                .map(arg => arg.visit(this, context))
                .concat(...this.parameters.get(name.value))
                .join(",")}){\n`;
            graphql += `\t${name.value}(${args.map(arg => `${arg.name.value}: $${arg.name.value}`)})`;
            graphql += objectType;
            graphql += `\n}\n`;
            context.list.push(graphql);
        }
        else {
            let graphql = `${context.type} ${name.value}{\n`;
            graphql += `\t${name.value}`;
            if (this.parameters.get(name.value).length > 0) {
                graphql += `(${this.parameters.get(name.value).join(",")})`;
            }
            graphql += objectType;
            graphql += `}\n`;
            context.list.push(graphql);
        }
        return context;
    }
    visitInputValueDefinitionAst(node, context) {
        return `$${node.name.value}: ${node.type.visit(this, context)}`;
    }
    visitNamedTypeAst(node, context) {
        return node.name.value;
    }
    visitNonNullTypeAst(node, context) {
        return `${node.type.visit(this, context)}!`;
    }
    visitListTypeAst(node, context) {
        return `[${node.type.visit(this, context)}]`;
    }
}
exports.ApiVisitor = ApiVisitor;
//# sourceMappingURL=api.js.map