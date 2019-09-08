import { CoreVisitor } from './core';
import { SourceFile } from './visitor';
import * as ast from './visitor';
import * as ts from 'typescript';
export declare class CoreFile {
    sourceFile: ts.SourceFile | undefined;
    program: ts.Program;
    fileAst: SourceFile;
    core: CoreVisitor;
    exportDefault: any;
    exportEquals: any;
    exports: any;
    private parse;
    constructor(sourceFile: ts.SourceFile | undefined, program: ts.Program);
    private __getByNameFromStatements;
    private __getByNameFromModuleBlock;
    private __getByNameFromModule;
    private __getByNameFromNamespaceDeclaration;
    private __getByNameFromNamespaceBody;
    getByName(name: string): ast.ClassDeclaration | ast.ImportDeclaration | ast.VariableStatement | ast.FunctionDeclaration | ast.InterfaceDeclaration | ast.EnumDeclaration | ast.TypeAliasDeclaration | ast.ReturnStatement | ast.IfStatement | ast.SwitchStatement | ast.ForOfStatement | ast.ForInStatement | ast.FunctionBody | ast.ExpressionStatement | ast.BreakStatement | ast.ThrowStatement | ast.DebuggerStatement | ast.ExportDeclaration | ast.ExportAssignment | ast.EmptyStatement | ast.ConditionalExpression | ast.RegularExpressionLiteral | ast.TaggedTemplateExpression | ast.TryStatement | ast.ImportEqualsDeclaration | ast.OtherStatement | undefined;
}
export declare class ExportFinderVisitor implements ast.Visitor {
    name: string;
    constructor();
}
export declare class ImportFinderVisitor implements ast.Visitor {
    name: string;
    constructor();
}
