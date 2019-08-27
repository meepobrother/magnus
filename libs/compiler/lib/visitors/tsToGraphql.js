"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ast = tslib_1.__importStar(require("./visitor"));
const magnus_1 = require("./magnus");
const magnus_graphql_1 = require("@notadd/magnus-graphql");
const lodash_1 = require("lodash");
const expression_1 = require("./expression");
exports.toString = new magnus_graphql_1.ToString();
exports.WhereMap = {
    Not: `不等于`,
    In: `在制定内，如[1,2]`,
    NotIn: `不在制定内,如[1,2]`,
    Lt: `小于`,
    Lte: `小于等于`,
    Gt: `大于`,
    Gte: `大于等于`,
    Contains: `包含`,
    NotContains: `不包含`,
    StartsWith: `开头等于`,
    NotStartsWith: `开头不等于`,
    EndsWith: `结尾等于`,
    NotEndsWith: `结尾不等于`
};
class Handler {
    constructor(visitor) {
        this.visitor = visitor;
        this.__partial = new Set();
        this.__order = new Set();
        this.__where = new Set();
    }
    Promise(node, context) {
        if (node instanceof ast.TypeReferenceNode) {
            if (node.typeArguments.length === 1) {
                const typeNode = node.typeArguments[0];
                return this.visitor.visitTypeNode(typeNode, context);
            }
        }
    }
    Observable(node, context) {
        if (node instanceof ast.TypeReferenceNode) {
            if (node.typeArguments.length === 1) {
                const typeNode = node.typeArguments[0];
                return this.visitor.visitTypeNode(typeNode, context);
            }
        }
    }
    Order(node, context) {
        if (node instanceof ast.TypeReferenceNode) {
            if (node.typeArguments.length === 1) {
                const source = node.typeArguments[0];
                let name = source.typeName.text;
                if (!context.isEntity) {
                    const sourceRes = this.visitor.visitTypeNode(source, context);
                    if (sourceRes && sourceRes.name)
                        name = sourceRes.name.value;
                }
                if (name) {
                    const sourceAst = this.visitor.collection.findByName(name);
                    if (sourceAst) {
                        const res = sourceAst.visit(this.visitor, context);
                        if (res) {
                            res.fields = res.fields.map(field => {
                                const description = this.visitor.createStringValue([
                                    `排序可选值为ASC或者DESC`
                                ]);
                                if (field.description && description)
                                    field.description.value += `\n${description.value}`;
                                field.type = this.visitor.createNamedTypeAst("String");
                                return field;
                            });
                            const astName = res.name.value + "Order";
                            if (this.__order.has(astName)) {
                                return this.visitor.createNamedTypeAst(astName);
                            }
                            res.name.value = astName;
                            this.visitor.documentAst.definitions.push(res);
                            this.__order.add(astName);
                            return this.visitor.createNamedTypeAst(astName);
                        }
                    }
                    else {
                        const item = this.visitor.documentAst.hasDefinitionAst(name);
                        if (item) {
                            const res = item.copy();
                            const astName = res.name.value + "Order";
                            res.fields = res.fields || [];
                            res.fields = res.fields.map(field => {
                                const description = this.visitor.createStringValue([
                                    `排序可选值为ASC或者DESC`
                                ]);
                                if (field.description && description)
                                    field.description.value += `\n${description.value}`;
                                field.type = this.visitor.createNamedTypeAst("String");
                                return field;
                            });
                            if (this.__order.has(astName)) {
                                return this.visitor.createNamedTypeAst(astName);
                            }
                            res.name.value = astName;
                            this.visitor.documentAst.definitions.push(res);
                            this.__order.add(astName);
                            return this.visitor.createNamedTypeAst(astName);
                        }
                    }
                }
            }
        }
    }
    DeepPartial(node, context) {
        if (node instanceof ast.TypeReferenceNode) {
            if (node.typeArguments.length === 1) {
                const source = node.typeArguments[0];
                const sourceRes = this.visitor.visitTypeNode(source, context);
                if (sourceRes instanceof magnus_graphql_1.ast.NamedTypeAst) {
                    const sourceAst = this.visitor.collection.findByName(context.currentEntity);
                    if (sourceAst) {
                        const res = sourceAst.visit(this.visitor, context);
                        res.fields = res.fields.map(field => {
                            if (field.type instanceof magnus_graphql_1.ast.NonNullTypeAst) {
                                field.type = field.type.type;
                            }
                            return field;
                        });
                        const astName = res.name.value + "DeepPartial";
                        if (this.__partial.has(astName)) {
                            return this.visitor.createNamedTypeAst(astName);
                        }
                        res.name.value = astName;
                        this.visitor.documentAst.definitions.push(res);
                        this.__partial.add(astName);
                        return this.visitor.createNamedTypeAst(astName);
                    }
                }
            }
        }
    }
    Partial(node, context) {
        if (node instanceof ast.TypeReferenceNode) {
            if (node.typeArguments.length === 1) {
                const source = node.typeArguments[0];
                const sourceRes = this.visitor.visitTypeNode(source, context);
                // debugger;
                if (sourceRes instanceof magnus_graphql_1.ast.NamedTypeAst) {
                    const sourceAst = this.visitor.collection.findByName(context.currentEntity);
                    if (sourceAst) {
                        const res = sourceAst.visit(this.visitor, context);
                        res.fields = res.fields.map(field => {
                            if (field.type instanceof magnus_graphql_1.ast.NonNullTypeAst) {
                                field.type = field.type.type;
                            }
                            return field;
                        });
                        const astName = res.name.value + "Partial";
                        const old = this.visitor.documentAst.hasDefinitionAst(astName);
                        if (!old) {
                            res.name.value = astName;
                            this.visitor.documentAst.definitions.push(res);
                        }
                        return this.visitor.createNamedTypeAst(astName);
                    }
                }
            }
        }
    }
    Where(node, context) {
        if (node instanceof ast.TypeReferenceNode) {
            if (node.typeArguments.length === 1) {
                const source = node.typeArguments[0];
                let name = source.typeName.text;
                if (!context.isEntity) {
                    const sourceRes = this.visitor.visitTypeNode(source, context);
                    if (sourceRes) {
                        if (sourceRes.name) {
                            name = sourceRes.name.value;
                        }
                    }
                }
                if (name) {
                    const sourceAst = this.visitor.collection.findByName(name);
                    if (sourceAst) {
                        const res = sourceAst.visit(this.visitor, context);
                        const fields = [];
                        if (res) {
                            const astName = res.name.value + "Where";
                            if (this.__where.has(astName)) {
                                return this.visitor.createNamedTypeAst(astName);
                            }
                            const createField = (name) => {
                                const ast = new magnus_graphql_1.ast.FieldDefinitionAst();
                                ast.name = this.visitor.createNameAst(name);
                                ast.type = this.visitor.createListTypeAst(this.visitor.createNonNullTypeAst(this.visitor.createNamedTypeAst(astName)));
                                return ast;
                            };
                            res.fields.map(field => {
                                let needField = false;
                                let type = field.type;
                                if (type instanceof magnus_graphql_1.ast.ListTypeAst) {
                                    return;
                                }
                                else if (type instanceof magnus_graphql_1.ast.NonNullTypeAst) {
                                    if (type.type instanceof magnus_graphql_1.ast.ListTypeAst) {
                                        return;
                                    }
                                    type = type.type;
                                }
                                Object.keys(exports.WhereMap).map((key) => {
                                    const typeName = type.name.value;
                                    if (["Int", "String", "Boolean"].includes(typeName)) {
                                        const newField = field.copy();
                                        const desc1 = this.visitor.createStringValue([
                                            `${exports.WhereMap[key]}`
                                        ]);
                                        newField.description =
                                            newField.description ||
                                                this.visitor.createStringValue([``]);
                                        if (field.description && desc1)
                                            newField.description.value =
                                                field.description.value + ` ${desc1.value}`;
                                        if (newField.name)
                                            newField.name.value = `${newField.name.value}_${key}`;
                                        if (["In", "NotIn"].includes(key)) {
                                            if (typeName === "Int" || typeName === "String") {
                                                newField.type = this.visitor.createListTypeAst(this.visitor.createNonNullTypeAst(field.type));
                                                fields.push(newField);
                                                needField = true;
                                            }
                                        }
                                        else if (["Not", "Lt", "Lte", "Gt", "Gte"].includes(key)) {
                                            if (typeName === "Int" || typeName === "String") {
                                                newField.type = type;
                                                fields.push(newField);
                                                needField = true;
                                            }
                                        }
                                        else if ([
                                            "Contains",
                                            "NotContains",
                                            "StartsWith",
                                            "NotStartsWith",
                                            "EndsWith",
                                            "NotEndsWith"
                                        ].includes(key)) {
                                            if (typeName === "String") {
                                                newField.type = type;
                                                fields.push(newField);
                                                needField = true;
                                            }
                                        }
                                        else {
                                        }
                                    }
                                });
                                if (needField) {
                                    field.type = type;
                                    fields.push(field);
                                }
                            });
                            fields.push(createField(`AND`));
                            fields.push(createField(`OR`));
                            fields.push(createField(`NOT`));
                            res.fields = fields;
                            res.name.value = astName;
                            this.visitor.documentAst.definitions.push(res);
                            this.__where.add(astName);
                            return this.visitor.createNamedTypeAst(astName);
                        }
                    }
                    else {
                        const item = this.visitor.documentAst.hasDefinitionAst(name);
                        if (item) {
                            const res = item.copy();
                            const fields = [];
                            const astName = res.name.value + "Where";
                            if (this.__where.has(astName)) {
                                return this.visitor.createNamedTypeAst(astName);
                            }
                            const createField = (name) => {
                                const ast = new magnus_graphql_1.ast.FieldDefinitionAst();
                                ast.name = this.visitor.createNameAst(name);
                                ast.type = this.visitor.createListTypeAst(this.visitor.createNonNullTypeAst(this.visitor.createNamedTypeAst(astName)));
                                return ast;
                            };
                            res.fields.map(field => {
                                let needField = false;
                                let type = field.type;
                                if (type instanceof magnus_graphql_1.ast.ListTypeAst) {
                                    return;
                                }
                                else if (type instanceof magnus_graphql_1.ast.NonNullTypeAst) {
                                    if (type.type instanceof magnus_graphql_1.ast.ListTypeAst) {
                                        return;
                                    }
                                    type = type.type;
                                }
                                Object.keys(exports.WhereMap).map((key) => {
                                    const typeName = type.name.value;
                                    if (["Int", "String", "Boolean", "Timestamp", "Date"].includes(typeName)) {
                                        const newField = field.copy();
                                        const desc1 = this.visitor.createStringValue([
                                            `${exports.WhereMap[key]}`
                                        ]);
                                        newField.description =
                                            newField.description ||
                                                this.visitor.createStringValue([``]);
                                        if (field.description && desc1)
                                            newField.description.value =
                                                field.description.value + ` ${desc1.value}`;
                                        if (newField.name)
                                            newField.name.value = `${newField.name.value}_${key}`;
                                        if (["In", "NotIn"].includes(key)) {
                                            if (typeName === "Int" || typeName === "String") {
                                                newField.type = this.visitor.createListTypeAst(this.visitor.createNonNullTypeAst(field.type));
                                                fields.push(newField);
                                                needField = true;
                                            }
                                        }
                                        else if (["Not", "Lt", "Lte", "Gt", "Gte"].includes(key)) {
                                            if (typeName === "Int" ||
                                                typeName === "String" ||
                                                typeName === "Timestamp" ||
                                                typeName === "Date") {
                                                newField.type = type;
                                                fields.push(newField);
                                                needField = true;
                                            }
                                        }
                                        else if ([
                                            "Contains",
                                            "NotContains",
                                            "StartsWith",
                                            "NotStartsWith",
                                            "EndsWith",
                                            "NotEndsWith"
                                        ].includes(key)) {
                                            if (typeName === "String") {
                                                newField.type = type;
                                                fields.push(newField);
                                                needField = true;
                                            }
                                        }
                                        else {
                                        }
                                    }
                                });
                                if (needField) {
                                    field.type = type;
                                    fields.push(field);
                                }
                            });
                            fields.push(createField(`AND`));
                            fields.push(createField(`OR`));
                            fields.push(createField(`NOT`));
                            res.fields = fields;
                            res.name.value = astName;
                            this.visitor.documentAst.definitions.push(res);
                            this.__where.add(astName);
                            return this.visitor.createNamedTypeAst(astName);
                        }
                    }
                }
            }
        }
    }
}
exports.Handler = Handler;
// 防止循环依赖
class TsToGraphqlVisitor {
    constructor() {
        this.name = `TsToGraphqlVisitor`;
        /**
         * 定义文件
         */
        this.def = {};
        this.query = new ast.InterfaceDeclaration();
        this.mutation = new ast.InterfaceDeclaration();
        this.subscription = new ast.InterfaceDeclaration();
        // protos
        this.protos = [];
        this.sourceFile = new ast.SourceFile();
        /**
         * 权限搜集
         */
        this.permission = [];
        // entity
        this.isEntity = false;
        this.entities = {};
        this.set = new Set();
        this.handler = new Handler(this);
        this.sourceFile.statements = [];
        this.query.name = this.createIdentifier(`Query`);
        this.mutation.name = this.createIdentifier(`Mutation`);
        this.subscription.name = this.createIdentifier(`Subscription`);
    }
    createIdentifier(text) {
        const iden = new ast.Identifier();
        iden.text = text;
        return iden;
    }
    isUndefined(val) {
        return typeof val === "undefined";
    }
    visitMethodSignature(node, context) {
        context.isProperty = false;
        context.oldName = node.name.visit(expression_1.expressionVisitor, ``);
        node.type.visit(this, context);
        if (context.isInput) {
            // 完善信息
            return undefined;
        }
        const res = new magnus_graphql_1.ast.FieldDefinitionAst();
        const description = this.createStringValue(node.docs.map(doc => this.visitJSDoc(doc, context)));
        if (description)
            res.description = description;
        context.isInput = true;
        const args = node.parameters.filter(par => {
            const decorator = par.getDecorators()(expression_1.expressionVisitor);
            if (decorator) {
                if (decorator.includes("Args")) {
                    return true;
                }
                return false;
            }
            return true;
        });
        res.arguments = args.map(par => this.visitParameterDeclaration(par, context));
        context.isInput = false;
        const type = this.visitTypeNode(node.type, context);
        if (type)
            res.type = this.createNonNullTypeAst(type);
        res.name = this.visitPropertyName(node.name, context);
        return res;
    }
    visitPropertySignature(node, context) {
        context._needChangeName = false;
        context.isUpperFirst = false;
        context.isProperty = false;
        context.name = node.name.visit(expression_1.expressionVisitor, ``);
        if (context.isInput) {
            const res = new magnus_graphql_1.ast.InputValueDefinitionAst();
            const description = this.createStringValue(node.docs.map(doc => this.visitJSDoc(doc, context)));
            if (description)
                res.description = description;
            if (node.questionToken) {
                const type = this.visitTypeNode(node.type, context);
                if (type)
                    res.type = type;
            }
            else {
                const type = this.visitTypeNode(node.type, context);
                if (type)
                    res.type = this.createNonNullTypeAst(type);
            }
            context.currentEntity = context.getNotT();
            context.currentName = node.name.visit(expression_1.expressionVisitor, ``);
            res.name = this.visitPropertyName(node.name, context);
            return res;
        }
        else {
            const res = new magnus_graphql_1.ast.FieldDefinitionAst();
            const description = this.createStringValue(node.docs.map(doc => this.visitJSDoc(doc, context)));
            if (description)
                res.description = description;
            if (node.questionToken) {
                const type = this.visitTypeNode(node.type, context);
                if (type)
                    res.type = type;
            }
            else {
                const type = this.visitTypeNode(node.type, context);
                if (type)
                    res.type = this.createNonNullTypeAst(type);
            }
            context.currentEntity = context.getNotT();
            context.currentName = node.name.visit(expression_1.expressionVisitor, ``);
            res.name = this.visitPropertyName(node.name, context);
            return res;
        }
    }
    visitPropertyDeclaration(node, context) {
        /**
         * 初始化
         */
        context.isProperty = false;
        context._needChangeName = false;
        context.isUpperFirst = false;
        // context.name = node.name.visit(expressionVisitor, context);
        const name = node.name.visit(expression_1.expressionVisitor, ``);
        const modifiers = node.modifiers.map(mod => mod.visit(this, context));
        if (modifiers.some(mod => mod && mod.name === "static")) {
            return;
        }
        const res = new magnus_graphql_1.ast.FieldDefinitionAst();
        const description = this.createStringValue(node.docs.map(doc => this.visitJSDoc(doc, context)));
        if (description)
            res.description = description;
        const type = this.visitTypeNode(node.type, context);
        if (node.questionToken) {
            if (type)
                res.type = type;
        }
        else {
            if (this.isNotRequired(node)) {
                if (type)
                    res.type = type;
            }
            else {
                if (type)
                    res.type = this.createNonNullTypeAst(type);
            }
        }
        context.currentEntity = context.getNotT();
        context.currentName = node.name.visit(expression_1.expressionVisitor, context);
        res.name = this.visitPropertyName(node.name, context);
        return res;
    }
    /**
     * 是否非必填项目
     */
    isNotRequired(node) {
        if (node.getDecorator("CreateDateColumn")(expression_1.expressionVisitor) !== null)
            return true;
        if (node.getDecorator("UpdateDateColumn")(expression_1.expressionVisitor) !== null)
            return true;
        if (node.getDecorator("PrimaryGeneratedColumn")(expression_1.expressionVisitor) !== null)
            return true;
        if (node.getDecorator("ManyToOne")(expression_1.expressionVisitor) !== null)
            return true;
        if (node.getDecorator("OneToMany")(expression_1.expressionVisitor) !== null)
            return true;
        if (node.getDecorator("ManyToMany")(expression_1.expressionVisitor) !== null)
            return true;
        if (node.getDecorator("OneToOne")(expression_1.expressionVisitor) !== null)
            return true;
        const column = node.getDecorator("Column")(expression_1.expressionVisitor);
        if (column !== null) {
            if (column && !!column.default)
                return true;
        }
        return false;
    }
    createMethodSignature(node) {
        const method = new ast.MethodSignature();
        method.name = node.name;
        method.type = node.type;
        method.questionToken = node.questionToken;
        method.parameters = node.parameters;
        method.typeParameters = node.typeParameters;
        return method;
    }
    createPropertySignature(node) {
        const property = new ast.PropertySignature();
        property.name = node.name;
        property.type = node.type;
        property.questionToken = node.questionToken;
        return property;
    }
    createMetadate(res, context, node) {
        return [
            res.name.value,
            context.topName,
            context.currentEntity,
            node.name.visit(expression_1.expressionVisitor, ``),
            res.allArguments.map((arg) => {
                const name = arg.name.visit(exports.toString, ``);
                const type = arg.type.visit(exports.toString, ``);
                const res = {
                    name,
                    type,
                    index: arg.index,
                    decorator: arg.decorator
                };
                return res;
            }),
            node.type.visit(expression_1.expressionVisitor, ``)
        ];
    }
    visitMethodDeclaration(node, context) {
        context.isProperty = false;
        if (context.isInput) {
            // 完善信息
            return undefined;
        }
        const proto = node.getDecorator(`GrpcMethod`)(expression_1.expressionVisitor) ||
            node.getDecorator(`Proto`)(expression_1.expressionVisitor);
        const permission = node.getDecorator(`Permission`)(expression_1.expressionVisitor);
        const ResolveProperty = node.getDecorator(`ResolveProperty`)(expression_1.expressionVisitor);
        if (permission !== null) {
            if (proto !== null && permission) {
                if (typeof proto === "string") {
                    if (permission) {
                        permission.namespace = proto;
                        this.permission.push(permission);
                    }
                }
                else {
                    permission.namespace = context.parentName;
                    this.permission.push(permission);
                }
            }
            else {
                if (permission) {
                    permission.namespace = context.parentName;
                    this.permission.push(permission);
                }
            }
        }
        // 判断return type是否包含 parameter
        node.type && node.type.visit(this, context);
        // 完善信息
        const res = new magnus_graphql_1.ast.FieldDefinitionAst();
        // 是否需要改名字
        const description = this.createStringValue(node.docs.map(doc => this.visitJSDoc(doc, context)));
        if (description)
            res.description = description;
        context.isInput = true;
        const args = node.parameters.filter(par => {
            const decorator = par.getDecorators()(expression_1.expressionVisitor);
            if (decorator && decorator.length > 0) {
                if (decorator.includes("Args")) {
                    return true;
                }
                return false;
            }
            return true;
        });
        res.arguments = args.map(par => this.visitParameterDeclaration(par, context));
        res.allArguments = node.parameters.map(par => this.visitParameterDeclaration(par, context));
        context.isInput = false;
        // 返回值
        context.isNonNull = false;
        const type = this.visitTypeNode(node.type, context);
        if (type)
            res.type = type;
        if (context.currentEntity.length > 0 &&
            context.getTop().typeParameters.size > 0) {
            if (ResolveProperty === null) {
                context._needChangeName = true;
                const name = node.name.visit(expression_1.expressionVisitor, ``);
                context.currentEntity = context.getNotT();
                context.currentName = lodash_1.camelCase(`${context.currentEntity}_${name}`);
            }
        }
        else {
            context._needChangeName = false;
        }
        res.name = this.visitPropertyName(node.name, context);
        if (ResolveProperty !== null) {
            this.def[context.topName] = this.def[context.topName] || [];
            const ctx = new magnus_1.MagnusContext();
            ctx.parent = context.parent;
            ctx.currentEntity = context.topName;
            const item = this.createMetadate(res, ctx, node);
            this.def[context.topName].push(item);
            return res;
        }
        if (context.isQuery) {
            this.def.query = this.def.query || [];
            const item = this.createMetadate(res, context, node);
            if (context.currentEntity) {
                this.def.query.push(item);
                this.query.members.push(this.createMethodSignature(node));
            }
            else {
                const existIndex = this.def.query.findIndex(it => it[0] === item[0]);
                if (existIndex > -1) {
                    this.def.query.splice(existIndex, 1, item);
                    this.query.members.splice(existIndex, 1, this.createMethodSignature(node));
                }
                else {
                    this.def.query.push(item);
                    this.query.members.push(this.createMethodSignature(node));
                }
            }
        }
        else if (context.isMutation) {
            this.def.mutation = this.def.mutation || [];
            const item = this.createMetadate(res, context, node);
            if (context.currentEntity) {
                this.def.mutation.push(item);
                this.mutation.members.push(this.createMethodSignature(node));
            }
            else {
                const existIndex = this.def.mutation.findIndex(it => it[0] === item[0]);
                if (existIndex > -1) {
                    this.def.mutation.splice(existIndex, 1, item);
                    this.mutation.members.splice(existIndex, 1, this.createMethodSignature(node));
                }
                else {
                    this.def.mutation.push(item);
                    this.mutation.members.push(this.createMethodSignature(node));
                }
            }
        }
        else if (context.isSubscription) {
            this.def.subscription = this.def.subscription || [];
            const item = this.createMetadate(res, context, node);
            if (context.currentEntity) {
                this.def.subscription.push(item);
                this.subscription.members.push(this.createMethodSignature(node));
            }
            else {
                const existIndex = this.def.subscription.findIndex(it => it[0] === item[0]);
                if (existIndex > -1) {
                    this.def.subscription.splice(existIndex, 1, item);
                    this.subscription.members.splice(existIndex, 1, this.createMethodSignature(node));
                }
                else {
                    this.def.subscription.push(item);
                    this.subscription.members.push(this.createMethodSignature(node));
                }
            }
        }
        else if (context.isProto) {
            let proto = this.protos.find(proto => proto.name.visit(expression_1.expressionVisitor, ``) === context.params);
            if (!proto) {
                proto = new ast.InterfaceDeclaration();
                proto.name = this.createIdentifier(context.params);
                this.protos.push(proto);
            }
            proto.members.push(this.createMethodSignature(node));
        }
        return res;
    }
    visitJSDoc(node, context) {
        return node.comment;
    }
    visitTypeNode(node, context) {
        if (node instanceof ast.ArrayTypeNode) {
            return this.visitArrayTypeNode(node, context);
        }
        else if (node instanceof ast.KeywordTypeNode) {
            return this.visitKeywordTypeNode(node, context);
        }
        else if (node instanceof ast.TypeReferenceNode) {
            return this.visitTypeReferenceNode(node, context);
        }
        else if (node instanceof ast.UnionTypeNode) {
            return this.visitUnionTypeNode(node, context);
        }
        else {
            return this.createNamedTypeAst("Empty");
        }
    }
    addType(name, context) {
        /**
         * 如果操作的是自身 那么放弃
         */
        if (!context) {
            return;
        }
        if (context.parentName === name) {
            return;
        }
        if (this.documentAst) {
            const ast3 = this.documentAst.hasDefinitionAst(context.currentName);
            if (ast3) {
                if (context.isInput) {
                    if (ast3 instanceof magnus_graphql_1.ast.InputObjectTypeDefinitionAst) {
                        return;
                    }
                    else {
                        context.currentName = context.currentName + `Input`;
                        context.isInput = true;
                        return this.addType(name, context);
                    }
                }
            }
            // const namedAst = this.documentAst.hasDefinitionAst(context.currentName);
            if (context.isInput) {
                if (typeof context.currentEntity === "string") {
                    if (!context.currentName.endsWith("Input")) {
                        context.currentName = `${context.currentName}Input`;
                    }
                }
            }
            if (this.set.has(context.currentName)) {
                return;
            }
            const ast2 = this.collection.findByName(name);
            if (ast2) {
                // 需要处理循环依赖
                const oldName = context.currentName;
                this.set.add(context.currentName);
                const graphAst = ast2.visit(this, context);
                context.currentName = oldName;
                if (!this.documentAst.hasDefinitionAst(context.currentName)) {
                    this.documentAst.definitions.push(graphAst);
                }
            }
            else {
                context.currentName = name;
            }
        }
    }
    visitTypeReferenceNode(node, context) {
        const typeName = expression_1.expressionVisitor.visitTypeReferenceNode(node, ``);
        context.currentEntity = context.getNotT();
        const typeArguments = node.typeArguments.map(t => t.visit(expression_1.expressionVisitor, ``));
        const handler = this.handler[typeName];
        if (handler) {
            const res = handler.bind(this.handler)(node, context);
            if (res)
                return res;
        }
        const ctx = new magnus_1.MagnusContext();
        ctx.contextParent = context;
        ctx.isInput = context.isInput;
        ctx.currentEntity = context.currentEntity;
        ctx.currentName = typeName;
        /**
         * 如果有
         */
        if (context.hasTypeParameter(typeName) ||
            (typeName.length === 1 && context.currentEntity)) {
            // 添加一个type
            ctx.currentName = context.currentEntity;
            context._needChangeName = true;
            context.currentName = ctx.currentName;
            this.addType(ctx.currentEntity, ctx);
            return this.createNamedTypeAst(ctx.currentName);
        }
        if (typeArguments.length > 0) {
            const name = typeArguments
                .map(it => {
                if (typeof it === "string") {
                    if (context.hasTypeParameter(it)) {
                        return context.currentEntity;
                    }
                    else {
                        context.currentEntity = it === "T" ? context.currentEntity : it;
                        return context.currentEntity;
                    }
                }
                else {
                    if (context.hasTypeParameter(it.elementType)) {
                        return context.currentEntity;
                    }
                    else {
                        context.currentEntity = it.elementType;
                        return context.currentEntity;
                    }
                }
            })
                .reverse()
                .join("");
            // 添加一个 type
            ctx.currentEntity = context.currentEntity;
            ctx.currentName = `${name}${typeName}`;
            context.currentName = ctx.currentName;
            this.addType(`${typeName}`, ctx);
            return this.createNamedTypeAst(ctx.currentName);
        }
        // 需要补充的
        // context.currentName = ctx.currentName;
        this.addType(`${typeName}`, ctx);
        return this.createNamedTypeAst(ctx.currentName);
    }
    visitClassDeclaration(node, context) {
        const top = new magnus_1.MagnusTopContext();
        top.name = node.name.visit(expression_1.expressionVisitor, ``);
        context = context || new magnus_1.MagnusContext();
        context.parent = context.parent || top;
        context.isProperty = true;
        context.isUpperFirst = true;
        const scalar = node.getDecorator(`Scalar`)(expression_1.expressionVisitor);
        const directive = node.getDecorator(`Directive`)(expression_1.expressionVisitor);
        const resolver = node.getDecorator(`Resolver`)(expression_1.expressionVisitor);
        const entity = node.getDecorator(`Entity`)(expression_1.expressionVisitor);
        this.isEntity = false;
        if (entity !== null) {
            // 搜集字段
            this.isEntity = true;
            const name = node.name && node.name.visit(expression_1.expressionVisitor, ``);
            this.entities[name] = (node.members || []).filter(it => !!it).map((member) => {
                const name = member.name && member.name.visit(expression_1.expressionVisitor, ``);
                const decorators = member.getDecorators()(expression_1.expressionVisitor);
                const type = member.type && member.type.visit(expression_1.expressionVisitor, ``);
                const method = member;
                const args = method.parameters && method.parameters.map((arg, index) => {
                    const name = arg.name.visit(expression_1.expressionVisitor, ``);
                    return {
                        name,
                        index,
                        decorator: arg.decorators.map(dec => dec.visit(expression_1.expressionVisitor, ``).name)
                    };
                });
                let entity = ``;
                if (typeof type === "string") {
                    entity = type;
                }
                else if (entity) {
                    entity = type.elementType;
                }
                else {
                }
                return {
                    name: name || 'controller',
                    decorators,
                    entity,
                    parameters: args
                };
            });
        }
        const members = node.members
            .filter(member => {
            return (!(member instanceof ast.MethodDeclaration) ||
                member.getDecorator(`ResolveProperty`)(expression_1.expressionVisitor) !== null);
        })
            .map(member => {
            member.questionToken = true;
            return member;
        });
        if (resolver && typeof resolver === "string") {
            const resolverCls = this.collection.findByName(resolver);
            const members = node.members.filter(member => member instanceof ast.MethodDeclaration);
            if (resolverCls instanceof ast.InterfaceDeclaration) {
                const interfaceMembers = members
                    .map((member) => {
                    const isResolveProperty = member.getDecorator(`ResolveProperty`)(expression_1.expressionVisitor);
                    if (isResolveProperty !== null) {
                        const node = new ast.MethodSignature();
                        node.name = new ast.Identifier();
                        node.name.text = member.name.visit(expression_1.expressionVisitor, ``);
                        node.type = member.type;
                        node.docs = member.docs;
                        node.questionToken = new ast.QuestionToken();
                        return node;
                    }
                })
                    .filter(node => !!node);
                resolverCls.members.push(...interfaceMembers);
                return resolverCls.visit(this, context);
            }
            else if (resolverCls instanceof ast.ClassDeclaration) {
                const interfaceMembers = members
                    .map((member) => {
                    const isResolveProperty = member.getDecorator(`ResolveProperty`)(expression_1.expressionVisitor);
                    if (isResolveProperty !== null)
                        return member;
                })
                    .filter(node => !!node);
                resolverCls.members.push(...interfaceMembers);
                const res = resolverCls.visit(this, context);
                return res;
            }
            return;
        }
        if (scalar !== null) {
            const ast = new magnus_graphql_1.ast.ScalarTypeDefinitionAst();
            ast.name = node.name.visit(this, context);
            ast.directives = [];
            const description = this.createStringValue(node.docs.map(doc => this.visitJSDoc(doc, context)));
            if (description)
                ast.description = description;
            return ast;
        }
        if (directive !== null) {
            // 记录
            return;
        }
        if (context.isInput) {
            const ast = new magnus_graphql_1.ast.InputObjectTypeDefinitionAst();
            const ctx = context || new magnus_1.MagnusContext();
            // ctx.contextParent = context;
            ctx.isUpperFirst = true;
            ctx.isInput = true;
            ast.name = node.name.visit(this, ctx);
            ast.fields = members
                .map(member => member.visit(this, ctx))
                .filter(item => !!item);
            const description = this.createStringValue(node.docs.map(doc => this.visitJSDoc(doc, context)));
            if (description)
                ast.description = description;
            if (ast.fields.length > 0)
                return ast;
        }
        const _ast = new magnus_graphql_1.ast.ObjectTypeDefinitionAst();
        const description = this.createStringValue(node.docs.map(doc => this.visitJSDoc(doc, context)));
        if (description)
            _ast.description = description;
        const ctx = context || new magnus_1.MagnusContext();
        // ctx.contextParent = context;
        ctx.isUpperFirst = true;
        // ctx.isInput = false;
        _ast.name = node.name.visit(this, ctx);
        _ast.fields = members
            .map(member => member.visit(this, ctx))
            .filter(item => !!item);
        if (_ast.fields.length > 0)
            return _ast;
    }
    visitInterfaceDeclaration(node, context) {
        context.isProperty = true;
        context.isUpperFirst = true;
        node.typeParameters.map(type => context.typeParameters.add(type.visit(expression_1.expressionVisitor, ``)));
        context.currentEntity = context.getNotT();
        if (context.isInput) {
            const ast = new magnus_graphql_1.ast.InputObjectTypeDefinitionAst();
            const description = this.createStringValue(node.docs.map(doc => this.visitJSDoc(doc, context)));
            if (description)
                ast.description = description;
            ast.name = node.name.visit(this, context);
            context.isInput = true;
            ast.fields = node.members
                .map(member => member.visit(this, context))
                .filter(res => !!res);
            if (ast.fields.length > 0)
                return ast;
        }
        else {
            const ast = new magnus_graphql_1.ast.ObjectTypeDefinitionAst();
            const description = this.createStringValue(node.docs.map(doc => this.visitJSDoc(doc, context)));
            if (description)
                ast.description = description;
            ast.name = node.name.visit(this, context);
            ast.fields = node.members.map(member => member.visit(this, context));
            if (ast.fields.length > 0)
                return ast;
        }
    }
    createNamedTypeAst(name) {
        const res = new magnus_graphql_1.ast.NamedTypeAst();
        res.name = this.createNameAst(name);
        return res;
    }
    createListTypeAst(type) {
        const res = new magnus_graphql_1.ast.ListTypeAst();
        res.type = type;
        return res;
    }
    createNameAst(name) {
        const res = new magnus_graphql_1.ast.NameAst();
        res.value = name;
        return res;
    }
    createStringValue(content) {
        if (content.length > 0) {
            const res = new magnus_graphql_1.ast.StringValueAst();
            res.value = content.join(" ");
            return res;
        }
        return undefined;
    }
    visitKeywordTypeNode(node, context) {
        switch (node.name) {
            case "bigint":
                return this.createNamedTypeAst("Int");
            case "boolean":
                return this.createNamedTypeAst("Boolean");
            case "number":
                return this.createNamedTypeAst("Int");
            case "string":
                return this.createNamedTypeAst("String");
            case "null":
            case "undefined":
                return this.createNamedTypeAst("Empty");
            case "unknown":
            case "any":
            case "object":
                return this.createNamedTypeAst("Json");
            case "symbol":
            case "never":
            case "this":
            case "void":
            default:
                return this.createNamedTypeAst("Error");
        }
    }
    visitArrayTypeNode(node, context) {
        const res = new magnus_graphql_1.ast.ListTypeAst();
        res.type = node.elementType.visit(this, context);
        return res;
    }
    visitPropertyName(node, context) {
        // todo
        const res = new magnus_graphql_1.ast.NameAst();
        if (node instanceof ast.Identifier) {
            return this.visitIdentifier(node, context);
        }
        else if (node instanceof ast.StringLiteral) {
            res.value = this.visitStringLiteral(node, context);
        }
        else if (node instanceof ast.NumericLiteral) {
            res.value = this.visitNumericLiteral(node, context);
        }
        else if (node instanceof ast.ComputedPropertyName) {
            res.value = this.visitComputedPropertyName(node, context);
        }
        return res;
    }
    visitComputedPropertyName(node, context) {
        return node.expression.visit(this, context);
    }
    visitNumericLiteral(node, context) {
        return node.text;
    }
    visitStringLiteral(node, context) {
        return node.text;
    }
    visitIdentifier(node, context) {
        if (context.needChangeName) {
            if (context.isProperty) {
                // 如果是属性
                const name = context.currentName || `${context.currentEntity}_${node.text}`;
                if (context.isUpperFirst) {
                    return this.createNameAst(name);
                }
                return this.createNameAst(name);
            }
            else {
                const name = context.currentName || `${node.text}_${context.currentEntity}`;
                if (context.isUpperFirst) {
                    return this.createNameAst(name);
                }
                return this.createNameAst(name);
            }
        }
        return this.createNameAst(`${node.text}`);
    }
    visitParameterDeclaration(node, context) {
        context.isProperty = true;
        // 初始化
        const res = new magnus_graphql_1.ast.InputValueDefinitionAst();
        const description = this.createStringValue(node.docs.map(doc => this.visitJSDoc(doc, context)));
        if (description)
            res.description = description;
        // name过后初始化
        const type = this.visitTypeNode(node.type, context);
        const decorator = node.getDecorators()(expression_1.expressionVisitor);
        if (decorator)
            res.decorator = decorator;
        res.index = node.index;
        if (node.questionToken || !!node.initializer) {
            res.type = type;
        }
        else {
            res.type = this.createNonNullTypeAst(type);
        }
        context._needChangeName = false;
        res.name = this.visitBindingName(node.name, context);
        return res;
    }
    visitBindingName(node, context) {
        return node.visit(this, context);
    }
    createNonNullTypeAst(type) {
        if (type instanceof magnus_graphql_1.ast.NonNullTypeAst) {
            return type;
        }
        const node = new magnus_graphql_1.ast.NonNullTypeAst();
        node.type = type;
        return node;
    }
    visitConstructorDeclaration(node, context) { }
    visitTypeAliasDeclaration(node, context) {
        const type = node.type.visit(this, context);
        if (type instanceof magnus_graphql_1.ast.NamedTypeAst) {
            const handler = this.handler[type.name.value];
            if (handler) {
                const res = handler.bind(this.handler)(node, context);
                if (res)
                    return res;
            }
        }
        else if (type instanceof magnus_graphql_1.ast.UnionTypeDefinitionAst) {
            context._needChangeName = false;
            type.name = node.name.visit(this, context);
            return type;
        }
        else if (type instanceof magnus_graphql_1.ast.EnumTypeDefinitionAst) {
            context._needChangeName = false;
            type.name = node.name.visit(this, context);
            return type;
        }
        else {
            debugger;
        }
        const scalar = new magnus_graphql_1.ast.ScalarTypeDefinitionAst();
        const ctx = new magnus_1.MagnusContext();
        // ctx.contextParent = context;
        const name = node.name.visit(this, ctx);
        scalar.name = name;
        return scalar;
    }
    visitTypeLiteralNode(node, context) {
        const enumType = new magnus_graphql_1.ast.EnumTypeDefinitionAst();
        enumType.values = node.members.map(member => member.visit(this, context));
        return enumType;
    }
    visitTypeElement(node, context) {
        return node.visit(this, context);
    }
    visitUnionTypeNode(node, context) {
        const types = node.types
            .filter(t => {
            if (t instanceof ast.KeywordTypeNode) {
                if (t.name === "undefined" || t.name === "null") {
                    context.isNonNull = true;
                    return false;
                }
            }
            return true;
        })
            .map(t => t.visit(this, context));
        if (types.length === 1) {
            return types[0];
        }
        const union = new magnus_graphql_1.ast.UnionTypeDefinitionAst();
        union.types = node.types.map(t => t.visit(this, context));
        return union;
    }
    visitLiteralTypeNode(node, context) {
        return node.literal.visit(this, context);
    }
    visitModifier(node, context) { }
    visitEnumDeclaration(node, context) {
        const enumNode = new magnus_graphql_1.ast.EnumTypeDefinitionAst();
        const description = this.createStringValue(node.docs.map(doc => this.visitJSDoc(doc, context)));
        if (description)
            enumNode.description = description;
        context.isUpperFirst = true;
        context.isInput = false;
        context._needChangeName = false;
        enumNode.name = node.name.visit(this, context);
        enumNode.values = node.members.map(member => {
            return member.visit(this, context);
        });
        return enumNode;
    }
    visitEnumMember(node, context) {
        const enumMember = new magnus_graphql_1.ast.EnumValueDefinitionAst();
        const description = this.createStringValue(node.docs.map(doc => this.visitJSDoc(doc, context)));
        if (description)
            enumMember.description = description;
        context._needChangeName = false;
        enumMember.name = node.name.visit(this, context);
        return enumMember;
    }
}
exports.TsToGraphqlVisitor = TsToGraphqlVisitor;
//# sourceMappingURL=tsToGraphql.js.map