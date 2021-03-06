import { AnyDecorator } from "./util";
import { Type } from "./type";
import { Provider } from "./provider";
import { Resolver } from '@nestjs/graphql'

/**
 * magnus相关
 */
export interface MagnusOptions {
  entities?: Type<any>[];
}
export const Magnus = (options?: MagnusOptions) => (target: any) => {
  return Resolver(target.name)(target)
};
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
export const Module = (options?: ModuleOptions) => AnyDecorator;
export const NgModule = Module;
/**
 * proto相关
 */
export const Proto = (options?: MagnusOptions) => AnyDecorator;

/**
 * graphql相关
 */

export { Scalar } from '@nestjs/graphql'
export { Query, Mutation, Subscription, Resolver, ResolveProperty, Parent, Context } from '@nestjs/graphql'

/**
 * directive相关
 */
export interface DirectiveOptions {
  name?: string;
}
export const Directive = (options?: DirectiveOptions) => AnyDecorator;
/**
 * inject
 * @param type 依赖注入
 * 简单依赖注入，只支持全局
 * 暂时无用
 */
export const Inject = (type?: Type<any>) => AnyDecorator;
/**
 * 可注入的对象
 * 暂时无用
 * @param type
 */
export interface InjectableOptions {
  providedIn: Type<any> | "root" | "any" | null;
}
export const Injectable = (options?: InjectableOptions) => AnyDecorator;
/**
 * 选择
 */
export const Selection = () => AnyDecorator;
/**
 * 关系
 */
export const Relation = () => AnyDecorator;

export const Field = () => AnyDecorator;

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
export const Permission = (options: PermissionOptions) => AnyDecorator;

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
export const DefDomain = () => AnyDecorator;
export const DefObject = () => AnyDecorator;
export const Entity = () => AnyDecorator;
export const OneToMany = () => AnyDecorator;
