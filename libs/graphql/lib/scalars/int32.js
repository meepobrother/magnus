"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const util_1 = require("./util");
class Int32Scalar extends util_1.BaseScalar {
    constructor() {
        super(...arguments);
        this.name = `Int32`;
        this.description = `Int32`;
    }
    parseValue(value) {
        return value;
    }
    serialize(value) {
        return value;
    }
}
exports.Int32 = new graphql_1.GraphQLScalarType(new Int32Scalar());
/**
 * bigint
 */
class Int64Scalar extends util_1.BaseScalar {
    constructor() {
        super(...arguments);
        this.name = `Int64`;
        this.description = `Int64`;
    }
    parseValue(value) {
        return value.toString();
    }
    serialize(value) {
        return BigInt(value);
    }
}
exports.Int64 = new graphql_1.GraphQLScalarType(new Int64Scalar());
class Uint32Scalar extends util_1.BaseScalar {
    constructor() {
        super(...arguments);
        this.name = `Uint32`;
        this.description = `Uint32`;
    }
    parseValue(value) {
        return value;
    }
    serialize(value) {
        return value;
    }
}
exports.Uint32 = new graphql_1.GraphQLScalarType(new Uint32Scalar());
class Sint32Scalar extends util_1.BaseScalar {
    constructor() {
        super(...arguments);
        this.name = `Sint32`;
        this.description = `Sint32`;
    }
    parseValue(value) {
        return value;
    }
    serialize(value) {
        return value;
    }
}
exports.Sint32 = new graphql_1.GraphQLScalarType(new Sint32Scalar());
class Fixed32Scalar extends util_1.BaseScalar {
    constructor() {
        super(...arguments);
        this.name = `Fixed32`;
        this.description = `Fixed32`;
    }
    parseValue(value) {
        return value;
    }
    serialize(value) {
        return value;
    }
}
exports.Fixed32 = new graphql_1.GraphQLScalarType(new Fixed32Scalar());
class Sfixed32Scalar extends util_1.BaseScalar {
    constructor() {
        super(...arguments);
        this.name = `Sfixed32`;
        this.description = `Sfixed32`;
    }
    parseValue(value) {
        return value;
    }
    serialize(value) {
        return value;
    }
}
exports.Sfixed32 = new graphql_1.GraphQLScalarType(new Sfixed32Scalar());
class Uint64Scalar extends util_1.BaseScalar {
    constructor() {
        super(...arguments);
        this.name = `Uint64`;
        this.description = `Uint64`;
    }
    parseValue(value) {
        return value;
    }
    serialize(value) {
        return value;
    }
}
exports.Uint64 = new graphql_1.GraphQLScalarType(new Uint64Scalar());
class Sint64Scalar extends util_1.BaseScalar {
    constructor() {
        super(...arguments);
        this.name = `Sint64`;
        this.description = `Sint64`;
    }
    parseValue(value) {
        return value;
    }
    serialize(value) {
        return value;
    }
}
exports.Sint64 = new graphql_1.GraphQLScalarType(new Sint64Scalar());
class Fixed64Scalar extends util_1.BaseScalar {
    constructor() {
        super(...arguments);
        this.name = `Fixed64`;
        this.description = `Fixed64`;
    }
    parseValue(value) {
        return value;
    }
    serialize(value) {
        return value;
    }
}
exports.Fixed64 = new graphql_1.GraphQLScalarType(new Fixed64Scalar());
class Sfixed64Scalar extends util_1.BaseScalar {
    constructor() {
        super(...arguments);
        this.name = `Sfixed64`;
        this.description = `Sfixed64`;
    }
    parseValue(value) {
        return value;
    }
    serialize(value) {
        return value;
    }
}
exports.Sfixed64 = new graphql_1.GraphQLScalarType(new Sfixed64Scalar());
class BoolScalar extends util_1.BaseScalar {
    constructor() {
        super(...arguments);
        this.name = `Bool`;
        this.description = `Bool`;
    }
    parseValue(value) {
        return value;
    }
    serialize(value) {
        return value;
    }
}
exports.Bool = new graphql_1.GraphQLScalarType(new BoolScalar());
class BytesScalar extends util_1.BaseScalar {
    constructor() {
        super(...arguments);
        this.name = `Bytes`;
        this.description = `Bytes`;
    }
    parseValue(value) {
        return value;
    }
    serialize(value) {
        return value;
    }
}
exports.Bytes = new graphql_1.GraphQLScalarType(new BytesScalar());
class EmptyScalar extends util_1.BaseScalar {
    constructor() {
        super(...arguments);
        this.name = `Empty`;
        this.description = `Empty`;
    }
    parseValue(value) {
        return value;
    }
    serialize(value) {
        return value;
    }
}
exports.Empty = new graphql_1.GraphQLScalarType(new EmptyScalar());
class ErrorScalar extends util_1.BaseScalar {
    constructor() {
        super(...arguments);
        this.name = `Error`;
        this.description = `Error`;
    }
    parseValue(value) {
        return value;
    }
    serialize(value) {
        return value;
    }
}
exports.Error = new graphql_1.GraphQLScalarType(new ErrorScalar());
//# sourceMappingURL=int32.js.map