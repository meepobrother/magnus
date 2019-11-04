import { Magnus, Query, Mutation, Subscription } from '@notadd/magnus-core';

@Magnus()
export class Demo {

    @Query()
    query() { }

    @Mutation()
    mutation() { }

    @Subscription()
    subscription() { }

}