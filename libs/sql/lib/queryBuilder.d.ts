import { SelectQueryBuilder } from './selectQueryBuilder';
import { InsertQueryBuilder } from './insertQueryBuilder';
import { UpdateQueryBuilder } from './updateQueryBuilder';
import { DeleteQueryBuilder } from './deleteQueryBuilder';
import { RelationQueryBuilder } from './relationQueryBuilder';
export declare abstract class QueryBuilder {
    abstract getQuery(): string;
    abstract select(): SelectQueryBuilder;
    abstract insert(): InsertQueryBuilder;
    abstract update(): UpdateQueryBuilder;
    abstract delete(): DeleteQueryBuilder;
    abstract relation(): RelationQueryBuilder;
}
