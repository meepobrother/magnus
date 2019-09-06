import * as ast from '../../visitors/visitor';
import { MagnusContext } from '../../visitors/magnus';
import { ast as graphql } from '@notadd/magnus-graphql';
import { BaseCreater } from './baseCreater';
export declare class ScalarCreater extends BaseCreater {
    context: MagnusContext;
    documentAst: graphql.DocumentAst;
    createClassDeclaration(name: string, node: ast.ClassDeclaration): graphql.ScalarTypeDefinitionAst<any, any>;
}
