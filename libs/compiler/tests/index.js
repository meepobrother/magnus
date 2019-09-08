"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 模型数据
 */
class User {
}
exports.User = User;
class Member {
}
exports.Member = Member;
/**
 * enum
 * new GraphQLEnumType()
 */
var DemoEnum;
(function (DemoEnum) {
    DemoEnum["ASC"] = "ASC";
    DemoEnum["DESC"] = "DESC";
})(DemoEnum = exports.DemoEnum || (exports.DemoEnum = {}));
/**
 * 装饰器
 * (next, src, { value }, ctx, info)
 */
class Directive {
}
exports.Directive = Directive;
/**
 * 自定义类型
 */
class Scalar {
}
exports.Scalar = Scalar;
class Query {
    getUser() { }
}
exports.Query = Query;
class Mutation {
    addUser() { }
}
exports.Mutation = Mutation;
class Subscription {
}
exports.Subscription = Subscription;
// @Magnus()
class Schama {
}
exports.Schama = Schama;
class TypeFactory {
    create() { }
}
exports.TypeFactory = TypeFactory;
function createResolver() {
}
exports.createResolver = createResolver;
// makeExecutableSchema()
//# sourceMappingURL=index.js.map