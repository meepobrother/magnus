#!/usr/bin/env node
import { bootstrap, sendFile } from "./bootstrap";
import { MagnusConfig } from "@notadd/magnus-core";
import program = require("commander");
const packages = require("../package.json");
const root = process.cwd();
import { join } from "path";
const pull = require("pull-stream");
import { createNode } from "./p2p";
import { writeFileSync } from "fs";
import { ensureDirSync } from "fs-extra";
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
async function start() {
  const node: any = await createNode(config, (peer: any) => {
    node.handle(`/magnus/connection`, (protocol: any, conn: any) => {
      console.log(`${peer.id.toB58String()} 上线`);
    });
    node.handle(`/magnus/file`, (protocol: any, conn: any) => {
      pull(
        conn,
        pull.asyncMap(),
        pull.collect((err: any, array: Buffer[]) => {
          if (err) return;
          const res = Buffer.concat(array).toString("utf8");
          const obj = JSON.parse(res);
          const { name, fileName, content, type, debug, host } = obj;
          const target = config.target || "magnus";
          let canWrite = false;
          if (config.hosts) {
            if (config.hosts.includes(host)) {
              if (target === "magnus") {
                canWrite = true;
              } else {
                if (
                  fileName.includes(target) ||
                  fileName.includes("api-url") ||
                  fileName.includes("server-api")
                ) {
                  canWrite = true;
                }
              }
            }
          } else {
            if (target === "magnus") {
              canWrite = true;
            } else {
              if (
                fileName.includes(target) ||
                fileName.includes("api-url") ||
                fileName.includes("server-api")
              ) {
                canWrite = true;
              }
            }
          }
          if (canWrite) {
            /**
             * 开发模式相同 相互同步文件
             */
            console.log(`receive file ${type} ${fileName}`);
            if (Array.isArray(config.reciveName)) {
              const names = [...config.reciveName, config.name];
              if (names.includes(name)) {
                const dist = join(config.root, config.output);
                const assets = join(config.root, config.assets);
                ensureDirSync(join(dist, name));
                ensureDirSync(join(assets, name));
                if (type === "assets") {
                  writeFileSync(join(assets, name, fileName), content);
                } else {
                  writeFileSync(join(dist, name, fileName), content);
                }
              }
            } else {
              const dist = join(config.root, config.output);
              const assets = join(config.root, config.assets);
              ensureDirSync(join(dist, name));
              ensureDirSync(join(assets, name));
              if (type === "assets") {
                writeFileSync(join(assets, name, fileName), content);
              } else {
                writeFileSync(join(dist, name, fileName), content);
              }
            }
          }
        })
      );
    });
    node.dialProtocol(peer, `/magnus/connection`, function(
      err: any,
      conn: any
    ) {
      // pull(pull.values([config.realname || 'fans']), conn)
      sendFile(config);
    });
    sendFile(config);
  });
  config.broadcast = async (data: Buffer) => {
    const peers = node.peerBook._peers;
    Object.keys(peers).map(key => {
      const info = peers[key];
      node.dialProtocol(info, `/magnus/file`, function(err: any, conn: any) {
        pull(pull.values([data.toString("utf8")]), conn);
      });
    });
  };
  await bootstrap(config);
}
start();
