"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ast = tslib_1.__importStar(require("@nger/ast"));
const ts = tslib_1.__importStar(require("typescript"));
const ts_1 = require("./ts");
const file_1 = require("./file");
class ParseVisitor {
    constructor() {
        this.tsVisitor = new ts_1.TsVisitor();
        this.name = `ParseVisitor`;
        this.resolvedModules = new Map();
    }
    visitSourceFile(node, context) {
        if (node.resolvedModules)
            this.resolvedModules = node.resolvedModules;
        node.statements
            .filter(it => !!it)
            .map(statement => statement.visit(this, context));
        return node;
    }
    visitEnumDeclaration(node, context) {
        return node;
    }
    visitInterfaceDeclaration(node, context) {
        return node;
    }
    visitVariableStatement(node, context) {
        return node;
    }
    visitTypeAliasDeclaration(node, context) {
        return node;
    }
    visitClassDeclaration(node, context) {
        return node;
    }
    visitFunctionDeclaration(node, context) {
        return node;
    }
    visitExportDeclaration(node, context) {
        if (node.moduleSpecifier) {
            // 从文件导出
            const from = node.moduleSpecifier.visit(this, context);
            const fromRes = this.resolvedModules.get(from);
            if (fromRes) {
                if (node.exportClause) {
                    const sourceFile = this.program.getSourceFile(fromRes.resolvedFileName);
                    if (sourceFile) {
                        const fileNode = this.tsVisitor.visitSourceFile(new ast.SourceFile(), sourceFile);
                        const file = new file_1.File(this.program, sourceFile);
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
                }
                else {
                    // export * from './1.ts';
                }
            }
        }
        else {
            if (node.exportClause) {
                // export {a,b,c}
                this.visitNamedExports(node.exportClause, context);
            }
            else {
                throw new Error(`${this.name} visitExportDeclaration Error!`);
            }
        }
        return node;
    }
    visitExportAssignment(node, context) {
        if (node.expression) {
            if (node.isExportEquals) {
                // export = ts;
                this.exportEquals = node.expression;
            }
            else {
                // export default ts
                this.exportDefault = node.expression;
            }
        }
        return node;
    }
    visitImportDeclaration(node, context) {
        const from = node.moduleSpecifier.visit(this, context);
        const res = this.resolvedModules.get(from);
        if (res) {
            const sourceFile = this.program.getSourceFile(res.resolvedFileName);
            if (sourceFile) {
            }
            const importClause = node.importClause.visit(this, sourceFile);
        }
        return node;
    }
    visitModuleDeclaration(node, context) {
        return node;
    }
    visitStringLiteral(node, context) {
        return node.text;
    }
    visitObjectLiteralExpression(node, context) {
        const res = {};
        node.properties.map(pro => this.visitObjectLiteralElementLike(pro, res));
        return res;
    }
    visitObjectLiteralElementLike(node, context) {
        // PropertyAssignment | ShorthandPropertyAssignment | SpreadAssignment | MethodDeclaration | AccessorDeclaration
        if (node instanceof ast.PropertyAssignment) {
            return this.visitPropertyAssignment(node, context);
        }
        else if (node instanceof ast.ShorthandPropertyAssignment) {
            return this.visitShorthandPropertyAssignment(node, context);
        }
        else if (node instanceof ast.SpreadAssignment) {
            return this.visitSpreadAssignment(node, context);
        }
        else if (node instanceof ast.MethodDeclaration) {
            return this.visitMethodDeclaration(node, context);
        }
        else if (node instanceof ast.GetAccessorDeclaration) {
            return this.visitGetAccessorDeclaration(node, context);
        }
        else if (node instanceof ast.SetAccessorDeclaration) {
            return this.visitSetAccessorDeclaration(node, context);
        }
    }
    visitShorthandPropertyAssignment(node, context) {
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
    visitSpreadAssignment(node, context) {
        return node;
    }
    visitMethodDeclaration(node, context) {
        return node;
    }
    visitGetAccessorDeclaration(node, context) {
        return node;
    }
    visitSetAccessorDeclaration(node, context) {
        return node;
    }
    visitPropertyAssignment(node, context) {
        /**
         * {b: 2}
         */
        const name = node.name.visit(this, context);
        Object.defineProperty(context, name, {
            value: node.initializer
        });
    }
    visitNumericLiteral(node, context) {
        return Number(node.text);
    }
    visitImportClause(node, context) {
        if (node.namedBindings) {
            if (node.namedBindings instanceof ast.NamedImports) {
                return {
                    elements: node.namedBindings.elements.map(ele => ele.visit(this, context)),
                    type: "import {} from",
                    kind: 0
                };
            }
            else {
                return {
                    name: node.namedBindings.name.visit(this, context),
                    type: "import * as",
                    kind: 1
                };
            }
        }
        else {
            return {
                name: node.name.visit(this, context),
                type: "import default",
                kind: 2
            };
        }
    }
    visitImportSpecifier(node, contedxt) {
        return {
            name: node.name.visit(this, context),
            propertyName: node.propertyName && node.propertyName.visit(this, context)
        };
    }
    visitIdentifier(node, context) {
        const text = node.text;
        return text;
    }
    visitNamedExports(node, context) {
        node.elements.map(ele => ele.visit(this, context));
    }
    visitExportSpecifier(node, context) {
        const name = node.name.visit(this, context);
        const propertyName = node.propertyName && node.propertyName.visit(this, context);
        Object.defineProperty(context, name, {
            value: undefined
        });
        return {
            propertyName: node.propertyName && node.propertyName.visit(this, context),
            name: node.name.visit(this, context)
        };
    }
}
exports.ParseVisitor = ParseVisitor;
//# sourceMappingURL=parse.js.map