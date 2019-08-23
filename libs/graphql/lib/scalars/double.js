"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const util_1 = require("./util");
class DoubleScalar extends util_1.BaseScalar {
    constructor() {
        super(...arguments);
        this.name = `Double`;
        this.description = `Double`;
    }
    parseValue(value) {
        return value;
    }
    serialize(value) {
        return value;
    }
}
exports.Double = new graphql_1.GraphQLScalarType(new DoubleScalar());
//# sourceMappingURL=double.js.map