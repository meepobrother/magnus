import { client } from "@notadd/magnus-graphql";
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
