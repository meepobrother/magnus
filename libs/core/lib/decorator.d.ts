import { Type } from './type';
import { Provider } from './provider';
/**
 * magnus相关
 */
export interface MagnusOptions {
    entities?: Type<any>[];
}
export declare const Magnus: (options?: MagnusOptions | undefined) => (...args: any[]) => void;
/**
 * module 相关参数
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
/**
 * Scalar 相关
 */
export interface ScalarOptions {
    name?: string;
}
export declare const Scalar: (options?: ScalarOptions | undefined) => (...args: any[]) => void;
/**
 * directive相关
 */
export interface DirectiveOptions {
    name?: string;
}
export declare const Directive: (options?: DirectiveOptions | undefined) => (...args: any[]) => void;
/**
 * query相关
 * @param options
 */
export declare const Query: (options?: MagnusOptions | undefined) => (...args: any[]) => void;
/**
 * mutation相关
 * @param options
 */
export declare const Mutation: (options?: MagnusOptions | undefined) => (...args: any[]) => void;
/**
 * subscription相关
 */
export declare const Subscription: (options?: MagnusOptions | undefined) => (...args: any[]) => void;
/**
 * inject
 * @param type 依赖注入
 * 简单依赖注入，只支持全局
 */
export declare const Inject: (type?: Type<any> | undefined) => (...args: any[]) => void;
/**
 * 可注入的对象
 * @param type
 */
export interface InjectableOptions {
    providedIn: Type<any> | 'root' | 'any' | null;
}
export declare const Injectable: (options?: InjectableOptions | undefined) => (...args: any[]) => void;
/**
 * Resolver
 */
export declare const Resolver: (name?: string | undefined) => (...args: any[]) => void;
/**
 * 属性
 */
export declare const ResolveProperty: (name?: string | undefined) => (...args: any[]) => void;
/**
 * 参数
 */
export declare const Parent: () => (...args: any[]) => void;
/**
 * 选择
 */
export declare const Selection: () => (...args: any[]) => void;
/**
 * 选择
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
