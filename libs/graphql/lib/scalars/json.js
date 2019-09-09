"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const language_1 = require("graphql/language");
function identity(value) {
    return value;
}
function ensureObject(value) {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        throw new TypeError(`JSONObject cannot represent non-object value: ${value}`);
    }
    return value;
}
function parseObject(ast, variables) {
    const value = Object.create(null);
    ast.fields.forEach((field) => {
        // eslint-disable-next-line no-use-before-define
        value[field.name.value] = parseLiteral(field.value, variables);
    });
    return value;
}
function parseLiteral(ast, variables) {
    switch (ast.kind) {
        case language_1.Kind.STRING:
        case language_1.Kind.BOOLEAN:
            return ast.value;
        case language_1.Kind.INT:
        case language_1.Kind.FLOAT:
            return parseFloat(ast.value);
        case language_1.Kind.OBJECT:
            return parseObject(ast, variables);
        case language_1.Kind.LIST:
            return ast.values.map((n) => parseLiteral(n, variables));
        case language_1.Kind.NULL:
            return null;
        case language_1.Kind.VARIABLE: {
            const name = ast.name.value;
            return variables ? variables[name] : undefined;
        }
        default:
            return undefined;
    }
}
// This named export is intended for users of CommonJS. Users of ES modules
// should instead use the default export.
exports.GraphQLJSON = new graphql_1.GraphQLScalarType({
    name: 'Json',
    description: 'The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).',
    serialize: identity,
    parseValue: identity,
    parseLiteral,
});
exports.default = exports.GraphQLJSON;
exports.JsonObject = new graphql_1.GraphQLScalarType({
    name: 'JsonObject',
    description: 'The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).',
    serialize: ensureObject,
    parseValue: ensureObject,
    parseLiteral: parseObject,
});
//# sourceMappingURL=json.js.map