"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ast = tslib_1.__importStar(require("../../visitors/visitor"));
const graphql_1 = require("../../utils/graphql");
const magnus_graphql_1 = require("@notadd/magnus-graphql");
const expression_1 = require("../../visitors/expression");
const baseCreater_1 = require("./baseCreater");
/**
 * entity
 */
class EntityCreater extends baseCreater_1.BaseCreater {
    constructor() {
        super(``);
    }
    createClassDeclaration(name, node) {
        const input = new magnus_graphql_1.ast.ObjectTypeDefinitionAst();
        input.name = graphql_1.createName(name);
        const members = node.members
            .filter(node => node instanceof ast.MethodDeclaration)
            .filter(node => !node.modifiers.find(it => ["private", "static"].includes(it.name)));
        members.map(it => {
            const decorators = it.getDecorators()(expression_1.expressionVisitor);
            const name = it.name.visit(expression_1.expressionVisitor, ``);
            const dec = it.docs.map(doc => doc.comment).join(" ");
            const type = it.type.visit(expression_1.expressionVisitor, ``);
            const args = it.parameters.map(par => graphql_1.createParameters(par));
            let opt = `String`;
            if (type === "number") {
                opt = "Int";
            }
            input.fields.push(graphql_1.createFieldDefinition(name, args, type, false, false, dec));
        });
        return input;
    }
}
exports.EntityCreater = EntityCreater;
//# sourceMappingURL=entityCreater.js.map