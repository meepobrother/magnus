import { CollectionContext } from '../../visitors/collection';
import { MagnusContext } from '../../visitors/magnus';
import { ast as graphql } from '@notadd/magnus-graphql';
import * as ast from '../../visitors/visitor';
export declare class Creater {
    collection: CollectionContext;
    context: MagnusContext;
    documentAst: graphql.DocumentAst;
    createScalar(node: ast.TypeReferenceNode, context: MagnusContext): {
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
    createEntity(node: ast.TypeReferenceNode, context: MagnusContext): {
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
    createDirective(node: ast.TypeReferenceNode, context: MagnusContext): {
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
    createMagnus(node: ast.TypeReferenceNode, context: MagnusContext): {
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
}
