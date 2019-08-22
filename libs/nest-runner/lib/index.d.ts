import { DynamicModule } from "@nestjs/common";
export declare class Query<A, B> {
    clients: any;
    document: any;
    client: string;
    constructor(clients: any);
    run(variables: B): Promise<A>;
}
export declare class Mutation<A, B> {
    clients: any;
    document: any;
    client: string;
    constructor(clients: any);
    run(variables: B): Promise<A>;
}
export declare class Subscription<A, B> {
    clients: any;
    document: any;
    client: string;
    constructor(clients: any);
    run(variables: B): Promise<A>;
}
export declare class NestRunnerModule {
    static forRoot(clients: any): DynamicModule;
}
