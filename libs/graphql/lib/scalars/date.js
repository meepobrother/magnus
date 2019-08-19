"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const graphql_2 = require("graphql");
exports.default = new graphql_1.GraphQLScalarType({
    name: "Date",
    description: "日期类型",
    parseValue(value) {
        console.log(value);
        return new Date(value); // value from the client
    },
    serialize(value) {
        console.log(value);
        return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
        if (ast.kind === graphql_2.Kind.INT) {
            return parseInt(ast.value, 10); // ast value is always in string format
        }
        // parse
        return null;
    },
});
//# sourceMappingURL=date.js.map