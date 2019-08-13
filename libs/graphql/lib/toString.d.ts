import * as ast from "./ast";
export declare class ToString implements ast.Visitor {
    name: string;
    visitNonNullTypeAst(node: ast.NonNullTypeAst, context: any): string;
    visitListTypeAst(node: ast.ListTypeAst, context: any): string;
    visitNameAst(node: ast.NameAst, context: any): string;
    visitNamedTypeAst(node: ast.NamedTypeAst, context: any): string;
}
