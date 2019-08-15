"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ts_1 = require("./ts");
const ast = tslib_1.__importStar(require("@nger/ast"));
const parse_1 = require("./parse");
class File {
    constructor(program, node) {
        this.tsVisitor = new ts_1.TsVisitor();
        this.parseVisitor = new parse_1.ParseVisitor();
        this.parseVisitor.program = program;
        this.program = program;
        this.ast = this.tsVisitor.visitSourceFile(new ast.SourceFile(), node);
        this.ast.visit(this.parseVisitor, {});
        this.exports = this.parseVisitor.exports;
        this.exportDefault = this.parseVisitor.exportDefault;
        this.exportEquals = this.parseVisitor.exportEquals;
    }
    getExport(name) {
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
                let result = [];
                modules.map(it => {
                    if (it instanceof ast.ModuleDeclaration) {
                        if (it.body)
                            result =
                                result.length > 0 ? result : this.getModuleBody(name, it.body);
                    }
                    else {
                        debugger;
                    }
                });
                if (result.length === 1) {
                    return result[0];
                }
            }
        }
    }
    getModuleBody(name, module) {
        if (module instanceof ast.ModuleBlock) {
            return this.getName(name, module.statements);
        }
        else if (module instanceof ast.NamespaceDeclaration) {
            return this.getModuleBody(name, module.body);
        }
    }
    getName(name, statements) {
        const __statements = statements || this.ast.statements;
        return __statements.filter(it => {
            if (it instanceof ast.VariableDeclaration) {
                return it.name.visit(this.parseVisitor, ``) === name;
            }
            else if (it instanceof ast.EnumDeclaration) {
                return it.name.visit(this.parseVisitor, ``) === name;
            }
            else if (it instanceof ast.InterfaceDeclaration) {
                return it.name.visit(this.parseVisitor, ``) === name;
            }
            else if (it instanceof ast.ClassDeclaration) {
                return it.name.visit(this.parseVisitor, ``) === name;
            }
            else if (it instanceof ast.FunctionDeclaration) {
                return it.name.visit(this.parseVisitor, ``) === name;
            }
            else if (it instanceof ast.TypeAliasDeclaration) {
                return it.name.visit(this.parseVisitor, ``) === name;
            }
            else if (it instanceof ast.ModuleDeclaration) {
                return it.name.visit(this.parseVisitor, ``) === name;
            }
            return false;
        });
    }
}
exports.File = File;
//# sourceMappingURL=file.js.map