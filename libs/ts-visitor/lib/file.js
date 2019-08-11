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
        this.tsVisitor.program = program;
        this.parseVisitor.program = program;
        this.program = program;
        this.ast = this.tsVisitor.visitSourceFile(new ast.SourceFile(), node);
    }
    getName(name) {
        this.ast.statements.find((it) => {
            if (it instanceof ast.VariableDeclaration) {
            }
        });
    }
    /**
     * variable
     */
    getVariable(name) {
        return this.ast.statements.find(it => it instanceof ast.VariableDeclaration);
    }
    /**
     * enum
     */
    getEnum(name) {
        return this.ast.statements.find(it => it instanceof ast.EnumDeclaration);
    }
    /**
     * interface
     */
    getInterface(name) {
        return this.ast.statements.find(it => it instanceof ast.InterfaceDeclaration);
    }
    /**
     * class
     */
    getClass(name) {
        return this.ast.statements.find(it => it instanceof ast.ClassDeclaration);
    }
    /**
     * function
     */
    getFunction(name) {
        return this.ast.statements.find(it => it instanceof ast.FunctionDeclaration);
    }
    /**
     * type
     */
    getTypeAlias(name) {
        return this.ast.statements.find(it => it instanceof ast.TypeAliasDeclaration);
    }
}
exports.File = File;
//# sourceMappingURL=file.js.map