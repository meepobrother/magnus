"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ast = tslib_1.__importStar(require("./visitor"));
class ExpressionVisitor {
    constructor() {
        this.name = `ExpressionVisitor`;
    }
    visitTypeParameterDeclaration(node, context) {
        return node.name.visit(this, context);
    }
    visitSourceFile(node, context) {
        if (node.statements.length === 0) {
            return undefined;
        }
        else if (node.statements.length === 1) {
            return node.statements[0].visit(this, context);
        }
        else {
            return node.statements.map(statement => statement.visit(this, context));
        }
    }
    visitMethodDeclaration(node, context) { }
    visitExpressionStatement(node, context) {
        const res = node.expression.visit(this, context);
        return res;
    }
    visitObjectLiteralExpression(node, context) {
        const res = {};
        node.properties.map(pro => pro.visit(this, res));
        return res;
    }
    visitPropertyAssignment(node, context) {
        const name = node.name.visit(this, context);
        const initializer = node.initializer.visit(this, context);
        context[name] = initializer;
        return context;
    }
    visitStringLiteral(node, context) {
        return node.text;
    }
    visitBooleanLiteral(node, context) {
        return node.value;
    }
    visitNumericLiteral(node, context) {
        return node.text;
    }
    visitArrayLiteralExpression(node, context) {
        return node.elements.map(ele => ele.visit(this, context));
    }
    visitIdentifier(node, context) {
        return node.text;
    }
    visitDecorator(node, context) {
        return node.expression.visit(this, context);
    }
    visitCallExpression(node, context) {
        return {
            name: node.expression.visit(this, context),
            arguments: node.arguments.map(arg => arg.visit(this, arg)),
            typeArguments: node.typeArguments.map(type => type.visit(this, type))
        };
    }
    visitTypeReferenceNode(node, context) {
        return node.typeName.visit(this, context);
    }
    //
    visitImportDeclaration(node, context) {
        const moduleSpecifier = node.moduleSpecifier.visit(this, context);
        const importClause = node.importClause.visit(this, context);
        return {
            kind: "ImportDeclaration",
            moduleSpecifier,
            importClause
        };
    }
    visitImportClause(node, context) {
        const name = node.name.visit(this, context);
        const namedBindings = node.namedBindings.visit(this, context);
        return {
            kind: "ImportClause",
            name,
            namedBindings
        };
    }
    visitNamedImportBindings(node, context) {
        if (node instanceof ast.NamespaceImport) {
            return this.visitNamespaceImport(node, context);
        }
        else {
            return this.visitNamedImports(node, context);
        }
    }
    visitNamespaceImport(node, context) {
        return {
            kind: "NamespaceImport",
            name: node.name.visit(this, context)
        };
    }
    visitNamedImports(node, context) {
        return {
            kind: "NamedImports",
            elements: node.elements.map(ele => ele.visit(this, context))
        };
    }
    visitArrayTypeNode(node, context) {
        return {
            kind: "ArrayTypeNode",
            elementType: node.elementType && node.elementType.visit(this, context)
        };
    }
    visitNoSubstitutionTemplateLiteral(node, context) {
        return node.text;
    }
    visitKeywordTypeNode(node, context) {
        return node.name;
    }
    visitPropertyAccessExpression(node, context) { }
    visitQualifiedName(node, context) { }
    visitArrayBindingPattern(node, context) { }
    visitArrowFunction(node, context) { }
    visitAsExpression(node, context) { }
    visitAsteriskToken(node, context) { }
    visitAwaitExpression(node, context) { }
    visitAwaitKeywordToken(node, context) { }
    visitBigIntLiteral(node, context) { }
    visitBinaryExpression(node, context) { }
    visitBinaryOperatorToken(node, context) { }
    visitNewExpression(node, context) { }
    visitUnionTypeNode(node, context) {
        return {
            kind: 'UnionTypeNode',
            type: node.types.map(type => this.visitTypeNode(type, context))
        };
    }
    visitNullLiteral(node, context) { }
    visitShorthandPropertyAssignment(node, context) {
        //
    }
    visitTypeNode(node, context) {
        if (node instanceof ast.TypeReferenceNode) {
            return this.visitTypeReferenceNode(node, context);
        }
        else if (node instanceof ast.TupleTypeNode) {
            throw new Error(`${this.name} has no visitTupleTypeNode`);
            // return this.visitTupleTypeNode(node, context)
        }
        else if (node instanceof ast.UnionTypeNode) {
            return this.visitUnionTypeNode(node, context);
        }
        else if (node instanceof ast.KeywordTypeNode) {
            return this.visitKeywordTypeNode(node, context);
        }
        else if (node instanceof ast.FunctionTypeNode) {
            throw new Error(`${this.name} has no visitFunctionTypeNode`);
            // return this.visitFunctionTypeNode(node, context)
        }
        else if (node instanceof ast.MappedTypeNode) {
            throw new Error(`${this.name} has no visitMappedTypeNode`);
            // return this.visitMappedTypeNode(node, context)
        }
        else if (node instanceof ast.IndexedAccessTypeNode) {
            throw new Error(`${this.name} has no visitIndexedAccessTypeNode`);
            // return this.visitIndexedAccessTypeNode(node, context)
        }
        else if (node instanceof ast.TypeOperatorNode) {
            throw new Error(`${this.name} has no visitTypeOperatorNode`);
            // return this.visitTypeOperatorNode(node, context)
        }
        else if (node instanceof ast.TypeLiteralNode) {
            throw new Error(`${this.name} has no visitTypeLiteralNode`);
            // return this.visitTypeLiteralNode(node, context)
        }
        else if (node instanceof ast.ArrayTypeNode) {
            return this.visitArrayTypeNode(node, context);
        }
        else if (node instanceof ast.LiteralTypeNode) {
            throw new Error(`${this.name} has no visitLiteralTypeNode`);
            // return this.visitLiteralTypeNode(node, context)
        }
        else if (node instanceof ast.TypePredicateNode) {
            throw new Error(`${this.name} has no visitTypePredicateNode`);
            // return this.visitTypePredicateNode(node, context)
        }
        else if (node instanceof ast.ImportTypeNode) {
            throw new Error(`${this.name} has no visitImportTypeNode`);
            // return this.visitImportTypeNode(node, context)
        }
        else if (node instanceof ast.ParenthesizedTypeNode) {
            throw new Error(`${this.name} has no visitParenthesizedTypeNode`);
            // return this.visitParenthesizedTypeNode(node, context)
        }
        else if (node instanceof ast.IntersectionTypeNode) {
            throw new Error(`${this.name} has no visitIntersectionTypeNode`);
            // return this.visitIntersectionTypeNode(node, context)
        }
        else if (node instanceof ast.ExpressionWithTypeArguments) {
            throw new Error(`${this.name} has no visitExpressionWithTypeArguments`);
            // return this.visitExpressionWithTypeArguments(node, context)
        }
        else if (node instanceof ast.JSDocNullableType) {
            throw new Error(`${this.name} has no visitJSDocNullableType`);
            // return this.visitJSDocNullableType(node, context)
        }
    }
}
exports.ExpressionVisitor = ExpressionVisitor;
exports.expressionVisitor = new ExpressionVisitor();
//# sourceMappingURL=expression.js.map