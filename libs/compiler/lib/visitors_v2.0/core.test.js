"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_file_1 = require("./core.file");
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
const file = new core_file_1.CoreFile(sourceFile, program);
debugger;
//# sourceMappingURL=core.test.js.map