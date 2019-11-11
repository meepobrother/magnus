interface Type<T> extends Function {
    new(...args: any[]): T;
}
export abstract class MagnusBase<T = any> {
    entity: Type<T>;
    tablename: string;
    init(tablename: string) {
        this.tablename = this.tablename || tablename;
    }
}

export class MagnusEntity<T> {
    constructor(entity: Partial<T>) {
        if (entity) {
            Object.keys(entity).map((key: string) => {
                (this as any)[key] = (entity as any)[key];
            });
        }
    }
}
