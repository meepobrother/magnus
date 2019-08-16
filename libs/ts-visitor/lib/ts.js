"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/**
 * import { core } from '';
 * import * as core from '';
 * import core from '';
 * import { core as ngCore } from '';
 */
const ast = tslib_1.__importStar(require("@nger/ast"));
const ts = tslib_1.__importStar(require("typescript"));
const util = tslib_1.__importStar(require("./util"));
/**
 * typescript ast 转换为 magnus ast
 */
class TsVisitor {
    constructor() {
        this.name = `CoreVisitor`;
    }
    visitSourceFile(node, context) {
        if (context.resolvedModules)
            node.resolvedModules = context.resolvedModules;
        node.statements = context.statements.map(statement => this.visitStatement(undefined, statement));
        return node;
    }
    visitStatement(node, context) {
        if (ts.isImportDeclaration(context))
            return this.visitImportDeclaration(new ast.ImportDeclaration(), context);
        else if (ts.isVariableStatement(context))
            return this.visitVariableStatement(new ast.VariableStatement(), context);
        else if (ts.isExportDeclaration(context))
            return this.visitExportDeclaration(new ast.ExportDeclaration(), context);
        else if (ts.isModuleDeclaration(context))
            return this.visitModuleDeclaration(new ast.ModuleDeclaration(), context);
        else if (ts.isFunctionDeclaration(context))
            return this.visitFunctionDeclaration(new ast.FunctionDeclaration(), context);
        else if (ts.isExportAssignment(context))
            return this.visitExportAssignment(new ast.ExportAssignment(), context);
        else if (ts.isInterfaceDeclaration(context))
            return this.visitInterfaceDeclaration(new ast.InterfaceDeclaration(), context);
        else if (ts.isTypeAliasDeclaration(context))
            return this.visitTypeAliasDeclaration(new ast.TypeAliasDeclaration(), context);
        else if (ts.isEnumDeclaration(context))
            return this.visitEnumDeclaration(new ast.EnumDeclaration(), context);
        else if (ts.isClassDeclaration(context))
            return this.visitClassDeclaration(new ast.ClassDeclaration(), context);
        else if (ts.isReturnStatement(context))
            return this.visitReturnStatement(new ast.ReturnStatement(), context);
        else
            console.log(context);
        return undefined;
    }
    visitReturnStatement(node, context) {
        return node;
    }
    visitClassDeclaration(node, context) {
        node.kind = context.kind;
        if (context.name)
            node.name = this.visitIdentifier(new ast.Identifier(), context.name);
        node.members = context.members.map(member => this.visitClassElement(new ast.ClassElement(), member));
        if (context.modifiers)
            node.modifiers = context.modifiers.map(dir => dir);
        return node;
    }
    visitPropertyDeclaration(node, context) {
        return node;
    }
    visitSemicolonClassElement(node, context) {
        return node;
    }
    visitConstructorDeclaration(node, context) {
        return node;
    }
    visitDecorator(node, context) {
        return node;
    }
    visitClassElement(node, context) {
        if (ts.isPropertyDeclaration(context)) {
            return this.visitPropertyDeclaration(new ast.PropertyDeclaration(), context);
        }
        else if (ts.isMethodDeclaration(context)) {
            return this.visitMethodDeclaration(new ast.MethodDeclaration(), context);
        }
        else if (ts.isSemicolonClassElement(context)) {
            return this.visitSemicolonClassElement(new ast.SemicolonClassElement(), context);
        }
        else if (ts.isConstructorDeclaration(context)) {
            return this.visitConstructorDeclaration(new ast.ConstructorDeclaration(), context);
        }
        else if (ts.isGetAccessorDeclaration(context)) {
            return this.visitGetAccessorDeclaration(new ast.GetAccessorDeclaration(), context);
        }
        else if (ts.isSetAccessorDeclaration(context)) {
            return this.visitSetAccessorDeclaration(new ast.SetAccessorDeclaration(), context);
        }
        else {
            console.log(`visitClassElement Error! ${context.kind}`);
        }
        return node;
    }
    visitEnumDeclaration(node, context) {
        node.kind = context.kind;
        node.name = this.visitIdentifier(new ast.Identifier(), context.name);
        node.members = context.members.map(member => this.visitEnumMember(new ast.EnumMember(), member));
        if (context.modifiers)
            node.modifiers = context.modifiers.map(dir => dir);
        return node;
    }
    visitEnumMember(node, context) {
        node.kind = context.kind;
        node.name = this.visitPropertyName(undefined, context.name);
        if (context.initializer)
            node.initializer = this.visitExpression(undefined, context.initializer);
        if (context.modifiers)
            node.modifiers = context.modifiers.map(dir => dir);
        return node;
    }
    visitTypeAliasDeclaration(node, context) {
        node.name = this.visitIdentifier(new ast.Identifier(), context.name);
        node.type = this.visitTypeNode(undefined, context.type);
        if (context.typeParameters)
            node.typeParameters = context.typeParameters.map(type => this.visitTypeParameterDeclaration(new ast.TypeParameterDeclaration(), type));
        if (context.modifiers)
            node.modifiers = context.modifiers.map(dir => dir);
        return node;
    }
    visitInterfaceDeclaration(node, context) {
        node.kind = context.kind;
        node.name = this.visitIdentifier(new ast.Identifier(), context.name);
        if (context.typeParameters)
            node.typeParameters = context.typeParameters.map(type => this.visitTypeParameterDeclaration(new ast.TypeParameterDeclaration(), type));
        if (context.heritageClauses)
            node.heritageClauses = context.heritageClauses.map(heritage => this.visitHeritageClause(new ast.HeritageClause(), heritage));
        node.members = context.members.map(member => this.visitTypeElement(undefined, member));
        if (context.modifiers)
            node.modifiers = context.modifiers.map(dir => dir);
        return node;
    }
    visitTypeParameterDeclaration(node, context) {
        node.kind = context.kind;
        if (context.constraint)
            node.constraint = this.visitTypeNode(undefined, context.constraint);
        if (context.default)
            node.default = this.visitTypeNode(undefined, context.default);
        if (context.expression)
            node.expression = this.visitExpression(undefined, context.expression);
        node.name = this.visitIdentifier(new ast.Identifier(), context.name);
        return node;
    }
    visitPropertySignature(node, context) {
        node.name = this.visitPropertyName(undefined, context.name);
        if (context.questionToken)
            node.questionToken = context.questionToken;
        ;
        if (context.type)
            node.type = this.visitTypeNode(undefined, context.type);
        if (context.initializer)
            node.initializer = this.visitExpression(undefined, context.initializer);
        return node;
    }
    visitMethodSignature(node, context) {
        node.name = this.visitPropertyName(undefined, context.name);
        if (context.type)
            node.type = this.visitTypeNode(undefined, context.type);
        if (context.typeParameters)
            node.typeParameters = context.typeParameters.map(par => this.visitTypeParameterDeclaration(new ast.TypeParameterDeclaration(), par));
        node.parameters = context.parameters.map(par => this.visitParameterDeclaration(new ast.ParameterDeclaration(), par));
        if (context.questionToken)
            node.questionToken = context.questionToken;
        return node;
    }
    visitParameterDeclaration(node, context) {
        return node;
    }
    visitIndexSignatureDeclaration(node, context) {
        return node;
    }
    visitConstructSignatureDeclaration(node, context) {
        return node;
    }
    visitCallSignatureDeclaration(node, context) {
        return node;
    }
    visitTypeElement(node, context) {
        // PropertySignature | MethodSignature | IndexSignatureDeclaration | ConstructSignatureDeclaration | CallSignatureDeclaration
        if (ts.isPropertySignature(context)) {
            return this.visitPropertySignature(new ast.PropertySignature(), context);
        }
        else if (ts.isMethodSignature(context)) {
            return this.visitMethodSignature(new ast.MethodSignature(), context);
        }
        else if (ts.isIndexSignatureDeclaration(context)) {
            return this.visitIndexSignatureDeclaration(new ast.IndexSignatureDeclaration(), context);
        }
        else if (ts.isConstructSignatureDeclaration(context)) {
            return this.visitConstructSignatureDeclaration(new ast.ConstructSignatureDeclaration(), context);
        }
        else if (ts.isCallSignatureDeclaration(context)) {
            return this.visitCallSignatureDeclaration(new ast.CallSignatureDeclaration(), context);
        }
        else {
            console.log(context);
        }
        return node;
    }
    visitHeritageClause(node, context) {
        return node;
    }
    visitExportAssignment(node, context) {
        node.kind = context.kind;
        if (context.name) {
            // Identifier | StringLiteral | NumericLiteral
            if (ts.isIdentifier(context.name)) {
                node.name = this.visitIdentifier(new ast.Identifier(), context.name);
            }
            else if (ts.isStringLiteral(context.name)) {
                node.name = this.visitStringLiteral(new ast.StringLiteral(), context.name);
            }
            else {
                node.name = this.visitNumericLiteral(new ast.NumericLiteral(), context.name);
            }
        }
        node.expression = this.visitExpression(undefined, context.expression);
        node.isExportEquals = !!context.isExportEquals;
        return node;
    }
    visitModuleDeclaration(node, context) {
        node.kind = context.kind;
        node.name = this.visitModuleName(undefined, context.name);
        if (ts.isModuleBlock(context)) {
            node.body = this.visitModuleBlock(new ast.ModuleBlock(), context);
        }
        else if (ts.isIdentifier(context)) {
            node.body = this.visitIdentifier(new ast.Identifier(), context);
        }
        else if (ts.isModuleDeclaration(context)) {
            node.body = this.visitNamespaceDeclaration(new ast.NamespaceDeclaration(), context);
        }
        else {
            node.body = this.visitJSDocNamespaceDeclaration(new ast.JSDocNamespaceDeclaration(), context);
        }
        return node;
    }
    visitJSDocNamespaceDeclaration(node, context) {
        return node;
    }
    visitNamespaceDeclaration(node, context) {
        node.name = this.visitIdentifier(new ast.Identifier(), context.name);
        // ModuleBlock | NamespaceDeclaration
        if (ts.isModuleBlock(context.body)) {
            node.body = this.visitModuleBlock(new ast.ModuleBlock(), context.body);
        }
        else {
            node.body = this.visitNamespaceDeclaration(new ast.NamespaceDeclaration(), context.body);
        }
        return node;
    }
    visitModuleBlock(node, context) {
        node.kind = context.kind;
        node.statements = context.statements.map(statement => this.visitStatement(undefined, statement));
        return node;
    }
    visitModuleName(node, context) {
        // Identifier | StringLiteral
        if (ts.isIdentifier(context)) {
            return this.visitIdentifier(new ast.Identifier(), context);
        }
        else {
            return this.visitStringLiteral(new ast.StringLiteral(), context);
        }
    }
    visitFunctionDeclaration(node, context) {
        if (context.body)
            node.body = this.visitFunctionBody(new ast.FunctionBody(), context.body);
        if (context.name)
            node.name = this.visitIdentifier(new ast.Identifier(), context.name);
        node.parameters = context.parameters.map(par => this.visitParameterDeclaration(new ast.ParameterDeclaration(), par));
        if (context.typeParameters)
            node.typeParameters = context.typeParameters.map(type => this.visitTypeParameterDeclaration(new ast.TypeParameterDeclaration(), type));
        if (context.type)
            node.type = this.visitTypeNode(undefined, context.type);
        return node;
    }
    visitFunctionBody(node, context) {
        node.kind = context.kind;
        node.statements = context.statements.map(statement => this.visitStatement(undefined, statement));
        return node;
    }
    visitImportDeclaration(node, context) {
        node.kind = context.kind;
        node.moduleSpecifier = this.visitExpression(undefined, context.moduleSpecifier);
        if (context.importClause)
            node.importClause = this.visitImportClause(new ast.ImportClause(), context.importClause);
        return node;
    }
    visitImportClause(node, context) {
        node.kind = context.kind;
        if (context.name)
            node.name = this.visitIdentifier(new ast.Identifier(), context.name);
        if (context.namedBindings)
            node.namedBindings = this.visitNamedImportBindings(undefined, context.namedBindings);
        return node;
    }
    visitNamedImportBindings(node, context) {
        if (ts.isNamespaceImport(context)) {
            return this.visitNamespaceImport(new ast.NamespaceImport(), context);
        }
        else {
            return this.visitNamedImports(new ast.NamedImports(), context);
        }
    }
    /**
     * import * as ts from 'typescript';
     */
    visitNamespaceImport(node, context) {
        node.__name = `NamespaceImport`;
        node.kind = context.kind;
        node.name = this.visitIdentifier(new ast.Identifier(), context.name);
        return node;
    }
    /**
     * import { ScriptKind } from 'typescript';
     * import { ScriptKind as Kind } from 'typescript';
     */
    visitNamedImports(node, context) {
        node.__name = `NamedImports`;
        node.kind = context.kind;
        node.elements = context.elements.map(ele => this.visitImportSpecifier(new ast.ImportSpecifier(), ele));
        return node;
    }
    /**
     * import typescript from 'typescript';
     */
    visitImportSpecifier(node, context) {
        node.__name = `ImportSpecifier`;
        node.kind = context.kind;
        if (context.propertyName)
            node.propertyName = this.visitIdentifier(new ast.Identifier(), context.propertyName);
        node.name = this.visitIdentifier(new ast.Identifier(), context.name);
        return node;
    }
    /**
     * finish identifier
     */
    visitIdentifier(node, context) {
        node.kind = context.kind;
        node.text = context.text;
        node.escapedText = context.escapedText;
        node.isInJSDocNamespace = !!context.isInJSDocNamespace;
        node.originalKeywordKind = context.originalKeywordKind;
        return node;
    }
    /**
     * todo
     */
    visitExpression(node, context) {
        if (ts.isStringLiteral(context)) {
            return this.visitStringLiteral(new ast.StringLiteral(), context);
        }
        else if (ts.isNumericLiteral(context)) {
            return this.visitNumericLiteral(new ast.NumericLiteral(), context);
        }
        else if (ts.isIdentifier(context)) {
            return this.visitIdentifier(new ast.Identifier(), context);
        }
        else if (ts.isObjectLiteralExpression(context)) {
            return this.visitObjectLiteralExpression(new ast.ObjectLiteralExpression(), context);
        }
        else if (ts.isBinaryExpression(context)) {
            return this.visitBinaryExpression(new ast.BinaryExpression(), context);
        }
        else {
            console.log(context);
        }
        return node;
    }
    visitBinaryExpression(node, context) {
        node.kind = context.kind;
        node.left = this.visitExpression(undefined, context.left);
        node.operatorToken = context.operatorToken;
        node.right = this.visitExpression(undefined, context.right);
        return node;
    }
    visitObjectLiteralExpression(node, context) {
        node.kind = context.kind;
        node.properties = context.properties.map(property => this.visitObjectLiteralElementLike(undefined, property));
        return node;
    }
    visitPropertyAssignment(node, context) {
        node.kind = context.kind;
        node.name = this.visitPropertyName(undefined, context.name);
        if (context.questionToken)
            node.questionToken = context.questionToken;
        node.initializer = this.visitExpression(undefined, context.initializer);
        return node;
    }
    visitShorthandPropertyAssignment(node, context) {
        node.kind = context.kind;
        node.name = this.visitIdentifier(new ast.Identifier(), context.name);
        if (context.questionToken)
            node.questionToken = context.questionToken;
        node.exclamationToken = context.exclamationToken;
        node.equalsToken = context.equalsToken;
        if (context.objectAssignmentInitializer)
            node.objectAssignmentInitializer = this.visitExpression(undefined, context.objectAssignmentInitializer);
        return node;
    }
    visitSpreadAssignment(node, context) {
        node.kind = context.kind;
        if (context.expression)
            node.expression = this.visitExpression(undefined, context.expression);
        return node;
    }
    visitMethodDeclaration(node, context) {
        node.kind = context.kind;
        node.name = this.visitPropertyName(undefined, context.name);
        if (context.body)
            node.body = this.visitFunctionBody(new ast.FunctionBody(), context.body);
        node._functionLikeDeclarationBrand = context._functionLikeDeclarationBrand;
        if (context.asteriskToken)
            node.asteriskToken = context.asteriskToken;
        if (context.questionToken)
            node.questionToken = context.questionToken;
        if (context.exclamationToken)
            node.exclamationToken = context.exclamationToken;
        if (context.typeParameters)
            node.typeParameters = context.typeParameters.map(par => this.visitTypeParameterDeclaration(new ast.TypeParameterDeclaration(), par));
        node.parameters = context.parameters.map(par => this.visitParameterDeclaration(new ast.ParameterDeclaration(), par));
        if (context.type)
            node.type = this.visitTypeNode(undefined, context.type);
        return node;
    }
    visitGetAccessorDeclaration(node, context) {
        node.kind = context.kind;
        node.name = this.visitPropertyName(undefined, context.name);
        if (context.body)
            node.body = this.visitFunctionBody(new ast.FunctionBody(), context.body);
        if (context.typeParameters)
            node.typeParameters = context.typeParameters.map(par => this.visitTypeParameterDeclaration(new ast.TypeParameterDeclaration(), par));
        node.parameters = context.parameters.map(par => this.visitParameterDeclaration(new ast.ParameterDeclaration(), par));
        if (context.type)
            node.type = this.visitTypeNode(undefined, context.type);
        return node;
    }
    visitSetAccessorDeclaration(node, context) {
        node.kind = context.kind;
        node.name = this.visitPropertyName(undefined, context.name);
        if (context.body)
            node.body = this.visitFunctionBody(new ast.FunctionBody(), context.body);
        if (context.typeParameters)
            node.typeParameters = context.typeParameters.map(par => this.visitTypeParameterDeclaration(new ast.TypeParameterDeclaration(), par));
        node.parameters = context.parameters.map(par => this.visitParameterDeclaration(new ast.ParameterDeclaration(), par));
        if (context.type)
            node.type = this.visitTypeNode(undefined, context.type);
        return node;
    }
    visitObjectLiteralElementLike(node, context) {
        // PropertyAssignment | ShorthandPropertyAssignment | SpreadAssignment | MethodDeclaration | AccessorDeclaration
        if (ts.isPropertyAssignment(context)) {
            return this.visitPropertyAssignment(new ast.PropertyAssignment(), context);
        }
        else if (ts.isShorthandPropertyAssignment(context)) {
            return this.visitShorthandPropertyAssignment(new ast.ShorthandPropertyAssignment(), context);
        }
        else if (ts.isSpreadAssignment(context)) {
            return this.visitSpreadAssignment(new ast.SpreadAssignment(), context);
        }
        else if (ts.isMethodDeclaration(context)) {
            return this.visitMethodDeclaration(new ast.MethodDeclaration(), context);
        }
        else if (ts.isGetAccessorDeclaration(context)) {
            return this.visitGetAccessorDeclaration(new ast.GetAccessorDeclaration(), context);
        }
        else if (ts.isSetAccessorDeclaration(context)) {
            return this.visitSetAccessorDeclaration(new ast.SetAccessorDeclaration(), context);
        }
        return node;
    }
    visitJSDocReturnTag(node, context) {
        node.kind = context.kind;
        if (context.typeExpression)
            node.typeExpression = this.visitJSDocTypeExpression(new ast.JSDocTypeExpression(), context.typeExpression);
        return node;
    }
    visitJSDocTypeExpression(node, context) {
        node.kind = context.kind;
        node.type = this.visitTypeNode(undefined, context.type);
        return node;
    }
    visitVariableStatement(node, context) {
        node.kind = context.kind;
        node.declarationList = this.visitVariableDeclarationList(new ast.VariableDeclarationList(), context.declarationList);
        if (context.modifiers)
            node.modifiers = context.modifiers.map(dir => dir);
        return node;
    }
    visitVariableDeclarationList(node, context) {
        node.kind = context.kind;
        node.declarations = context.declarations.map(dec => this.visitVariableDeclaration(new ast.VariableDeclaration(), dec));
        return node;
    }
    visitVariableDeclaration(node, context) {
        node.kind = context.kind;
        node.name = this.visitBindingName(undefined, context.name);
        if (context.exclamationToken)
            node.exclamationToken = context.exclamationToken;
        if (context.type)
            node.type = this.visitTypeNode(undefined, context.type);
        if (context.initializer)
            node.initializer = this.visitExpression(undefined, context.initializer);
        return node;
    }
    visitBindingName(node, context) {
        if (ts.isIdentifier(context)) {
            return this.visitIdentifier(new ast.Identifier(), context);
        }
        else if (ts.isObjectBindingPattern(context)) {
            return this.visitObjectBindingPattern(new ast.ObjectBindingPattern(), context);
        }
        else if (ts.isArrayBindingPattern(context)) {
            return this.visitArrayBindingPattern(new ast.ArrayBindingPattern(), context);
        }
        return node;
    }
    visitObjectBindingPattern(node, context) {
        node.kind = context.kind;
        node.elements = context.elements.map(ele => this.visitBindingElement(new ast.BindingElement(), ele));
        return node;
    }
    visitBindingElement(node, context) {
        node.kind = context.kind;
        if (context.propertyName)
            node.propertyName = this.visitPropertyName(undefined, context.propertyName);
        node.dotDotDotToken = context.dotDotDotToken;
        node.name = this.visitBindingName(undefined, context.name);
        if (context.initializer)
            node.initializer = this.visitExpression(undefined, context.initializer);
        return node;
    }
    visitPropertyName(node, context) {
        if (ts.isIdentifier(context)) {
            return this.visitIdentifier(new ast.Identifier(), context);
        }
        else if (ts.isStringLiteral(context)) {
            return this.visitStringLiteral(new ast.StringLiteral(), context);
        }
        else if (ts.isNumericLiteral(context)) {
            return this.visitNumericLiteral(new ast.NumericLiteral(), context);
        }
        else if (ts.isComputedPropertyName(context)) {
            return this.visitComputedPropertyName(new ast.ComputedPropertyName(), context);
        }
        return node;
    }
    visitNumericLiteral(node, context) {
        node.kind = context.kind;
        node.text = context.text;
        node.isUnterminated = !!context.isUnterminated;
        node.hasExtendedUnicodeEscape = !!context.hasExtendedUnicodeEscape;
        return node;
    }
    visitComputedPropertyName(node, context) {
        node.kind = context.kind;
        node.expression = this.visitExpression(undefined, context.expression);
        return node;
    }
    visitArrayBindingPattern(node, context) {
        node.kind = context.kind;
        node.elements = context.elements.map(ele => this.visitArrayBindingElement(undefined, ele));
        return node;
    }
    visitArrayBindingElement(node, context) {
        if (ts.isBindingElement(context)) {
            return this.visitBindingElement(new ast.BindingElement(), context);
        }
        else {
            return this.visitOmittedExpression(new ast.OmittedExpression(), context);
        }
    }
    visitOmittedExpression(node, context) {
        node.kind = context.kind;
        return node;
    }
    visitTypeNode(node, context) {
        if (ts.isArrayTypeNode(context)) {
            return this.visitArrayTypeNode(new ast.ArrayTypeNode(), context);
        }
        else if (ts.isTypeReferenceNode(context)) {
            return this.visitTypeReferenceNode(new ast.TypeReferenceNode(), context);
        }
        else if (ts.isExpressionWithTypeArguments(context)) {
            return this.visitExpressionWithTypeArguments(new ast.ExpressionWithTypeArguments(), context);
        }
        else if (ts.isUnionTypeNode(context)) {
            return this.visitUnionTypeNode(new ast.UnionTypeNode(), context);
        }
        else if (ts.isUnionTypeNode(context)) {
            return this.visitUnionTypeNode(new ast.UnionTypeNode(), context);
        }
        else if (ts.isTupleTypeNode(context)) {
            return this.visitTupleTypeNode(new ast.TupleTypeNode(), context);
        }
        else if (ts.isFunctionTypeNode(context)) {
            return this.visitFunctionTypeNode(new ast.FunctionTypeNode(), context);
        }
        else if (util.isKeywordTypeNode(context)) {
            return this.visitKeywordTypeNode(new ast.KeywordTypeNode(), context);
        }
        else if (ts.isTypePredicateNode(context)) {
            return this.visitTypePredicateNode(new ast.TypePredicateNode(), context);
        }
        else if (ts.isThisTypeNode(context)) {
            return this.visitThisTypeNode(new ast.ThisTypeNode(), context);
        }
        else if (ts.isIndexedAccessTypeNode(context)) {
            return this.visitIndexedAccessTypeNode(new ast.IndexedAccessTypeNode(), context);
        }
        else if (ts.isLiteralTypeNode(context)) {
            return this.visitLiteralTypeNode(new ast.LiteralTypeNode(), context);
        }
        else if (ts.isIntersectionTypeNode(context)) {
            return this.visitIntersectionTypeNode(new ast.IntersectionTypeNode(), context);
        }
        else if (ts.isTypeLiteralNode(context)) {
            return this.visitTypeLiteralNode(new ast.TypeLiteralNode(), context);
        }
        else if (ts.isTypeQueryNode(context)) {
            return this.visitTypeQueryNode(new ast.TypeQueryNode(), context);
        }
        else if (ts.isParenthesizedTypeNode(context)) {
            return this.visitParenthesizedTypeNode(new ast.ParenthesizedTypeNode(), context);
        }
        else {
            console.log(context);
        }
        return node;
    }
    visitParenthesizedTypeNode(node, context) {
        node.type = this.visitTypeNode(undefined, context.type);
        return node;
    }
    visitTypeQueryNode(node, context) {
        node.exprName = this.visitEntityName(undefined, context.exprName);
        return node;
    }
    visitTypeLiteralNode(node, context) {
        node.members = context.members.map(member => this.visitTypeElement(undefined, member));
        return node;
    }
    visitIntersectionTypeNode(node, context) {
        return node;
    }
    visitLiteralTypeNode(node, context) {
        if (util.isBooleanLiteral(context.literal)) {
            node.literal = this.visitBooleanLiteral(new ast.BooleanLiteral(), context.literal);
        }
        // NumericLiteral | BigIntLiteral | RegularExpressionLiteral | NoSubstitutionTemplateLiteral;
        else if (util.isNoSubstitutionTemplateLiteral(context.literal)) {
            node.literal = this.visitNoSubstitutionTemplateLiteral(new ast.NoSubstitutionTemplateLiteral(), context.literal);
        }
        else if (util.isRegularExpressionLiteral(context.literal)) {
            node.literal = this.visitRegularExpressionLiteral(new ast.RegularExpressionLiteral(), context.literal);
        }
        else if (util.isNumericLiteral(context.literal)) {
            node.literal = this.visitNumericLiteral(new ast.NumericLiteral(), context.literal);
        }
        else if (util.isBigIntLiteral(context.literal)) {
            node.literal = this.visitBigIntLiteral(new ast.BigIntLiteral(), context.literal);
        }
        else if (ts.isPrefixUnaryExpression(context.literal)) {
            node.literal = this.visitPrefixUnaryExpression(new ast.PrefixUnaryExpression(), context.literal);
        }
        return node;
    }
    visitPrefixUnaryExpression(node, context) {
        node.kind = context.kind;
        node.operator = context.operator;
        node.operand = this.visitUnaryExpression(new ast.UnaryExpression(), context.operand);
        return node;
    }
    visitUnaryExpression(node, context) {
        return node;
    }
    visitNoSubstitutionTemplateLiteral(node, context) {
        node.text = context.text;
        node.isUnterminated = context.isUnterminated;
        node.hasExtendedUnicodeEscape = context.hasExtendedUnicodeEscape;
        node.kind = context.kind;
        return node;
    }
    visitRegularExpressionLiteral(node, context) {
        node.text = context.text;
        node.isUnterminated = context.isUnterminated;
        node.hasExtendedUnicodeEscape = context.hasExtendedUnicodeEscape;
        node.kind = context.kind;
        return node;
    }
    visitBigIntLiteral(node, context) {
        node.kind = context.kind;
        return node;
    }
    visitBooleanLiteral(node, context) {
        node.kind = context.kind;
        return node;
    }
    visitIndexedAccessTypeNode(node, context) {
        node.objectType = this.visitTypeNode(undefined, context.objectType);
        node.indexType = this.visitTypeNode(undefined, context.indexType);
        return node;
    }
    visitThisTypeNode(node, context) {
        node.kind = context.kind;
        return node;
    }
    visitTypePredicateNode(node, context) {
        return node;
    }
    visitKeywordTypeNode(node, context) {
        node.kind = context.kind;
        return node;
    }
    visitFunctionTypeNode(node, context) {
        return node;
    }
    visitTupleTypeNode(node, context) {
        node.kind = context.kind;
        node.elementTypes = context.elementTypes.map(ele => this.visitTypeNode(undefined, ele));
        return node;
    }
    visitUnionTypeNode(node, context) {
        node.kind = context.kind;
        node.types = context.types.map(type => this.visitTypeNode(undefined, type));
        return node;
    }
    visitExpressionWithTypeArguments(node, context) {
        node.expression = this.visitLeftHandSideExpression(new ast.LeftHandSideExpression(), context.expression);
        if (context.typeArguments)
            node.typeArguments = context.typeArguments.map(type => this.visitTypeNode(undefined, type));
        return node;
    }
    visitLeftHandSideExpression(node, context) {
        node._leftHandSideExpressionBrand = context._leftHandSideExpressionBrand;
        return node;
    }
    visitTypeReferenceNode(node, context) {
        if (context.typeArguments)
            node.typeArguments = context.typeArguments.map(type => this.visitTypeNode(undefined, type));
        node.typeName = this.visitEntityName(undefined, context.typeName);
        return node;
    }
    visitEntityName(node, context) {
        if (ts.isIdentifier(context)) {
            return this.visitIdentifier(new ast.Identifier(), context);
        }
        else {
            return this.visitQualifiedName(new ast.QualifiedName(), context);
        }
    }
    visitQualifiedName(node, context) {
        node.kind = context.kind;
        node.left = this.visitEntityName(undefined, context.left);
        node.right = this.visitIdentifier(new ast.Identifier(), context.right);
        return node;
    }
    visitArrayTypeNode(node, context) {
        node.elementType = this.visitTypeNode(undefined, context.elementType);
        return node;
    }
    visitStringLiteral(node, context) {
        node.text = context.text;
        node.isUnterminated = !!context.isUnterminated;
        ;
        node.hasExtendedUnicodeEscape = !!context.hasExtendedUnicodeEscape;
        ;
        node.kind = context.kind;
        return node;
    }
    /**
     * export { a, b }
     */
    visitExportDeclaration(node, context) {
        node.kind = context.kind;
        if (context.exportClause)
            node.exportClause = this.visitNamedExports(new ast.NamedExports(), context.exportClause);
        if (context.moduleSpecifier)
            node.moduleSpecifier = this.visitExpression(undefined, context.moduleSpecifier);
        return node;
    }
    /**
     * export { ScriptKind } from 'typescript';
     */
    visitNamedExports(node, context) {
        node.kind = context.kind;
        node.elements = context.elements.map(ele => this.visitExportSpecifier(new ast.ExportSpecifier(), ele));
        return node;
    }
    /**
     * elements
     */
    visitExportSpecifier(node, context) {
        node.kind = context.kind;
        if (context.propertyName)
            node.propertyName = this.visitPropertyName(undefined, context.propertyName);
        node.name = this.visitIdentifier(new ast.Identifier(), context.name);
        return node;
    }
}
exports.TsVisitor = TsVisitor;
//# sourceMappingURL=ts.js.map