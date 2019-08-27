import * as ast from "./visitor";
export class ExpressionVisitor implements ast.Visitor {
    name: string = `ExpressionVisitor`;
    visitTypeParameterDeclaration(
        node: ast.TypeParameterDeclaration,
        context: any
    ): any {
        return node.name.visit(this, context);
    }
    visitSourceFile(node: ast.SourceFile, context: any): any {
        if (node.statements.length === 0) {
            return undefined;
        } else if (node.statements.length === 1) {
            return node.statements[0].visit(this, context);
        } else {
            return node.statements.map(statement => statement.visit(this, context));
        }
    }
    visitMethodDeclaration(node: ast.MethodDeclaration, context: any) { }
    visitExpressionStatement(node: ast.ExpressionStatement, context: any) {
        const res = node.expression.visit(this, context);
        return res;
    }
    visitObjectLiteralExpression(
        node: ast.ObjectLiteralExpression,
        context: any
    ) {
        const res = {};
        node.properties.map(pro => pro.visit(this, res));
        return res;
    }
    visitPropertyAssignment(node: ast.PropertyAssignment, context: any) {
        const name = node.name.visit(this, context);
        const initializer = node.initializer.visit(this, context);
        context[name] = initializer;
        return context;
    }
    visitStringLiteral(node: ast.StringLiteral, context: any) {
        return node.text;
    }
    visitBooleanLiteral(node: ast.BooleanLiteral, context: any) {
        return node.value;
    }
    visitNumericLiteral(node: ast.NumericLiteral, context: any) {
        return node.text;
    }
    visitArrayLiteralExpression(
        node: ast.ArrayLiteralExpression,
        context: any
    ): any {
        return node.elements.map(ele => ele.visit(this, context));
    }
    visitIdentifier(node: ast.Identifier, context: any) {
        return node.text;
    }
    visitDecorator(node: ast.Decorator, context: any): any {
        return node.expression.visit(this, context);
    }
    visitCallExpression(node: ast.CallExpression, context: any): any {
        return {
            name: node.expression.visit(this, context),
            arguments: node.arguments.map(arg => arg.visit(this, arg)),
            typeArguments: node.typeArguments.map(type => type.visit(this, type))
        };
    }
    visitTypeReferenceNode(node: ast.TypeReferenceNode, context: any): any {
       return node.typeName.visit(this, context);
    }
    //
    visitImportDeclaration(node: ast.ImportDeclaration, context: any) {
        const moduleSpecifier = node.moduleSpecifier.visit(this, context);
        const importClause = node.importClause.visit(this, context);
        return {
            kind: "ImportDeclaration",
            moduleSpecifier,
            importClause
        };
    }
    visitImportClause(node: ast.ImportClause, context: any): any {
        const name = node.name.visit(this, context);
        const namedBindings = node.namedBindings.visit(this, context);
        return {
            kind: "ImportClause",
            name,
            namedBindings
        };
    }
    visitNamedImportBindings(node: ast.NamedImportBindings, context: any) {
        if (node instanceof ast.NamespaceImport) {
            return this.visitNamespaceImport(node, context);
        } else {
            return this.visitNamedImports(node, context);
        }
    }
    visitNamespaceImport(node: ast.NamespaceImport, context: any): any {
        return {
            kind: "NamespaceImport",
            name: node.name.visit(this, context)
        };
    }
    visitNamedImports(node: ast.NamedImports, context: any): any {
        return {
            kind: "NamedImports",
            elements: node.elements.map(ele => ele.visit(this, context))
        };
    }
    visitArrayTypeNode(node: ast.ArrayTypeNode, context: any): any {
        return {
            kind: "ArrayTypeNode",
            elementType: node.elementType && node.elementType.visit(this, context)
        };
    }
    visitNoSubstitutionTemplateLiteral(
        node: ast.NoSubstitutionTemplateLiteral,
        context: any
    ) {
        return node.text;
    }
    visitKeywordTypeNode(node: ast.KeywordTypeNode, context: any) {
        return node.name;
    }
    visitPropertyAccessExpression(
        node: ast.PropertyAccessExpression,
        context: any
    ) { }
    visitQualifiedName(node: ast.QualifiedName, context: any) { }
    visitArrayBindingPattern(node: ast.ArrayBindingPattern, context: any) { }
    visitArrowFunction(node: ast.ArrowFunction, context: any) { }
    visitAsExpression(node: ast.AsExpression, context: any) { }
    visitAsteriskToken(node: ast.AsteriskToken, context: any) { }
    visitAwaitExpression(node: ast.AwaitExpression, context: any) { }
    visitAwaitKeywordToken(node: ast.AwaitKeywordToken, context: any) { }
    visitBigIntLiteral(node: ast.BigIntLiteral, context: any) { }
    visitBinaryExpression(node: ast.BinaryExpression, context: any) { }
    visitBinaryOperatorToken(node: ast.BinaryOperatorToken, context: any) { }
    visitNewExpression(node: ast.NewExpression, context: any) { }
    visitUnionTypeNode(node: ast.UnionTypeNode, context: any): any {
        return {
            kind: 'UnionTypeNode',
            type: node.types.map(type => this.visitTypeNode(type, context))
        }
    }
    visitNullLiteral(node: ast.NullLiteral, context: any) { }
    visitShorthandPropertyAssignment(
        node: ast.ShorthandPropertyAssignment,
        context: any
    ) {
        //
    }
    visitTypeNode(node: ast.TypeNode, context: any) {
        if (node instanceof ast.TypeReferenceNode) {
            return this.visitTypeReferenceNode(node, context)
        }
        else if (node instanceof ast.TupleTypeNode) {
            throw new Error(`${this.name} has no visitTupleTypeNode`)
            // return this.visitTupleTypeNode(node, context)
        }
        else if (node instanceof ast.UnionTypeNode) {
            return this.visitUnionTypeNode(node, context)
        }
        else if (node instanceof ast.KeywordTypeNode) {
            return this.visitKeywordTypeNode(node, context)
        }
        else if (node instanceof ast.FunctionTypeNode) {
            throw new Error(`${this.name} has no visitFunctionTypeNode`)
            // return this.visitFunctionTypeNode(node, context)
        }
        else if (node instanceof ast.MappedTypeNode) {
            throw new Error(`${this.name} has no visitMappedTypeNode`)
            // return this.visitMappedTypeNode(node, context)
        }
        else if (node instanceof ast.IndexedAccessTypeNode) {
            throw new Error(`${this.name} has no visitIndexedAccessTypeNode`)
            // return this.visitIndexedAccessTypeNode(node, context)
        }
        else if (node instanceof ast.TypeOperatorNode) {
            throw new Error(`${this.name} has no visitTypeOperatorNode`)
            // return this.visitTypeOperatorNode(node, context)
        }
        else if (node instanceof ast.TypeLiteralNode) {
            throw new Error(`${this.name} has no visitTypeLiteralNode`)
            // return this.visitTypeLiteralNode(node, context)
        }
        else if (node instanceof ast.ArrayTypeNode) {
            return this.visitArrayTypeNode(node, context)
        }
        else if (node instanceof ast.LiteralTypeNode) {
            throw new Error(`${this.name} has no visitLiteralTypeNode`)
            // return this.visitLiteralTypeNode(node, context)
        }
        else if (node instanceof ast.TypePredicateNode) {
            throw new Error(`${this.name} has no visitTypePredicateNode`)
            // return this.visitTypePredicateNode(node, context)
        }
        else if (node instanceof ast.ImportTypeNode) {
            throw new Error(`${this.name} has no visitImportTypeNode`)
            // return this.visitImportTypeNode(node, context)
        }
        else if (node instanceof ast.ParenthesizedTypeNode) {
            throw new Error(`${this.name} has no visitParenthesizedTypeNode`)
            // return this.visitParenthesizedTypeNode(node, context)
        }
        else if (node instanceof ast.IntersectionTypeNode) {
            throw new Error(`${this.name} has no visitIntersectionTypeNode`)
            // return this.visitIntersectionTypeNode(node, context)
        }
        else if (node instanceof ast.ExpressionWithTypeArguments) {
            throw new Error(`${this.name} has no visitExpressionWithTypeArguments`)
            // return this.visitExpressionWithTypeArguments(node, context)
        }
        else if (node instanceof ast.JSDocNullableType) {
            throw new Error(`${this.name} has no visitJSDocNullableType`)
            // return this.visitJSDocNullableType(node, context)
        }
    }
}
export const expressionVisitor = new ExpressionVisitor();
