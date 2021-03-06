import * as ast from "./visitor";
import { expressionVisitor } from "./expression";
import { CollectionContext } from "./collection";
export interface MagnusOptions {
    entities: string[];
}
export interface ClassDef {
    name: string;
    relations: string[];
}
export class MagnusTopContext {
    querys: Map<string, MagnusContext> = new Map();
    mutations: Map<string, MagnusContext> = new Map();
    subscriptions: Map<string, MagnusContext> = new Map();
    entityMap: Map<string, MagnusContext> = new Map();
    // proto
    protos: Map<string, MagnusContext> = new Map();

    typeParameters: Set<string> = new Set();
    entities: string[] = [];
    node: ast.Node;
    name: string;
    addChild(
        name: string,
        type: "query" | "mutation" | "subscription" | "proto" | "entity"
    ) {
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
    hasTypeParameter(name: string) {
        if (!name) {
            return false;
        }
        if (this.typeParameters.has(name)) {
            return true;
        }
        return false;
    }
}
export class MagnusContext {
    typeParameters: Set<string> = new Set();
    parent: MagnusTopContext;
    contextParent: MagnusContext;
    entities: string[] = [];
    type: "query" | "mutation" | "subscription" | "proto" | "entity" = "query";
    node: ast.Node;
    name: string;
    isSelf: boolean = false;
    // 是否属性
    isProperty: boolean = false;
    // 是否input
    isInput: boolean = false;
    isNonNull: boolean = false;
    // 参数
    params: any;

    decorator?: string;

    class: ClassDef = {
        name: ``,
        relations: []
    };
    // 当前操作的entity
    _currentEntity: string = ``;
    //防止无限循环
    oldName: string;
    // 是否需要更名
    _needChangeName: boolean;

    // 新的名字
    currentName: string;

