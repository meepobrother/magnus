"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const util_1 = require("./util");
const typeorm_1 = require("typeorm");
class TimestampScalar extends util_1.BaseScalar {
    constructor() {
        super(...arguments);
        this.name = `Timestamp`;
        this.description = `Timestamp`;
    }
    serialize(value) {
        return typeorm_1.Timestamp.fromInt(value);
    }
    parseValue(value) {
        return value.toString();
    }
}
exports.Timestamp = new graphql_1.GraphQLScalarType(new TimestampScalar());
//# sourceMappingURL=timestrap.js.map