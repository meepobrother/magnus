import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql';
export default new GraphQLScalarType({
    name: "Json",
    description: "Json",
    parseValue(value: string): object {
        return JSON.parse(value); // value from the client
    },
    serialize(value: any): string {
        return JSON.stringify(value); // value sent to the client
    },
    parseLiteral(ast): number | null {
        if (ast.kind === Kind.INT) {
            return parseInt(ast.value, 10); // ast value is always in string format
        }
        // parse
        return null;
    },
})
