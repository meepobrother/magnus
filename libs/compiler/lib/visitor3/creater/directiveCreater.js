"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("../../utils/graphql");
const magnus_graphql_1 = require("@notadd/magnus-graphql");
const baseCreater_1 = require("./baseCreater");
class DirectiveCreater extends baseCreater_1.BaseCreater {
    constructor() {
        super(``);
    }
    createClassDeclaration(name, node) {
        const input = new magnus_graphql_1.ast.DirectiveDefinitionAst();
        input.name = graphql_1.createName(name);
        const docs = node.docs.map((doc) => doc.comment).join('\n');
        input.description = graphql_1.createStringValue(docs);
        return input;
    }
}
exports.DirectiveCreater = DirectiveCreater;
//# sourceMappingURL=directiveCreater.js.map