"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ast = tslib_1.__importStar(require("../../visitors/visitor"));
const asts_1 = require("../../utils/asts");
const graphql_1 = require("../../utils/graphql");
class BaseCreater {
    constructor(name) {
        this.hasUsed = new Set();
        this.name = name;
    }
    createName(node, context) {
        this.context = context;
        if (node instanceof ast.TypeReferenceNode) {
            let type = asts_1.createTypeNode(node, context);
            const currentType = asts_1.findCurrentEntity(type);
            let current = ``;
            if (currentType) {
                current = currentType.currentEntity;
            }
            else {
                current = type.type;
                if (type.typeArguments.length === 0) {
                    if (asts_1.isSimpleType(type.type)) {
                        return {
                            name,
                            namedType: graphql_1.createName(type.type)
                        };
                    }
                    type = {
                        type: this.name,
                        typeArguments: [type]
                    };
                }
                else {
                    if (type.type === this.name) {
                        current = type.typeArguments[0].type;
                    }
                }
            }
            if (current) {
                const name = asts_1.createTypeName(type, current);
                if (this.hasUsed.has(name))
                    return { name, namedType: graphql_1.createNamedType(name) };
                this.hasUsed.add(name);
                /**
                 * 创建name
                 */
                const nameAst = this.collection.findByName(current);
                let entity;
                if (nameAst) {
                    entity = this.createEntity(name, nameAst);
                }
                return { name, namedType: graphql_1.createNamedType(name), entity };
            }
        }
    }
    createEntity(name, node) {
        if (node instanceof ast.ClassDeclaration) {
            return this.createClassDeclaration(name, node);
        }
        else if (node instanceof ast.InterfaceDeclaration) {
            return this.createInterfaceDeclaration(name, node);
        }
        else {
            console.log(`createEntity Error`);
        }
    }
    createInterfaceDeclaration(name, node) {
        throw new Error(`can not support interface to create where, please use typeorm entity and column class!`);
    }
}
exports.BaseCreater = BaseCreater;
//# sourceMappingURL=baseCreater.js.map