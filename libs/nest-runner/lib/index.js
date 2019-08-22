"use strict";
var NestRunnerModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
"use strict";
const common_1 = require("@nestjs/common");
const MAGNUS_NEST_CLIENTS = `MAGNUS_NEST_CLIENTS`;
let Query = class Query {
    constructor(clients) {
        this.clients = clients;
    }
    run(variables) {
        return this.clients[this.client](this.document, variables);
    }
};
Query = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__param(0, common_1.Inject(MAGNUS_NEST_CLIENTS)),
    tslib_1.__metadata("design:paramtypes", [Object])
], Query);
exports.Query = Query;
let Mutation = class Mutation {
    constructor(clients) {
        this.clients = clients;
    }
    run(variables) {
        return this.clients[this.client](this.document, variables);
    }
};
Mutation = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__param(0, common_1.Inject(MAGNUS_NEST_CLIENTS)),
    tslib_1.__metadata("design:paramtypes", [Object])
], Mutation);
exports.Mutation = Mutation;
let Subscription = class Subscription {
    constructor(clients) {
        this.clients = clients;
    }
    run(variables) {
        return this.clients[this.client](this.document, variables);
    }
};
Subscription = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__param(0, common_1.Inject(MAGNUS_NEST_CLIENTS)),
    tslib_1.__metadata("design:paramtypes", [Object])
], Subscription);
exports.Subscription = Subscription;
let NestRunnerModule = NestRunnerModule_1 = class NestRunnerModule {
    static forRoot(clients) {
        return {
            module: NestRunnerModule_1,
            providers: [
                {
                    provide: MAGNUS_NEST_CLIENTS,
                    useValue: clients
                }
            ]
        };
    }
};
NestRunnerModule = NestRunnerModule_1 = tslib_1.__decorate([
    common_1.Module({})
], NestRunnerModule);
exports.NestRunnerModule = NestRunnerModule;
//# sourceMappingURL=index.js.map