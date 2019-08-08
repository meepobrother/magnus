import { MagnusConfig } from '@notadd/magnus-core';
export declare function bootstrap(config: MagnusConfig): Promise<void>;
export declare function sendLocalFile(path: string, name: string, config: MagnusConfig): void;
export declare function sendFile(config: MagnusConfig): void;
