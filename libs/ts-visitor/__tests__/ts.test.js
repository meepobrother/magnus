"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = require("path");
const ts = tslib_1.__importStar(require("typescript"));
const fs_extra_1 = require("fs-extra");
const strip_json_comments_1 = tslib_1.__importDefault(require("strip-json-comments"));
const json = fs_extra_1.readFileSync(path_1.join(process.cwd(), 'tsconfig.json')).toString('utf8');
const tsconfig = JSON.parse(strip_json_comments_1.default(json));
const filePath = path_1.join(__dirname, 'tests/index.ts');
const program = ts.createProgram({
    rootNames: [filePath],
    options: tsconfig.compilerOptions
});
const sourceFile = program.getSourceFile(filePath);
const ts_1 = require("../lib/ts");
const ast_1 = require("@nger/ast");
const parse_1 = require("../lib/parse");
if (sourceFile) {
    const core = new ts_1.TsVisitor();
    core.program = program;
    const ast = core.visitSourceFile(new ast_1.SourceFile(), sourceFile);
    const parse = new parse_1.ParseVisitor();
    parse.program = program;
    const def = parse.visitSourceFile(ast, {});
    debugger;
}
//# sourceMappingURL=ts.test.js.map