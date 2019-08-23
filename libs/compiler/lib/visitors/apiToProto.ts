import { ast as graphql } from "@notadd/magnus-graphql";

export class ApiToProtoVisitor implements graphql.Visitor {
  name: string = `ApiToProtoVisitor`;
}
