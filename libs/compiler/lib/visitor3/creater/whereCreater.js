"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ast = tslib_1.__importStar(require("../../visitors/visitor"));
const graphql_1 = require("../../utils/graphql");
const magnus_graphql_1 = require("@notadd/magnus-graphql");
const expression_1 = require("../../visitors/expression");
const baseCreater_1 = require("./baseCreater");
class WhereCreater extends baseCreater_1.BaseCreater {
    constructor() {
        super(...arguments);
        this.description = {
            Not: `不等于`,
            In: `在制定内，如[1,2,3,...]`,
            Lt: `小于`,
            Lte: `小于等于`,
            Gt: `大于`,
            Gte: `大于等于`,
            Like: `包含,左{title: "a%"} 右边{title: "%a"} 包含{title: "%a%"}`,
            Between: `指定范围[min,max]`
        };
    }
    createClassDeclaration(name, node) {
        const input = new magnus_graphql_1.ast.InputObjectTypeDefinitionAst();
        input.name = graphql_1.createName(name);
        const members = node.members
            .filter(node => node instanceof ast.PropertyDeclaration)
            .filter(node => !node.modifiers.find(it => ['private', 'static'].includes(it.name)));
        members.filter(node => {
            const decorators = node.getDecorators()(expression_1.expressionVisitor);
            return !decorators.find(it => ['ManyToOne', "OneToMany", "OneToOne", "ManyToMany", "TreeParent", "TreeChildren"].includes(it));
        }).map(it => {
            const decorators = it.getDecorators()(expression_1.expressionVisitor);
            const isDate = !!['CreateDateColumn', 'UpdateDateColumn', 'Time'].find(it => decorators.includes(it));
            const isColumn = !!['Column', 'PrimaryGeneratedColumn', 'PrimaryColumn', 'ObjectIdColumn'].find(it => decorators.includes(it));
            const type = it.type.visit(expression_1.expressionVisitor, ``);
            if (it.type instanceof ast.ArrayTypeNode) {
                return;
            }
            const name = it.name.visit(expression_1.expressionVisitor, ``);
            const dec = it.docs.map(doc => doc.comment).join(' ');
            const isPrimaryGeneratedColumn = !!['PrimaryGeneratedColumn'].find(it => decorators.includes(it));
            if (isDate || isPrimaryGeneratedColumn || (isColumn && type === 'number)')) {
                // 日期 time>:start And time<:end
                // Lt,Lte,Gt,Gte,Between
                let opt = `String`;
                if (isDate) {
                    opt = 'Date';
                }
                else if (type === 'number') {
                    opt = 'Int';
                }
                input.fields.push(graphql_1.createInputValue(`${name}_Lt`, opt, false, false, `${dec} ` + this.description['Lt']));
                input.fields.push(graphql_1.createInputValue(`${name}_Lte`, opt, false, false, `${dec} ` + this.description['Lte']));
                input.fields.push(graphql_1.createInputValue(`${name}_Gt`, opt, false, false, `${dec} ` + this.description['Gt']));
                input.fields.push(graphql_1.createInputValue(`${name}_Gte`, opt, false, false, `${dec} ` + this.description['Gte']));
                input.fields.push(graphql_1.createInputValue(`${name}_Between`, opt, false, true, `${dec} ` + this.description['Between']));
            }
            if (isColumn) {
                // 列
                if (type === 'string') {
                    // like
                    input.fields.push(graphql_1.createInputValue(`${name}_Like`, 'String', false, false, `${dec} ` + this.description['Like']));
                }
            }
            input.fields.push(graphql_1.createInputValue(name, type, false, false, `${dec} 等于`));
        });
        return input;
    }
}
exports.WhereCreater = WhereCreater;
//# sourceMappingURL=whereCreater.js.map