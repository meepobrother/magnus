"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const FindOptionsUtils_1 = require("typeorm/find-options/FindOptionsUtils");
class Typeorm extends typeorm_1.EntityManager {
    async find(entityClass, optionsOrConditions) {
        const metadata = this.connection.getMetadata(entityClass);
        const qb = this.createQueryBuilder(entityClass, FindOptionsUtils_1.FindOptionsUtils.extractFindManyOptionsAlias(optionsOrConditions) || metadata.name);
        if (!FindOptionsUtils_1.FindOptionsUtils.isFindManyOptions(optionsOrConditions) || optionsOrConditions.loadEagerRelations !== false)
            FindOptionsUtils_1.FindOptionsUtils.joinEagerRelations(qb, qb.alias, metadata);
        return FindOptionsUtils_1.FindOptionsUtils.applyFindManyOptionsOrConditionsToQueryBuilder(qb, optionsOrConditions).getMany();
    }
}
exports.Typeorm = Typeorm;
//# sourceMappingURL=index.js.map