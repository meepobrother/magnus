"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const magnus_graphql_1 = require("@notadd/magnus-graphql");
const expression_1 = require("../../visitors/expression");
function createStringValue(value) {
    const node = new magnus_graphql_1.ast.StringValueAst();
    node.value = value;
    return node;
}
exports.createStringValue = createStringValue;
function createName(name) {
    const node = new magnus_graphql_1.ast.NameAst();
    node.value = name;
    return node;
}
exports.createName = createName;
function createNamedType(name) {
    const node = new magnus_graphql_1.ast.NamedTypeAst();
    node.name = createName(name);
    return node;
}
exports.createNamedType = createNamedType;
function createNonNullType(type) {
    const node = new magnus_graphql_1.ast.NonNullTypeAst();
    node.type = type;
    return node;
}
exports.createNonNullType = createNonNullType;
function createListType(type) {
    const node = new magnus_graphql_1.ast.ListTypeAst();
    node.type = type;
    return node;
}
exports.createListType = createListType;
function createTypeByName(name) {
    switch (name) {
        case "bigint":
            return createNamedType('Int');
        case "boolean":
            return createNamedType('Boolean');
        case "number":
            return createNamedType('Int');
        case "string":
            return createNamedType('String');
        case "null":
        case "undefined":
            return createNamedType('Empty');
        case "unknown":
        case "any":
        case "object":
            return createNamedType('Json');
        case "symbol":
        case "never":
        case "this":
        case "void":
            return createNamedType('Error');
        default:
            return createNamedType(name);
    }
}
exports.createTypeByName = createTypeByName;
function createTypeNode(type, isList, isNonNull) {
    let namedType = type;
    if (typeof type === 'string') {
        namedType = createTypeByName(type);
    }
    else if (type instanceof magnus_graphql_1.ast.NamedTypeAst) {
        namedType = type;
    }
    else if (type instanceof magnus_graphql_1.ast.ListTypeAst) {
        namedType = type;
    }
    else if (type instanceof magnus_graphql_1.ast.NonNullTypeAst) {
        namedType = type;
    }
    else if (type.kind === 'ArrayTypeNode') {
        namedType = createListType(createTypeByName(type.elementType));
    }
    else {
        namedType = createTypeByName(type.value);
    }
    if (isList) {
        namedType = createListType(namedType);
    }
    if (isNonNull) {
        namedType = createNonNullType(namedType);
    }
    return namedType;
}
exports.createTypeNode = createTypeNode;
function createInputValue(name, type, isNonNull = false, isList = false, description) {
    const node = new magnus_graphql_1.ast.InputValueDefinitionAst();
    node.name = createName(name);
    node.description = createStringValue(description);
    node.type = createTypeNode(type, isList, isNonNull);
    return node;
}
exports.createInputValue = createInputValue;
function createFieldDefinition(name, args, type, isList, isNonNull, description) {
    const node = new magnus_graphql_1.ast.FieldDefinitionAst();
    node.name = createName(name);
    node.arguments = args.map(arg => createInputValue(arg.name, arg.type, arg.isNonNull, arg.isList, arg.description));
    node.type = createTypeNode(type, isList, isNonNull);
    node.description = createStringValue(description);
    return node;
}
exports.createFieldDefinition = createFieldDefinition;
function createParameters(node) {
    const type = node.type.visit(expression_1.expressionVisitor, ``);
    let opt = `String`;
    if (type === 'number') {
        opt = 'Int';
    }
    return {
        name: node.name.visit(expression_1.expressionVisitor, ``),
        type: opt,
        isNonNull: false,
        isList: false,
        description: ``
    };
}
exports.createParameters = createParameters;
//# sourceMappingURL=index.js.map