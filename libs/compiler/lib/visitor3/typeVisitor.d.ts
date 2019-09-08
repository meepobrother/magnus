import * as ast from "../visitors/visitor";
export declare class TypeContext {
}
export interface TypeVisitorType {
    type: string;
    isEntity?: boolean;
    isArray?: boolean;
    typeArguments: TypeVisitorType[];
    currentEntity?: string;
}
export declare class TypeVisitor implements ast.Visitor {
    name: string;
    typeArguments: Set<string>;
    currentEntity: string;
    visitTypeNode(node: ast.TypeNode, context: TypeContext): TypeVisitorType;
    private hasTypeArguments;
    visitTypeReferenceNode(node: ast.TypeReferenceNode, context: TypeContext): TypeVisitorType;
    visitEntityName(node: ast.EntityName, context: TypeContext): any;
    visitIdentifier(node: ast.Identifier, context: TypeContext): string;
    visitQualifiedName(node: ast.QualifiedName, context: TypeContext): any;
    visitKeywordTypeNode(node: ast.KeywordTypeNode, context: TypeContext): TypeVisitorType;
    visitArrayTypeNode(node: ast.ArrayTypeNode, context: TypeContext): any;
    visitTupleTypeNode(node: ast.TupleTypeNode, context: TypeContext): void;
    visitUnionTypeNode(node: ast.UnionTypeNode, context: TypeContext): void;
    visitFunctionTypeNode(node: ast.FunctionTypeNode, context: TypeContext): void;
    visitMappedTypeNode(node: ast.MappedTypeNode, context: TypeContext): void;
    visitIndexedAccessTypeNode(node: ast.IndexedAccessTypeNode, context: TypeContext): void;
    visitTypeOperatorNode(node: ast.TypeOperatorNode, context: TypeContext): void;
    visitTypeLiteralNode(node: ast.TypeLiteralNode, context: TypeContext): void;
    visitLiteralTypeNode(node: ast.LiteralTypeNode, context: TypeContext): void;
    visitTypePredicateNode(node: ast.TypePredicateNode, context: TypeContext): void;
    visitImportTypeNode(node: ast.ImportTypeNode, context: TypeContext): void;
    visitParenthesizedTypeNode(node: ast.ParenthesizedTypeNode, context: TypeContext): void;
    visitIntersectionTypeNode(node: ast.IntersectionTypeNode, context: TypeContext): void;
    visitExpressionWithTypeArguments(node: ast.ExpressionWithTypeArguments, context: TypeContext): void;
    visitJSDocNullableType(node: ast.JSDocNullableType, context: TypeContext): void;
}
