import { join } from 'path';
import * as ts from 'typescript';
import { readFileSync } from 'fs-extra';
import stripJsonComments from 'strip-json-comments';
const json = readFileSync(join(process.cwd(), 'tsconfig.json')).toString('utf8');
const tsconfig = JSON.parse(stripJsonComments(json));
const filePath = join(__dirname, 'tests/index.ts');
const program = ts.createProgram({
    rootNames: [filePath],
    options: tsconfig.compilerOptions
});
const sourceFile = program.getSourceFile(filePath)
import { TsVisitor } from '../lib/ts';
import { SourceFile } from '@nger/ast';
import { ParseVisitor } from '../lib/parse'
if (sourceFile) {
    const core = new TsVisitor();
    core.program = program;
    const ast = core.visitSourceFile(new SourceFile(), sourceFile)
    const parse = new ParseVisitor()
    parse.program = program;
    const def = parse.visitSourceFile(ast, {})
    debugger;
}
