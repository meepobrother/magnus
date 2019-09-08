import * as ast from '../../visitors/visitor';
import { createTypeNode, findCurrentEntity, createTypeName, isSimpleType } from '../../utils/asts';
import { MagnusContext } from '../../visitors/magnus';
import { createNamedType, createName } from '../../utils/graphql';
import { CollectionContext } from '../../visitors/collection';
import { ast as graphql } from '@notadd/magnus-graphql';

export abstract class BaseCreater {
    name: string;
    collection: CollectionContext;
    documentAst: graphql.DocumentAst;
    hasUsed: Set<string> = new Set();
    constructor(name: string) {
        this.name = name;
    }
    createName(node: ast.TypeReferenceNode, context: MagnusContext) {
        if (node instanceof ast.TypeReferenceNode) {
            let type = createTypeNode(node, context)
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
                        }
                    }
                    type = {
                        type: this.name,
                        typeArguments: [
                            type,
                        ]
                    }
                }
            }
            if (current) {
                const name = createTypeName(type, current);
                if (this.hasUsed.has(name)) return { name, namedType: createNamedType(name) };
                this.hasUsed.add(name);
                /**
                 * 创建name
                 */
                const nameAst = this.collection.findByName(current) as any;
                let entity: any;
                if (nameAst) {
                    entity = this.createEntity(name, nameAst, context)
                }
                return { name, namedType: createNamedType(name), entity };
            }
        }
    }

    createEntity(name: string, node: ast.ClassDeclaration | ast.InterfaceDeclaration, context: MagnusContext) {
        if (node instanceof ast.ClassDeclaration) {
            return this.createClassDeclaration(name, node, context)
        }
        if (node instanceof ast.InterfaceDeclaration) {
            return this.createInterfaceDeclaration(name, node)
        }
    }

    abstract createClassDeclaration(name: string, node: ast.ClassDeclaration, context: MagnusContext): any;

    createInterfaceDeclaration(name: string, node: ast.InterfaceDeclaration) {
        throw new Error(`can not support interface to create where, please use typeorm entity and column class!`);
    }

}