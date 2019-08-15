"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ImportCore {
    constructor(name) {
        this.name = name;
        this.children = [];
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
        this.name = "ApiVisitor";
        // 一个名称下面引用很多名称
        this.imports = new Map();
    }
    visitNamedTypeAst(node, context) {
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
        if (type) {
            return `\t\t${node.name.value} ${type} \n`;
        }
        return `\t\t${node.name.value}\n`;
    }
    visitListTypeAst(node, context) {
        return node.type.visit(this, context);
    }
}
exports.ApiObjectTypeVisitor = ApiObjectTypeVisitor;
class ApiVisitor {
    constructor() {
        this.name = "ApiVisitor";
        this.objectType = new ApiObjectTypeVisitor();
    }
    visitDocumentAst(node, context) {
        this.objectType.doc = node;
        const defs = node.definitions
            .map(def => def.visit(this, context))
            .filter(it => !!it);
        debugger;
        return context;
    }
    visitScalarTypeDefinitionAst(node, context) { }
    visitObjectTypeDefinitionAst(node, context) {
        const nodeName = node.name.value;
        if (nodeName === "Query") {
            const query = context.query || {
                type: "query",
                list: []
            };
            node.fields.map(field => field.visit(this, query));
            context.query = query;
            return context;
        }
        else if (nodeName === "Mutation") {
            const mutation = context.mutation || {
                type: "mutation",
                list: []
            };
            node.fields.map(field => field.visit(this, mutation));
            context.mutation = mutation;
            return context;
        }
        else if (nodeName === "Subscription") {
            const subscription = context.subscription || {
                type: "subscription",
                list: []
            };
            node.fields.map(field => field.visit(this, subscription));
            context.subscription = subscription;
            return context;
        }
        else {
        }
    }
    visitInputObjectTypeDefinitionAst(node, context) { }
    visitFieldDefinitionAst(node, context) {
        const { type, name, arguments: args } = node;
        if (args && args.length > 0) {
            let graphql = `${context.type} ${name.value}(${args
                .map(arg => arg.visit(this, context))
                .join(",")}){\n`;
            graphql += `\t${name.value}(${args.map(arg => `${arg.name.value}: $${arg.name.value}`)})`;
            graphql += type.visit(this.objectType, new ImportCore(name.value));
            graphql += `\n}\n`;
            context.list.push(graphql);
        }
        else {
            let graphql = `${context.type} ${name.value}{\n`;
            graphql += `\t${name.value}`;
            graphql += type.visit(this.objectType, new ImportCore(name.value));
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