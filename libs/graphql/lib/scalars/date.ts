import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql';
export default new GraphQLScalarType({
    name: "Date",
    description: "日期类型",
    parseValue(value: string | number): Date {
        return new Date(value); // value from the client
    },
    serialize(value: Date): string {
        return value.toISOString(); // value sent to the client
    },
    parseLiteral(ast): number | null {
        if (ast.kind === Kind.INT) {
            return parseInt(ast.value, 10); // ast value is always in string format
        }
        // parse
        return null;
    },
})
