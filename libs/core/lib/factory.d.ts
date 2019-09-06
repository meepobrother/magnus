interface FactoryOptions {
    enums?: any;
    entities: any;
    decorators: any;
    createSet: any;
}
export declare class Factory {
    private options;
    constructor(options: FactoryOptions);
    create<T extends object>(instance: T, name: string): any;
}
export {};
