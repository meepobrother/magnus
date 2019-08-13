import { ast, InputObjectTypeDefinitionAst, ListTypeAst, EnumTypeDefinitionAst, EnumValueDefinitionAst, OperationDefinitionAst, ClientVisitor, DocumentAst, SelectionSetAst, SelectionAst, ObjectTypeDefinitionAst } from "@notadd/magnus-graphql";
import { MagnusConfig } from "@notadd/magnus-core";
export declare class ClientTs extends ClientVisitor {
    visitVariableAst(node: ast.VariableAst, context: any): any;
    visitNonNullTypeAst(node: ast.NonNullTypeAst, context: any): any;
    visitNamedTypeAst(node: ast.NamedTypeAst, context: any): string;
}
export declare class GraphqlToTs implements ast.Visitor {
    name: string;
    isParameter: boolean;
    isProto: boolean;
    isGraphql: boolean;
    config: MagnusConfig;
    schema: DocumentAst;
    visitDocumentAst(node: ast.DocumentAst, context: string): string;
    visitTypeDefinitionAst(node: ast.TypeDefinitionAst, context: string): string;
    visitFieldDefinitionAst(node: ast.FieldDefinitionAst, context: boolean): string;
    visitInputValueDefinitionAst(node: ast.InputValueDefinitionAst, context: boolean): string;
    visitNameAst(node: ast.NameAst, context: string): string;
    visitNamedTypeAst(node: ast.NamedTypeAst, context: string): string;
    visitScalarTypeDefinitionAst(node: ast.ScalarTypeDefinitionAst, context: string): string;
    visitObjectTypeDefinitionAst(node: ast.ObjectTypeDefinitionAst, context: string): string;
    visitNonNullTypeAst(node: ast.NonNullTypeAst, context: string): string;
    visitUnionTypeDefinitionAst(node: ast.UnionTypeDefinitionAst, context: string): string;
    visitInputObjectTypeDefinitionAst(node: InputObjectTypeDefinitionAst, context: string): string;
    visitListTypeAst(node: ListTypeAst, context: string): string;
    visitEnumTypeDefinitionAst(node: EnumTypeDefinitionAst, context: string): string;
    visitEnumValueDefinitionAst(node: EnumValueDefinitionAst, context: string): string;
    types: Set<string>;
    visitSelectionSetAst(node: SelectionSetAst, context: {
        operation: string;
        schema: ObjectTypeDefinitionAst;
    }): string;
    visitSelectionAst(node: SelectionAst, context: {
        operation: string;
        schema: ObjectTypeDefinitionAst;
    }): void;
    createType(type: string, fileAlias: string, selectionSet: any, isArray: boolean, context: any): string | undefined;
    getType(node: ast.TypeAst): string;
    visitFieldAst(node: ast.FieldAst, context: {
        operation: string;
        schema: ObjectTypeDefinitionAst;
    }): any;
    getSchema(operation: string): ast.SchemaExtensionAst<any, any> | ast.UnionTypeExtensionAst<any, any> | ast.ScalarTypeExtensionAst<any, any> | ast.ObjectTypeExtensionAst<any, any> | ast.InterfaceTypeExtensionAst<any, any> | ast.EnumTypeExtensionAst<any, any> | ast.InputObjectTypeExtensionAst<any, any> | ast.OperationDefinitionAst<any, any> | ast.FragmentDefinitionAst<any, any> | ast.SchemaDefinitionAst<any, any> | ast.DirectiveDefinitionAst<any, any> | ast.ScalarTypeDefinitionAst<any, any> | ast.ObjectTypeDefinitionAst<any, any> | ast.InterfaceTypeDefinitionAst<any, any> | ast.UnionTypeDefinitionAst<any, any> | ast.EnumTypeDefinitionAst<any, any> | ast.InputObjectTypeDefinitionAst<any, any> | undefined;
    private __getType;
    visitOperationDefinitionAst(node: OperationDefinitionAst, context: string): string;
}
