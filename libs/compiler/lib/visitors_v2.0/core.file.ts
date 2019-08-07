import { CoreVisitor } from './core';
import { SourceFile } from './visitor';
import * as ast from './visitor';
import * as ts from 'typescript';
import { CoreParse } from './core.parse';

export class CoreFile {
    fileAst: SourceFile;
    core: CoreVisitor = new CoreVisitor();
    exportDefault: any;
    exportEquals: any;
    exports: any;

    private parse: CoreParse = new CoreParse();
    constructor(public sourceFile: ts.SourceFile | undefined, public program: ts.Program) {
        if (this.sourceFile) {
            const fileAst = this.core.visitSourceFile(new SourceFile(), this.sourceFile);
            this.fileAst = fileAst.visit(this.parse, this)
            this.exportDefault = this.parse.exportDefault;
            this.exportEquals = this.parse.exportEquals;
            this.exports = this.parse.exports;
        }
    }
    private __getByNameFromStatements(name: string, statements: ast.Statement[]) {
        return statements.find(statement => {
            if (statement instanceof ast.ClassDeclaration) {
                return name === statement.name.visit(this.parse, ``)
            }
            else if (statement instanceof ast.InterfaceDeclaration) {
                return name === statement.name.visit(this.parse, ``)
            }
            else if (statement instanceof ast.VariableDeclaration) {
                return name === statement.name.visit(this.parse, ``)
            }
            else if (statement instanceof ast.FunctionDeclaration) {
                return name === statement.name.visit(this.parse, ``)
            }
            else if (statement instanceof ast.TypeAliasDeclaration) {
                return name === statement.name.visit(this.parse, ``)
            }
            else if (statement instanceof ast.EnumDeclaration) {
                return name === statement.name.visit(this.parse, ``)
            } else if (statement instanceof ast.ModuleDeclaration) {
                // debugger;
            } else if (statement instanceof ast.ExportDeclaration) {
                debugger;
            } else if (statement instanceof ast.ExportAssignment) {
                if (statement.expression instanceof ast.Identifier) {
                    return
                }
                debugger;
            } else {
                debugger;
                return false;
            }
        })
    }
    private __getByNameFromModuleBlock(name: string, module: ast.ModuleBlock) {
        return this.__getByNameFromStatements(name, module.statements)
    }
    private __getByNameFromModule(name: string, module: ast.ModuleDeclaration) {
        if (module.body) {
            //  ModuleBlock | NamespaceDeclaration | JSDocNamespaceBody
            if (module.body instanceof ast.ModuleDeclaration) {

            }
        }
    }
    private __getByNameFromNamespaceDeclaration(name: string, module: ast.NamespaceDeclaration) {
    }
    private __getByNameFromNamespaceBody(name: string, module: ast.NamespaceBody) {
        if (module instanceof ast.ModuleBlock) {
            return this.__getByNameFromModuleBlock(name, module)
        } else {
            return this.__getByNameFromNamespaceDeclaration(name, module)
        }
    }
    getByName(name: string) {
        return this.__getByNameFromStatements(name, this.fileAst.statements)
    }
}


export class ExportFinderVisitor implements ast.Visitor {
    name: string = `ExportFinderVisitor`;
    constructor() { }
}

export class ImportFinderVisitor implements ast.Visitor {
    name: string = `ImportFinderVisitor`;
    constructor() { }
}
