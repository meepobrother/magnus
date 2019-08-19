/**
 * select id,name,create_date from table where limit order group by
 */
export class Ast { }
export class Select extends Ast {
    fields: Field[] = [];
    from: From;
}
export class Update extends Ast { }
export class Insert extends Ast { }
export class Delete extends Ast { }
export class Field extends Ast { }
export class From extends Ast { }
export class LeftJoin extends Ast { }
export class Where extends Ast { }
export class Limit extends Ast { }
export class OrderBy extends Ast { }
export class GroupBy extends Ast { }
