
import { runner } from '../runner.ts';
interface GetUserResult {
    
}
export async function getUser(ids: number[]): Promise<GetUserResult> {
    const names = ["ids"];
    const args: any = {};
    for (let i = 0; i < arguments.length; i++) {
        args[names[i]] = arguments[i]
    }
    return runner<GetUserResult>(`query getUser($ids: [Int!]!) {
  getUser(entity: {id: "1"}) {
    username
  }
}
`, args)
}