    // 首字母大写
    isUpperFirst: boolean;
    get currentEntity() {
        return this._currentEntity;
    }
    set currentEntity(entity: string) {
        if (["T", "Message", "Messages", "ListMessages"].includes(entity)) {
            return;
        }
        this._currentEntity = entity;
    }
    getNotT(name: string): any {
        if (this.currentEntity === "T") {
            return this.contextParent.getNotT(name);
        }
        return this.currentEntity === "T" ? name : this.currentEntity;
    }
    get topName(): string {
        return this.parent && this.parent.name;
    }
    get parentName() {
        return this.topName;
    }
    // 是否包含上级
    hasParentName(name: string): boolean {
        if (this.parentName === name) {
            return true;
        }
        if (this.contextParent) {
            if (this.contextParent.currentName === name) return true;
            return this.contextParent.hasParentName(name);
        }
        return false;
    }
    get needChangeName(): boolean {
        if (typeof this._needChangeName === "boolean") return this._needChangeName;
        if (!this.currentName) return false;
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
    get allEntities(): string[] {
        return this.getTop().entities;
    }
    getEntities() {
        if (this.entities.length > 0) {
            return this.entities;
        } else {
            return this.getTop().entities;
        }
    }
    getTop(): MagnusTopContext {
        return this.parent;
    }
    hasTypeParameter(name: string) {
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
export class MangusContextManager {
    contexts: MagnusTopContext[] = [];
    entities: Set<string> = new Set();
    name: string;
    isServer: boolean;
    addContext(ctx: MagnusTopContext) {
        this.contexts.push(ctx);
        ctx.entities.map(entity => this.entities.add(entity));
    }
}
export class MagnusVisitor implements ast.Visitor {
    name: string = `MagnusVisitor`;
    collection: CollectionContext;
    constructor(public manager: MangusContextManager) { }
    visitSemicolonClassElement(node: ast.SemicolonClassElement, context: any) { }
    visitClassDeclaration(
        node: ast.ClassDeclaration,
        context: CollectionContext
    ) {
        context.addClassDeclaration(node)
        this.collection = context;
        const resolver = node.getDecorator<string>("Resolver")(expressionVisitor);
        const controller = node.getDecorator<string>("Controller")(
            expressionVisitor
        );
        const injectable = node.getDecorator<string>("Injectable")(
            expressionVisitor
        );
        const magnus = node.getDecorator<MagnusOptions>("Magnus")(
            expressionVisitor
        );
        const entity = node.getDecorator<MagnusOptions>("Entity")(
            expressionVisitor
        );
        if (resolver !== null || injectable !== null || controller !== null || entity !== null) {
            const ctx = new MagnusTopContext();
            ctx.entities = [];
            ctx.node = node;
            ctx.name = node.name.visit(expressionVisitor, ``);
            node.typeParameters.map(type => type.visit(this, ctx));
            node.members.map(member => member.visit(this, ctx));
            this.manager.addContext(ctx);
            return ctx;
        }
        else if (magnus !== null) {
            if (magnus && Array.isArray(magnus.entities)) {
                if (magnus.entities.length > 0) {
                    const ctx = new MagnusTopContext();
                    ctx.entities = magnus.entities || [];
                    ctx.node = node;
                    ctx.name = node.name.visit(expressionVisitor, ``);
                    node.typeParameters.map(type => type.visit(this, ctx));
                    node.members.map(member => member.visit(this, ctx));
                    this.manager.addContext(ctx);
                    return ctx;
                }
            } else {
                const ctx = new MagnusTopContext();
                ctx.entities = [];
                ctx.node = node;
                ctx.name = node.name.visit(expressionVisitor, ``);
                node.typeParameters.map(type => type.visit(this, ctx));
                node.members.map(member => member.visit(this, ctx));
                this.manager.addContext(ctx);
                return ctx;
            }
        }
    }
    isNull(val: any): val is null {
        return val === null;
    }
    setMagnus(
        node:
            | ast.GetAccessorDeclaration
            | ast.SetAccessorDeclaration
            | ast.MethodDeclaration
            | ast.PropertyDeclaration,
        context: MagnusTopContext
    ) {
        const query = node.getDecorator<MagnusOptions>("Query")(expressionVisitor);
        const field = node.getDecorator<MagnusOptions>("Field")(expressionVisitor);
        const ResolveProperty = node.getDecorator<MagnusOptions>("ResolveProperty")(
            expressionVisitor
        );
        const subscription = node.getDecorator<MagnusOptions>("Subscription")(
            expressionVisitor
        );
        const mutation = node.getDecorator<MagnusOptions>("Mutation")(
            expressionVisitor
        );
        const proto = node.getDecorator<MagnusOptions>("Proto")(expressionVisitor);
        const grpcMethod = node.getDecorator<MagnusOptions>("GrpcMethod")(
            expressionVisitor
        );
        const grpcStreamMethod = node.getDecorator<MagnusOptions>('GrpcStreamMethod')(
            expressionVisitor
        );
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
                this.registe(node, context, grpcMethod, "proto", 'GrpcMethod');
            }
            if (!this.isNull(grpcStreamMethod)) {
                this.registe(node, context, grpcStreamMethod, "proto", 'GrpcStreamMethod');
            }
        }
    }
    registe(
        node:
            | ast.GetAccessorDeclaration
            | ast.SetAccessorDeclaration
            | ast.MethodDeclaration
            | ast.PropertyDeclaration,
        context: MagnusTopContext,
        query: MagnusOptions | undefined,
        type: "query" | "mutation" | "subscription" | "proto" | "entity",
        decorator?: string
    ) {
        const name = node.name.visit(expressionVisitor, ``)
        const ctx = context.addChild(name, type);
        ctx.name = name;
        ctx.params = query;
        ctx.decorator = decorator;
        if (query) {
            ctx.entities = query.entities || [];
        }
        ctx.type = type;
        ctx.node = node;
        return ctx;
    }
    visitGetAccessorDeclaration(
        node: ast.GetAccessorDeclaration,
        context: MagnusTopContext
    ) {
        this.setMagnus(node, context);
    }
    visitSetAccessorDeclaration(
        node: ast.SetAccessorDeclaration,
        context: MagnusTopContext
    ) {
        this.setMagnus(node, context);
    }
    visitTypeParameterDeclaration(
        node: ast.TypeParameterDeclaration,
        context: MagnusContext
    ) {
        const name = node.name.visit(expressionVisitor, ``);
        context.typeParameters.add(name);
    }
    visitPropertyDeclaration(
        node: ast.PropertyDeclaration,
        context: MagnusTopContext
    ) {
        this.setMagnus(node, context);
    }
    visitMethodDeclaration(
        node: ast.MethodDeclaration,
        context: MagnusTopContext
    ) {
        this.setMagnus(node, context);
    }
    // 搜集依赖信息
    visitConstructorDeclaration(
        node: ast.ConstructorDeclaration,
        context: MagnusContext
    ) { }
}
