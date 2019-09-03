"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MagnusBase {
    init(tablename) {
        this.tablename = this.tablename || tablename;
    }
    createEntity(entity) {
        return new this.entity(entity);
    }
    createEntities(entities) {
        return entities.map(entity => this.createEntity(entity));
    }
}
exports.MagnusBase = MagnusBase;
class MagnusEntity {
    constructor(entity) {
        if (entity) {
            Object.keys(entity).map((key) => {
                this[key] = entity[key];
            });
        }
    }
}
exports.MagnusEntity = MagnusEntity;
//# sourceMappingURL=base.js.map