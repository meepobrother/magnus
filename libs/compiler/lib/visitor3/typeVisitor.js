"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TypeContext {
}
exports.TypeContext = TypeContext;
class TypeVisitor {
    constructor() {
        this.name = `TypeVisitor`;
    }
    visitTypeNode(node, context) {
        return node.visit(this, context);
    }
    hasTypeArguments(name) {
        return !!this.typeArguments.has(name);
    }
    visitTypeReferenceNode(node, context) {
        const typeName = node.typeName.visit(this, context);
        const typeArguments = node.typeArguments.map(arg => arg.visit(this, context));
        if (typeName === "Promise") {
            return typeArguments[0];
        }
        if (typeName === "Observable") {
            return typeArguments[0];
        }
        const isEntity = this.hasTypeArguments(typeName);
        const item = {
            type: typeName,
            isEntity: this.hasTypeArguments(typeName),
            typeArguments
        };
        if (isEntity)
            item.currentEntity = this.currentEntity;
        return item;
    }
    visitEntityName(node, context) {
        return node.visit(this, context);
    }
    visitIdentifier(node, context) {
        return node.text;
    }
    visitQualifiedName(node, context) {
        return `${node.left.visit(this, context)}.${node.right.visit(this, context)}`;
    }
    visitKeywordTypeNode(node, context) {
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
    visitArrayTypeNode(node, context) {
        return {
            kind: "ArrayType",
            isArray: true,
            type: node.elementType.visit(this, context)
        };
    }
    visitTupleTypeNode(node, context) {
        throw new Error(`can not support TupleTypeNode`);
    }
    visitUnionTypeNode(node, context) {
        throw new Error(`can not support UnionTypeNode`);
    }
    visitFunctionTypeNode(node, context) {
        throw new Error(`can not support FunctionTypeNode`);
    }
    visitMappedTypeNode(node, context) {
        throw new Error(`can not support MappedTypeNode`);
    }
    visitIndexedAccessTypeNode(node, context) {
        throw new Error(`can not support IndexedAccessTypeNode`);
    }
    visitTypeOperatorNode(node, context) {
        throw new Error(`can not support TypeOperatorNode`);
    }
    visitTypeLiteralNode(node, context) {
        throw new Error(`can not support TypeLiteralNode`);
    }
    visitLiteralTypeNode(node, context) {
        throw new Error(`can not support LiteralTypeNode`);
    }
    visitTypePredicateNode(node, context) {
        throw new Error(`can not support TypePredicateNode`);
    }
    visitImportTypeNode(node, context) {
        throw new Error(`can not support ImportTypeNode`);
    }
    visitParenthesizedTypeNode(node, context) {
        throw new Error(`can not support ParenthesizedTypeNode`);
    }
    visitIntersectionTypeNode(node, context) {
        throw new Error(`can not support IntersectionTypeNode`);
    }
    visitExpressionWithTypeArguments(node, context) {
        throw new Error(`can not support ExpressionWithTypeArguments`);
    }
    visitJSDocNullableType(node, context) {
        throw new Error(`can not support JSDocNullableType`);
    }
}
exports.TypeVisitor = TypeVisitor;
//# sourceMappingURL=typeVisitor.js.map