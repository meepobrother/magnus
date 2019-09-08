import * as ast from '../../visitors/visitor';
import { ast as graphql } from '@notadd/magnus-graphql';
import { BaseCreater } from './baseCreater';
import { MagnusContext } from '../../visitors/magnus';
export declare class PartialCreater extends BaseCreater {
    createClassDeclaration(name: string, node: ast.ClassDeclaration, context: MagnusContext): graphql.InputObjectTypeDefinitionAst<any, any>;
}
