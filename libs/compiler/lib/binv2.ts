#!/usr/bin/env node
import program = require("commander");
import { toGraphql } from '@nger/ast.ts-graphql';
import { existsSync, writeFileSync } from 'fs';
const packages = require("../package.json");
const root = process.cwd();
import { join } from "path";
program
    .version(packages.version)
    .option("--file [file]", "文件")
    .option("--output [output]", "文件")
    .parse(process.argv);

const file = join(root, program.file || 'main.ts');
const output = join(root, program.output || 'main.graphql')
if (existsSync(file)) {
    const str = toGraphql(file);
    if (str) {
        writeFileSync(output, str)
    }
}
