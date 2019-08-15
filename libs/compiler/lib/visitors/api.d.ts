import { ast } from "@notadd/magnus-graphql";
declare class ImportCore {
    name: string;
    parent: ImportCore;
    children: ImportCore[];
    constructor(name: string);
    /**
     * 是否在某个
     * @param name
     */
    isInName(name: string): boolean;
    findParent(name: string): ImportCore | undefined;
    create(name: string): ImportCore;
    getLength(): number;
}
export declare class ApiObjectTypeVisitor implements ast.Visitor {
    name: string;
    doc: ast.DocumentAst;
    imports: Map<string, string[]>;
    visitNamedTypeAst(node: ast.NamedTypeAst, context: ImportCore): any;
    visitObjectTypeDefinitionAst(node: ast.ObjectTypeDefinitionAst, context: ImportCore): any;
    visitFieldDefinitionAst(node: ast.FieldDefinitionAst, context: any): any;
    visitListTypeAst(node: ast.ListTypeAst, context: any): any;
}
export declare class ApiVisitor implements ast.Visitor {
    name: string;
    objectType: ApiObjectTypeVisitor;
    visitDocumentAst(node: ast.DocumentAst, context: any): void;
    visitScalarTypeDefinitionAst(node: ast.ScalarTypeDefinitionAst, context: any): void;
    visitObjectTypeDefinitionAst(node: ast.ObjectTypeDefinitionAst, context: any): void;
    visitInputObjectTypeDefinitionAst(node: ast.InputObjectTypeDefinitionAst, context: any): void;
    visitFieldDefinitionAst(node: ast.FieldDefinitionAst, context: any): void;
    visitInputValueDefinitionAst(node: ast.InputValueDefinitionAst, context: any): any;
    visitNamedTypeAst(node: ast.NamedTypeAst, context: any): string;
    visitNonNullTypeAst(node: ast.NonNullTypeAst, context: any): any;
    visitListTypeAst(node: ast.ListTypeAst, context: any): any;
}
export {};
