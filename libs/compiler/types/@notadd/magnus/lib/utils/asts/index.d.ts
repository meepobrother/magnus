import { TypeVisitorType } from "../../visitor3/typeVisitor";
import { TypeNode } from "../../visitors/visitor";
import { MagnusContext } from "../../visitors/magnus";
export declare function createTypeNode(node: TypeNode, context: MagnusContext): TypeVisitorType;
export declare function findCurrentEntity(type: TypeVisitorType): TypeVisitorType | undefined;
export declare function createTypeName(type: TypeVisitorType, currentEntity: string): string;
export declare function isSimpleType(type: string): boolean;
