import { Injectable, Inject, Module, DynamicModule } from "@nestjs/common";
const MAGNUS_NEST_CLIENTS = `MAGNUS_NEST_CLIENTS`;
@Injectable()
export class Query<A, B> {
  document: any;
  client: string;
  constructor(@Inject(MAGNUS_NEST_CLIENTS) public clients: any) {}
  run(variables: A): Promise<B> {
    return this.clients[this.client](this.document, variables);
  }
}

@Injectable()
export class Mutation<A, B> {
  document: any;
  client: string;
  constructor(@Inject(MAGNUS_NEST_CLIENTS) public clients: any) {}
  run(variables: A): Promise<B> {
    return this.clients[this.client](this.document, variables);
  }
}

@Injectable()
export class Subscription<A, B> {
  document: any;
  client: string;
  constructor(@Inject(MAGNUS_NEST_CLIENTS) public clients: any) {}
  run(variables: A): Promise<B> {
    return this.clients[this.client](this.document, variables);
  }
}

@Module({})
export class NestRunnerModule {
  static forRoot(clients: any): DynamicModule {
    return {
      module: NestRunnerModule,
      providers: [
        {
          provide: MAGNUS_NEST_CLIENTS,
          useValue: clients
        }
      ]
    };
  }
}
