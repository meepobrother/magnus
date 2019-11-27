#!/usr/bin/env node
import { compile } from './compiler';
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
const assets = config.assets || `assets`;
const name = config.name || `magnus`;
config.inputs = config.inputs || `src/**/*.ts`;
import globby = require("globby");

export async function bootstrap() {
    const inputs = await globby(config.inputs);
    compile(inputs.map(it => join(config.root, it)), assets, name);
}

bootstrap();

