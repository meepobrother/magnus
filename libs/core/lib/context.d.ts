interface Type<T> extends Function {
    new (...args: any[]): T;
}
declare type ClassName = string;
declare type MethodName = string;
declare type TableName = string;
declare type FieldName = string;
declare type Arguments = {
    name: string;
    type: string;
    index: number;
    decorator: string[];
}[];
interface MagnusType {
    name: string;
    typeArguments: MagnusType;
    fullName: string;
}
export declare type HandlerDef = [FieldName, ClassName, TableName, MethodName, Arguments, MagnusType];
export interface HandlerDefMap {
    [key: string]: HandlerDef[];
}
export interface InjectMap {
    [key: string]: Type<any>;
}
export interface ClassDef {
    [key: string]: string[];
}
export {};
