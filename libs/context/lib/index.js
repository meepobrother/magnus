"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typescript_1 = tslib_1.__importDefault(require("typescript"));
typescript_1.default.resolveModuleName("@notadd/magnus-core");
/**
 * ast 运行上下文
 */
class MagnusContext {
}
exports.MagnusContext = MagnusContext;
/**
 * interface Message<T,R>{
 *  data: T;
 *  message: R;
 * }
 *
 * (t: string,r: string)=>`${t}${r}Message`
 * Message<User,Demo> = UserDemoMessage
 *
 * interface Message<T>{
 *  data: T;
 * }
 * (t: string,isArray: boolean)=>`${t}{isArray?"s": ""}Message`
 *
 * Message<User> = UserMessage
 *
 * Message<User[]> = UsersMessage
 *
 * Message<User>==> UserMessage
 */
function createTypeParametersFactory(parameters) {
    return () => { };
}
exports.createTypeParametersFactory = createTypeParametersFactory;
//# sourceMappingURL=index.js.map