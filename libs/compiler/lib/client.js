"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const globby = require("globby");
const fs_extra_1 = require("fs-extra");
const magnus_graphql_1 = require("@notadd/magnus-graphql");
const graphqlToTs_1 = require("./visitors/graphqlToTs");
const fs_extra_2 = require("fs-extra");
async function bootstrapClient(config) {
    const client = config.client;
    if (client) {
        const sources = client.map(input => path_1.join(config.root, input));
        const inputs = await globby([
            ...sources,
            `!${path_1.join(config.root, config.assets)}/**/*`
        ]);
        const clientTs = new graphqlToTs_1.GraphqlToTs();
        clientTs.config = config;
        const path = path_1.join(config.root, config.def);
        if (fs_extra_1.existsSync(path)) {
            const def = fs_extra_1.readFileSync(path_1.join(config.root, config.def)).toString("utf8");
            clientTs.schema = magnus_graphql_1.parse(def);
            inputs.map(input => {
                const path = input.replace(".graphql", ".ts");
                try {
                    const code = fs_extra_1.readFileSync(input).toString("utf8");
                    const ast = magnus_graphql_1.parse(code);
                    const result = ast.visit(clientTs, ``);
                    fs_extra_2.writeFileSync(path, result);
                }
                catch (e) {
                    console.log(`create ${path} error!!!`, e.message);
                }
            });
        }
        else {
            console.log(`不存在${path}文件`);
        }
    }
}
exports.bootstrapClient = bootstrapClient;
//# sourceMappingURL=client.js.map