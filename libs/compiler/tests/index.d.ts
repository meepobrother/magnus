/**
 * 模型数据
 */
export declare class User {
}
export declare class Member {
}
/**
 * union
 */
export declare type UserOrMember = User | Member;
/**
 * enum
 * new GraphQLEnumType()
 */
export declare enum DemoEnum {
    ASC = "ASC",
    DESC = "DESC"
}
/**
 * 装饰器
 * (next, src, { value }, ctx, info)
 */
export declare class Directive {
}
/**
 * 自定义类型
 */
export declare abstract class Scalar {
    name: string;
    description: string;
    abstract parseValue(): any;
    abstract serialize(): any;
    abstract parseLiteral(): any;
}
export declare class Query {
    getUser(): void;
}
export declare class Mutation {
    addUser(): void;
}
export declare class Subscription {
}
export declare class Schama {
    query: Query;
    mutation: Mutation;
    subscription: Subscription;
}
export declare class TypeFactory {
    create(): void;
}
export declare function createResolver(): void;
