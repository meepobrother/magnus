import { Program, SourceFile } from 'typescript';
import { TsVisitor } from './ts';
import * as ast from '@nger/ast';
import { ParseVisitor } from './parse';
export declare class File {
    ast: ast.SourceFile;
    tsVisitor: TsVisitor;
    parseVisitor: ParseVisitor;
    program: Program;
    constructor(program: Program, node: SourceFile);
    getName(name: string): void;
    /**
     * variable
     */
    getVariable(name: string): ast.VariableDeclaration | undefined;
    /**
     * enum
     */
    getEnum(name: string): ast.EnumDeclaration;
    /**
     * interface
     */
    getInterface(name: string): ast.InterfaceDeclaration;
    /**
     * class
     */
    getClass(name: string): ast.ClassDeclaration;
    /**
     * function
     */
    getFunction(name: string): ast.FunctionDeclaration;
    /**
     * type
     */
    getTypeAlias(name: string): ast.TypeAliasDeclaration;
}
