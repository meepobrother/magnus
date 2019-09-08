import ApolloClient, { FetchResult, Observable, ApolloQueryResult } from "apollo-boost";
export declare function setClient(name: string, runner: ApolloClient<any>): void;
export declare class Query<A, B> {
    document: any;
    client: string;
    run(variables: B): Promise<ApolloQueryResult<A>>;
}
export declare class Mutation<A, B> {
    document: any;
    client: string;
    run(variables: B): Promise<FetchResult<A>>;
}
export declare class Subscription<A, B> {
    document: any;
    client: string;
    run(variables: B): Observable<FetchResult<A>>;
}
