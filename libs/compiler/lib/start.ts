import { bootstrap } from "./bootstrap";
import { MagnusConfig } from "./config";
import { join } from "path";

export function start(root: string, watch: boolean = false, configPath: string = 'magnus.json') {
    let config: MagnusConfig;
    if (configPath) {
        config = require(join(root, configPath));
    } else {
        config = require(join(root, "magnus.json"));
    }
    config.root = root;
    config.debug = !!watch;
    return bootstrap(config);
}
