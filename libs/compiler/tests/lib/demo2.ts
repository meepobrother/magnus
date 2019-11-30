import { Entity, Magnus, Query } from '@notadd/magnus-core';
import { Column } from '@notadd/magnus-typeorm';
export class Common { 
    username: number;
}
@Entity()
export class Member extends Common {

    @Column()
    id: number;
}



@Magnus({
    entities: [Member]
})
export class Demo2<T> {
    @Query()
    get(): T {
        return {} as any;
    }
}

