import { client } from "@notadd/magnus-graphql";
import { Where } from "./types";
import { FindOperator } from "typeorm";
interface TypeDef {
    [key: string]: { name: string; decorators: string[]; entity: string }[];
}
interface Entities {
    [key: string]: Type<any>;
}
interface Type<T> extends Function {
    new(...args: any[]): T;
}
export abstract class MagnusBase<T = any> {
    entity: Type<T>;
    tablename: string;
    init(tablename: string) {
        this.tablename = this.tablename || tablename;
    }    
    createEntity(entity?: Partial<T>) {
        return new this.entity(entity);
    }
    createEntities(entities: Partial<T>[]) {
        return entities.map(entity => this.createEntity(entity));
    }
}

export class MagnusEntity<T> {
    constructor(entity: Partial<T>) {
        if (entity) {
            Object.keys(entity).map((key: string) => {
                (this as any)[key] = (entity as any)[key];
            });
        }
    }
}
