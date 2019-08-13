"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CollectionContext {
    constructor() {
        this.imports = [];
        this.interfaces = [];
        this.classes = [];
        this.types = [];
        this.enums = [];
        this.variables = [];
    }
    addImportDeclaration(node) {
        this.imports.push(node);
    }
    addInterfaceDeclaration(node) {
        this.interfaces.push(node);
    }
    addClassDeclaration(node) {
        this.classes.push(node);
    }
    addTypeAliasDeclaration(node) {
        this.types.push(node);
    }
    addEnumDeclaration(node) {
        this.enums.push(node);
    }
    addVariableStatement(node) {
        this.variables.push(node);
    }
    findByName(name) {
        const inter = this.findInterfaceByName(name);
        if (inter)
            return inter;
        const cls = this.findClassByName(name);
        if (cls)
            return cls;
        const _enum = this.findEnumByName(name);
        if (_enum)
            return _enum;
        const type = this.findTypeByName(name);
        if (type)
            return type;
    }
    findInterfaceByName(name) {
        return this.interfaces.find(int => int.name.text === name);
    }
    findTypeByName(name) {
        return this.types.find(int => int.name.text === name);
    }
    findClassByName(name) {
        return this.classes.find(int => int.name.text === name);
    }
    findEnumByName(name) {
        return this.enums.find(enu => enu.name.text === name);
    }
}
exports.CollectionContext = CollectionContext;
class CollectionVisitor {
    constructor() {
        this.name = `CollectionVisitor`;
    }
    visitSourceFile(node, context) {
        node.statements.map(statement => statement.visit(this, context));
    }
    visitImportDeclaration(node, context) {
        // context.addImportDeclaration(node)
    }
    visitVariableStatement(node, context) {
        context.addVariableStatement(node);
    }
    visitInterfaceDeclaration(node, context) {
        context.addInterfaceDeclaration(node);
    }
    visitClassDeclaration(node, context) {
        context.addClassDeclaration(node);
    }
    visitTypeAliasDeclaration(node, context) {
        context.addTypeAliasDeclaration(node);
    }
    visitEnumDeclaration(node, context) {
        context.addEnumDeclaration(node);
    }
    visitImportEqualsDeclaration(node, context) { }
    visitFunctionDeclaration(node, context) { }
    visitExpressionStatement(node, context) { }
    visitEmptyStatement(node, context) { }
    visitDebuggerStatement(node, context) { }
    visitExportDeclaration(node, context) { }
    visitExportAssignment(node, context) { }
}
exports.CollectionVisitor = CollectionVisitor;
exports.collectionVisitor = new CollectionVisitor();
exports.collectionContext = new CollectionContext();
//# sourceMappingURL=collection.js.map