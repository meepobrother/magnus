"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const graphql_2 = require("graphql");
exports.default = new graphql_1.GraphQLScalarType({
    name: "Json",
    description: "Json",
    parseValue(value) {
        if (typeof value === 'object') {
            return JSON.stringify(value); // value from the client
        }
        return value;
    },
    serialize(value) {
        if (typeof value === 'string') {
            return JSON.parse(value);
        }
        return value;
        // value sent to the client
    },
    parseLiteral(ast) {
        if (ast.kind === graphql_2.Kind.INT) {
            return parseInt(ast.value, 10); // ast value is always in string format
        }
        // parse
        return null;
    },
});
//# sourceMappingURL=json.js.map