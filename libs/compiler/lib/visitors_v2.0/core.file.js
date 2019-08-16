"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("./core");
const visitor_1 = require("./visitor");
const ast = tslib_1.__importStar(require("./visitor"));
const core_parse_1 = require("./core.parse");
class CoreFile {
    constructor(sourceFile, program) {
        this.sourceFile = sourceFile;
        this.program = program;
        this.core = new core_1.CoreVisitor();
        this.parse = new core_parse_1.CoreParse();
        if (this.sourceFile) {
            const fileAst = this.core.visitSourceFile(new visitor_1.SourceFile(), this.sourceFile);
            this.fileAst = fileAst.visit(this.parse, this);
            this.exportDefault = this.parse.exportDefault;
            this.exportEquals = this.parse.exportEquals;
            this.exports = this.parse.exports;
        }
    }
    __getByNameFromStatements(name, statements) {
        return statements.find(statement => {
            if (statement instanceof ast.ClassDeclaration) {
                return name === statement.name.visit(this.parse, ``);
            }
            else if (statement instanceof ast.InterfaceDeclaration) {
                return name === statement.name.visit(this.parse, ``);
            }
            else if (statement instanceof ast.VariableDeclaration) {
                return name === statement.name.visit(this.parse, ``);
            }
            else if (statement instanceof ast.FunctionDeclaration) {
                return name === statement.name.visit(this.parse, ``);
            }
            else if (statement instanceof ast.TypeAliasDeclaration) {
                return name === statement.name.visit(this.parse, ``);
            }
            else if (statement instanceof ast.EnumDeclaration) {
                return name === statement.name.visit(this.parse, ``);
            }
            else if (statement instanceof ast.ModuleDeclaration) {
                // debugger;
            }
            else if (statement instanceof ast.ExportDeclaration) {
                debugger;
            }
            else if (statement instanceof ast.ExportAssignment) {
                if (statement.expression instanceof ast.Identifier) {
                    return;
                }
                debugger;
            }
            else {
                debugger;
                return false;
            }
        });
    }
    __getByNameFromModuleBlock(name, module) {
        return this.__getByNameFromStatements(name, module.statements);
    }
    __getByNameFromModule(name, module) {
        if (module.body) {
            //  ModuleBlock | NamespaceDeclaration | JSDocNamespaceBody
            if (module.body instanceof ast.ModuleDeclaration) {
            }
        }
    }
    __getByNameFromNamespaceDeclaration(name, module) {
    }
    __getByNameFromNamespaceBody(name, module) {
        if (module instanceof ast.ModuleBlock) {
            return this.__getByNameFromModuleBlock(name, module);
        }
        else {
            return this.__getByNameFromNamespaceDeclaration(name, module);
        }
    }
    getByName(name) {
        return this.__getByNameFromStatements(name, this.fileAst.statements);
    }
}
exports.CoreFile = CoreFile;
class ExportFinderVisitor {
    constructor() {
        this.name = `ExportFinderVisitor`;
    }
}
exports.ExportFinderVisitor = ExportFinderVisitor;
class ImportFinderVisitor {
    constructor() {
        this.name = `ImportFinderVisitor`;
    }
}
exports.ImportFinderVisitor = ImportFinderVisitor;
//# sourceMappingURL=core.file.js.map