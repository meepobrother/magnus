/**
 * select id,name,create_date from table where limit order group by
 */
export declare class Ast {
}
export declare class Select extends Ast {
    fields: Field[];
    from: From;
}
export declare class Update extends Ast {
}
export declare class Insert extends Ast {
}
export declare class Delete extends Ast {
}
export declare class Field extends Ast {
}
export declare class From extends Ast {
}
export declare class LeftJoin extends Ast {
}
export declare class Where extends Ast {
}
export declare class Limit extends Ast {
}
export declare class OrderBy extends Ast {
}
export declare class GroupBy extends Ast {
}
