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
    getInterface(name) { }
    getClass(name) { }
    getFunction(name) { }
    getTypeAlias(name) { }
}
exports.File = File;
//# sourceMappingURL=file.js.map