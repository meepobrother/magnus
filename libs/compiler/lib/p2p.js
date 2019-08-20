"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const libp2p = require("libp2p");
const TCP = require("libp2p-tcp");
const Mplex = require("libp2p-mplex");
const PeerInfo = require("peer-info");
const MulticastDNS = require("libp2p-mdns");
const defaultsDeep = require("@nodeutils/defaults-deep");
const PeerId = require("peer-id");
const pack = require("../package.json");
const SPDY = require("libp2p-spdy");
const defaults = {
    modules: {
        transport: [TCP],
        streamMuxer: [SPDY, Mplex],
        peerDiscovery: [MulticastDNS]
    },
    config: {
        peerDiscovery: {
            autoDial: true,
            mdns: {
                interval: 2000,
                enabled: true
            }
        },
        EXPERIMENTAL: {
            pubsub: true
        }
    }
};
class MyBundle extends libp2p {
    constructor(_options, list) {
        super(defaultsDeep(_options, defaults));
    }
}
exports.MyBundle = MyBundle;
exports.set = new Set();
exports.peers = new Set();
async function createPeerInfo(root) {
    const magnusKeyPath = path_1.join(root, "magnus.key");
    let id;
    if (fs_extra_1.existsSync(magnusKeyPath)) {
        const json = JSON.parse(fs_extra_1.readFileSync(magnusKeyPath).toString("utf8"));
        id = await PeerId.createFromJSON(json);
    }
    else {
        id = await PeerId.create({ bits: 1024, keyType: "rsa" });
        fs_extra_1.writeFileSync(magnusKeyPath, JSON.stringify(id.toJSON(), null, 2));
    }
    const peerInfo = await PeerInfo.create(id);
    peerInfo.multiaddrs.add("/ip4/0.0.0.0/tcp/0");
    peerInfo.multiaddrs.add("/ip4/0.0.0.0/tcp/0/ws");
    return {
        peerInfo,
        id
    };
}
exports.createPeerInfo = createPeerInfo;
async function createNode(config, callback) {
    console.log(`欢迎使用 magnus@${pack.version}`);
    const { peerInfo } = await createPeerInfo(config.root);
    // return node;
    return new Promise((resolve, reject) => {
        const node = new MyBundle({
            peerInfo
        }, []);
        const isStarted = node.isStarted();
        if (!isStarted) {
            node.start(() => {
                config.host = ``;
                node.peerInfo.multiaddrs.forEach((ma) => {
                    const options = ma.toOptions();
                    // console.log(ma.toString())
                    if (options.host.startsWith("127")) {
                        // 本地
                        // config.host = options.host;
                    }
                    else if (options.host.startsWith("192")) {
                        if (!config.host.startsWith("192")) {
                            config.host = options.host;
                        }
                    }
                    else if (options.host.startsWith("10")) {
                        config.host = options.host;
                    }
                    else if (options.host.startsWith("170")) {
                        config.host = options.host;
                    }
                    else {
                        // 外网
                        // config.host = options.host;
                    }
                });
                // writeFileSync(join(config.root, 'magnus.json'), JSON.stringify(config, null, 2))
                resolve(node);
            });
        }
        node.on("peer:connect", (peer) => {
            callback(peer);
        });
        node.on("peer:disconnect", (peer) => {
            // console.log(`同事下线 %s`, peer.id.toB58String())
        });
        node.on("connection:start", (peer) => {
            // console.log(`connection:start`)
        });
        node.on("connection:end", (peer) => {
            // console.log(`connection:end`)
        });
        node.on(`error`, () => {
            // console.log(`error`)
        });
        node.on("peer:discovery", async (peer) => {
            const peerId = peerInfo.id.toB58String();
            if (peerId !== peer.id.toB58String()) {
                if (!exports.set.has(peer.id.toB58String())) {
                    exports.set.add(peer.id.toB58String());
                    console.log(`发现新同事(${exports.set.size}): ${peer.id.toB58String()}`);
                }
            }
        });
    });
}
exports.createNode = createNode;
//# sourceMappingURL=p2p.js.map