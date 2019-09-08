"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Factory {
    constructor(options) {
        this.options = options;
    }
    create(instance, name) {
        const members = this.options.entities[name];
        const methods = members.map((member) => {
            if (member.decorators.includes('ResolveProperty')) {
                return member.name;
            }
        }).filter((it) => !!it);
        const createSet = this.options.createSet();
        return new Proxy(instance, {
            get(target, p, receiver) {
                if (methods.includes(p)) {
                    return (variables, context, info) => {
                        const set = createSet({
                            info,
                            context,
                            variables
                        });
                        const args = set.getArguments();
                        return target[p].bind(target)(...args);
                    };
                }
            }
        });
    }
}
exports.Factory = Factory;
//# sourceMappingURL=factory.js.map