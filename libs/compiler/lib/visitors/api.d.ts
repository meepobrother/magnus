import { ast } from "@notadd/magnus-graphql";
declare class ImportCore {
    name: string;
    parent: ImportCore;
    children: ImportCore[];
    parameters: string[];
    constructor(name: string);
    /**
     * 是否在某个
     * @param name
     */
    isInName(name: string): boolean;
    findParent(name: string): ImportCore | undefined;
    findTop(): ImportCore;
    create(name: string): ImportCore;
    getLength(): number;
}
export declare class ApiLevel implements ast.Visitor {
    name: string;
    visitNamedTypeAst(node: ast.NamedTypeAst, context: any): string;
}
export declare class ApiObjectTypeVisitor implements ast.Visitor {
    name: string;
    doc: ast.DocumentAst;
    imports: Map<string, string[]>;
    api: ApiVisitor;
    visitScalarTypeDefinitionAst(node: ast.ScalarTypeDefinitionAst, context: any): any;
    visitNamedTypeAst(node: ast.NamedTypeAst, context: ImportCore): any;
    visitObjectTypeDefinitionAst(node: ast.ObjectTypeDefinitionAst, context: ImportCore): any;
    visitFieldDefinitionAst(node: ast.FieldDefinitionAst, context: ImportCore): any;
    visitInputValueDefinitionAst(node: ast.InputValueDefinitionAst, context: any): any;
    visitListTypeAst(node: ast.ListTypeAst, context: any): any;
    visitNonNullTypeAst(node: ast.NonNullTypeAst, context: any): any;
}
export declare class ApiVisitor implements ast.Visitor {
    name: string;
    objectType: ApiObjectTypeVisitor;
    query: any;
    mutation: any;
    subscription: any;
    parameters: Map<string, string[]>;
    visitDocumentAst(node: ast.DocumentAst, context: any): any;
    visitScalarTypeDefinitionAst(node: ast.ScalarTypeDefinitionAst, context: any): undefined;
    visitObjectTypeDefinitionAst(node: ast.ObjectTypeDefinitionAst, context: any): any;
    visitInputObjectTypeDefinitionAst(node: ast.InputObjectTypeDefinitionAst, context: any): void;
    visitFieldDefinitionAst(node: ast.FieldDefinitionAst, context: any): any;
    visitInputValueDefinitionAst(node: ast.InputValueDefinitionAst, context: any): any;
    visitNamedTypeAst(node: ast.NamedTypeAst, context: any): string;
    visitNonNullTypeAst(node: ast.NonNullTypeAst, context: any): any;
    visitListTypeAst(node: ast.ListTypeAst, context: any): any;
}
export {};
