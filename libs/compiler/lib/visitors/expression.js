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
        const typeName = node.typeName.visit(this, context);
        if (typeName === 'Promise') {
            return node.typeArguments[0].visit(this, context);
        }
        else if (typeName === 'Observable') {
            return node.typeArguments[0].visit(this, context);
        }
        return typeName;
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
    visitUnionTypeNode(node, context) { }
    visitNullLiteral(node, context) { }
    visitShorthandPropertyAssignment(node, context) {
        //
    }
}
exports.ExpressionVisitor = ExpressionVisitor;
exports.expressionVisitor = new ExpressionVisitor();
//# sourceMappingURL=expression.js.map