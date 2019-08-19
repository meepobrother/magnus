"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ast = tslib_1.__importStar(require("./visitor"));
const expression_1 = require("./expression");
exports.entitySet = new Set();
class MagnusTopContext {
    constructor() {
        this.querys = new Map();
        this.mutations = new Map();
        this.subscriptions = new Map();
        this.entityMap = new Map();
        // proto
        this.protos = new Map();
        this.typeParameters = new Set();
        this.entities = [];
    }
    addChild(name, type) {
        const magnus = new MagnusContext();
        magnus.parent = this;
        switch (type) {
            case "query":
                this.querys.set(name, magnus);
                break;
            case "mutation":
                this.mutations.set(name, magnus);
                break;
            case "proto":
                this.protos.set(name, magnus);
                break;
            case "subscription":
                this.subscriptions.set(name, magnus);
                break;
            case "entity":
                this.entityMap.set(name, magnus);
                break;
            default:
                break;
        }
        return magnus;
    }
    hasTypeParameter(name) {
        if (!name) {
            return false;
        }
        if (this.typeParameters.has(name)) {
            return true;
        }
        return false;
    }
}
exports.MagnusTopContext = MagnusTopContext;
class MagnusContext {
    constructor() {
        this.typeParameters = new Set();
        this.entities = [];
        this.type = "query";
        // 当前操作的entity
        this.currentEntity = ``;
        this.isSelf = false;
        // 是否属性
        this.isProperty = false;
        // 是否input
        this.isInput = false;
        this.isNonNull = false;
        this.class = {
            name: ``,
            relations: []
        };
    }
    get topName() {
        return this.parent && this.parent.name;
    }
    get parentName() {
        return this.topName;
    }
    // 是否包含上级
    hasParentName(name) {
        if (this.parentName === name) {
            return true;
        }
        if (this.contextParent) {
            if (this.contextParent.currentName === name)
                return true;
            return this.contextParent.hasParentName(name);
        }
        return false;
    }
    get needChangeName() {
        if (typeof this._needChangeName === "boolean")
            return this._needChangeName;
        if (!this.currentName)
            return false;
        return this.currentName !== this.name;
    }
    get isQuery() {
        return this.type === "query";
    }
    get isMutation() {
        return this.type === "mutation";
    }
    get isSubscription() {
        return this.type === "subscription";
    }
    get isProto() {
        return this.type === "proto";
    }
    get isEntity() {
        return this.type === "entity";
    }
    get allEntities() {
        const entites = [];
        exports.entitySet.forEach(entity => entites.push(entity));
        return entites;
    }
    getEntities() {
        if (this.entities.length > 0) {
            return this.entities;
        }
        else {
            return this.getTop().entities;
        }
    }
    getTop() {
        return this.parent;
    }
    hasTypeParameter(name) {
        if (!name) {
            return false;
        }
        if (this.typeParameters.has(name)) {
            return true;
        }
        if (this.parent) {
            if (this.parent.hasTypeParameter(name)) {
                return true;
            }
        }
        return false;
    }
}
exports.MagnusContext = MagnusContext;
class MangusContextManager {
    constructor() {
        this.contexts = [];
        this.entities = new Set();
    }
    addContext(ctx) {
        this.contexts.push(ctx);
        ctx.entities.map(entity => this.entities.add(entity));
    }
}
exports.MangusContextManager = MangusContextManager;
class MagnusVisitor {
    constructor(manager) {
        this.manager = manager;
        this.name = `MagnusVisitor`;
    }
    visitClassDeclaration(node, context) {
        this.collection = context;
        const resolver = node.getDecorator("Resolver")(expression_1.expressionVisitor);
        const controller = node.getDecorator("Controller")(expression_1.expressionVisitor);
        const magnus = node.getDecorator("Magnus")(expression_1.expressionVisitor);
        const entity = node.getDecorator("Entity")(expression_1.expressionVisitor);
        if (this.collection.isServer) {
            if (resolver !== null) {
                const ctx = new MagnusTopContext();
                ctx.entities = [];
                ctx.entities.map(entity => exports.entitySet.add(entity));
                ctx.node = node;
                ctx.name = node.name.visit(expression_1.expressionVisitor, ``);
                node.typeParameters.map(type => type.visit(this, ctx));
                node.members.map(member => member.visit(this, ctx));
                this.manager.addContext(ctx);
                return ctx;
            }
            if (magnus !== null) {
                if (magnus) {
                    const ctx = new MagnusTopContext();
                    ctx.entities = magnus.entities || [];
                    ctx.entities.map(entity => exports.entitySet.add(entity));
                    ctx.node = node;
                    ctx.name = node.name.visit(expression_1.expressionVisitor, ``);
                    node.typeParameters.map(type => type.visit(this, ctx));
                    node.members.map(member => member.visit(this, ctx));
                    this.manager.addContext(ctx);
                    return ctx;
                }
                else {
                    const ctx = new MagnusTopContext();
                    ctx.entities = [];
                    ctx.entities.map(entity => exports.entitySet.add(entity));
                    ctx.node = node;
                    ctx.name = node.name.visit(expression_1.expressionVisitor, ``);
                    node.typeParameters.map(type => type.visit(this, ctx));
                    node.members.map(member => member.visit(this, ctx));
                    this.manager.addContext(ctx);
                    return ctx;
                }
            }
            if (entity !== null) {
                const ctx = new MagnusTopContext();
                ctx.entities = [];
                ctx.node = node;
                ctx.name = node.name.visit(expression_1.expressionVisitor, ``);
                node.typeParameters.map(type => type.visit(this, ctx));
                node.members.map(member => member.visit(this, ctx));
                this.manager.addContext(ctx);
                return ctx;
            }
        }
        else {
            if (resolver !== null || controller !== null) {
                const ctx = new MagnusTopContext();
                ctx.entities = [];
                ctx.entities.map(entity => exports.entitySet.add(entity));
                ctx.node = node;
                ctx.name = node.name.visit(expression_1.expressionVisitor, ``);
                node.typeParameters.map(type => type.visit(this, ctx));
                node.members.map(member => member.visit(this, ctx));
                this.manager.addContext(ctx);
                return ctx;
            }
        }
    }
    isNull(val) {
        return val === null;
    }
    setMagnus(node, context) {
        const query = node.getDecorator("Query")(expression_1.expressionVisitor);
        const field = node.getDecorator("Field")(expression_1.expressionVisitor);
        const ResolveProperty = node.getDecorator("ResolveProperty")(expression_1.expressionVisitor);
        const subscription = node.getDecorator("Supscription")(expression_1.expressionVisitor);
        const mutation = node.getDecorator("Mutation")(expression_1.expressionVisitor);
        const proto = node.getDecorator("Proto")(expression_1.expressionVisitor);
        const grpcMethod = node.getDecorator("GrpcMethod")(expression_1.expressionVisitor);
        if (node instanceof ast.MethodDeclaration) {
            /**
             * 可以多个
             */
            if (!this.isNull(field)) {
                this.registe(node, context, field, "entity");
            }
            if (!this.isNull(ResolveProperty)) {
                this.registe(node, context, ResolveProperty, "entity");
            }
            if (!this.isNull(query)) {
                this.registe(node, context, query, "query");
            }
            if (!this.isNull(mutation)) {
                this.registe(node, context, mutation, "mutation");
            }
            if (!this.isNull(subscription)) {
                this.registe(node, context, subscription, "subscription");
            }
            if (!this.isNull(proto)) {
                this.registe(node, context, proto, "proto");
            }
            if (!this.isNull(grpcMethod)) {
                this.registe(node, context, grpcMethod, "proto");
            }
        }
    }
    registe(node, context, query, type) {
        const ctx = context.addChild(node.name.visit(expression_1.expressionVisitor, ``), type);
        ctx.name = node.name.visit(expression_1.expressionVisitor, ``);
        ctx.params = query;
        if (query) {
            ctx.entities = query.entities || [];
        }
        ctx.entities.map(entity => exports.entitySet.add(entity));
        ctx.type = type;
        ctx.node = node;
    }
    visitGetAccessorDeclaration(node, context) {
        this.setMagnus(node, context);
    }
    visitSetAccessorDeclaration(node, context) {
        this.setMagnus(node, context);
    }
    visitTypeParameterDeclaration(node, context) {
        const name = node.name.visit(expression_1.expressionVisitor, ``);
        context.typeParameters.add(name);
    }
    visitPropertyDeclaration(node, context) {
        this.setMagnus(node, context);
    }
    visitMethodDeclaration(node, context) {
        this.setMagnus(node, context);
    }
    // 搜集依赖信息
    visitConstructorDeclaration(node, context) { }
}
exports.MagnusVisitor = MagnusVisitor;
//# sourceMappingURL=magnus.js.map