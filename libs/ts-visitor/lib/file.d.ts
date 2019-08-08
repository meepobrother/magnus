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
    getInterface(name: string): void;
    getClass(name: string): void;
    getFunction(name: string): void;
    getTypeAlias(name: string): void;
}
