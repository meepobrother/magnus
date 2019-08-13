import * as ast from './ast';
/**
 * 执行
 * @param server
 * @param client
 * @param variables
 */
export declare function exec(server: string, client: string, variables: any): void;
export declare class ExecContext {
    errors: any[];
    result: any;
    variables: {
        [key: string]: any;
    };
}
export declare class ExecVisitor implements ast.Visitor {
    name: string;
    visitDocumentAst(node: ast.DocumentAst, context: ExecContext): void;
    createVariables(vars: Array<ast.VariableDefinitionAst>, context: ExecContext): {
        [key: string]: VariableDefinition;
    };
    createDirectives(vars: Array<ast.DirectiveAst>, context: ExecContext): KeyValue<Directive>;
    createInputValueDefinition(nodes: ast.InputValueDefinitionAst[], context: ExecContext): any;
    visitDirectiveDefinitionAst(node: ast.DirectiveDefinitionAst, context: ExecContext): DirectiveDefinition;
    visitOperationDefinitionAst(node: ast.OperationDefinitionAst, context: ExecContext): OperationDefinition;
    visitSelectionSetAst(node: ast.SelectionSetAst, context: ExecContext): {
        [key: string]: Selection;
    };
    createArgument(nodes: ast.ArgumentAst[], context: ExecContext): any;
    visitFieldAst(node: ast.FieldAst, context: ExecContext): Field;
    visitNameAst(node: ast.NameAst, context: ExecContext): string;
    visitArgumentAst(node: ast.ArgumentAst, context: ExecContext): Argument;
    visitVariableAst(node: ast.VariableAst, context: ExecContext): Variable;
    visitIntValueAst(node: ast.IntValueAst, context: ExecContext): number;
    visitBooleanValueAst(node: ast.BooleanValueAst, context: ExecContext): boolean;
    visitDirectiveAst(node: ast.DirectiveAst, context: ExecContext): Directive;
    visitVariableDefinitionAst(node: ast.VariableDefinitionAst, context: ExecContext): VariableDefinition;
    visitNonNullTypeAst(node: ast.NonNullTypeAst, context: ExecContext): NonNullType;
    visitListTypeAst(node: ast.ListTypeAst, context: ExecContext): ListType;
    visitNamedTypeAst(node: ast.NamedTypeAst, context: ExecContext): string;
}
export interface KeyValue<T> {
    [key: string]: T;
}
export interface OperationDefinition {
    name: string;
    variableDefinitions: KeyValue<VariableDefinition>;
    selectionSet: KeyValue<Selection>;
    directives: KeyValue<Directive>;
    operation: string;
}
export declare type Selection = Field;
export interface Field {
    alias: string;
    name: string;
    args: KeyValue<Argument>;
    directives: KeyValue<Directive>;
    selectionSet: KeyValue<Selection>;
}
export interface Variable {
    kind: `Variable`;
    name: string;
}
export interface VariableDefinition {
    defaultValue: any;
    directives: KeyValue<Directive>;
    type: string | NonNullType | ListType;
    variable: Variable;
    value?: any;
}
export interface Argument {
    name: string;
    value: any;
}
export interface Directive {
    name: string;
    args: KeyValue<Argument>;
}
export interface VariableDefinition {
    defaultValue: any;
}
export interface NonNullType {
    kind: `NonNullType`;
    type: string | ListType;
}
export interface ListType {
    kind: `ListType`;
    type: string | NonNullType | ListType;
}
export interface DirectiveDefinition {
    description: string;
    name: string;
    args: KeyValue<Argument>;
    locations: any;
}
