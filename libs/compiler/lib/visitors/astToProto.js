"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const magnus_graphql_1 = require("@notadd/magnus-graphql");
const magnus_grpc_1 = require("@notadd/magnus-grpc");
const lodash_1 = require("lodash");
class AstToProtoVisitor {
    constructor() {
        this.name = `AstToProtoVisitor`;
        this.query = {};
        this.mutation = {};
        this.subscription = {};
        this.set = new Set();
    }
    visitDocumentAst(node, context) {
        this.documentAst = node;
        const root = new magnus_grpc_1.ast.Root();
        this.root = root;
        const pkg = new magnus_grpc_1.ast.Package();
        this.package = pkg;
        pkg.name = this.config.name || "magnus";
        pkg.syntax = `proto3`;
        pkg.children.push(this.createEmpty());
        node.definitions.filter(it => !!it).map(def => def.visit(this, pkg));
        node.protos;
        console.log({
            mutation: this.mutation,
            query: this.query
        });
        root.packages.push(pkg);
        return root;
    }
    visitOperationDefinitionAst(node, context) {
        const name = node.name.visit(this, context);
        const selectionSet = node.selectionSet.visit(this, context);
        if (node.operation === "mutation") {
            this.mutation[name] = {};
        }
        else if (node.operation === "query") {
            this.query[name] = {};
        }
        else {
            this.subscription[name] = {};
        }
    }
    visitSelectionSetAst(node, context) {
        node.selections;
    }
    createEmpty() {
        const service = new magnus_grpc_1.ast.Message();
        service.name = `Empty`;
        return service;
    }
    visitObjectTypeDefinitionAst(node, context) {
        const name = node.name.visit(this, context);
        if (this.package.hasChild(name)) {
            return;
        }
        this.isGrpc = node.isGrpc;
        if (node.isGrpc) {
            const service = new magnus_grpc_1.ast.Service();
            service.name = name;
            node.fields.map((field, index) => {
                field.index = index;
                field.visit(this, service);
            });
            this.package.children.push(service);
        }
        else {
            const message = new magnus_grpc_1.ast.Message();
            message.name = name;
            node.fields.map((field, index) => {
                field.index = index;
                field.visit(this, message);
            });
            if (!this.package.hasChild(name)) {
                this.package.children.push(message);
            }
        }
    }
    checkType(name, context) {
        if (this.set.has(name)) {
            return;
        }
        this.set.add(name);
        const graphqlAst = this.documentAst.hasDefinitionAst(name);
        if (graphqlAst)
            graphqlAst.visit(this, context);
    }
    visitInputObjectTypeDefinitionAst(node, context) {
        const message = new magnus_grpc_1.ast.Message();
        message.name = node.name.visit(this, ``);
        node.fields.map((field, index) => {
            field.index = index;
            field.visit(this, message);
        });
        this.package.children.push(message);
    }
    visitInputValueDefinitionAst(node, context) {
        const field = new magnus_grpc_1.ast.Field();
        field.index = node.index;
        field.name = node.name && node.name.visit(this, ``);
        field.type = this.createType(node.type, field);
        this.checkType(field.type, context);
        context.fields.push(field);
    }
    visitFieldDefinitionAst(node, context) {
        if (context instanceof magnus_grpc_1.ast.Service) {
            const method = new magnus_grpc_1.ast.Method();
            method.name = lodash_1.upperFirst(node.name.visit(this, ``));
            method.decorator = [`rpc`];
            method.type = this.createType(node.type, method);
            this.checkType(method.type, context);
            if (node.arguments.length > 0) {
                method.parameter = this.createArguments(node.arguments[0], method);
                this.checkType(method.parameter, context);
            }
            else {
                method.parameter = `Empty`;
            }
            context.methods.push(method);
        }
        else {
            const field = new magnus_grpc_1.ast.Field();
            field.index = node.index;
            field.name = node.name.visit(this, ``);
            field.type = this.createType(node.type, field);
            this.checkType(field.type, context);
            context.fields.push(field);
        }
    }
    createType(node, context) {
        if (node instanceof magnus_graphql_1.ast.ListTypeAst) {
            context.decorator.unshift("repeated");
            return this.createType(node.type, context);
        }
        else if (node instanceof magnus_graphql_1.ast.NonNullTypeAst) {
            return this.createType(node.type, context);
        }
        else if (node) {
            return node.visit(this, ``);
        }
        else {
            return `Error`;
        }
    }
    createArguments(node, context) {
        return this.createType(node.type, context);
    }
    visitNameAst(node, context) {
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
            case "Bytes":
                return `bytes`;
            default:
                return node.value;
        }
    }
    visitListTypeAst(node, context) { }
    visitNamedTypeAst(node, context) {
        return node.name.visit(this, context);
    }
    visitScalarTypeDefinitionAst(node, context) { }
    visitEnumTypeDefinitionAst(node, context) { }
}
exports.AstToProtoVisitor = AstToProtoVisitor;
//# sourceMappingURL=astToProto.js.map