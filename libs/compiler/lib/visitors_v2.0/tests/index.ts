import { ScriptKind } from 'typescript';
import { ScriptKind as Kind } from 'typescript';

import * as ts from 'typescript';
import typescript from 'typescript';

export const a = 1;
const b = 2;

export { b }
export * from './1';
export { ScriptKind } from 'typescript';
export { b as c };

export default {
    a,
    c: a,
    b: 2,
    e: 1+1
}