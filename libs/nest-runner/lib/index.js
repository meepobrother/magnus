"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const clients = new Map();
function setClient(name, runner) {
    clients.set(name, runner);
}
exports.setClient = setClient;
let Query = class Query {
    run(variables) {
        return clients.get(this.client)(this.document, variables);
    }
};
Query = tslib_1.__decorate([
    common_1.Injectable()
], Query);
exports.Query = Query;
let Mutation = class Mutation {
    run(variables) {
        return clients.get(this.client)(this.document, variables);
    }
};
Mutation = tslib_1.__decorate([
    common_1.Injectable()
], Mutation);
exports.Mutation = Mutation;
let Subscription = class Subscription {
    run(variables) {
        return clients.get(this.client)(this.document, variables);
    }
};
Subscription = tslib_1.__decorate([
    common_1.Injectable()
], Subscription);
exports.Subscription = Subscription;
let NestRunnerModule = class NestRunnerModule {
};
NestRunnerModule = tslib_1.__decorate([
    common_1.Module({})
], NestRunnerModule);
exports.NestRunnerModule = NestRunnerModule;
//# sourceMappingURL=index.js.map