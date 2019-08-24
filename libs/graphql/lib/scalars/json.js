"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const util_1 = require("./util");
class JsonScalar extends util_1.BaseScalar {
    constructor() {
        super(...arguments);
        this.name = `Json`;
        this.description = `Json`;
    }
    serialize(value) {
        return value;
    }
    parseValue(value) {
        return value;
    }
}
exports.Json = new graphql_1.GraphQLScalarType(new JsonScalar());
//# sourceMappingURL=json.js.map