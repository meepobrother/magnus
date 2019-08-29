"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clients = new Map();
function setClient(name, runner) {
    clients.set(name, runner);
}
exports.setClient = setClient;
class Query {
    run(variables) {
        return clients.get(this.client).query({
            query: this.document,
            variables: variables
        });
    }
}
exports.Query = Query;
class Mutation {
    run(variables) {
        return clients
            .get(this.client)
            .mutate({
            mutation: this.document,
            variables: variables
        })
            .then((res) => res.data);
    }
}
exports.Mutation = Mutation;
class Subscription {
    run(variables) {
        return clients.get(this.client).subscribe({
            query: this.document,
            variables: variables
        });
    }
}
exports.Subscription = Subscription;
//# sourceMappingURL=index.js.map