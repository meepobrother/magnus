import { InjectableDef } from './util';
import { Type } from './type';
export declare class InjectionToken<T> {
    protected _desc: string;
    readonly metadataName = "InjectionToken";
    readonly injectableDef: InjectableDef | undefined;
    constructor(_desc: string, options?: {
        providedIn?: Type<any> | 'root' | null;
        factory: () => T;
    });
    toString(): string;
}
