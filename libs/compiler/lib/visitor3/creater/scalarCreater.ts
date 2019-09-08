import * as ast from '../../visitors/visitor';
import { createName, createStringValue } from '../../utils/graphql';
import { ast as graphql } from '@notadd/magnus-graphql';
import { BaseCreater } from './baseCreater';

export class ScalarCreater extends BaseCreater {
    constructor() {
        super(``)
    }
    createClassDeclaration(name: string, node: ast.ClassDeclaration): graphql.ScalarTypeDefinitionAst {
        const input = new graphql.ScalarTypeDefinitionAst();
        input.name = createName(name);
        const docs = node.docs.map((doc) => doc.comment).join('\n');
        input.description = createStringValue(docs)
        return input;
    }
} 