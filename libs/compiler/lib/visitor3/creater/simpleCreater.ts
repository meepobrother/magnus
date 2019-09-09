import * as ast from '../../visitors/visitor';
import { createName, createInputValue } from '../../utils/graphql';
import { ast as graphql } from '@notadd/magnus-graphql';
import { expressionVisitor } from '../../visitors/expression';
import { BaseCreater } from './baseCreater';

export class SimpleCreater extends BaseCreater {
    createClassDeclaration(name: string, node: ast.ClassDeclaration) {
        const input = new graphql.InputObjectTypeDefinitionAst();
        input.name = createName(name)
        const members = node.members
            .filter(node => node instanceof ast.PropertyDeclaration)
            .filter(node => !node.modifiers.find(it => ['private', 'static'].includes(it.name))) as ast.PropertyDeclaration[];
        members.map(it => {
            const decorators = it.getDecorators()(expressionVisitor);
            const isDate = !!['CreateDateColumn', 'UpdateDateColumn', 'Time'].find(it => decorators.includes(it));
            const isColumn = !!['Column', 'PrimaryGeneratedColumn', 'PrimaryColumn', 'ObjectIdColumn'].find(it => decorators.includes(it))
            const isAuto = !!['CreateDateColumn', 'UpdateDateColumn'].find(it => decorators.includes(it));
            const name = it.name.visit(expressionVisitor, ``)
            const dec = it.docs.map(doc => doc.comment).join(' ');
            if (isAuto) { }
            else if (isDate || (isColumn)) {
                const type = it.type.visit(expressionVisitor, ``)
                let opt = `String`;
                if (isDate) {
                    opt = 'Date';
                }
                else if (type === 'number') {
                    opt = 'Int';
                }
                input.fields.push(
                    createInputValue(name, type, false, false, dec)
                );
            }
        })
        return input;
    }
}