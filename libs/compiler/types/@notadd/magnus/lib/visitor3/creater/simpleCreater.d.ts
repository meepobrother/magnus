import * as ast from '../../visitors/visitor';
import { ast as graphql } from '@notadd/magnus-graphql';
import { BaseCreater } from './baseCreater';
export declare class SimpleCreater extends BaseCreater {
    createClassDeclaration(name: string, node: ast.ClassDeclaration): graphql.InputObjectTypeDefinitionAst<any, any>;
}
