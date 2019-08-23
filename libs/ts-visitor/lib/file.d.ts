import { Program, SourceFile } from "typescript";
import { TsVisitor } from "./ts";
import * as ast from "@nger/ast";
import { ParseVisitor } from "./parse";
declare type NodeWithName = ast.VariableDeclaration | ast.EnumDeclaration | ast.InterfaceDeclaration | ast.ClassDeclaration | ast.FunctionDeclaration | ast.TypeAliasDeclaration | ast.ModuleDeclaration;
export declare class File {
    ast: ast.SourceFile;
    tsVisitor: TsVisitor;
    parseVisitor: ParseVisitor;
    program: Program;
    exports: any;
    exportDefault: any;
    exportEquals: any;
    constructor(program: Program, node: SourceFile);
    getExport(name: string): any;
    getModuleBody(name: string, module: ast.ModuleBody): any;
    getName(name: string, statements?: ast.Statement[]): NodeWithName[];
}
export {};
