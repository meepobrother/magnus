import { ObjectType, EntitySchema, FindManyOptions, Repository, EntityManager } from 'typeorm';
import { FindOptionsUtils } from 'typeorm/find-options/FindOptionsUtils'
import { SelectionSetJson } from '@notadd/magnus-graphql';
import { graphql, GraphQLResolveInfo, DocumentNode } from "graphql";

export class Typeorm<Entity> extends EntityManager {
    async find<Entity>(entityClass: ObjectType<Entity> | EntitySchema<Entity> | string, optionsOrConditions?: FindManyOptions<Entity> | any): Promise<Entity[]> {
        const metadata = this.connection.getMetadata(entityClass);
        const qb = this.createQueryBuilder<Entity>(entityClass as any, FindOptionsUtils.extractFindManyOptionsAlias(optionsOrConditions) || metadata.name);
        if (!FindOptionsUtils.isFindManyOptions(optionsOrConditions) || optionsOrConditions.loadEagerRelations !== false)
            FindOptionsUtils.joinEagerRelations(qb, qb.alias, metadata);
        return FindOptionsUtils.applyFindManyOptionsOrConditionsToQueryBuilder(qb, optionsOrConditions).getMany();
    }
}