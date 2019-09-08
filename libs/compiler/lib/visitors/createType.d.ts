import * as ast from './visitor';
import * as graphql from '@notadd/magnus-graphql';
/**
 * 创建typeNode
 */
declare type Entity = string;
declare class TypeFactory {
    static map: Map<string, any>;
    entity: Entity[] | Entity;
    node: ast.InterfaceDeclaration | ast.TypeAliasDeclaration | ast.ClassDeclaration;
    /**
     * 是否是input
     * 如果是input需要去掉特殊类型，如方法等
     */
    isInput: boolean;
    readonly preName: string;
    createGraphqlObjectTypeDefinitionAst({ name, fields }: {
        name: string;
        fields: any[];
    }): graphql.ObjectTypeDefinitionAst;
    createFieldDefinitionAst(field: {
        name: string;
        arguments: any[];
        type: string;
    }): graphql.FieldDefinitionAst<any, any>;
    /**
     * 创建TypeAst
     * @param name 指定名字
     */
    createTypeAst(name: string): graphql.TypeAst;
    createInputValueDefinitionAst(node: any): graphql.InputValueDefinitionAst<any, any>;
    createNameAst(name: string): graphql.NameAst<any, any>;
    createInterface(node: ast.InterfaceDeclaration): graphql.ObjectTypeDefinitionAst<any, any>;
}
export declare type EntityTypeCache = Map<Entity, TypeFactory[]>;
export declare class CreateTypeNode implements ast.Visitor {
    name: string;
}
/**
 * 创建一个type
 */
export declare function createTypeReferenceNode(node: ast.TypeReferenceNode): void;
export declare function createUnionTypeNode(node: ast.UnionTypeNode): void;
export declare function createKeywordTypeNode(node: ast.KeywordTypeNode): void;
export declare function createArrayTypeNode(node: ast.ArrayTypeNode): graphql.ListTypeAst<any, any>;
export declare function createTypeNode(node: ast.TypeNode): void | graphql.ListTypeAst<any, any>;
export {};
