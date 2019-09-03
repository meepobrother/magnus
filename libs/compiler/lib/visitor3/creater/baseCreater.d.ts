import * as ast from '../../visitors/visitor';
import { MagnusContext } from '../../visitors/magnus';
import { CollectionContext } from '../../visitors/collection';
export declare abstract class BaseCreater {
    name: string;
    collection: CollectionContext;
    context: MagnusContext;
    hasUsed: Set<string>;
    constructor(name: string);
    createName(node: ast.TypeReferenceNode, context: MagnusContext): {
        name: never;
        namedType: import("../../../../graphql/lib").NameAst<any, any>;
        entity?: undefined;
    } | {
        name: string;
        namedType: import("../../../../graphql/lib").NamedTypeAst<any, any>;
        entity?: undefined;
    } | {
        name: string;
        namedType: import("../../../../graphql/lib").NamedTypeAst<any, any>;
        entity: any;
    } | undefined;
    createEntity(name: string, node: ast.ClassDeclaration | ast.InterfaceDeclaration): any;
    abstract createClassDeclaration(name: string, node: ast.ClassDeclaration): any;
    createInterfaceDeclaration(name: string, node: ast.InterfaceDeclaration): void;
}
