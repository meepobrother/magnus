import * as ast from "@nger/ast";
import * as ts from "typescript";
import { TsVisitor } from "./ts";
import { File } from "./file";
export class ParseVisitor implements ast.Visitor {
  program: ts.Program;
  tsVisitor: TsVisitor = new TsVisitor();

  name: string = `ParseVisitor`;

  exports: any;
  exportDefault: any;
  exportEquals: any;
  resolvedModules: Map<string, ts.ResolvedModuleFull> = new Map();
  visitSourceFile(node: ast.SourceFile, context: any) {
    if (node.resolvedModules) this.resolvedModules = node.resolvedModules;
    node.statements
      .filter(it => !!it)
      .map(statement => statement.visit(this, context));
    return node;
  }
  visitEnumDeclaration(node: ast.EnumDeclaration, context: any) {
    return node;
  }
  visitInterfaceDeclaration(node: ast.InterfaceDeclaration, context: any) {
    return node;
  }
  visitVariableStatement(node: ast.VariableStatement, context: any) {
    return node;
  }
  visitTypeAliasDeclaration(node: ast.TypeAliasDeclaration, context: any) {
    return node;
  }
  visitClassDeclaration(node: ast.ClassDeclaration, context: any) {
    return node;
  }
  visitFunctionDeclaration(node: ast.FunctionDeclaration, context: any) {
    return node;
  }
  visitExportDeclaration(node: ast.ExportDeclaration, context: any) {
    if (node.moduleSpecifier) {
      // 从文件导出
      const from = node.moduleSpecifier.visit(this, context);
      const fromRes = this.resolvedModules.get(from);
      if (fromRes) {
        if (node.exportClause) {
          const sourceFile = this.program.getSourceFile(
            fromRes.resolvedFileName
          );
          if (sourceFile) {
            const fileNode = this.tsVisitor.visitSourceFile(
              new ast.SourceFile(),
              sourceFile
            );
            const file = new File(this.program, sourceFile);
            // export { a, b, c } from './1.ts';
            node.exportClause.elements.map(ele => {
              const name = ele.name.visit(this, context);
              const res = file.getExport(name);
              if (res) {
                this.exports = this.exports || {};
                Object.defineProperty(this.exports, name, {
                  value: res
                });
              }
            });
          }
        } else {
          // export * from './1.ts';
        }
      }
    } else {
      if (node.exportClause) {
        // export {a,b,c}
        this.visitNamedExports(node.exportClause, context);
      } else {
        throw new Error(`${this.name} visitExportDeclaration Error!`);
      }
    }
    return node;
  }
  visitExportAssignment(node: ast.ExportAssignment, context: any) {
    if (node.expression) {
      if (node.isExportEquals) {
        // export = ts;
        this.exportEquals = node.expression;
      } else {
        // export default ts
        this.exportDefault = node.expression;
      }
    }
    return node;
  }
  visitImportDeclaration(node: ast.ImportDeclaration, context: any) {
    const from: string = node.moduleSpecifier.visit(this, context);
    const res = this.resolvedModules.get(from);
    if (res) {
      const sourceFile = this.program.getSourceFile(res.resolvedFileName);
      if (sourceFile) {
      }
      const importClause = node.importClause.visit(this, sourceFile);
    }
    return node;
  }
  visitModuleDeclaration(node: ast.ModuleDeclaration, context: any) {
    return node;
  }

  visitStringLiteral(node: ast.StringLiteral, context: any) {
    return node.text;
  }
  visitObjectLiteralExpression(
    node: ast.ObjectLiteralExpression,
    context: any
  ) {
    const res = {};
    node.properties.map(pro => this.visitObjectLiteralElementLike(pro, res));
    return res;
  }

  visitObjectLiteralElementLike(
    node: ast.ObjectLiteralElementLike,
    context: any
  ) {
    // PropertyAssignment | ShorthandPropertyAssignment | SpreadAssignment | MethodDeclaration | AccessorDeclaration
    if (node instanceof ast.PropertyAssignment) {
      return this.visitPropertyAssignment(node, context);
    } else if (node instanceof ast.ShorthandPropertyAssignment) {
      return this.visitShorthandPropertyAssignment(node, context);
    } else if (node instanceof ast.SpreadAssignment) {
      return this.visitSpreadAssignment(node, context);
    } else if (node instanceof ast.MethodDeclaration) {
      return this.visitMethodDeclaration(node, context);
    } else if (node instanceof ast.GetAccessorDeclaration) {
      return this.visitGetAccessorDeclaration(node, context);
    } else if (node instanceof ast.SetAccessorDeclaration) {
      return this.visitSetAccessorDeclaration(node, context);
    }
  }
  visitShorthandPropertyAssignment(
    node: ast.ShorthandPropertyAssignment,
    context: any
  ) {
    /**
     * {b}
     */
    const name = node.name.visit(this, context);
    const identifier = new ast.Identifier();
    identifier.kind = ts.SyntaxKind.Identifier;
    identifier.text = name;
    Object.defineProperty(context, name, {
      value: identifier
    });
    return node;
  }
  visitSpreadAssignment(node: ast.SpreadAssignment, context: any) {
    return node;
  }
  visitMethodDeclaration(node: ast.MethodDeclaration, context: any) {
    return node;
  }
  visitGetAccessorDeclaration(node: ast.GetAccessorDeclaration, context: any) {
    return node;
  }
  visitSetAccessorDeclaration(node: ast.SetAccessorDeclaration, context: any) {
    return node;
  }
  visitPropertyAssignment(node: ast.PropertyAssignment, context: any) {
    /**
     * {b: 2}
     */
    const name = node.name.visit(this, context);
    Object.defineProperty(context, name, {
      value: node.initializer
    });
  }
  visitNumericLiteral(node: ast.NumericLiteral, context: any): number {
    return Number(node.text);
  }
  visitImportClause(node: ast.ImportClause, context: any): any {
    if (node.namedBindings) {
      if (node.namedBindings instanceof ast.NamedImports) {
        return {
          elements: node.namedBindings.elements.map(ele =>
            ele.visit(this, context)
          ),
          type: "import {} from",
          kind: 0
        };
      } else {
        return {
          name: node.namedBindings.name.visit(this, context),
          type: "import * as",
          kind: 1
        };
      }
    } else {
      return {
        name: node.name.visit(this, context),
        type: "import default",
        kind: 2
      };
    }
  }
  visitImportSpecifier(node: ast.ImportSpecifier, contedxt: any): any {
    return {
      name: node.name.visit(this, context),
      propertyName: node.propertyName && node.propertyName.visit(this, context)
    };
  }
  visitIdentifier(node: ast.Identifier, context: any): string {
    const text = node.text;
    return text;
  }
  visitNamedExports(node: ast.NamedExports, context: any): any {
    node.elements.map(ele => ele.visit(this, context));
  }
  visitExportSpecifier(node: ast.ExportSpecifier, context: any): any {
    const name = node.name.visit(this, context);
    const propertyName =
      node.propertyName && node.propertyName.visit(this, context);
    Object.defineProperty(context, name, {
      value: undefined
    });
    return {
      propertyName: node.propertyName && node.propertyName.visit(this, context),
      name: node.name.visit(this, context)
    };
  }
}
