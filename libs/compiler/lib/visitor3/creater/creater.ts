import { ScalarCreater } from './scalarCreater';
import { EntityCreater } from './entityCreater';
import { DirectiveCreater } from './directiveCreater';
import { MagnusCreater } from './magnusCreater';
import { CollectionContext } from '../../visitors/collection';
import { MagnusContext } from '../../visitors/magnus';
import { ast as graphql } from '@notadd/magnus-graphql';
import * as ast from '../../visitors/visitor';

export class Creater {
    collection: CollectionContext;
    context: MagnusContext;
    documentAst: graphql.DocumentAst;
    createScalar(node: ast.TypeReferenceNode, context: MagnusContext) {
        const creater = new ScalarCreater();
        creater.collection = this.collection;
        creater.documentAst = this.documentAst;
        return creater.createName(node, context);
    }

    createEntity(node: ast.TypeReferenceNode, context: MagnusContext) {
        const creater = new EntityCreater();
        creater.collection = this.collection;
        creater.documentAst = this.documentAst;
        return creater.createName(node, context);
    }

    createDirective(node: ast.TypeReferenceNode, context: MagnusContext) {
        const creater = new DirectiveCreater()
        creater.collection = this.collection;
        creater.documentAst = this.documentAst;
        return creater.createName(node, context);
    }

    createMagnus(node: ast.TypeReferenceNode, context: MagnusContext) {
        const creater = new MagnusCreater()
        creater.collection = this.collection;
        creater.documentAst = this.documentAst;
        return creater.createName(node, context);
    }

}