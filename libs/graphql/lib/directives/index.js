"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
class DemoDirective extends graphql_1.GraphQLDirective {
    constructor() {
        super({
            name: 'demo',
            description: ``,
            locations: [],
            args: {}
        });
    }
}
exports.DemoDirective = DemoDirective;
//# sourceMappingURL=index.js.map