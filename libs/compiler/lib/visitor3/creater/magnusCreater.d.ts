import * as ast from '../../visitors/visitor';
import { MagnusContext } from '../../visitors/magnus';
import { ast as graphql } from '@notadd/magnus-graphql';
import { BaseCreater } from './baseCreater';
/**
 * magnus
 */
export declare class MagnusCreater extends BaseCreater {
    context: MagnusContext;
    documentAst: graphql.DocumentAst;
    createClassDeclaration(name: string, node: ast.ClassDeclaration): graphql.ObjectTypeDefinitionAst<any, any>;
}
