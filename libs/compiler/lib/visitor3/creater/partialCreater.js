"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ast = tslib_1.__importStar(require("../../visitors/visitor"));
const graphql_1 = require("../../utils/graphql");
const magnus_graphql_1 = require("@notadd/magnus-graphql");
const expression_1 = require("../../visitors/expression");
const baseCreater_1 = require("./baseCreater");
class PartialCreater extends baseCreater_1.BaseCreater {
    createClassDeclaration(name, node, context) {
        const input = new magnus_graphql_1.ast.InputObjectTypeDefinitionAst();
        input.name = graphql_1.createName(name);
        const members = node.members
            .filter(node => node instanceof ast.PropertyDeclaration)
            .filter(node => !node.modifiers.find(it => ['private', 'static'].includes(it.name)));
        members.map(it => {
            const decorators = it.getDecorators()(expression_1.expressionVisitor);
            const isRelation = decorators.find(it => ['ManyToOne', "OneToMany", "OneToOne", "ManyToMany", "TreeParent", "TreeChildren"].includes(it));
            const isDate = !!['CreateDateColumn', 'UpdateDateColumn', 'Time'].find(it => decorators.includes(it));
            const isColumn = !!['Column', 'PrimaryGeneratedColumn', 'PrimaryColumn', 'ObjectIdColumn'].find(it => decorators.includes(it));
            const isAuto = !!['CreateDateColumn', 'UpdateDateColumn'].find(it => decorators.includes(it));
            const name = it.name.visit(expression_1.expressionVisitor, ``);
            const dec = it.docs.map(doc => doc.comment).join(' ');
            if (isAuto) { }
            else if (isDate || (isColumn)) {
                const type = it.type.visit(expression_1.expressionVisitor, ``);
                let opt = `String`;
                if (isDate) {
                    opt = 'Date';
                }
                else if (type === 'number') {
                    opt = 'Int';
                }
                input.fields.push(graphql_1.createInputValue(name, type, false, false, dec));
            }
            else if (isRelation) {
                // 关系
                const oneToMany = it.getDecorator('OneToMany')(expression_1.expressionVisitor);
                // console.log({
                //     oneToMany
                // })
                if (it.type instanceof ast.TypeReferenceNode) {
                    const createName = this.createName(it.type, context);
                    if (createName) {
                        const { name: astName, entity, namedType } = createName;
                        if (!this.documentAst.hasDefinitionAst(astName)) {
                            this.documentAst.definitions.push(entity);
                        }
                        input.fields.push(graphql_1.createInputValue(name, namedType, false, false, dec));
                    }
                }
                else if (it.type instanceof ast.ArrayTypeNode) {
                    const createName = this.createName(it.type.elementType, context);
                    if (createName) {
                        const { name: astName, entity, namedType } = createName;
                        if (!this.documentAst.hasDefinitionAst(astName)) {
                            this.documentAst.definitions.push(entity);
                        }
                        input.fields.push(graphql_1.createInputValue(name, namedType, false, true, dec));
                    }
                }
                else {
                    console.log(it.type);
                }
            }
        });
        return input;
    }
}
exports.PartialCreater = PartialCreater;
//# sourceMappingURL=partialCreater.js.map