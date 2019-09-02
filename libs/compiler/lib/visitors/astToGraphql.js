"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const magnus_graphql_1 = require("@notadd/magnus-graphql");
const tsToGraphql_1 = require("./tsToGraphql");
const magnus_1 = require("./magnus");
const expression_1 = require("./expression");
const parse = new magnus_graphql_1.ParseVisitor();
class AstToGraphqlVisitor {
    constructor() {
        this.name = `AstToGraphqlVisitor`;
        this.querys = new Map();
        this.mutations = new Map();
        this.subscriptions = new Map();
    }
    getProtos() {
        return Object.keys(this.protos).map(key => {
            const type = new magnus_graphql_1.ast.ObjectTypeDefinitionAst();
            const name = new magnus_graphql_1.ast.NameAst();
            name.value = key;
            type.name = name;
            type.fields = this.protos[key];
            type.isGrpc = true;
            return type;
        });
    }
    createScalar(name) {
        const scalar = new magnus_graphql_1.ast.ScalarTypeDefinitionAst();
        const nameAst = new magnus_graphql_1.ast.NameAst();
        nameAst.value = name;
        scalar.name = nameAst;
        return scalar;
    }
    visitContextManager(node, collection) {
        this.tsToGraphqlVisitor = new tsToGraphql_1.TsToGraphqlVisitor();
        this.tsToGraphqlVisitor.collection = collection;
        this.documentAst = new magnus_graphql_1.ast.DocumentAst();
        this.tsToGraphqlVisitor.documentAst = this.documentAst;
        this.collection = collection;
        this.documentAst.definitions.push(this.createScalar(`Double`));
        this.documentAst.definitions.push(this.createScalar(`Float`));
        this.documentAst.definitions.push(this.createScalar(`Int32`));
        this.documentAst.definitions.push(this.createScalar(`Int64`));
        this.documentAst.definitions.push(this.createScalar(`Uint32`));
        this.documentAst.definitions.push(this.createScalar(`Sint32`));
        this.documentAst.definitions.push(this.createScalar(`Fixed32`));
        this.documentAst.definitions.push(this.createScalar(`Sfixed32`));
        this.documentAst.definitions.push(this.createScalar(`Uint64`));
        this.documentAst.definitions.push(this.createScalar(`Sint64`));
        this.documentAst.definitions.push(this.createScalar(`Fixed64`));
        this.documentAst.definitions.push(this.createScalar(`Sfixed64`));
        this.documentAst.definitions.push(this.createScalar(`Bool`));
        this.documentAst.definitions.push(this.createScalar(`Bytes`));
        this.documentAst.definitions.push(this.createScalar(`Empty`));
        this.documentAst.definitions.push(this.createScalar(`Error`));
        this.documentAst.definitions.push(this.createScalar(`Json`));
        this.documentAst.definitions.push(this.createScalar(`Timestamp`));
        this.documentAst.definitions.push(this.createScalar(`Date`));
        this.documentAst.definitions.push(this.createScalar(`ID`));
        this.protos = {};
        this.collection.classes.map(cls => this.collectCls(cls, collection));
        const querys = [];
        const mutations = [];
        const subscriptions = [];
        const protos = [];
        // const protos: ast.FieldDefinitionAst[] = [];
        node.contexts.map(ctx => {
            ctx.querys.forEach(query => {
                const entities = query.getEntities();
                if (entities.length > 0) {
                    entities.map(entity => {
                        query.currentEntity = entity;
                        this.tsToGraphqlVisitor.isEntity = false;
                        const ast = this.tsToGraphqlVisitor.visitMethodDeclaration(query.node, query);
                        if (ast) {
                            const existIndex = querys.findIndex(q => q.name.value === ast.name.value);
                            const desc = this.documentAst.hasDefinitionAst(entity);
                            if (desc) {
                                if (desc.description) {
                                    if (ast.description) {
                                        const description = this.tsToGraphqlVisitor.createStringValue([ast.description.value, desc.description.value]);
                                        if (description)
                                            ast.description = description;
                                    }
                                    else {
                                        const description = this.tsToGraphqlVisitor.createStringValue([desc.description.value]);
                                        if (description)
                                            ast.description = description;
                                    }
                                }
                            }
                            if (existIndex > -1) {
                                querys.splice(existIndex, 1, ast);
                            }
                            else {
                                querys.push(ast);
                            }
                        }
                    });
                }
                else {
                    query.currentEntity = ``;
                    this.tsToGraphqlVisitor.isEntity = false;
                    const ast = this.tsToGraphqlVisitor.visitMethodDeclaration(query.node, query);
                    if (ast) {
                        const existIndex = querys.findIndex(q => q.name.value === ast.name.value);
                        if (existIndex > -1) {
                            querys.splice(existIndex, 1, ast);
                        }
                        else {
                            querys.push(ast);
                        }
                    }
                }
            });
            ctx.mutations.forEach(query => {
                const entities = query.getEntities();
                if (entities.length > 0) {
                    entities.map(entity => {
                        query.currentEntity = entity;
                        this.tsToGraphqlVisitor.isEntity = false;
                        const ast = this.tsToGraphqlVisitor.visitMethodDeclaration(query.node, query);
                        if (ast) {
                            const existIndex = mutations.findIndex(q => q.name.value === ast.name.value);
                            const desc = this.documentAst.hasDefinitionAst(entity);
                            if (desc) {
                                if (desc.description) {
                                    if (ast.description) {
                                        const description = this.tsToGraphqlVisitor.createStringValue([ast.description.value, desc.description.value]);
                                        if (description)
                                            ast.description = description;
                                    }
                                    else {
                                        const description = this.tsToGraphqlVisitor.createStringValue([desc.description.value]);
                                        if (description)
                                            ast.description = description;
                                    }
                                }
                            }
                            if (existIndex > -1) {
                                mutations.splice(existIndex, 1, ast);
                            }
                            else {
                                mutations.push(ast);
                            }
                        }
                    });
                }
                else {
                    query.currentEntity = ``;
                    this.tsToGraphqlVisitor.isEntity = false;
                    const ast = this.tsToGraphqlVisitor.visitMethodDeclaration(query.node, query);
                    if (ast) {
                        const existIndex = mutations.findIndex(q => q.name.value === ast.name.value);
                        if (existIndex > -1) {
                            mutations.splice(existIndex, 1, ast);
                        }
                        else {
                            mutations.push(ast);
                        }
                    }
                }
            });
            ctx.subscriptions.forEach(query => {
                const entities = query.getEntities();
                if (entities.length > 0) {
                    entities.map(entity => {
                        query.currentEntity = entity;
                        this.tsToGraphqlVisitor.isEntity = false;
                        const ast = this.tsToGraphqlVisitor.visitMethodDeclaration(query.node, query);
                        if (ast) {
                            const existIndex = subscriptions.findIndex(q => q.name.value === ast.name.value);
                            if (existIndex > -1) {
                                subscriptions.splice(existIndex, 1, ast);
                            }
                            else {
                                subscriptions.push(ast);
                            }
                        }
                    });
                }
                else {
                    query.currentEntity = ``;
                    this.tsToGraphqlVisitor.isEntity = false;
                    const ast = this.tsToGraphqlVisitor.visitMethodDeclaration(query.node, query);
                    if (ast) {
                        const existIndex = subscriptions.findIndex(q => q.name.value === ast.name.value);
                        if (existIndex > -1) {
                            subscriptions.splice(existIndex, 1, ast);
                        }
                        else {
                            subscriptions.push(ast);
                        }
                    }
                }
            });
            ctx.protos.forEach(query => {
                const entities = query.getEntities();
                const params = query.params;
                let name = ctx.name;
                let method = query.name;
                if (typeof params === "string") {
                    name = params;
                }
                else if (Array.isArray(params) && params.length >= 2) {
                    name = params[1];
                    method = params[2];
                }
                if (entities.length > 0) {
                    entities.map(entity => {
                        query.currentEntity = entity;
                        this.tsToGraphqlVisitor.isEntity = false;
                        const ast = this.tsToGraphqlVisitor.visitMethodDeclaration(query.node, query);
                        if (this.protos[name] && ast) {
                            this.protos[name].push(ast);
                        }
                        else {
                            if (ast)
                                this.protos[name] = [ast];
                        }
                        if (ast)
                            protos.push(ast);
                    });
                }
                else {
                    query.currentEntity = ``;
                    this.tsToGraphqlVisitor.isEntity = false;
                    const ast = this.tsToGraphqlVisitor.visitMethodDeclaration(query.node, query);
                    if (this.protos[name] && ast) {
                        this.protos[name].push(ast);
                    }
                    else {
                        if (ast)
                            this.protos[name] = [ast];
                    }
                }
            });
        });
        const queryRes = this.createObjectTypeDefinitionAst("Query", querys);
        const mutationRes = this.createObjectTypeDefinitionAst("Mutation", mutations.sort());
        const subscriptionRes = this.createObjectTypeDefinitionAst("Subscription", subscriptions);
        Object.keys(this.protos).map(key => {
            const protos = this.protos[key];
            const protoRes = this.createObjectTypeDefinitionAst(key, protos);
            protoRes.isProto = true;
            if (protoRes.fields.length > 0) {
                this.documentAst.definitions.push(protoRes);
            }
        });
        if (queryRes.fields.length > 0) {
            this.documentAst.definitions.push(queryRes);
        }
        if (mutationRes.fields.length > 0) {
            this.documentAst.definitions.push(mutationRes);
        }
        if (subscriptionRes.fields.length > 0) {
            this.documentAst.definitions.push(subscriptionRes);
        }
        this.documentAst.protos = this.getProtos();
        this.tsToGraphqlVisitor.sourceFile.statements.push(this.tsToGraphqlVisitor.query, this.tsToGraphqlVisitor.mutation, this.tsToGraphqlVisitor.subscription, ...this.tsToGraphqlVisitor.protos);
        this.sourceFile = this.tsToGraphqlVisitor.sourceFile;
        return this.documentAst;
    }
    collectCls(node, context) {
        const scalar = node.getDecorator(`Scalar`)(expression_1.expressionVisitor);
        const resolver = node.getDecorator(`Resolver`)(expression_1.expressionVisitor);
        const entity = node.getDecorator(`Entity`)(expression_1.expressionVisitor);
        if (scalar !== null) {
            const scalarDef = new magnus_graphql_1.ast.ScalarTypeDefinitionAst();
            const context = new magnus_1.MagnusContext();
            scalarDef.name = this.tsToGraphqlVisitor.visitIdentifier(node.name, context);
            if (this.documentAst) {
                if (!this.documentAst.hasDefinitionAst(scalarDef.name.value)) {
                    this.documentAst.definitions.push(scalarDef);
                }
            }
            return scalarDef;
        }
        if (resolver !== null) {
            if (resolver) {
                const ctx = new magnus_1.MagnusContext();
                ctx.currentName = resolver;
                ctx.name = resolver;
                const type = this.tsToGraphqlVisitor.visitClassDeclaration(node, ctx);
                if (this.documentAst && type) {
                    const index = this.documentAst.getDefinitionAstIndex(type.name.value);
                    if (index > -1) {
                        this.documentAst.definitions.push(type);
                    }
                    else {
                        this.documentAst.definitions.splice(index, 1, type);
                    }
                }
                return type;
            }
        }
        if (entity !== null) {
            const ctx = new magnus_1.MagnusContext();
            ctx.name = node.name.visit(expression_1.expressionVisitor, ``);
            ctx.typeParameters = new Set(node.typeParameters.map(t => t.visit(expression_1.expressionVisitor, ``)));
            this.tsToGraphqlVisitor.visitClassDeclaration(node, ctx);
        }
    }
    createObjectTypeDefinitionAst(name, fields) {
        const node = parse.visitObjectTypeDefinitionAst(new magnus_graphql_1.ast.ObjectTypeDefinitionAst(), {
            kind: "ObjectTypeDefinition",
            name: {
                kind: "Name",
                value: name
            }
        });
        node.fields = fields || [];
        return node;
    }
}
exports.AstToGraphqlVisitor = AstToGraphqlVisitor;
//# sourceMappingURL=astToGraphql.js.map