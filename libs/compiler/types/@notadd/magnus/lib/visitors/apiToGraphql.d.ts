import { ast as graphql, VariableAst } from "@notadd/magnus-graphql";
import { ast } from "@notadd/magnus-grpc";
import { MagnusConfig } from "@notadd/magnus-core";
import { CollectionContext } from "./collection";
export declare class ApiToProto implements graphql.Visitor {
    name: string;
    root: ast.Root;
    config: MagnusConfig;
    documentAst: graphql.DocumentAst;
    schema: graphql.DocumentAst;
    visitDocumentAst(node: graphql.DocumentAst, context: CollectionContext): ast.Root;
    query: ast.Service;
    mutation: ast.Service;
    subscription: ast.Service;
    messages: ast.Message[];
    constructor();
    visitOperationDefinitionAst(node: graphql.OperationDefinitionAst, context: ast.Package): void;
    _messages: Set<string>;
    visitScalarTypeDefinitionAst(node: graphql.ScalarTypeDefinitionAst, context: any): void;
    visitObjectTypeDefinitionAst(node: graphql.ObjectTypeDefinitionAst, context: ast.Message): void;
    visitFieldDefinitionAst(node: graphql.FieldDefinitionAst, context: ast.Message): void;
    visitSelectionSetAst(node: graphql.SelectionSetAst, contedxt: ast.Package): void;
    visitFieldAst(node: graphql.FieldAst, context: ast.Package): void;
    visitVariableDefinitionAst(node: graphql.VariableDefinitionAst, context: ast.Message): any;
    visitVariableAst(node: VariableAst, context: ast.Package): any;
    visitInputObjectTypeDefinitionAst(node: graphql.InputObjectTypeDefinitionAst, context: any): void;
    addMessage(msg: ast.Message): void;
    visitInputValueDefinitionAst(node: graphql.InputValueDefinitionAst, context: ast.Message): void;
    visitListTypeAst(node: graphql.ListTypeAst, context: ast.Field): any;
    visitNonNullTypeAst(node: graphql.NonNullTypeAst, context: ast.Field): any;
    visitNameAst(node: graphql.NameAst, context: any): string;
    visitNamedTypeAst(node: graphql.NamedTypeAst, context: ast.Field): any;
}
