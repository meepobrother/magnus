import { Injectable, Inject } from "@nestjs/common";
@Injectable()
export class Query<A, B> {
  document: any;
  client: string;
  constructor(@Inject("MAGNUS_NEST_CLIENTS") public clients: any) {}
  run(variables: A): Promise<B> {
    return this.clients[this.client](this.document, variables);
  }
}

@Injectable()
export class Mutation<A, B> {
  document: any;
  client: string;
  constructor(@Inject("MAGNUS_NEST_CLIENTS") public clients: any) {}
  run(variables: A): Promise<B> {
    return this.clients[this.client](this.document, variables);
  }
}

@Injectable()
export class Subscription<A, B> {
  document: any;
  client: string;
  constructor(@Inject("MAGNUS_NEST_CLIENTS") public clients: any) {}
  run(variables: A): Promise<B> {
    return this.clients[this.client](this.document, variables);
  }
}
