"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
class InjectionToken {
    constructor(_desc, options) {
        this._desc = _desc;
        this.metadataName = 'InjectionToken';
        this.injectableDef = undefined;
        if (options) {
            this.injectableDef = util_1.defineInjectable({
                token: this,
                providedIn: options.providedIn || 'root',
                factory: options.factory,
            });
        }
    }
    toString() { return `InjectionToken ${this._desc}`; }
}
exports.InjectionToken = InjectionToken;
//# sourceMappingURL=token.js.map