"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnyDecorator = (...args) => { };
function defineInjectable(opts) {
    return {
        token: opts.token,
        providedIn: opts.providedIn || null,
        factory: opts.factory,
        value: undefined,
    };
}
exports.defineInjectable = defineInjectable;
//# sourceMappingURL=util.js.map