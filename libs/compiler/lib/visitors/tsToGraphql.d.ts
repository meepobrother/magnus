import * as ast from "./visitor";
import { MagnusContext } from "./magnus";
import { ast as graphql, ToString } from "@notadd/magnus-graphql";
import { PermissionOptions, HandlerDef } from "@notadd/magnus-core";
import { CollectionContext } from "./collection";
export declare const toString: ToString;
export declare const WhereMap: {
    [key: string]: string;
};
export declare class Handler {
    visitor: TsToGraphqlVisitor;
    private __partial;
    private __order;
    private __where;
    constructor(visitor: TsToGraphqlVisitor);
    Promise(node: ast.TypeReferenceNode | ast.TypeAliasDeclaration, context: any): graphql.NonNullTypeAst<any, any> | graphql.NamedTypeAst<any, any> | graphql.ListTypeAst<any, any> | undefined;
    Observable(node: ast.TypeReferenceNode | ast.TypeAliasDeclaration, context: any): graphql.NonNullTypeAst<any, any> | graphql.NamedTypeAst<any, any> | graphql.ListTypeAst<any, any> | undefined;
    Order(node: ast.TypeReferenceNode | ast.TypeAliasDeclaration, context: any): graphql.NamedTypeAst<any, any> | undefined;
    DeepPartial(node: ast.TypeReferenceNode | ast.TypeAliasDeclaration, context: any): graphql.NamedTypeAst<any, any> | undefined;
    Partial(node: ast.TypeReferenceNode | ast.TypeAliasDeclaration, context: any): graphql.NamedTypeAst<any, any> | undefined;
    Where(node: ast.TypeReferenceNode | ast.TypeAliasDeclaration, context: any): graphql.NamedTypeAst<any, any> | undefined;
}
export declare class TsToGraphqlVisitor implements ast.Visitor {
    name: string;
    documentAst: graphql.DocumentAst;
    collection: CollectionContext;
    /**
     * 定义文件
     */
    def: {
        [key: string]: HandlerDef[];
    };
    query: ast.InterfaceDeclaration;
    mutation: ast.InterfaceDeclaration;
    subscription: ast.InterfaceDeclaration;
    protos: ast.InterfaceDeclaration[];
    sourceFile: ast.SourceFile;
    /**
     * 权限搜集
     */
    permission: PermissionOptions[];
    isEntity: boolean;
    entities: {
        [key: string]: {
            name: string;
            decorators: string[];
            entity: string;
        }[];
    };
    handler: Handler;
    constructor();
    createIdentifier(text: string): ast.Identifier;
    isUndefined(val: any): boolean;
    visitClassDeclaration(node: ast.ClassDeclaration, context: MagnusContext): graphql.InterfaceTypeDefinitionAst | graphql.InputObjectTypeDefinitionAst | graphql.ScalarTypeDefinitionAst | undefined;
    visitMethodSignature(node: ast.MethodSignature, context: MagnusContext): graphql.FieldDefinitionAst | undefined;
    visitPropertySignature(node: ast.PropertySignature, context: MagnusContext): graphql.FieldDefinitionAst<any, any> | graphql.InputValueDefinitionAst<any, any>;
    visitPropertyDeclaration(node: ast.PropertyDeclaration, context: MagnusContext): graphql.FieldDefinitionAst<any, any>;
    /**
     * 是否非必填项目
     */
    isNotRequired(node: ast.PropertyDeclaration): boolean;
    createMethodSignature(node: ast.MethodDeclaration): ast.MethodSignature;
    createPropertySignature(node: ast.PropertyDeclaration): ast.PropertySignature;
    createMetadate(res: any, context: any, node: any): HandlerDef;
    visitMethodDeclaration(node: ast.MethodDeclaration, context: MagnusContext): graphql.FieldDefinitionAst | undefined;
    visitJSDoc(node: ast.JSDoc, context: MagnusContext): string;
    visitTypeNode(node: ast.TypeNode, context: MagnusContext): graphql.TypeAst;
    set: Set<string>;
    addType(name: string, context: MagnusContext): any;
    visitTypeReferenceNode(node: ast.TypeReferenceNode, context: MagnusContext): graphql.TypeAst;
    visitInterfaceDeclaration(node: ast.InterfaceDeclaration, context: MagnusContext): graphql.ObjectTypeDefinitionAst<any, any> | graphql.InputObjectTypeDefinitionAst<any, any> | undefined;
    createNamedTypeAst(name: string): graphql.NamedTypeAst<any, any>;
    createListTypeAst(type: any): graphql.ListTypeAst<any, any>;
    createNameAst(name: string): graphql.NameAst<any, any>;
    createStringValue(content: string[]): graphql.StringValueAst<any, any> | undefined;
    visitKeywordTypeNode(node: ast.KeywordTypeNode, context: MagnusContext): graphql.TypeAst;
    visitArrayTypeNode(node: ast.ArrayTypeNode, context: MagnusContext): graphql.ListTypeAst<any, any>;
    visitPropertyName(node: ast.PropertyName, context: MagnusContext): graphql.NameAst;
    visitComputedPropertyName(node: ast.ComputedPropertyName, context: MagnusContext): any;
    visitNumericLiteral(node: ast.NumericLiteral, context: MagnusContext): string;
    visitStringLiteral(node: ast.StringLiteral, context: MagnusContext): string;
    visitIdentifier(node: ast.Identifier, context: MagnusContext): graphql.NameAst<any, any>;
    visitParameterDeclaration(node: ast.ParameterDeclaration, context: MagnusContext): graphql.InputValueDefinitionAst;
    visitBindingName(node: ast.BindingName, context: MagnusContext): graphql.NameAst;
    createNonNullTypeAst(type: graphql.NamedTypeAst | graphql.ListTypeAst): graphql.NonNullTypeAst<any, any>;
    visitConstructorDeclaration(node: ast.ConstructorDeclaration, context: MagnusContext): void;
    visitTypeAliasDeclaration(node: ast.TypeAliasDeclaration, context: MagnusContext): any;
    visitTypeLiteralNode(node: ast.TypeLiteralNode, context: any): graphql.EnumTypeDefinitionAst<any, any>;
    visitTypeElement(node: ast.TypeElement, context: any): any;
    visitUnionTypeNode(node: ast.UnionTypeNode, context: any): any;
    visitLiteralTypeNode(node: ast.LiteralTypeNode, context: any): any;
    visitModifier(node: ast.Modifier, context: any): void;
    visitEnumDeclaration(node: ast.EnumDeclaration, context: MagnusContext): graphql.EnumTypeDefinitionAst<any, any>;
    visitEnumMember(node: ast.EnumMember, context: MagnusContext): graphql.EnumValueDefinitionAst<any, any>;
}
