import { ScriptKind } from 'typescript';
import { ScriptKind as Kind } from 'typescript';

import * as ts from 'typescript';
import typescript from 'typescript';

export const a = 1;
const b = 2;
export * from './1';

export { b }
export { ScriptKind } from 'typescript';
export { b as c };

export default {
    a,
    c: a,
    b: 2,
    e: 1 + 1
}

export enum Items {
    TITLE,
    DEMO
}

export interface Demo {
    title: string;
}

export abstract class AbstractCore {
    title: string;

    add(a: number, b: number): number {
        return a + b;
    }
}

export class Core extends AbstractCore {
    dec(a: number, b: number): number {
        return a - b;
    }
}

export type TDEMO = string | number | undefined;