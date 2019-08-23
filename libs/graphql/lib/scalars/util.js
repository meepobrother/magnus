"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
class BaseScalar {
    parseObject(ast, variables) {
        const value = Object.create(null);
        ast.fields.forEach((field) => {
            value[field.name.value] = this.parseLiteral(field.value, variables);
        });
        return value;
    }
    parseLiteral(ast, variables) {
        switch (ast.kind) {
            case graphql_1.Kind.STRING:
            case graphql_1.Kind.BOOLEAN:
                return ast.value;
            case graphql_1.Kind.INT:
            case graphql_1.Kind.FLOAT:
                return parseFloat(ast.value);
            case graphql_1.Kind.OBJECT:
                return this.parseObject(ast, variables);
            case graphql_1.Kind.LIST:
                return ast.values.map((n) => this.parseLiteral(n, variables));
            case graphql_1.Kind.NULL:
                return null;
            case graphql_1.Kind.VARIABLE: {
                const name = ast.name.value;
                return variables ? variables[name] : undefined;
            }
            default:
                return undefined;
        }
    }
    toScalar() {
        return {
            name: this.name,
            description: this.description,
            parseValue(value) {
                return this.parseValue(value);
            },
            serialize(value) {
                return this.serialize(value);
            },
            parseLiteral(node, vars) {
                return this.parseLiteral(node, vars);
            }
        };
    }
}
exports.BaseScalar = BaseScalar;
//# sourceMappingURL=util.js.map