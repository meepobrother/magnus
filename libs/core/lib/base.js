"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class MagnusBase {
    init(tablename, selection, def, entities) {
        this.tablename = this.tablename || tablename;
        this.selection = selection;
        this.typeDef = def;
        this.entities = entities;
        this.relations = this.typeDef[this.tablename];
        this.entity = this.entities[this.tablename];
    }
    createWhere(where, opt = "and", result) {
        if (where)
            Object.keys(where).map(key => {
                const keys = key.split("_");
                let type = ``;
                let column = ``;
                if (keys.length > 1) {
                    type = keys.pop();
                }
                column = keys.join("_");
                const value = where[key];
                switch (type) {
                    case "Not":
                        return new typeorm_1.FindOperator("not", value);
                    case "in":
                        return new typeorm_1.FindOperator("in", value);
                    case "NotIn":
                        return new typeorm_1.FindOperator("not", new typeorm_1.FindOperator("in", value));
                    case "Lt":
                        return new typeorm_1.FindOperator("lessThan", value);
                    case "Lte":
                        return new typeorm_1.FindOperator("lessThanOrEqual", value);
                    case "Gt":
                        return new typeorm_1.FindOperator("moreThan", value);
                    case "Gte":
                        return new typeorm_1.FindOperator("moreThanOrEqual", value);
                    case "Contains":
                        return new typeorm_1.FindOperator("like", `%${value}%`);
                    case "NotContains":
                        return new typeorm_1.FindOperator("not", new typeorm_1.FindOperator("like", `%${value}%`));
                    case "StartsWith":
                        return new typeorm_1.FindOperator("like", `${value}%`);
                    case "NotStartsWith":
                        return new typeorm_1.FindOperator("not", new typeorm_1.FindOperator("like", `${value}%`));
                    case "EndsWith":
                        return new typeorm_1.FindOperator("like", `%${value}`);
                    case "NotEndsWith":
                        return new typeorm_1.FindOperator("not", new typeorm_1.FindOperator("like", `%${value}`));
                    default:
                        return new typeorm_1.FindOperator("equal", value);
                }
            });
    }
    createSelectAndRelations() {
        const select = [];
        const relations = [];
        Object.keys(this.selection).map(key => {
            const relation = this.relations.find(it => it.name === key &&
                it.decorators.some(dec => ["ManyToOne", "OneToMany", "OneToOne", "ManyToMany"].includes(dec)));
            const resolveProperty = this.relations.find(it => it.name === key &&
                it.decorators.some(dec => ["ResolveProperty"].includes(dec)));
            if (!!relation) {
                if (!resolveProperty) {
                    relations.push(key);
                }
            }
            else {
                if (!resolveProperty) {
                    select.push(key);
                }
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