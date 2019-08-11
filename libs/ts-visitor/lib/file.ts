import { Program, SourceFile } from 'typescript';
import { TsVisitor } from './ts';
import * as ast from '@nger/ast';
import { ParseVisitor } from './parse';
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
    getName(name: string) {
        this.ast.statements.find((it) => {
            if (it instanceof ast.VariableDeclaration) {
                
            }
        })
    }
    /**
     * variable
     */
    getVariable(name: string): ast.VariableDeclaration | undefined {
        return this.ast.statements.find(it => it instanceof ast.VariableDeclaration) as ast.VariableDeclaration;
    }
    /**
     * enum
     */
    getEnum(name: string): ast.EnumDeclaration {
        return this.ast.statements.find(it => it instanceof ast.EnumDeclaration) as ast.EnumDeclaration;
    }
    /**
     * interface
     */
    getInterface(name: string): ast.InterfaceDeclaration {
        return this.ast.statements.find(it => it instanceof ast.InterfaceDeclaration) as ast.InterfaceDeclaration;
    }
    /**
     * class
     */
    getClass(name: string): ast.ClassDeclaration {
        return this.ast.statements.find(it => it instanceof ast.ClassDeclaration) as ast.ClassDeclaration;
    }
    /**
     * function
     */
    getFunction(name: string): ast.FunctionDeclaration {
        return this.ast.statements.find(it => it instanceof ast.FunctionDeclaration) as ast.FunctionDeclaration;
    }
    /**
     * type
     */
    getTypeAlias(name: string): ast.TypeAliasDeclaration {
        return this.ast.statements.find(it => it instanceof ast.TypeAliasDeclaration) as ast.TypeAliasDeclaration;
    }
}
