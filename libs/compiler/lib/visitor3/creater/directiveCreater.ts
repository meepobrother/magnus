import * as ast from '../../visitors/visitor';
import { MagnusContext } from '../../visitors/magnus';
import { createName, createStringValue } from '../../utils/graphql';
import { ast as graphql } from '@notadd/magnus-graphql';
import { BaseCreater } from './baseCreater';
export class DirectiveCreater extends BaseCreater {
    context: MagnusContext;
    documentAst: graphql.DocumentAst;
    createClassDeclaration(name: string, node: ast.ClassDeclaration) {
        const input = new graphql.DirectiveDefinitionAst();
        input.name = createName(name);
        const docs = node.docs.map((doc) => doc.comment).join('\n');
        input.description = createStringValue(docs);
        return input;
    }
}
