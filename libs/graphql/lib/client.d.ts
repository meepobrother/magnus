import * as ast from "./ast";
export interface OperationDefinitionJson {
    directives: Directives;
    name: string;
    operation: ast.OperationType;
    selections: any[];
    variableDefinitions: any[];
}
export interface Arguments {
    [key: string]: ArgumentJson;
}
export interface ArgumentJson {
    name: any;
    value: any;
}
export interface DocumentJson {
    definitions: any[];
}
interface Directives {
    [key: string]: DirectiveJson;
}
export interface DirectiveJson {
    name: string;
    args: Arguments;
}
export interface SelectionSetJson {
    [key: string]: FieldJson | FragmentSpreadJson | InlineFragmentJson;
}
interface FragmentSpreadJson {
    name: string;
    directives: Directives;
    type: 'FragmentSpread';
}
interface InlineFragmentJson {
    name: string;
    directives: Directives;
    selectionSet: SelectionSetJson;
    type: 'InlineFragment';
}
export interface FieldJson {
    alias: string;
    args: Arguments;
    directives: Directives;
    name: string;
    selectionSet: SelectionSetJson;
    type: `FieldJson`;
}
interface VariableDefinitionJson {
    variable: any;
    type: any;
    directives: Directives;
    defaultValue: any;
}
export declare class ClientVisitor implements ast.Visitor {
    name: string;
    visitFieldAst(node: ast.FieldAst, context: any): FieldJson;
    visitDocumentAst(node: ast.DocumentAst, context: any): any[];
    visitDirectiveAst(node: ast.DirectiveAst, context: any): DirectiveJson;
    createDirectives(nodes: ast.DirectiveAst[], context: any): Directives;
    visitOperationDefinitionAst(node: ast.OperationDefinitionAst, context: any): OperationDefinitionJson;
    visitSelectionSetAst(node: ast.SelectionSetAst, context: any): SelectionSetJson;
    visitSelectionAst(node: ast.SelectionAst, context: any): FieldJson | FragmentSpreadJson | InlineFragmentJson;
    visitFragmentSpreadAst(node: ast.FragmentSpreadAst, context: any): FragmentSpreadJson;
    visitInlineFragmentAst(node: ast.InlineFragmentAst, context: any): InlineFragmentJson;
    visitArgumentAst(node: ast.ArgumentAst, context: any): ArgumentJson;
    visitBooleanValueAst(node: ast.BooleanValueAst, context: any): boolean;
    visitStringValueAst(node: ast.StringValueAst, context: any): string;
    visitNameAst(node: ast.NameAst, context: any): string;
    visitIntValueAst(node: ast.IntValueAst, context: any): number;
    visitVariableDefinitionAst(node: ast.VariableDefinitionAst, context: any): VariableDefinitionJson;
    visitVariableAst(node: ast.VariableAst, context: any): any;
    visitNonNullTypeAst(node: ast.NonNullTypeAst, context: any): any;
    visitNamedTypeAst(node: ast.NamedTypeAst, context: any): string;
    visitObjectValueAst(node: ast.ObjectValueAst, context: any): any;
    visitObjectFieldAst(node: ast.ObjectFieldAst, context: any): void;
    visitListValueAst(node: ast.ListValueAst, context: any): any;
}
export {};
