import { ast as graphql } from "@notadd/magnus-graphql";
import { CollectionContext } from "./collection";
export class ApiToProtoVisitor implements graphql.Visitor {
  name: string = `ApiToProtoVisitor`;
  visitDocumentAst(node: graphql.DocumentAst, context: CollectionContext) {
    node.definitions.map(def => def.visit(this, context));
  }
}
