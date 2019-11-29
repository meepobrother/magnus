import { ast } from '@notadd/magnus-graphql';
import { ParameterDeclaration } from '../../visitors/visitor';
export declare function createStringValue(value: string): ast.StringValueAst<any, any>;
export declare function createName(name: string): ast.NameAst<any, any>;
export declare function createNamedType(name: string): ast.NamedTypeAst<any, any>;
export declare function createNonNullType(type: ast.NamedTypeAst | ast.ListTypeAst): ast.NonNullTypeAst<any, any>;
export declare function createListType(type: ast.TypeAst): ast.ListTypeAst<any, any>;
export declare function createTypeByName(name: string): ast.NamedTypeAst<any, any>;
export declare function createTypeNode(type: any, isList: boolean, isNonNull: boolean): ast.TypeAst<any, any>;
export declare function createInputValue(name: string, type: string | ast.TypeAst | ast.NameAst, isNonNull: boolean | undefined, isList: boolean | undefined, description: string): ast.InputValueDefinitionAst<any, any>;
export interface ArgumentOptions {
    name: string;
    type: string | ast.TypeAst | ast.NameAst;
    isNonNull: boolean;
    isList: boolean;
    description: string;
}
export declare function createFieldDefinition(name: string, args: ArgumentOptions[], type: string | ast.TypeAst | ast.NameAst, isList: boolean, isNonNull: boolean, description: string): ast.FieldDefinitionAst<any, any>;
export declare function createParameters(node: ParameterDeclaration): ArgumentOptions;
