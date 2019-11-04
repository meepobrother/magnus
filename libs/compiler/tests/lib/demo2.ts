import { Entity, Magnus, Query } from '@notadd/magnus-core';
import { Column } from '@notadd/magnus-typeorm';
@Entity()
export class Member {

    @Column()
    id: number;
}



@Magnus({
    entities: [Member]
})
export class Demo2 {
    @Query()
    get() { }
}

