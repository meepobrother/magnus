import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql';
export default new GraphQLScalarType({
    name: "Json",
    description: "Json",
    parseValue(value: object): string {
        if (typeof value === 'object') {
            return JSON.stringify(value); // value from the client
        }
        return value;
    },
    serialize(value: string): object {
        if (typeof value === 'string') {
            return JSON.parse(value);
        }
        return value;
        // value sent to the client
    },
    parseLiteral(ast): number | null {
        if (ast.kind === Kind.INT) {
            return parseInt(ast.value, 10); // ast value is always in string format
        }
        // parse
        return null;
    },
})
