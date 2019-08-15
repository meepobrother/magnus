"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
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
class ApiObjectTypeVisitor {
    constructor() {
        this.name = "ApiVisitor";
        // 一个名称下面引用很多名称
        this.imports = new Map();
    }
    visitNamedTypeAst(node, context) {
        const name = node.name.value;
        const parent = context.findParent(name);
        if (parent) {
            return;
        }
        const core = context.create(name);
        const def = this.doc.hasDefinitionAst(name);
        if (def) {
            const result = def.visit(this, core);
            return result;
        }
        return ``;
    }
    visitObjectTypeDefinitionAst(node, context) {
        const result = `{\n${node.fields
            .map(field => field.visit(this, context))
            .join("")}}\n`;
        return result;
    }
    visitFieldDefinitionAst(node, context) {
        return `${node.name.value} ${node.type.visit(this, context)}`;
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
        node.definitions.map(def => def.visit(this, context));
    }
    visitScalarTypeDefinitionAst(node, context) { }
    visitObjectTypeDefinitionAst(node, context) {
        const nodeName = node.name.value;
        if (nodeName === "Query") {
            context.query = context.query || {
                type: "query",
                list: []
            };
            node.fields.map(field => field.visit(this, context.query));
        }
        else if (nodeName === "Mutation") {
            context.mutation = context.mutation || {
                type: "query",
                list: []
            };
            node.fields.map(field => field.visit(this, context.mutation));
        }
        else if (nodeName === "Subscription") {
            context.subscription = context.subscription || {
                type: "query",
                list: []
            };
            node.fields.map(field => field.visit(this, context.subscription));
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
            graphql += `\t${name.value}(${args.map(arg => `${arg.name.value}: $${arg.name.value}`)}){\n`;
            graphql += type.visit(this.objectType, new ImportCore(name.value));
            graphql += `\t}\n`;
            graphql += `}\n`;
            fs_1.writeFileSync(path_1.join(__dirname, "1.graphql"), graphql);
            debugger;
        }
        else {
            const graphql = `${context.type} ${name.value}{}`;
        }
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