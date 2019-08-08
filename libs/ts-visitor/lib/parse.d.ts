import * as ast from '@nger/ast';
import * as ts from 'typescript';
import { TsVisitor } from './ts';
export declare class ParseVisitor implements ast.Visitor {
    program: ts.Program;
    tsVisitor: TsVisitor;
    name: string;
    exports: any;
    /**
     * export default *
     */
    exportDefault: any;
    /**
     * export = *
     */
    exportEquals: any;
    resolvedModules: Map<string, ts.ResolvedModuleFull>;
    visitSourceFile(node: ast.SourceFile, context: any): ast.SourceFile;
    visitEnumDeclaration(node: ast.EnumDeclaration, context: any): ast.EnumDeclaration;
    visitInterfaceDeclaration(node: ast.InterfaceDeclaration, context: any): ast.InterfaceDeclaration;
    visitVariableStatement(node: ast.VariableStatement, context: any): ast.VariableStatement;
    visitTypeAliasDeclaration(node: ast.TypeAliasDeclaration, context: any): ast.TypeAliasDeclaration;
    visitClassDeclaration(node: ast.ClassDeclaration, context: any): ast.ClassDeclaration;
    visitFunctionDeclaration(node: ast.FunctionDeclaration, context: any): ast.FunctionDeclaration;
    visitExportDeclaration(node: ast.ExportDeclaration, context: any): ast.ExportDeclaration;
    visitExportAssignment(node: ast.ExportAssignment, context: any): ast.ExportAssignment;
    visitImportDeclaration(node: ast.ImportDeclaration, context: any): ast.ImportDeclaration;
    visitModuleDeclaration(node: ast.ModuleDeclaration, context: any): ast.ModuleDeclaration;
    visitStringLiteral(node: ast.StringLiteral, context: any): string;
    visitObjectLiteralExpression(node: ast.ObjectLiteralExpression, context: any): {};
    visitObjectLiteralElementLike(node: ast.ObjectLiteralElementLike, context: any): void | ast.ShorthandPropertyAssignment | ast.SpreadAssignment | ast.SetAccessorDeclaration | ast.GetAccessorDeclaration | ast.MethodDeclaration;
    visitShorthandPropertyAssignment(node: ast.ShorthandPropertyAssignment, context: any): ast.ShorthandPropertyAssignment;
    visitSpreadAssignment(node: ast.SpreadAssignment, context: any): ast.SpreadAssignment;
    visitMethodDeclaration(node: ast.MethodDeclaration, context: any): ast.MethodDeclaration;
    visitGetAccessorDeclaration(node: ast.GetAccessorDeclaration, context: any): ast.GetAccessorDeclaration;
    visitSetAccessorDeclaration(node: ast.SetAccessorDeclaration, context: any): ast.SetAccessorDeclaration;
    visitPropertyAssignment(node: ast.PropertyAssignment, context: any): void;
    visitNumericLiteral(node: ast.NumericLiteral, context: any): number;
    visitImportClause(node: ast.ImportClause, context: any): any;
    visitImportSpecifier(node: ast.ImportSpecifier, contedxt: any): any;
    visitIdentifier(node: ast.Identifier, context: any): string;
    visitNamedExports(node: ast.NamedExports, context: any): any;
    visitExportSpecifier(node: ast.ExportSpecifier, context: any): any;
}
