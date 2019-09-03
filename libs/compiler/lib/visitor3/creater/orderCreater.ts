import * as ast from '../../visitors/visitor';
import { createName, createInputValue } from '../../utils/graphql';
import { ast as graphql } from '@notadd/magnus-graphql';
import { expressionVisitor } from '../../visitors/expression';
import { BaseCreater } from './baseCreater';

export class OrderCreater extends BaseCreater {
    createClassDeclaration(name: string, node: ast.ClassDeclaration) {
        const input = new graphql.InputObjectTypeDefinitionAst();
        input.name = createName(name)
        const members = node.members
            .filter(node => node instanceof ast.PropertyDeclaration)
            .filter(node => !node.modifiers.find(it => ['private', 'static'].includes(it.name))) as ast.PropertyDeclaration[];
        members.filter(node => {
            const decorators = node.getDecorators()(expressionVisitor);
            return !decorators.find(it => ['ManyToOne', "OneToMany", "OneToOne", "ManyToMany", "TreeParent", "TreeChildren"].includes(it))
        }).map(it => {
            const decorators = it.getDecorators()(expressionVisitor);
            const isDate = !!['CreateDateColumn', 'UpdateDateColumn', 'Time'].find(it => decorators.includes(it));
            const isColumn = !!['Column', 'PrimaryGeneratedColumn', 'PrimaryColumn', 'ObjectIdColumn'].find(it => decorators.includes(it))
            const type = it.type.visit(expressionVisitor, ``)
            const name = it.name.visit(expressionVisitor, ``)
            const dec = it.docs.map(doc => doc.comment).join(' ');
            if (isDate || (isColumn && type === 'number')) {
                let opt = `String`;
                if (isDate) {
                    opt = 'Date';
                }
                else if (type === 'number') {
                    opt = 'Int';
                }
                input.fields.push(
                    createInputValue(name, type, false, false, `${dec} ASC 升序 DESC降序`)
                );
            }
        })
        return input;
    }
}