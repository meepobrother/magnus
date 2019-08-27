"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ast = tslib_1.__importStar(require("./visitor"));
const graphql = tslib_1.__importStar(require("@notadd/magnus-graphql"));
class TypeFactory {
    get preName() {
        const preName = Array.isArray(this.entity) ? this.entity.join('') : this.entity;
        return preName || '';
    }
    createGraphqlObjectTypeDefinitionAst({ name, fields }) {
        const obj = new graphql.ObjectTypeDefinitionAst();
        obj.name = this.createNameAst(name);
        obj.fields = fields.map(field => this.createFieldDefinitionAst(field));
        return obj;
    }
    createFieldDefinitionAst(field) {
        const ast = new graphql.FieldDefinitionAst();
        ast.name = this.createNameAst(field.name);
        ast.arguments = field.arguments.map(arg => {
            return this.createInputValueDefinitionAst(arg);
        });
        ast.type = this.createTypeAst(field.type);
        return ast;
    }
    /**
     * 创建TypeAst
     * @param name 指定名字
     */
    createTypeAst(name) {
        const ast = new graphql.NamedTypeAst();
        ast.name = this.createNameAst(name);
        return ast;
    }
    createInputValueDefinitionAst(node) {
        const ast = new graphql.InputValueDefinitionAst();
        ast.name = this.createNameAst(node.name);
        return ast;
    }
    createNameAst(name) {
        const ast = new graphql.NameAst();
        ast.value = name;
        return ast;
    }
    createInterface(node) {
        const name = `${this.preName}${node.name.text}`;
        const fields = node.members.map(member => {
            member;
        });
        return this.createGraphqlObjectTypeDefinitionAst({
            name,
            fields
        });
    }
}
TypeFactory.map = new Map();
class CreateTypeNode {
    constructor() {
        this.name = `CreateTypeNode`;
    }
}
exports.CreateTypeNode = CreateTypeNode;
/**
 * 创建一个type
 */
function createTypeReferenceNode(node) {
    const { typeArguments, typeName } = node;
    typeArguments.map(type => createTypeNode(type));
}
exports.createTypeReferenceNode = createTypeReferenceNode;
function createUnionTypeNode(node) {
}
exports.createUnionTypeNode = createUnionTypeNode;
function createKeywordTypeNode(node) {
}
exports.createKeywordTypeNode = createKeywordTypeNode;
function createArrayTypeNode(node) {
    const ast = new graphql.ListTypeAst();
    return ast;
}
exports.createArrayTypeNode = createArrayTypeNode;
function createTypeNode(node) {
    if (node instanceof ast.TypeReferenceNode) {
        return createTypeReferenceNode(node);
    }
    else if (node instanceof ast.TupleTypeNode) {
        throw new Error(`has no visitTupleTypeNode`);
    }
    else if (node instanceof ast.UnionTypeNode) {
        return createUnionTypeNode(node);
    }
    else if (node instanceof ast.KeywordTypeNode) {
        return createKeywordTypeNode(node);
    }
    else if (node instanceof ast.FunctionTypeNode) {
        throw new Error(`has no visitFunctionTypeNode`);
    }
    else if (node instanceof ast.MappedTypeNode) {
        throw new Error(`has no visitMappedTypeNode`);
    }
    else if (node instanceof ast.IndexedAccessTypeNode) {
        throw new Error(`has no visitIndexedAccessTypeNode`);
    }
    else if (node instanceof ast.TypeOperatorNode) {
        throw new Error(`has no visitTypeOperatorNode`);
    }
    else if (node instanceof ast.TypeLiteralNode) {
        throw new Error(`has no visitTypeLiteralNode`);
    }
    else if (node instanceof ast.ArrayTypeNode) {
        return createArrayTypeNode(node);
    }
    else if (node instanceof ast.LiteralTypeNode) {
        throw new Error(`has no visitLiteralTypeNode`);
    }
    else if (node instanceof ast.TypePredicateNode) {
        throw new Error(`has no visitTypePredicateNode`);
    }
    else if (node instanceof ast.ImportTypeNode) {
        throw new Error(`has no visitImportTypeNode`);
    }
    else if (node instanceof ast.ParenthesizedTypeNode) {
        throw new Error(`has no visitParenthesizedTypeNode`);
    }
    else if (node instanceof ast.IntersectionTypeNode) {
        throw new Error(`has no visitIntersectionTypeNode`);
    }
    else if (node instanceof ast.ExpressionWithTypeArguments) {
        throw new Error(`has no visitExpressionWithTypeArguments`);
    }
    else if (node instanceof ast.JSDocNullableType) {
        throw new Error(`has no visitJSDocNullableType`);
    }
}
exports.createTypeNode = createTypeNode;
//# sourceMappingURL=createType.js.map