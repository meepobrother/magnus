import { ObjectType, EntitySchema, FindManyOptions, EntityManager } from 'typeorm';
export declare class Typeorm<Entity> extends EntityManager {
    find<Entity>(entityClass: ObjectType<Entity> | EntitySchema<Entity> | string, optionsOrConditions?: FindManyOptions<Entity> | any): Promise<Entity[]>;
}
