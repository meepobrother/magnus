export declare class Query<A, B> {
    clients: any;
    document: any;
    client: string;
    constructor(clients: any);
    run(variables: A): Promise<B>;
}
export declare class Mutation<A, B> {
    clients: any;
    document: any;
    client: string;
    constructor(clients: any);
    run(variables: A): Promise<B>;
}
export declare class Subscription<A, B> {
    clients: any;
    document: any;
    client: string;
    constructor(clients: any);
    run(variables: A): Promise<B>;
}
