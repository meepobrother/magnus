import ApolloClient, {
  FetchResult,
  Observable,
  ApolloQueryResult
} from "apollo-boost";
const clients: Map<string, ApolloClient<any>> = new Map();

export function setClient(name: string, runner: ApolloClient<any>) {
  clients.set(name, runner);
}

export class Query<A, B> {
  document: any;
  client: string;
  run(variables: B): Promise<ApolloQueryResult<A>> {
    return clients.get(this.client)!.query({
      query: this.document,
      variables: variables
    });
  }
}

export class Mutation<A, B> {
  document: any;
  client: string;
  run(variables: B): Promise<FetchResult<A>> {
    return clients
      .get(this.client)!
      .mutate({
        mutation: this.document,
        variables: variables
      })
      .then((res: any) => res.data);
  }
}

export class Subscription<A, B> {
  document: any;
  client: string;
  run(variables: B): Observable<FetchResult<A>> {
    return clients.get(this.client)!.subscribe({
      query: this.document,
      variables: variables
    });
  }
}
