import {
  TypeVisitor,
  TypeContext,
  TypeVisitorType
} from "../../visitor3/typeVisitor";
import { TypeNode } from "../../visitors/visitor";
import { MagnusContext } from "../../visitors/magnus";
export function createTypeNode(
  node: TypeNode,
  context: MagnusContext
): TypeVisitorType {
  const typeVisitor = new TypeVisitor();
  const typeContext = new TypeContext();
  typeVisitor.typeArguments = context.parent.typeParameters;
  typeVisitor.currentEntity = context.currentEntity;
  const type = typeVisitor.visitTypeNode(node, typeContext);
  return type;
}
export function findCurrentEntity(
  type: TypeVisitorType
): TypeVisitorType | undefined {
  if (type.isEntity) return type;
  const item =
    type.typeArguments &&
    type.typeArguments.find((type: any) => findCurrentEntity(type));
  if (item) return item;
}
export function createTypeName(
  type: TypeVisitorType,
  currentEntity: string
): string {
  if (isSimpleType(type.type)) return ``;
  if (type.isEntity) return currentEntity;
  return `${
    type.typeArguments
      ? type.typeArguments.map(type => createTypeName(type, currentEntity))
      : ""
  }${type.type}`;
}
export function isSimpleType(type: string) {
  switch (type) {
    case "Int":
    case "Boolean":
    case "String":
    case "Empty":
    case "Json":
    case "Error":
      return true;
    default:
      return false;
  }
}
