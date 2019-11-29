import * as ast from './visitor';
import { CoreFile } from './core.file';
export declare class CoreParse implements ast.Visitor {
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
    visitSourceFile(node: ast.SourceFile, context: any): ast.SourceFile;
    visitVariableStatement(node: ast.VariableStatement, context: CoreFile): ast.VariableStatement;
    visitFunctionDeclaration(node: ast.FunctionDeclaration, context: CoreFile): ast.FunctionDeclaration;
    visitExportDeclaration(node: ast.ExportDeclaration, context: CoreFile): ast.ExportDeclaration;
    visitExportAssignment(node: ast.ExportAssignment, context: CoreFile): ast.ExportAssignment;
    visitImportDeclaration(node: ast.ImportDeclaration, context: CoreFile): ast.ImportDeclaration;
    visitModuleDeclaration(node: ast.ModuleDeclaration, context: any): ast.ModuleDeclaration;
    visitStringLiteral(node: ast.StringLiteral, context: any): string;
    visitObjectLiteralExpression(node: ast.ObjectLiteralExpression, context: any): {};
    visitObjectLiteralElementLike(node: ast.ObjectLiteralElementLike, context: any): void | ast.MethodDeclaration | ast.GetAccessorDeclaration | ast.SetAccessorDeclaration | ast.ShorthandPropertyAssignment | ast.SpreadAssignment;
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
