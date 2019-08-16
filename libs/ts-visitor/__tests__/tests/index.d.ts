export declare const a = 1;
declare const b = 2;
export * from './1';
export { b };
export { ScriptKind } from 'typescript';
export { b as c };
declare const _default: {
    a: number;
    c: number;
    b: number;
    e: number;
};
export default _default;
export declare enum Items {
    TITLE = 0,
    DEMO = 1
}
export interface Demo {
    title: string;
}
export declare abstract class AbstractCore {
    title: string;
    add(a: number, b: number): number;
}
export declare class Core extends AbstractCore {
    dec(a: number, b: number): number;
}
export declare type TDEMO = string | number | undefined;
