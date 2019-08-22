export declare function setClient(name: string, runner: any): void;
export declare class Query<A, B> {
    document: any;
    client: string;
    run(variables: B): Promise<A>;
}
export declare class Mutation<A, B> {
    document: any;
    client: string;
    run(variables: B): Promise<A>;
}
export declare class Subscription<A, B> {
    document: any;
    client: string;
    run(variables: B): Promise<A>;
}
