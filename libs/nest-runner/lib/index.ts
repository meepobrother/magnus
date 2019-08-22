import { Injectable, Module } from "@nestjs/common";

const clients: Map<string, any> = new Map();

export function setClient(name: string, runner: any) {
  clients.set(name, runner);
}

@Injectable()
export class Query<A, B> {
  document: any;
  client: string;
  run(variables: B): Promise<A> {
    return clients.get(this.client)(this.document, variables);
  }
}

@Injectable()
export class Mutation<A, B> {
  document: any;
  client: string;
  run(variables: B): Promise<A> {
    return clients.get(this.client)(this.document, variables);
  }
}

@Injectable()
export class Subscription<A, B> {
  document: any;
  client: string;
  run(variables: B): Promise<A> {
    return clients.get(this.client)(this.document, variables);
  }
}

@Module({})
export class NestRunnerModule {}
