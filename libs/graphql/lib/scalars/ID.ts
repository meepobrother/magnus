import { GraphQLScalarType, GraphQLScalarTypeConfig } from "graphql";
import { BaseScalar } from "./util";
class IDScalar extends BaseScalar
  implements GraphQLScalarTypeConfig<number | string, number | string> {
  name: string = `ID`;
  description: string = `number或string`;
  parseValue(value: number | string) {
    if (typeof value === "string") {
      return String(value);
    } else {
      return Number(value);
    }
  }
  serialize(value: number | string): number | string {
    if (typeof value === "string") {
      return String(value);
    } else {
      return Number(value);
    }
  }
}

export const ID = new GraphQLScalarType(new IDScalar());
