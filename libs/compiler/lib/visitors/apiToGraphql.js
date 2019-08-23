"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const magnus_graphql_1 = require("@notadd/magnus-graphql");
const magnus_grpc_1 = require("@notadd/magnus-grpc");
const lodash_1 = require("lodash");
class ApiToProto {
    constructor() {
        this.name = `ApiToProto`;
        this.query = new magnus_grpc_1.ast.Service();
        this.mutation = new magnus_grpc_1.ast.Service();
        this.subscription = new magnus_grpc_1.ast.Service();
        this.messages = [];
        this.query.name = `Query`;
        this.mutation.name = `Mutation`;
        this.subscription.name = `Subscription`;
    }
    visitDocumentAst(node, context) {
        this.documentAst = node;
        const root = new magnus_grpc_1.ast.Root();
        const pkg = new magnus_grpc_1.ast.Package();
        pkg.name = this.config.name;
        pkg.syntax = `proto3`;
        node.definitions.map(def => def.visit(this, pkg));
        pkg.children.push(this.query);
        pkg.children.push(this.mutation);
        pkg.children.push(this.subscription);
        this.messages.map(msg => pkg.children.push(msg));
        root.packages.push(pkg);
        this.root = root;
        return root;
    }
    visitOperationDefinitionAst(node, context) {
        const name = node.name.visit(this, context);
        const mth = new magnus_grpc_1.ast.Method();
        mth.decorator.unshift('rpc');
        mth.name = name;
        mth.parameter = `Grpc${lodash_1.upperFirst(mth.name)}Input`;
        const msg = new magnus_grpc_1.ast.Message();
        msg.name = mth.parameter;
        node.variableDefinitions.map((variable, index) => {
            msg.index = index;
            variable.visit(this, msg);
        });
        context.children.push(msg);
        const query = this.schema.hasDefinitionAst(lodash_1.upperFirst(node.operation));
        const def = query.getFields(mth.name);
        if (def) {
            const name = def.type.visit(this, mth);
            mth.type = name;
            const astDef = this.schema.hasDefinitionAst(name);
            if (astDef)
                astDef.visit(this, context);
        }
        else {
            throw new Error(`can not found def`);
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
    visitObjectTypeDefinitionAst(node, context) {
        const name = node.name.visit(this, context);
        const message = new magnus_grpc_1.ast.Message();
        message.name = name;
        node.fields.map((field, index) => {
            field.index = index;
            field.visit(this, message);
        });
        this.addMessage(message);
    }
    visitFieldDefinitionAst(node, context) {
        const field = new magnus_grpc_1.ast.Field();
        field.index = node.index;
        field.name = node.name.visit(this, ``);
        field.type = node.type.visit(this, field);
        context.fields.push(field);
    }
    visitSelectionSetAst(node, contedxt) {
        const selections = node.selections.map(selection => selection.visit(this, context));
    }
    visitFieldAst(node, context) {
        const alias = node.alias && node.alias.visit(this, context);
        const name = node.name && node.name.visit(this, context);
        const selectionSet = node.selectionSet && node.selectionSet.visit(this, context);
    }
    visitVariableDefinitionAst(node, context) {
        const type = node.type.visit(this, context);
        const variable = node.variable.visit(this, context);
        const def = this.schema.hasDefinitionAst(type);
        if (def)
            def.visit(this, context);
        const field = new magnus_grpc_1.ast.Field();
        field.name = variable;
        field.type = type;
        field.index = context.index;
        context.fields.push(field);
    }
    visitVariableAst(node, contedxt) {
        return node.name.visit(this, context);
    }
    visitNameAst(node, context) {
        return node.value;
    }
    visitInputObjectTypeDefinitionAst(node, context) {
        const message = new magnus_grpc_1.ast.Message();
        message.name = node.name.visit(this, ``);
        node.fields.map((field, index) => {
            field.index = index;
            field.visit(this, message);
        });
        this.addMessage(message);
    }
    addMessage(msg) {
        const exist = this.messages.find(it => it.name === msg.name);
        if (!exist)
            this.messages.push(msg);
    }
    visitInputValueDefinitionAst(node, context) {
        const field = new magnus_grpc_1.ast.Field();
        field.index = node.index;
        field.name = node.name && node.name.visit(this, ``);
        field.type = node.type.visit(this, field);
        context.fields.push(field);
    }
    visitListTypeAst(node, context) {
        context.decorator.unshift("repeated");
        const type = node.type.visit(this, context);
        return type;
    }
    visitNonNullTypeAst(node, context) {
        if (node.type instanceof magnus_graphql_1.ast.NamedTypeAst) {
            return node.type.visit(this, context);
        }
        else {
            return node.type.visit(this, context);
        }
    }
    visitNamedTypeAst(node, context) {
        return node.name.visit(this, context);
    }
}
exports.ApiToProto = ApiToProto;
//# sourceMappingURL=apiToGraphql.js.map