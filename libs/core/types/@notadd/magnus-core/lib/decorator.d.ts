import { Type } from "./type";
import { Provider } from "./provider";
/**
 * magnus相关
 */
export interface MagnusOptions {
    entities?: Type<any>[];
}
export declare const Magnus: (options?: MagnusOptions | undefined) => (target: any) => any;
/**
 * module 相关参数
 * 暂时无用
 */
export interface ModuleWithProviders<T = any> {
    ngModule: Type<T>;
    providers?: Provider[];
}
export interface ModuleOptions {
    providers?: Provider[];
    imports?: Array<Type<any> | ModuleWithProviders<{}> | any[]>;
    magnus?: Array<Type<any>>;
}
export declare const Module: (options?: ModuleOptions | undefined) => (...args: any[]) => void;
export declare const NgModule: (options?: ModuleOptions | undefined) => (...args: any[]) => void;
/**
 * proto相关
 */
export declare const Proto: (options?: MagnusOptions | undefined) => (...args: any[]) => void;
/**
 * graphql相关
 */
export { Scalar } from '@nestjs/graphql';
export { Query, Mutation, Subscription, Resolver, ResolveProperty, Parent, Context } from '@nestjs/graphql';
/**
 * directive相关
 */
export interface DirectiveOptions {
    name?: string;
}
export declare const Directive: (options?: DirectiveOptions | undefined) => (...args: any[]) => void;
/**
 * inject
 * @param type 依赖注入
 * 简单依赖注入，只支持全局
 * 暂时无用
 */
export declare const Inject: (type?: Type<any> | undefined) => (...args: any[]) => void;
/**
 * 可注入的对象
 * 暂时无用
 * @param type
 */
export interface InjectableOptions {
    providedIn: Type<any> | "root" | "any" | null;
}
export declare const Injectable: (options?: InjectableOptions | undefined) => (...args: any[]) => void;
/**
 * 选择
 */
export declare const Selection: () => (...args: any[]) => void;
/**
 * 关系
 */
export declare const Relation: () => (...args: any[]) => void;
export declare const Field: () => (...args: any[]) => void;
/**
 * 权限相关
 */
export interface PermissionOptions {
    /**
     * 权限名
     */
    title: string;
    /**
     * 权限简介
     */
    desc: string;
    /**
     * 附加数据
     */
    data?: any;
    /**
     * 上级
     */
    namespace?: string;
}
export declare const Permission: (options: PermissionOptions) => (...args: any[]) => void;
/**
 * type sub dom obj act
 * 类型 资源 域 子系统 操作
 * p, admin, domain1, data1, read 权限
 * p, admin, domain1, data1, write 权限
 * p, admin, domain2, data2, read 权限
 * p, admin, domain2, data2, write 权限
 * g, alice, admin, domain1
 * g, bob, admin, domain2
 */
export declare const DefDomain: () => (...args: any[]) => void;
export declare const DefObject: () => (...args: any[]) => void;
export declare const Entity: () => (...args: any[]) => void;
export declare const OneToMany: () => (...args: any[]) => void;
