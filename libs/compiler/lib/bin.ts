#!/usr/bin/env node
import { bootstrap } from "./bootstrap";
import { MagnusConfig } from "./config";
import program = require("commander");
const packages = require("../package.json");
const root = process.cwd();
import { join } from "path";
program
    .version(packages.version)
    .option("--watch", "生产模式")
    .option("-c, --config [config]", "配置文件目录")
    .parse(process.argv);
let config: MagnusConfig;
if (program.config) {
    config = require(join(root, program.config));
} else {
    config = require(join(root, "magnus.json"));
}
config.root = root;
config.debug = !!program.watch;
bootstrap(config).catch(err => {
    console.log({
        err
    });
});
