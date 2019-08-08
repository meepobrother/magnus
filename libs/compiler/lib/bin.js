#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bootstrap_1 = require("./bootstrap");
const program = require("commander");
const packages = require('../package.json');
const root = process.cwd();
const path_1 = require("path");
const pull = require('pull-stream');
const p2p_1 = require("./p2p");
const fs_1 = require("fs");
const fs_extra_1 = require("fs-extra");
program.version(packages.version)
    .option('--watch', '生产模式')
    .parse(process.argv);
const config = require(path_1.join(root, 'magnus.json'));
config.root = root;
config.debug = !!program.watch;
async function start() {
    const node = await p2p_1.createNode(config, (peer) => {
        node.handle(`/magnus/connection`, (protocol, conn) => {
            console.log(`${peer.id.toB58String()} 上线`);
        });
        node.handle(`/magnus/file`, (protocol, conn) => {
            pull(conn, pull.asyncMap(), pull.collect((err, array) => {
                if (err)
                    return;
                const res = Buffer.concat(array).toString('utf8');
                const obj = JSON.parse(res);
                const { name, fileName, content, type, debug, host } = obj;
                if (host === config.host) {
                    /**
                     * 开发模式相同 相互同步文件
                     */
                    if (Array.isArray(config.reciveName)) {
                        const names = [
                            ...config.reciveName,
                            config.name
                        ];
                        if (names.includes(name)) {
                            const dist = path_1.join(config.root, config.output);
                            const assets = path_1.join(config.root, config.assets);
                            fs_extra_1.ensureDirSync(path_1.join(dist, name));
                            fs_extra_1.ensureDirSync(path_1.join(assets, name));
                            if (type === 'assets') {
                                fs_1.writeFileSync(path_1.join(assets, name, fileName), content);
                            }
                            else {
                                fs_1.writeFileSync(path_1.join(dist, name, fileName), content);
                            }
                            console.log(`收到模块${name}的文件${fileName}`);
                        }
                    }
                    else {
                        const dist = path_1.join(config.root, config.output);
                        const assets = path_1.join(config.root, config.assets);
                        fs_extra_1.ensureDirSync(path_1.join(dist, name));
                        fs_extra_1.ensureDirSync(path_1.join(assets, name));
                        if (type === 'assets') {
                            fs_1.writeFileSync(path_1.join(assets, name, fileName), content);
                        }
                        else {
                            fs_1.writeFileSync(path_1.join(dist, name, fileName), content);
                        }
                        console.log(`收到模块${name}的文件${fileName}`);
                    }
                }
            }));
        });
        node.dialProtocol(peer, `/magnus/connection`, function (err, conn) {
            // pull(pull.values([config.realname || 'fans']), conn)
            bootstrap_1.sendFile(config);
        });
        bootstrap_1.sendFile(config);
    });
    config.broadcast = async (data) => {
        const peers = node.peerBook._peers;
        Object.keys(peers).map(key => {
            const info = peers[key];
            node.dialProtocol(info, `/magnus/file`, function (err, conn) {
                pull(pull.values([data.toString('utf8')]), conn);
            });
        });
    };
    await bootstrap_1.bootstrap(config);
}
try {
    start();
}
catch (e) {
    console.log(e.message);
}
//# sourceMappingURL=bin.js.map