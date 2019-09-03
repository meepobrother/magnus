interface Type<T> extends Function {
    new (...args: any[]): T;
}
export declare abstract class MagnusBase<T = any> {
    entity: Type<T>;
    tablename: string;
    init(tablename: string): void;
    createEntity(entity?: Partial<T>): T;
    createEntities(entities: Partial<T>[]): T[];
}
export declare class MagnusEntity<T> {
    constructor(entity: Partial<T>);
}
export {};
