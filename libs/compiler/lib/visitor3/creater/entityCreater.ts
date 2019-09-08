import * as ast from '../../visitors/visitor';
import { createName, createFieldDefinition, createParameters } from '../../utils/graphql';
import { ast as graphql } from '@notadd/magnus-graphql';
import { expressionVisitor } from '../../visitors/expression';
import { BaseCreater } from './baseCreater';
/**
 * entity
 */
export class EntityCreater extends BaseCreater {
    constructor() {
        super(``)
    }
    createClassDeclaration(name: string, node: ast.ClassDeclaration) {
        const input = new graphql.ObjectTypeDefinitionAst();
        input.name = createName(name)
        const members = node.members
            .filter(node => node instanceof ast.MethodDeclaration)
            .filter(node => !node.modifiers.find(it => ['private', 'static'].includes(it.name))) as ast.MethodDeclaration[];
        members.map(it => {
            const decorators = it.getDecorators()(expressionVisitor);
            const name = it.name.visit(expressionVisitor, ``)
            const dec = it.docs.map(doc => doc.comment).join(' ');
            const type = it.type.visit(expressionVisitor, ``);
            const args = it.parameters.map(par => createParameters(par))
            let opt = `String`;
            if (type === 'number') {
                opt = 'Int';
            }
            input.fields.push(
                createFieldDefinition(name, args, type, false, false, dec)
            );
        });
        return input;
    }
}