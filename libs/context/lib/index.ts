import ts from "typescript";
ts.resolveModuleName("@notadd/magnus-core");
/**
 * ast 运行上下文
 */
export class MagnusContext {}

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

export function createTypeParametersFactory(parameters: string[]) {
  return () => {};
}
