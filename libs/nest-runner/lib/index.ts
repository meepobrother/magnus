const clients: Map<string, any> = new Map();

export function setClient(name: string, runner: any) {
  clients.set(name, runner);
}

export class Query<A, B> {
  document: any;
  client: string;
  run(variables: B): Promise<A> {
    return clients.get(this.client)(this.document, variables);
  }
}

export class Mutation<A, B> {
  document: any;
  client: string;
  run(variables: B): Promise<A> {
    return clients.get(this.client)(this.document, variables);
  }
}

export class Subscription<A, B> {
  document: any;
  client: string;
  run(variables: B): Promise<A> {
    return clients.get(this.client)(this.document, variables);
  }
}
