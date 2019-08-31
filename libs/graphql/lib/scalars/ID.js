"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const util_1 = require("./util");
class IDScalar extends util_1.BaseScalar {
    constructor() {
        super(...arguments);
        this.name = `ID`;
        this.description = `number或string`;
    }
    parseValue(value) {
        if (typeof value === "string") {
            return String(value);
        }
        else {
            return Number(value);
        }
    }
    serialize(value) {
        if (typeof value === "string") {
            return String(value);
        }
        else {
            return Number(value);
        }
    }
}
exports.ID = new graphql_1.GraphQLScalarType(new IDScalar());
//# sourceMappingURL=ID.js.map