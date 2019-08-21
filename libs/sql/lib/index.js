"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * select id,name,create_date from table where limit order group by
 */
class Ast {
}
exports.Ast = Ast;
class Select extends Ast {
    constructor() {
        super(...arguments);
        this.fields = [];
    }
}
exports.Select = Select;
class Update extends Ast {
}
exports.Update = Update;
class Insert extends Ast {
}
exports.Insert = Insert;
class Delete extends Ast {
}
exports.Delete = Delete;
class Field extends Ast {
}
exports.Field = Field;
class From extends Ast {
}
exports.From = From;
class LeftJoin extends Ast {
}
exports.LeftJoin = LeftJoin;
class Where extends Ast {
}
exports.Where = Where;
class Limit extends Ast {
}
exports.Limit = Limit;
class OrderBy extends Ast {
}
exports.OrderBy = OrderBy;
class GroupBy extends Ast {
}
exports.GroupBy = GroupBy;
//# sourceMappingURL=index.js.map