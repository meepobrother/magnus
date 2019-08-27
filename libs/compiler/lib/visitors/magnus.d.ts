import * as ast from "./visitor";
import { CollectionContext } from "./collection";
export interface MagnusOptions {
    entities: string[];
}
export interface ClassDef {
    name: string;
    relations: string[];
}
export declare const entitySet: Set<string>;
export declare class MagnusTopContext {
    querys: Map<string, MagnusContext>;
    mutations: Map<string, MagnusContext>;
    subscriptions: Map<string, MagnusContext>;
    entityMap: Map<string, MagnusContext>;
    protos: Map<string, MagnusContext>;
    typeParameters: Set<string>;
    entities: string[];
    node: ast.Node;
    name: string;
    addChild(name: string, type: "query" | "mutation" | "subscription" | "proto" | "entity"): MagnusContext;
    hasTypeParameter(name: string): boolean;
}
export declare class MagnusContext {
    typeParameters: Set<string>;
    parent: MagnusTopContext;
    contextParent: MagnusContext;
    entities: string[];
    type: "query" | "mutation" | "subscription" | "proto" | "entity";
    node: ast.Node;
    name: string;
    isSelf: boolean;
    isProperty: boolean;
    isInput: boolean;
    isNonNull: boolean;
    params: any;
    class: ClassDef;
    _currentEntity: string;
    oldName: string;
    _needChangeName: boolean;
    currentName: string;
    isUpperFirst: boolean;
    currentEntity: string;
    getNotT(): any;
    readonly topName: string;
    readonly parentName: string;
    hasParentName(name: string): boolean;
    readonly needChangeName: boolean;
    readonly isQuery: boolean;
    readonly isMutation: boolean;
    readonly isSubscription: boolean;
    readonly isProto: boolean;
    readonly isEntity: boolean;
    readonly allEntities: string[];
    getEntities(): string[];
    getTop(): MagnusTopContext;
    hasTypeParameter(name: string): boolean;
}
export declare class MangusContextManager {
    contexts: MagnusTopContext[];
    entities: Set<string>;
    name: string;
    isServer: boolean;
    addContext(ctx: MagnusTopContext): void;
}
export declare class MagnusVisitor implements ast.Visitor {
    manager: MangusContextManager;
    name: string;
    collection: CollectionContext;
    constructor(manager: MangusContextManager);
    visitSemicolonClassElement(node: ast.SemicolonClassElement, context: any): void;
    visitClassDeclaration(node: ast.ClassDeclaration, context: CollectionContext): MagnusTopContext | undefined;
    isNull(val: any): val is null;
    setMagnus(node: ast.GetAccessorDeclaration | ast.SetAccessorDeclaration | ast.MethodDeclaration | ast.PropertyDeclaration, context: MagnusTopContext): void;
    registe(node: ast.GetAccessorDeclaration | ast.SetAccessorDeclaration | ast.MethodDeclaration | ast.PropertyDeclaration, context: MagnusTopContext, query: MagnusOptions | undefined, type: "query" | "mutation" | "subscription" | "proto" | "entity"): void;
    visitGetAccessorDeclaration(node: ast.GetAccessorDeclaration, context: MagnusTopContext): void;
    visitSetAccessorDeclaration(node: ast.SetAccessorDeclaration, context: MagnusTopContext): void;
    visitTypeParameterDeclaration(node: ast.TypeParameterDeclaration, context: MagnusContext): void;
    visitPropertyDeclaration(node: ast.PropertyDeclaration, context: MagnusTopContext): void;
    visitMethodDeclaration(node: ast.MethodDeclaration, context: MagnusTopContext): void;
    visitConstructorDeclaration(node: ast.ConstructorDeclaration, context: MagnusContext): void;
}
