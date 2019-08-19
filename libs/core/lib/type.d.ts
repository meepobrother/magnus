export interface Type<T> extends Function {
    new (...args: any[]): T;
}
export declare type StringToken<T> = string & {
    type: T;
};
