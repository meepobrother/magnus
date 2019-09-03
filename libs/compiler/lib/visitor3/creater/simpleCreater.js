"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ast = tslib_1.__importStar(require("../../visitors/visitor"));
const graphql_1 = require("../../utils/graphql");
const magnus_graphql_1 = require("@notadd/magnus-graphql");
const expression_1 = require("../../visitors/expression");
const baseCreater_1 = require("./baseCreater");
class SimpleCreater extends baseCreater_1.BaseCreater {
    createClassDeclaration(name, node) {
        const input = new magnus_graphql_1.ast.InputObjectTypeDefinitionAst();
        input.name = graphql_1.createName(name);
        const members = node.members
            .filter(node => node instanceof ast.PropertyDeclaration)
            .filter(node => !node.modifiers.find(it => ['private', 'static'].includes(it.name)));
        members.map(it => {
            const decorators = it.getDecorators()(expression_1.expressionVisitor);
            const isDate = !!['CreateDateColumn', 'UpdateDateColumn', 'Time'].find(it => decorators.includes(it));
            const isColumn = !!['Column', 'PrimaryGeneratedColumn', 'PrimaryColumn', 'ObjectIdColumn'].find(it => decorators.includes(it));
            const isAuto = !!['CreateDateColumn', 'UpdateDateColumn'].find(it => decorators.includes(it));
            const name = it.name.visit(expression_1.expressionVisitor, ``);
            const dec = it.docs.map(doc => doc.comment).join(' ');
            if (isAuto) { }
            else if (isDate || (isColumn)) {
                const type = it.type.visit(expression_1.expressionVisitor, ``);
                input.fields.push(graphql_1.createInputValue(name, type, false, false, dec));
            }
        });
        return input;
    }
}
exports.SimpleCreater = SimpleCreater;
//# sourceMappingURL=simpleCreater.js.map