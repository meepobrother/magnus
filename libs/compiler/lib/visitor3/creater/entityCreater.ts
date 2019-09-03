import * as ast from '../../visitors/visitor';
import { MagnusContext } from '../../visitors/magnus';
import { createName, createInputValue } from '../../utils/graphql';
import { ast as graphql } from '@notadd/magnus-graphql';
import { expressionVisitor } from '../../visitors/expression';
import { BaseCreater } from './baseCreater';

export class EntityCreater extends BaseCreater {
    context: MagnusContext;
    documentAst: graphql.DocumentAst;
    createClassDeclaration(name: string, node: ast.ClassDeclaration) {
        const input = new graphql.InputObjectTypeDefinitionAst();
        input.name = createName(name)
        const members = node.members
            .filter(node => node instanceof ast.PropertyDeclaration)
            .filter(node => !node.modifiers.find(it => ['private', 'static'].includes(it.name))) as ast.PropertyDeclaration[];
        members.map(it => {
            const decorators = it.getDecorators()(expressionVisitor);
            const isRelation = decorators.find(it => ['ManyToOne', "OneToMany", "OneToOne", "ManyToMany", "TreeParent", "TreeChildren"].includes(it))
            const isDate = !!['CreateDateColumn', 'UpdateDateColumn', 'Time'].find(it => decorators.includes(it));
            const isColumn = !!['Column', 'PrimaryGeneratedColumn', 'PrimaryColumn', 'ObjectIdColumn'].find(it => decorators.includes(it))
            const isAuto = !!['CreateDateColumn', 'UpdateDateColumn'].find(it => decorators.includes(it));
            const name = it.name.visit(expressionVisitor, ``)
            const dec = it.docs.map(doc => doc.comment).join(' ');
            if (isAuto) { }
            else if (isDate || (isColumn)) {
                const type = it.type.visit(expressionVisitor, ``)
                input.fields.push(
                    createInputValue(name, type, false, false, dec)
                );
            } else if (isRelation) {
                // 关系
                if (it.type instanceof ast.TypeReferenceNode) {
                    const createName = this.createName(it.type, this.context)
                    if (createName) {
                        const { name: astName, entity, namedType } = createName;
                        if (!this.documentAst.hasDefinitionAst(astName)) {
                            this.documentAst.definitions.push(entity)
                        }
                        input.fields.push(
                            createInputValue(name, namedType, false, false, dec)
                        );
                    }
                } else if (it.type instanceof ast.ArrayTypeNode) {
                    const createName = this.createName(it.type.elementType as any, this.context)
                    if (createName) {
                        const { name: astName, entity, namedType } = createName;
                        if (!this.documentAst.hasDefinitionAst(astName)) {
                            this.documentAst.definitions.push(entity)
                        }
                        input.fields.push(
                            createInputValue(name, namedType, false, true, dec)
                        );
                    }
                } else {
                    console.log(it.type)
                }
            }
        })
        return input;
    }
}