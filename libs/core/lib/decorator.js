"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
exports.Magnus = (options) => util_1.AnyDecorator;
exports.Module = (options) => util_1.AnyDecorator;
exports.NgModule = exports.Module;
/**
 * proto相关
 */
exports.Proto = (options) => util_1.AnyDecorator;
exports.Scalar = (options) => util_1.AnyDecorator;
exports.Directive = (options) => util_1.AnyDecorator;
/**
 * query相关
 * @param options
 */
exports.Query = (options) => util_1.AnyDecorator;
/**
 * mutation相关
 * @param options
 */
exports.Mutation = (options) => util_1.AnyDecorator;
/**
 * subscription相关
 */
exports.Subscription = (options) => util_1.AnyDecorator;
/**
 * inject
 * @param type 依赖注入
 * 简单依赖注入，只支持全局
 */
exports.Inject = (type) => util_1.AnyDecorator;
exports.Injectable = (options) => util_1.AnyDecorator;
/**
 * Resolver
 */
exports.Resolver = (name) => util_1.AnyDecorator;
/**
 * 属性
 */
exports.ResolveProperty = (name) => util_1.AnyDecorator;
/**
 * 参数
 */
exports.Parent = () => util_1.AnyDecorator;
/**
 * 选择
 */
exports.Selection = () => util_1.AnyDecorator;
/**
 * 选择
 */
exports.Context = () => util_1.AnyDecorator;
/**
 * 关系
 */
exports.Relation = () => util_1.AnyDecorator;
exports.Field = () => util_1.AnyDecorator;
exports.Permission = (options) => util_1.AnyDecorator;
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
exports.DefDomain = () => util_1.AnyDecorator;
exports.DefObject = () => util_1.AnyDecorator;
//# sourceMappingURL=decorator.js.map