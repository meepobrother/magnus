import * as ast from './visitor';
import * as graphql from '@notadd/magnus-graphql';

/**
 * 创建typeNode
 */
type Entity = string;
class TypeFactory {
    static map: Map<string, any> = new Map();
    entity: Entity[] | Entity;
    node: ast.InterfaceDeclaration |
        ast.TypeAliasDeclaration |
        ast.ClassDeclaration;
    /**
     * 是否是input
     * 如果是input需要去掉特殊类型，如方法等
     */
    isInput: boolean;
    get preName() {
        const preName = Array.isArray(this.entity) ? this.entity.join('') : this.entity;
        return preName || ''
    }
    createGraphqlObjectTypeDefinitionAst({
        name, fields
    }: { name: string, fields: any[] }): graphql.ObjectTypeDefinitionAst {
        const obj = new graphql.ObjectTypeDefinitionAst();
        obj.name = this.createNameAst(name);
        obj.fields = fields.map(field => this.createFieldDefinitionAst(field))
        return obj;
    }

    createFieldDefinitionAst(field: { name: string, arguments: any[], type: string }) {
        const ast = new graphql.FieldDefinitionAst();
        ast.name = this.createNameAst(field.name);
        ast.arguments = field.arguments.map(arg => {
            return this.createInputValueDefinitionAst(arg)
        });
        ast.type = this.createTypeAst(field.type)
        return ast;
    }
    /**
     * 创建TypeAst
     * @param name 指定名字
     */
    createTypeAst(name: string): graphql.TypeAst {
        const ast = new graphql.NamedTypeAst();
        ast.name = this.createNameAst(name);
        return ast;
    }

    createInputValueDefinitionAst(node: any) {
        const ast = new graphql.InputValueDefinitionAst();
        ast.name = this.createNameAst(node.name);
        return ast;
    }

    createNameAst(name: string) {
        const ast = new graphql.NameAst()
        ast.value = name;
        return ast;
    }

    createInterface(node: ast.InterfaceDeclaration) {
        const name = `${this.preName}${node.name.text}`;
        const fields = node.members.map(member => {
            member
        });
        return this.createGraphqlObjectTypeDefinitionAst({
            name,
            fields
        });
    }
}
export type EntityTypeCache = Map<Entity, TypeFactory[]>;
export class CreateTypeNode implements ast.Visitor {
    name: string = `CreateTypeNode`;
}

/**
 * 创建一个type
 */
export function createTypeReferenceNode(node: ast.TypeReferenceNode) {
    const { typeArguments, typeName } = node;
    typeArguments.map(type => createTypeNode(type));
}
export function createUnionTypeNode(node: ast.UnionTypeNode) {

}
export function createKeywordTypeNode(node: ast.KeywordTypeNode) {

}
export function createArrayTypeNode(node: ast.ArrayTypeNode) {
    const ast = new graphql.ListTypeAst();
    return ast;
}
export function createTypeNode(node: ast.TypeNode) {
    if (node instanceof ast.TypeReferenceNode) {
        return createTypeReferenceNode(node)
    }
    else if (node instanceof ast.TupleTypeNode) {
        throw new Error(`has no visitTupleTypeNode`)
    }
    else if (node instanceof ast.UnionTypeNode) {
        return createUnionTypeNode(node)
    }
    else if (node instanceof ast.KeywordTypeNode) {
        return createKeywordTypeNode(node)
    }
    else if (node instanceof ast.FunctionTypeNode) {
        throw new Error(`has no visitFunctionTypeNode`)
    }
    else if (node instanceof ast.MappedTypeNode) {
        throw new Error(`has no visitMappedTypeNode`)
    }
    else if (node instanceof ast.IndexedAccessTypeNode) {
        throw new Error(`has no visitIndexedAccessTypeNode`)
    }
    else if (node instanceof ast.TypeOperatorNode) {
        throw new Error(`has no visitTypeOperatorNode`)
    }
    else if (node instanceof ast.TypeLiteralNode) {
        throw new Error(`has no visitTypeLiteralNode`)
    }
    else if (node instanceof ast.ArrayTypeNode) {
        return createArrayTypeNode(node)
    }
    else if (node instanceof ast.LiteralTypeNode) {
        throw new Error(`has no visitLiteralTypeNode`)
    }
    else if (node instanceof ast.TypePredicateNode) {
        throw new Error(`has no visitTypePredicateNode`)
    }
    else if (node instanceof ast.ImportTypeNode) {
        throw new Error(`has no visitImportTypeNode`)
    }
    else if (node instanceof ast.ParenthesizedTypeNode) {
        throw new Error(`has no visitParenthesizedTypeNode`)
    }
    else if (node instanceof ast.IntersectionTypeNode) {
        throw new Error(`has no visitIntersectionTypeNode`)
    }
    else if (node instanceof ast.ExpressionWithTypeArguments) {
        throw new Error(`has no visitExpressionWithTypeArguments`)
    }
    else if (node instanceof ast.JSDocNullableType) {
        throw new Error(`has no visitJSDocNullableType`)
    }
}