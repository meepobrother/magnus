"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const util_1 = require("./util");
class FloatScalar extends util_1.BaseScalar {
    constructor() {
        super(...arguments);
        this.name = `Float`;
        this.description = `Float`;
    }
    parseValue(value) {
        return value;
    }
    serialize(value) {
        return value;
    }
}
exports.Float = new graphql_1.GraphQLScalarType(new FloatScalar());
//# sourceMappingURL=Float.js.map