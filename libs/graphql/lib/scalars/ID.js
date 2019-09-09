"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const graphql_2 = require("graphql");
exports.default = new graphql_1.GraphQLScalarType({
    name: "ID",
    description: "ID类型",
    parseValue(value) {
        return value; // value from the client
    },
    serialize(value) {
        return value.toString(); // value sent to the client
    },
    parseLiteral(ast) {
        if (ast.kind === graphql_2.Kind.INT) {
            return parseInt(ast.value, 10); // ast value is always in string format
        }
        // parse
        return null;
    },
});
//# sourceMappingURL=ID.js.map