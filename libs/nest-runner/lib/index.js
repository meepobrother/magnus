"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clients = new Map();
function setClient(name, runner) {
    clients.set(name, runner);
}
exports.setClient = setClient;
class Query {
    run(variables) {
        return clients.get(this.client)(this.document, variables);
    }
}
exports.Query = Query;
class Mutation {
    run(variables) {
        return clients.get(this.client)(this.document, variables);
    }
}
exports.Mutation = Mutation;
class Subscription {
    run(variables) {
        return clients.get(this.client)(this.document, variables);
    }
}
exports.Subscription = Subscription;
//# sourceMappingURL=index.js.map