import { client } from "@notadd/magnus-graphql";
import { Where } from "./types";
import { FindOperator } from "typeorm";
interface TypeDef {
    [key: string]: {
        name: string;
        decorators: string[];
        entity: string;
    }[];
}
interface Entities {
    [key: string]: Type<any>;
}
interface Type<T> extends Function {
    new (...args: any[]): T;
}
export declare abstract class MagnusBase<T = any> {
    entity: Type<T>;
    tablename: string;
    selection: client.SelectionSetJson;
    relations: {
        name: string;
        decorators: string[];
        entity: string;
    }[];
    typeDef: TypeDef;
    entities: Entities;
    init(tablename: string, selection: any, def: TypeDef, entities: Entities): void;
    createWhere(where?: Where<T>, opt?: "or" | "not" | "and", result?: FindOperator<any>): void;
    createSelectAndRelations(): {
        select: any[];
        relations: string[];
    };
    createEntity(entity?: Partial<T>): T;
    createEntities(entities: Partial<T>[]): T[];
}
export declare class MagnusEntity<T> {
    constructor(entity: Partial<T>);
}
export {};
