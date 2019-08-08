import { Program, SourceFile } from 'typescript';
import { TsVisitor } from './ts'
import * as ast from '@nger/ast';
import { ParseVisitor } from './parse'
export class File {
    ast: ast.SourceFile;
    tsVisitor: TsVisitor = new TsVisitor();
    parseVisitor: ParseVisitor = new ParseVisitor();
    program: Program;
    constructor(program: Program, node: SourceFile) {
        this.tsVisitor.program = program;
        this.parseVisitor.program = program;
        this.program = program;
        this.ast = this.tsVisitor.visitSourceFile(new ast.SourceFile(), node)
    }

    getInterface(name: string) { }
    getClass(name: string) { }
    getFunction(name: string) { }
    getTypeAlias(name: string) { }
}
