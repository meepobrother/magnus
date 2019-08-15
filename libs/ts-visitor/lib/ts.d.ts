/**
 * import { core } from '';
 * import * as core from '';
 * import core from '';
 * import { core as ngCore } from '';
 */
import * as ast from '@nger/ast';
import * as ts from 'typescript';
/**
 * typescript ast 转换为 magnus ast
 */
export declare class TsVisitor implements ast.Visitor {
    name: string;
    program: ts.Program;
    visitSourceFile(node: ast.SourceFile, context: ts.SourceFile): ast.SourceFile;
    visitStatement(node: any, context: ts.Statement): any;
    visitReturnStatement(node: ast.ReturnStatement, context: ts.ReturnStatement): ast.ReturnStatement;
    visitClassDeclaration(node: ast.ClassDeclaration, context: ts.ClassDeclaration): ast.ClassDeclaration;
    visitPropertyDeclaration(node: ast.PropertyDeclaration, context: ts.PropertyDeclaration): ast.PropertyDeclaration;
    visitSemicolonClassElement(node: ast.SemicolonClassElement, context: ts.SemicolonClassElement): ast.SemicolonClassElement;
    visitConstructorDeclaration(node: ast.ConstructorDeclaration, context: ts.ConstructorDeclaration): ast.ConstructorDeclaration;
    visitDecorator(node: ast.Decorator, context: ts.Decorator): ast.Decorator;
    visitClassElement(node: any, context: ts.ClassElement): any;
    visitEnumDeclaration(node: ast.EnumDeclaration, context: ts.EnumDeclaration): ast.EnumDeclaration;
    visitEnumMember(node: ast.EnumMember, context: ts.EnumMember): ast.EnumMember;
    visitTypeAliasDeclaration(node: ast.TypeAliasDeclaration, context: ts.TypeAliasDeclaration): ast.TypeAliasDeclaration;
    visitInterfaceDeclaration(node: ast.InterfaceDeclaration, context: ts.InterfaceDeclaration): ast.InterfaceDeclaration;
    visitTypeParameterDeclaration(node: ast.TypeParameterDeclaration, context: ts.TypeParameterDeclaration): ast.TypeParameterDeclaration;
    visitPropertySignature(node: ast.PropertySignature, context: ts.PropertySignature): ast.PropertySignature;
    visitMethodSignature(node: ast.MethodSignature, context: ts.MethodSignature): ast.MethodSignature;
    visitParameterDeclaration(node: ast.ParameterDeclaration, context: ts.ParameterDeclaration): ast.ParameterDeclaration;
    visitIndexSignatureDeclaration(node: ast.IndexSignatureDeclaration, context: ts.IndexSignatureDeclaration): ast.IndexSignatureDeclaration;
    visitConstructSignatureDeclaration(node: ast.ConstructSignatureDeclaration, context: ts.ConstructSignatureDeclaration): ast.ConstructSignatureDeclaration;
    visitCallSignatureDeclaration(node: ast.CallSignatureDeclaration, context: ts.CallSignatureDeclaration): ast.CallSignatureDeclaration;
    visitTypeElement(node: any, context: ts.TypeElement): any;
    visitHeritageClause(node: ast.HeritageClause, context: ts.HeritageClause): ast.HeritageClause;
    visitExportAssignment(node: ast.ExportAssignment, context: ts.ExportAssignment): ast.ExportAssignment;
    visitModuleDeclaration(node: ast.ModuleDeclaration, context: ts.ModuleDeclaration): ast.ModuleDeclaration;
    visitJSDocNamespaceDeclaration(node: ast.JSDocNamespaceDeclaration, context: ts.JSDocNamespaceDeclaration): ast.JSDocNamespaceDeclaration;
    visitNamespaceDeclaration(node: ast.NamespaceDeclaration, context: ts.NamespaceDeclaration): ast.NamespaceDeclaration;
    visitModuleBlock(node: ast.ModuleBlock, context: ts.ModuleBlock): ast.ModuleBlock;
    visitModuleName(node: any, context: ts.ModuleName): ast.ModuleName;
    visitFunctionDeclaration(node: ast.FunctionDeclaration, context: ts.FunctionDeclaration): ast.FunctionDeclaration;
    visitFunctionBody(node: ast.FunctionBody, context: ts.FunctionBody): ast.FunctionBody;
    visitImportDeclaration(node: ast.ImportDeclaration, context: ts.ImportDeclaration): ast.ImportDeclaration;
    visitImportClause(node: ast.ImportClause, context: ts.ImportClause): ast.ImportClause;
    visitNamedImportBindings(node: any, context: ts.NamedImportBindings): ast.NamedImportBindings;
    /**
     * import * as ts from 'typescript';
     */
    visitNamespaceImport(node: ast.NamespaceImport, context: ts.NamespaceImport): ast.NamespaceImport;
    /**
     * import { ScriptKind } from 'typescript';
     * import { ScriptKind as Kind } from 'typescript';
     */
    visitNamedImports(node: ast.NamedImports, context: ts.NamedImports): ast.NamedImports;
    /**
     * import typescript from 'typescript';
     */
    visitImportSpecifier(node: ast.ImportSpecifier, context: ts.ImportSpecifier): ast.ImportSpecifier;
    /**
     * finish identifier
     */
    visitIdentifier(node: ast.Identifier, context: ts.Identifier): ast.Identifier;
    /**
     * todo
     */
    visitExpression(node: any, context: ts.Expression): any;
    visitBinaryExpression(node: ast.BinaryExpression, context: ts.BinaryExpression): ast.BinaryExpression;
    visitObjectLiteralExpression(node: ast.ObjectLiteralExpression, context: ts.ObjectLiteralExpression): ast.ObjectLiteralExpression;
    visitPropertyAssignment(node: ast.PropertyAssignment, context: ts.PropertyAssignment): ast.PropertyAssignment;
    visitShorthandPropertyAssignment(node: ast.ShorthandPropertyAssignment, context: ts.ShorthandPropertyAssignment): ast.ShorthandPropertyAssignment;
    visitSpreadAssignment(node: ast.SpreadAssignment, context: ts.SpreadAssignment): ast.SpreadAssignment;
    visitMethodDeclaration(node: ast.MethodDeclaration, context: ts.MethodDeclaration): ast.MethodDeclaration;
    visitGetAccessorDeclaration(node: ast.GetAccessorDeclaration, context: ts.GetAccessorDeclaration): ast.GetAccessorDeclaration;
    visitSetAccessorDeclaration(node: ast.SetAccessorDeclaration, context: ts.SetAccessorDeclaration): ast.SetAccessorDeclaration;
    visitObjectLiteralElementLike(node: any, context: ts.ObjectLiteralElementLike): any;
    visitJSDocReturnTag(node: ast.JSDocReturnTag, context: ts.JSDocReturnTag): ast.JSDocReturnTag;
    visitJSDocTypeExpression(node: ast.JSDocTypeExpression, context: ts.JSDocTypeExpression): ast.JSDocTypeExpression;
    visitVariableStatement(node: ast.VariableStatement, context: ts.VariableStatement): ast.VariableStatement;
    visitVariableDeclarationList(node: ast.VariableDeclarationList, context: ts.VariableDeclarationList): ast.VariableDeclarationList;
    visitVariableDeclaration(node: ast.VariableDeclaration, context: ts.VariableDeclaration): ast.VariableDeclaration;
    visitBindingName(node: any, context: ts.BindingName): any;
    visitObjectBindingPattern(node: ast.ObjectBindingPattern, context: ts.ObjectBindingPattern): ast.ObjectBindingPattern;
    visitBindingElement(node: ast.BindingElement, context: ts.BindingElement): ast.BindingElement;
    visitPropertyName(node: any, context: ts.PropertyName): any;
    visitNumericLiteral(node: ast.NumericLiteral, context: ts.NumericLiteral): ast.NumericLiteral;
    visitComputedPropertyName(node: ast.ComputedPropertyName, context: ts.ComputedPropertyName): ast.ComputedPropertyName;
    visitArrayBindingPattern(node: ast.ArrayBindingPattern, context: ts.ArrayBindingPattern): ast.ArrayBindingPattern;
    visitArrayBindingElement(node: any, context: ts.ArrayBindingElement): ast.OmittedExpression | ast.BindingElement;
    visitOmittedExpression(node: ast.OmittedExpression, context: ts.OmittedExpression): ast.OmittedExpression;
    visitTypeNode(node: any, context: ts.TypeNode): any;
    visitParenthesizedTypeNode(node: ast.ParenthesizedTypeNode, context: ts.ParenthesizedTypeNode): ast.ParenthesizedTypeNode;
    visitTypeQueryNode(node: ast.TypeQueryNode, context: ts.TypeQueryNode): ast.TypeQueryNode;
    visitTypeLiteralNode(node: ast.TypeLiteralNode, context: ts.TypeLiteralNode): ast.TypeLiteralNode;
    visitIntersectionTypeNode(node: ast.IntersectionTypeNode, context: ts.IntersectionTypeNode): ast.IntersectionTypeNode;
    visitLiteralTypeNode(node: ast.LiteralTypeNode, context: ts.LiteralTypeNode): ast.LiteralTypeNode;
    visitPrefixUnaryExpression(node: ast.PrefixUnaryExpression, context: ts.PrefixUnaryExpression): ast.PrefixUnaryExpression;
    visitUnaryExpression(node: ast.UnaryExpression, context: ts.UnaryExpression): ast.UnaryExpression;
    visitNoSubstitutionTemplateLiteral(node: ast.NoSubstitutionTemplateLiteral, context: ts.NoSubstitutionTemplateLiteral): ast.NoSubstitutionTemplateLiteral;
    visitRegularExpressionLiteral(node: ast.RegularExpressionLiteral, context: ts.RegularExpressionLiteral): ast.RegularExpressionLiteral;
    visitBigIntLiteral(node: ast.BigIntLiteral, context: ts.BigIntLiteral): ast.BigIntLiteral;
    visitBooleanLiteral(node: ast.BooleanLiteral, context: ts.BooleanLiteral): ast.BooleanLiteral;
    visitIndexedAccessTypeNode(node: ast.IndexedAccessTypeNode, context: ts.IndexedAccessTypeNode): ast.IndexedAccessTypeNode;
    visitThisTypeNode(node: ast.ThisTypeNode, context: ts.ThisTypeNode): ast.ThisTypeNode;
    visitTypePredicateNode(node: ast.TypePredicateNode, context: ts.TypePredicateNode): ast.TypePredicateNode;
    visitKeywordTypeNode(node: ast.KeywordTypeNode, context: ts.KeywordTypeNode): ast.KeywordTypeNode;
    visitFunctionTypeNode(node: ast.FunctionTypeNode, context: ts.FunctionTypeNode): ast.FunctionTypeNode;
    visitTupleTypeNode(node: ast.TupleTypeNode, context: ts.TupleTypeNode): ast.TupleTypeNode;
    visitUnionTypeNode(node: ast.UnionTypeNode, context: ts.UnionTypeNode): ast.UnionTypeNode;
    visitExpressionWithTypeArguments(node: ast.ExpressionWithTypeArguments, context: ts.ExpressionWithTypeArguments): ast.ExpressionWithTypeArguments;
    visitLeftHandSideExpression(node: ast.LeftHandSideExpression, context: ts.LeftHandSideExpression): ast.LeftHandSideExpression;
    visitTypeReferenceNode(node: ast.TypeReferenceNode, context: ts.TypeReferenceNode): ast.TypeReferenceNode;
    visitEntityName(node: any, context: ts.EntityName): ast.EntityName;
    visitQualifiedName(node: ast.QualifiedName, context: ts.QualifiedName): ast.QualifiedName;
    visitArrayTypeNode(node: ast.ArrayTypeNode, context: ts.ArrayTypeNode): ast.ArrayTypeNode;
    visitStringLiteral(node: ast.StringLiteral, context: ts.StringLiteral): ast.StringLiteral;
    /**
     * export { a, b }
     */
    visitExportDeclaration(node: ast.ExportDeclaration, context: ts.ExportDeclaration): ast.ExportDeclaration;
    /**
     * export { ScriptKind } from 'typescript';
     */
    visitNamedExports(node: ast.NamedExports, context: ts.NamedExports): ast.NamedExports;
    /**
     * elements
     */
    visitExportSpecifier(node: ast.ExportSpecifier, context: ts.ExportSpecifier): ast.ExportSpecifier;
}
