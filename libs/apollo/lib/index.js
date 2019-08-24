"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const magnus_core_1 = require("@notadd/magnus-core");
const magnus_graphql_1 = require("@notadd/magnus-graphql");
function bootstrap(map, context, injectDef, entityDef, entities, port) {
    const resolvers = magnus_core_1.createResolver(map, injectDef, entityDef, entities);
    const server = new apollo_server_1.ApolloServer({
        typeDefs: context,
        resolvers: { ...resolvers, ...magnus_graphql_1.scalars }
    });
    server.listen(port).then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`);
    });
    process.on("beforeExit", () => {
        console.log("exit");
        process.exit();
    });
}
exports.bootstrap = bootstrap;
//# sourceMappingURL=index.js.map