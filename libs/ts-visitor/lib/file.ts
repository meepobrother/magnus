import { Program, SourceFile } from "typescript";
import { TsVisitor } from "./ts";
import * as ast from "@nger/ast";
import { ParseVisitor } from "./parse";
type NodeWithName =
  | ast.VariableDeclaration
  | ast.EnumDeclaration
  | ast.InterfaceDeclaration
  | ast.ClassDeclaration
  | ast.FunctionDeclaration
  | ast.TypeAliasDeclaration
  | ast.ModuleDeclaration;
export class File {
  ast: ast.SourceFile;
  tsVisitor: TsVisitor = new TsVisitor();
  parseVisitor: ParseVisitor = new ParseVisitor();
  program: Program;
  exports: any;
  exportDefault: any;
  exportEquals: any;
  constructor(program: Program, node: SourceFile) {
    this.tsVisitor.program = program;
    this.parseVisitor.program = program;
    this.program = program;
    this.ast = this.tsVisitor.visitSourceFile(new ast.SourceFile(), node);
    this.ast.visit(this.parseVisitor, {});
    this.exports = this.parseVisitor.exports;
    this.exportDefault = this.parseVisitor.exportDefault;
    this.exportEquals = this.parseVisitor.exportEquals;
  }
  getExport(name: string) {
    if (this.exports) {
      debugger;
    }
    if (this.exportDefault) {
      debugger;
    }
    if (this.exportEquals) {
      if (this.exportEquals instanceof ast.Identifier) {
        const exportEqualsName = this.exportEquals.text;
        const modules = this.getName(exportEqualsName);
        let result: any[] = [];
        modules.map(it => {
          if (it instanceof ast.ModuleDeclaration) {
            if (it.body)
              result =
                result.length > 0 ? result : this.getModuleBody(name, it.body);
          } else {
            debugger;
          }
        });
        if (result.length === 1) {
          return result[0];
        }
      }
    }
  }
  getModuleBody(name: string, module: ast.ModuleBody): any {
    if (module instanceof ast.ModuleBlock) {
      return this.getName(name, module.statements);
    } else if (module instanceof ast.NamespaceDeclaration) {
      return this.getModuleBody(name, module.body);
    }
  }
  getName(name: string, statements?: ast.Statement[]): NodeWithName[] {
    const __statements = statements || this.ast.statements;
    return __statements.filter(it => {
      if (it instanceof ast.VariableDeclaration) {
        return it.name.visit(this.parseVisitor, ``) === name;
      } else if (it instanceof ast.EnumDeclaration) {
        return it.name.visit(this.parseVisitor, ``) === name;
      } else if (it instanceof ast.InterfaceDeclaration) {
        return it.name.visit(this.parseVisitor, ``) === name;
      } else if (it instanceof ast.ClassDeclaration) {
        return it.name.visit(this.parseVisitor, ``) === name;
      } else if (it instanceof ast.FunctionDeclaration) {
        return it.name.visit(this.parseVisitor, ``) === name;
      } else if (it instanceof ast.TypeAliasDeclaration) {
        return it.name.visit(this.parseVisitor, ``) === name;
      } else if (it instanceof ast.ModuleDeclaration) {
        return it.name.visit(this.parseVisitor, ``) === name;
      }
      return false;
    }) as NodeWithName[];
  }
}
