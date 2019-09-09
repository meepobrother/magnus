import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql';
export default new GraphQLScalarType({
    name: "ID",
    description: "ID类型",
    parseValue(value: string | number): string | number {
        return value; // value from the client
    },
    serialize(value: any): string {
        return value.toString(); // value sent to the client
    },
    parseLiteral(ast): number | null {
        if (ast.kind === Kind.INT) {
            return parseInt(ast.value, 10); // ast value is always in string format
        }
        // parse
        return null;
    },
})
