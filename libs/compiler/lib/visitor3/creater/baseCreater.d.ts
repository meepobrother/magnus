import * as ast from '../../visitors/visitor';
import { MagnusContext } from '../../visitors/magnus';
import { CollectionContext } from '../../visitors/collection';
import { ast as graphql } from '@notadd/magnus-graphql';
export declare abstract class BaseCreater {
    name: string;
    collection: CollectionContext;
    documentAst: graphql.DocumentAst;
    hasUsed: Set<string>;
    constructor(name: string);
    createName(node: ast.TypeReferenceNode, context: MagnusContext): {
        name: never;
        namedType: graphql.NameAst<any, any>;
        entity?: undefined;
    } | {
        name: string;
        namedType: graphql.NamedTypeAst<any, any>;
        entity?: undefined;
    } | {
        name: string;
        namedType: graphql.NamedTypeAst<any, any>;
        entity: any;
    } | undefined;
    createEntity(name: string, node: ast.ClassDeclaration | ast.InterfaceDeclaration, context: MagnusContext): any;
    abstract createClassDeclaration(name: string, node: ast.ClassDeclaration, context: MagnusContext): any;
    createInterfaceDeclaration(name: string, node: ast.InterfaceDeclaration): void;
}
