import { DocumentNode } from "graphql";
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
}
export declare type HandlerDef = [FieldName, ClassName, TableName, MethodName, Arguments, MagnusType];
export interface HandlerDefMap {
    [key: string]: HandlerDef[];
}
declare type Handler = (args: any, selectionSet: any) => any;
export interface InjectMap {
    [key: string]: Type<any>;
}
export interface ClassDef {
    [key: string]: string[];
}
export declare function createFactoryByMap(map: HandlerDefMap, injectDef: InjectMap, entityDef: ClassDef, entities: InjectMap): {
    [key: string]: {
        [key: string]: Handler;
    };
};
export declare function createFactory(handlerDef: HandlerDefMap, injectDef: InjectMap, entityDef: ClassDef, entities: InjectMap): (operation: string, name: string, args: any, selectionSet: any) => any;
export declare function createResolver(handlerDef: HandlerDefMap, injectDef: InjectMap, entityDef: ClassDef, entities: InjectMap): any;
export declare function createGraphql(item: HandlerDef, operation: string, selection: string): string;
export interface IRunner {
    <T>(source: string, variableValues?: any): Promise<T>;
    [key: string]: any;
}
export declare function createRunner(map: HandlerDefMap, context: DocumentNode, injectDef: InjectMap, entityDef: ClassDef, entities: InjectMap): IRunner;
export {};
