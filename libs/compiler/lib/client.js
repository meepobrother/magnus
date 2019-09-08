"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const globby = require("globby");
const fs_extra_1 = require("fs-extra");
const buildApi_1 = require("./buildApi");
async function bootstrapClient(config) {
    const client = config.client;
    if (client) {
        const sources = client.map(input => path_1.join(config.root, input));
        const inputs = await globby([
            ...sources,
            `!${path_1.join(config.root, config.assets)}/**/*`
        ]);
        const path = path_1.join(config.root, config.def);
        if (fs_extra_1.existsSync(path)) {
            inputs.map(input => {
                const graphqlDest = input.replace(".graphql", ".ts");
                buildApi_1.buildMagnusApi(path_1.join(config.root, config.def), path_1.join(input), path_1.join(graphqlDest), config.name);
            });
        }
        else {
            console.log(`不存在${path}文件`);
        }
    }
}
exports.bootstrapClient = bootstrapClient;
//# sourceMappingURL=client.js.map