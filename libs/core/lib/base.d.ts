import { client } from '@notadd/magnus-graphql';
interface TypeDef {
    [key: string]: {
        name: string;
        relation: string;
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
    readonly entity: Type<T>;
    readonly tablename: string;
    readonly selection: client.SelectionSetJson;
    readonly relations: {
        name: string;
        relation: string;
        entity: string;
    }[];
    readonly typeDef: TypeDef;
    readonly entities: Entities;
    constructor(tablename: string, selection: any, def: TypeDef, entities: Entities);
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
