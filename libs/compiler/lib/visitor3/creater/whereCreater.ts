import * as ast from '../../visitors/visitor';
import { createName, createInputValue } from '../../utils/graphql';
import { ast as graphql } from '@notadd/magnus-graphql';
import { expressionVisitor } from '../../visitors/expression';
import { BaseCreater } from './baseCreater';
export class WhereCreater extends BaseCreater {
    private description: { [key: string]: string } = {
        Not: `不等于`,
        In: `在制定内，如[1,2,3,...]`,
        Lt: `小于`,
        Lte: `小于等于`,
        Gt: `大于`,
        Gte: `大于等于`,
        Like: `包含,左{title: "a%"} 右边{title: "%a"} 包含{title: "%a%"}`,
        Between: `指定范围[min,max]`
    }
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
            if (isDate || (isColumn && type === 'number)')) {
                // 日期 time>:start And time<:end
                // Lt,Lte,Gt,Gte,Between
                let opt = `String`;
                if (type === 'number') {
                    opt = 'Int';
                }
                input.fields.push(
                    createInputValue(`${name}_Lt`, opt, false, false, `${dec} ` + this.description['Lt'])
                );
                input.fields.push(
                    createInputValue(`${name}_Lte`, opt, false, false, `${dec} ` + this.description['Lte'])
                );
                input.fields.push(
                    createInputValue(`${name}_Gt`, opt, false, false, `${dec} ` + this.description['Gt'])
                );
                input.fields.push(
                    createInputValue(`${name}_Gte`, opt, false, false, `${dec} ` + this.description['Gte'])
                );
                input.fields.push(
                    createInputValue(`${name}_Between`, opt, false, false, `${dec} ` + this.description['Between'])
                );
            }
            if (isColumn) {
                // 列
                if (type === 'string') {
                    // like
                    input.fields.push(
                        createInputValue(`${name}_Like`, 'String', false, false, `${dec} ` + this.description['Like'])
                    );
                }
            }
            input.fields.push(
                createInputValue(name, type, false, false, `${dec} 等于`)
            );
        })
        return input;
    }

}