import { MagnusConfig } from "@notadd/magnus-core";
declare const libp2p: any;
export declare class MyBundle extends libp2p {
    constructor(_options: any, list: string[]);
}
export declare const set: Set<string>;
export declare const peers: Set<any>;
export declare function createPeerInfo(root: string): Promise<{
    peerInfo: any;
    id: any;
}>;
export declare function createNode(config: MagnusConfig, callback: any): Promise<any>;
export {};
