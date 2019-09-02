import { MagnusConfig } from "@notadd/magnus-core";
import { join } from "path";
import globby = require("globby");
import { existsSync } from "fs-extra";
import { buildMagnusApi } from "./buildApi";
export async function bootstrapClient(config: MagnusConfig) {
  const client = config.client;
  if (client) {
    const sources = client.map(input => join(config.root, input));
    const inputs = await globby([
      ...sources,
      `!${join(config.root, config.assets)}/**/*`
    ]);
    const path = join(config.root, config.def);
    if (existsSync(path)) {
      inputs.map(input => {
        const graphqlDest = input.replace(".graphql", ".ts");
        buildMagnusApi(
          join(config.root, config.def),
          join(input),
          join(graphqlDest),
          config.name
        );
      });
    } else {
      console.log(`不存在${path}文件`);
    }
  }
}
