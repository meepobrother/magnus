import * as ast from '../../visitors/visitor';
import { ast as graphql } from '@notadd/magnus-graphql';
import { BaseCreater } from './baseCreater';
/**
 * entity
 */
export declare class EntityCreater extends BaseCreater {
    constructor();
    createClassDeclaration(name: string, node: ast.ClassDeclaration): graphql.ObjectTypeDefinitionAst<any, any>;
}
