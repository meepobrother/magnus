"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MagnusBase {
    constructor(tablename, selection, def, entities) {
        this.tablename = this.tablename || tablename;
        this.selection = selection;
        this.typeDef = def;
        this.entities = entities;
        this.relations = this.typeDef[this.tablename];
        this.entity = this.entities[this.tablename];
    }
    createSelectAndRelations() {
        const select = [];
        const relations = [];
        Object.keys(this.selection).map(key => {
            const relation = this.relations.find(it => it.name === key &&
                it.decorators.some(dec => ["ManyToOne", "OneToMany", "OneToOne", "ManyToMany"].includes(dec)));
            if (!!relation) {
                if (!relation.decorators.includes("ResolveProperty")) {
                    relations.push(key);
                }
            }
            else {
                select.push(key);
            }
        });
        return {
            select,
            relations
        };
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