/**
 * interface
 */
interface DemoInterface { }
/**
 * 模型数据
 */
export class User { }
export class Member { }
/**
 * union
 */
export type UserOrMember = User | Member;
/**
 * enum
 * new GraphQLEnumType()
 */
export enum DemoEnum {
    ASC = 'ASC',
    DESC = 'DESC'
}
/**
 * 装饰器
 * (next, src, { value }, ctx, info)
 */
export class Directive { }

/**
 * 自定义类型
 */
export abstract class Scalar {
    name: string;
    description: string;
    abstract parseValue(): any;
    abstract serialize(): any;
    abstract parseLiteral(): any;
}

export class Query {
    getUser() { }
}

export class Mutation {
    addUser() { }
}

export class Subscription { }

// @Magnus()
export class Schama {
    query: Query;
    mutation: Mutation;
    subscription: Subscription;
}

export class TypeFactory {
    create() { }
}

export function createResolver() {

}

import { makeExecutableSchema } from 'graphql-tools'

// makeExecutableSchema()