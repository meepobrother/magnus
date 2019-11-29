import * as ast from '../../visitors/visitor';
import { ast as graphql } from '@notadd/magnus-graphql';
import { BaseCreater } from './baseCreater';
export declare class WhereCreater extends BaseCreater {
    private description;
    createClassDeclaration(name: string, node: ast.ClassDeclaration): graphql.InputObjectTypeDefinitionAst<any, any>;
}
