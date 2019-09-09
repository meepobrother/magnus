import * as ast from "./visitor";
export declare class CollectionContext {
    imports: ast.ImportDeclaration[];
    interfaces: ast.InterfaceDeclaration[];
    classes: ast.ClassDeclaration[];
    types: ast.TypeAliasDeclaration[];
    enums: ast.EnumDeclaration[];
    variables: ast.VariableStatement[];
    isServer: boolean;
    addImportDeclaration(node: ast.ImportDeclaration): void;
    addInterfaceDeclaration(node: ast.InterfaceDeclaration): void;
    addClassDeclaration(node: ast.ClassDeclaration): void;
    addTypeAliasDeclaration(node: ast.TypeAliasDeclaration): void;
    addEnumDeclaration(node: ast.EnumDeclaration): void;
    addVariableStatement(node: ast.VariableStatement): void;
    findByName(name: string): ast.InterfaceDeclaration | ast.TypeAliasDeclaration | ast.ClassDeclaration | ast.EnumDeclaration | undefined;
    findInterfaceByName(name: string): ast.InterfaceDeclaration | undefined;
    findTypeByName(name: string): ast.TypeAliasDeclaration | undefined;
    findClassByName(name: string): ast.ClassDeclaration | undefined;
    findEnumByName(name: string): ast.EnumDeclaration | undefined;
}
export declare class CollectionVisitor implements ast.Visitor {
    name: string;
    visitSourceFile(node: ast.SourceFile, context: CollectionContext): void;
    visitImportDeclaration(node: ast.ImportDeclaration, context: CollectionContext): void;
    visitVariableStatement(node: ast.VariableStatement, context: CollectionContext): void;
    visitInterfaceDeclaration(node: ast.InterfaceDeclaration, context: CollectionContext): void;
    visitClassDeclaration(node: ast.ClassDeclaration, context: CollectionContext): void;
    visitTypeAliasDeclaration(node: ast.TypeAliasDeclaration, context: CollectionContext): void;
    visitEnumDeclaration(node: ast.EnumDeclaration, context: CollectionContext): void;
    visitImportEqualsDeclaration(node: ast.ImportEqualsDeclaration, context: CollectionContext): void;
    visitFunctionDeclaration(node: ast.FunctionDeclaration, context: CollectionContext): void;
    visitExpressionStatement(node: ast.ExpressionStatement, context: CollectionContext): void;
    visitEmptyStatement(node: ast.EmptyStatement, context: any): void;
    visitDebuggerStatement(node: ast.DebuggerStatement, context: any): void;
    visitExportDeclaration(node: ast.ExportDeclaration, context: any): void;
    visitExportAssignment(node: ast.ExportAssignment, context: any): void;
}
export declare const collectionVisitor: CollectionVisitor;
export declare const collectionContext: CollectionContext;
