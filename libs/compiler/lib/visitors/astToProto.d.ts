import { ast as graphql } from '@notadd/magnus-graphql';
import { ast } from '@notadd/magnus-grpc';
import { CollectionContext } from './collection';
import { MagnusConfig } from '@notadd/magnus-core';
export declare class AstToProtoVisitor implements graphql.Visitor {
    name: string;
    root: ast.Root;
    collection: CollectionContext;
    package: ast.Package;
    documentAst: graphql.DocumentAst;
    config: MagnusConfig;
    visitDocumentAst(node: graphql.DocumentAst, context: CollectionContext): ast.Root;
    createEmpty(): ast.Message;
    visitObjectTypeDefinitionAst(node: graphql.ObjectTypeDefinitionAst, context: ast.Package): void;
    set: Set<string>;
    checkType(name: string, context: ast.Service | ast.Message): void;
    visitInputObjectTypeDefinitionAst(node: graphql.InputObjectTypeDefinitionAst, context: ast.Package): void;
    visitInputValueDefinitionAst(node: graphql.InputValueDefinitionAst, context: ast.Message): void;
    visitFieldDefinitionAst(node: graphql.FieldDefinitionAst, context: ast.Service | ast.Message): void;
    isGrpc: boolean;
    createType(node: graphql.TypeAst, context: ast.Method | ast.Field): string;
    createArguments(node: graphql.InputValueDefinitionAst, context: ast.Method | ast.Field): string;
    visitNameAst(node: graphql.NameAst, context: any): string;
    visitNamedTypeAst(node: graphql.NamedTypeAst, context: any): any;
    visitScalarTypeDefinitionAst(node: graphql.ScalarTypeDefinitionAst, context: any): void;
    visitEnumTypeDefinitionAst(node: graphql.EnumTypeDefinitionAst, context: any): void;
}
