import { client } from "@notadd/magnus-graphql";
import { Where } from "./types";
import { FindOperator } from "typeorm";
interface TypeDef {
  [key: string]: { name: string; decorators: string[]; entity: string }[];
}
interface Entities {
  [key: string]: Type<any>;
}
interface Type<T> extends Function {
  new (...args: any[]): T;
}
export abstract class MagnusBase<T = any> {
  entity: Type<T>;
  tablename: string;
  selection: client.SelectionSetJson;
  relations: {
    name: string;
    decorators: string[];
    entity: string;
  }[];
  typeDef: TypeDef;
  entities: Entities;
  init(tablename: string, selection: any, def: TypeDef, entities: Entities) {
    this.tablename = this.tablename || tablename;
    this.selection = selection;
    this.typeDef = def;
    this.entities = entities;
    this.relations = this.typeDef[this.tablename];
    this.entity = this.entities[this.tablename];
  }
  createWhere(
    where?: Where<T>,
    opt: "or" | "not" | "and" = "and",
    result?: FindOperator<any>
  ) {
    if (where)
      Object.keys(where).map(key => {
        const keys = key.split("_");
        let type: string | undefined = ``;
        let column: string = ``;
        if (keys.length > 1) {
          type = keys.pop();
        } else {
          type = undefined;
          const opt = keys[0];
          if (opt === "OR") {
            const ors = where[opt];
            ors.map((or: any) => {
              this.createWhere(or, "or");
            });
          } else if (opt === "AND") {
            const ands = where[opt];
            ands.map((or: any) => {
              this.createWhere(or, "and");
            });
          } else if (opt === "NOT") {
            const nots = where[opt];
            nots.map((or: any) => {
              this.createWhere(or, "not");
            });
          }
        }
        column = keys.join("_");
        const value = where[key];
        switch (type) {
          case "Not":
            return new FindOperator("not", value);
          case "in":
            return new FindOperator("in", value);
          case "NotIn":
            return new FindOperator("not", new FindOperator("in", value));
          case "Lt":
            return new FindOperator("lessThan", value);
          case "Lte":
            return new FindOperator("lessThanOrEqual", value);
          case "Gt":
            return new FindOperator("moreThan", value);
          case "Gte":
            return new FindOperator("moreThanOrEqual", value);
          case "Contains":
            return new FindOperator("like", `%${value}%`);
          case "NotContains":
            return new FindOperator(
              "not",
              new FindOperator("like", `%${value}%`)
            );
          case "StartsWith":
            return new FindOperator("like", `${value}%`);
          case "NotStartsWith":
            return new FindOperator(
              "not",
              new FindOperator("like", `${value}%`)
            );
          case "EndsWith":
            return new FindOperator("like", `%${value}`);
          case "NotEndsWith":
            return new FindOperator(
              "not",
              new FindOperator("like", `%${value}`)
            );
          default:
            return new FindOperator("equal", value);
        }
      });
  }
  createSelectAndRelations(): {
    select: any[];
    relations: string[];
  } {
    const select: any[] = [];
    const relations: any[] = [];

    Object.keys(this.selection).map(key => {
      const relation = this.relations.find(
        it =>
          it.name === key &&
          it.decorators.some(dec =>
            ["ManyToOne", "OneToMany", "OneToOne", "ManyToMany"].includes(dec)
          )
      );
      const resolveProperty = this.relations.find(
        it =>
          it.name === key &&
          it.decorators.some(dec => ["ResolveProperty"].includes(dec))
      );
      if (!!relation) {
        if (!resolveProperty) {
          relations.push(key);
        }
      } else {
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
  createEntity(entity?: Partial<T>) {
    return new this.entity(entity);
  }
  createEntities(entities: Partial<T>[]) {
    return entities.map(entity => this.createEntity(entity));
  }
}

export class MagnusEntity<T> {
  constructor(entity: Partial<T>) {
    if (entity) {
      Object.keys(entity).map((key: string) => {
        (this as any)[key] = (entity as any)[key];
      });
    }
  }
}
