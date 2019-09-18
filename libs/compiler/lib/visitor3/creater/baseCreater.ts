import * as ast from "../../visitors/visitor";
import {
  createTypeNode,
  findCurrentEntity,
  createTypeName,
  isSimpleType
} from "../../utils/asts";
import { MagnusContext } from "../../visitors/magnus";
import { createNamedType, createName } from "../../utils/graphql";
import { CollectionContext } from "../../visitors/collection";
import { ast as graphql } from "@notadd/magnus-graphql";
export abstract class BaseCreater {
  name: string;
  collection: CollectionContext;
  context: MagnusContext;
  hasUsed: Set<string> = new Set();
  documentAst: graphql.DocumentAst;
  constructor(name: string) {
    this.name = name;
  }
  createName(node: ast.TypeReferenceNode, context: MagnusContext) {
    this.context = context;
    if (node instanceof ast.TypeReferenceNode) {
      let type = createTypeNode(node, context);
      const currentType = findCurrentEntity(type);
      let current: string = ``;
      if (currentType) {
        current = currentType.currentEntity!;
      } else {
        current = type.type;
        if (type.typeArguments.length === 0) {
          if (isSimpleType(type.type)) {
            return {
              name,
              namedType: createName(type.type)
            };
          }
          type = {
            type: this.name,
            typeArguments: [type]
          };
        } else {
          if (type.type === this.name) {
            current = type.typeArguments[0].type;
          }
        }
      }
      if (current) {
        const name = createTypeName(type, current);

        if (this.hasUsed.has(name))
          return { name, namedType: createNamedType(name) };
        this.hasUsed.add(name);
        /**
         * 创建name
         */
        const nameAst = this.collection.findByName(current) as any;
        let entity: any;
        if (nameAst) {
          entity = this.createEntity(name, nameAst);
        }
        return { name, namedType: createNamedType(name), entity };
      }
    }
  }

  createEntity(
    name: string,
    node: ast.ClassDeclaration | ast.InterfaceDeclaration
  ) {
    if (node instanceof ast.ClassDeclaration) {
      return this.createClassDeclaration(name, node);
    } else if (node instanceof ast.InterfaceDeclaration) {
      return this.createInterfaceDeclaration(name, node);
    } else {
      console.log(`createEntity Error`);
    }
  }

  abstract createClassDeclaration(
    name: string,
    node: ast.ClassDeclaration
  ): any;

  createInterfaceDeclaration(name: string, node: ast.InterfaceDeclaration) {
    throw new Error(
      `can not support interface to create where, please use typeorm entity and column class!`
    );
  }
}
