"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ast = tslib_1.__importStar(require("../../visitors/visitor"));
const graphql_1 = require("../../utils/graphql");
const magnus_graphql_1 = require("@notadd/magnus-graphql");
const expression_1 = require("../../visitors/expression");
const baseCreater_1 = require("./baseCreater");
class OrderCreater extends baseCreater_1.BaseCreater {
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
            const name = it.name.visit(expression_1.expressionVisitor, ``);
            const dec = it.docs.map(doc => doc.comment).join(' ');
            if (isDate || (isColumn && type === 'number')) {
                let opt = `String`;
                if (isDate) {
                    opt = 'Date';
                }
                else if (type === 'number') {
                    opt = 'Int';
                }
                input.fields.push(graphql_1.createInputValue(name, type, false, false, `${dec} ASC 升序 DESC降序`));
            }
        });
        return input;
    }
}
exports.OrderCreater = OrderCreater;
//# sourceMappingURL=orderCreater.js.map