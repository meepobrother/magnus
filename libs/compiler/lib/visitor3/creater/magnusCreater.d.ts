import * as ast from '../../visitors/visitor';
import { ast as graphql } from '@notadd/magnus-graphql';
import { BaseCreater } from './baseCreater';
/**
 * magnus
 */
export declare class MagnusCreater extends BaseCreater {
    constructor();
    createClassDeclaration(name: string, node: ast.ClassDeclaration): graphql.ObjectTypeDefinitionAst<any, any>;
}
