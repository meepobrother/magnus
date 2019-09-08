import * as ast from "../visitors/visitor";
export class TypeContext { }
export interface TypeVisitorType {
    type: string;
    isEntity?: boolean;
    isArray?: boolean;
    typeArguments: TypeVisitorType[];
    currentEntity?: string;
}
export class TypeVisitor implements ast.Visitor {
    name: string = `TypeVisitor`;
    typeArguments: Set<string>;
    currentEntity: string;
    visitTypeNode(node: ast.TypeNode, context: TypeContext): TypeVisitorType {
        return node.visit(this, context);
    }
    private hasTypeArguments(name: string) {
        return !!this.typeArguments.has(name);
    }
    visitTypeReferenceNode(
        node: ast.TypeReferenceNode,
        context: TypeContext
    ): TypeVisitorType {
        const typeName = node.typeName.visit(this, context);
        const typeArguments = node.typeArguments.map(arg =>
            arg.visit(this, context)
        );
        if (typeName === "Promise") {
            return typeArguments[0];
        }
        if (typeName === "Observable") {
            return typeArguments[0];
        }
        const isEntity = this.hasTypeArguments(typeName);
        const item: any = {
            type: typeName,
            isEntity: this.hasTypeArguments(typeName),
            typeArguments
        };
        if (isEntity) item.currentEntity = this.currentEntity;
        return item;
    }
    visitEntityName(node: ast.EntityName, context: TypeContext): any {
        return node.visit(this, context);
    }
    visitIdentifier(node: ast.Identifier, context: TypeContext) {
        return node.text;
    }
    visitQualifiedName(node: ast.QualifiedName, context: TypeContext): any {
        return `${node.left.visit(this, context)}.${node.right.visit(
            this,
            context
        )}`;
    }
    visitKeywordTypeNode(node: ast.KeywordTypeNode, context: TypeContext): TypeVisitorType {
        switch (node.name) {
            case "bigint":
                return {
                    type: "Int",
                    typeArguments: []
                };
            case "boolean":
                return {
                    type: "Boolean",
                    typeArguments: []
                };
            case "number":
                return {
                    type: "Int",
                    typeArguments: []
                };
            case "string":
                return {
                    type: "String",
                    typeArguments: []
                };
            case "null":
            case "undefined":
                return {
                    type: "Empty",
                    typeArguments: []
                };
            case "unknown":
            case "any":
            case "object":
                return {
                    type: "Json",
                    typeArguments: []
                };
            case "symbol":
            case "never":
            case "this":
            case "void":
            default:
                return {
                    type: "Error",
                    typeArguments: []
                };
        }
    }
    visitArrayTypeNode(node: ast.ArrayTypeNode, context: TypeContext): any {
        return {
            kind: "ArrayType",
            isArray: true,
            type: node.elementType.visit(this, context)
        };
    }
    visitTupleTypeNode(node: ast.TupleTypeNode, context: TypeContext) {
        throw new Error(`can not support TupleTypeNode`);
    }
    visitUnionTypeNode(node: ast.UnionTypeNode, context: TypeContext) {
        throw new Error(`can not support UnionTypeNode`);
    }
    visitFunctionTypeNode(node: ast.FunctionTypeNode, context: TypeContext) {
        throw new Error(`can not support FunctionTypeNode`);
    }
    visitMappedTypeNode(node: ast.MappedTypeNode, context: TypeContext) {
        throw new Error(`can not support MappedTypeNode`);
    }
    visitIndexedAccessTypeNode(
        node: ast.IndexedAccessTypeNode,
        context: TypeContext
    ) {
        throw new Error(`can not support IndexedAccessTypeNode`);
    }
    visitTypeOperatorNode(node: ast.TypeOperatorNode, context: TypeContext) {
        throw new Error(`can not support TypeOperatorNode`);
    }
    visitTypeLiteralNode(node: ast.TypeLiteralNode, context: TypeContext) {
        throw new Error(`can not support TypeLiteralNode`);
    }
    visitLiteralTypeNode(node: ast.LiteralTypeNode, context: TypeContext) {
        throw new Error(`can not support LiteralTypeNode`);
    }
    visitTypePredicateNode(node: ast.TypePredicateNode, context: TypeContext) {
        throw new Error(`can not support TypePredicateNode`);
    }
    visitImportTypeNode(node: ast.ImportTypeNode, context: TypeContext) {
        throw new Error(`can not support ImportTypeNode`);
    }
    visitParenthesizedTypeNode(
        node: ast.ParenthesizedTypeNode,
        context: TypeContext
    ) {
        throw new Error(`can not support ParenthesizedTypeNode`);
    }
    visitIntersectionTypeNode(
        node: ast.IntersectionTypeNode,
        context: TypeContext
    ) {
        throw new Error(`can not support IntersectionTypeNode`);
    }
    visitExpressionWithTypeArguments(
        node: ast.ExpressionWithTypeArguments,
        context: TypeContext
    ) {
        throw new Error(`can not support ExpressionWithTypeArguments`);
    }
    visitJSDocNullableType(node: ast.JSDocNullableType, context: TypeContext) {
        throw new Error(`can not support JSDocNullableType`);
    }
}
