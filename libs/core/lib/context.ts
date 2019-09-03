import { graphql, GraphQLResolveInfo, DocumentNode } from "graphql";
import { ClientVisitor, ParseVisitor, ast } from "@notadd/magnus-graphql";
import { upperFirst } from "lodash";
import { scalars } from "@notadd/magnus-graphql";
import { makeExecutableSchema } from "graphql-tools";
interface Type<T> extends Function {
    new(...args: any[]): T;
}
type ClassName = string;
type MethodName = string;
type TableName = string;
type FieldName = string;
type Arguments = {
    name: string;
    type: string;
    index: number;
    decorator: string[];
}[];

interface MagnusType {
    name: string;
    typeArguments: MagnusType;
    fullName: string;
}

export type HandlerDef = [
    FieldName,
    ClassName,
    TableName,
    MethodName,
    Arguments,
    MagnusType
];
export interface HandlerDefMap {
    [key: string]: HandlerDef[];
}
type Handler = (args: any) => any;
export interface InjectMap {
    [key: string]: Type<any>;
}
export interface ClassDef {
    [key: string]: string[];
}
