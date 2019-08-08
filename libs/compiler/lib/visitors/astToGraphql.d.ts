import { MangusContextManager } from './magnus';
import { ast } from '@notadd/magnus-graphql';
import { TsToGraphqlVisitor } from './tsToGraphql';
import { CollectionContext } from './collection';
import * as ts from './visitor';
export declare class AstToGraphqlVisitor implements ast.Visitor {
    name: string;
    collection: CollectionContext;
    documentAst: ast.DocumentAst;
    protos: {
        [key: string]: ast.FieldDefinitionAst[];
    };
    getProtos(): ast.ObjectTypeDefinitionAst[];
    createScalar(name: string): ast.ScalarTypeDefinitionAst<any, any>;
    tsToGraphqlVisitor: TsToGraphqlVisitor;
    querys: Map<string, ast.FieldDefinitionAst>;
    mutations: Map<string, ast.FieldDefinitionAst>;
    subscriptions: Map<string, ast.FieldDefinitionAst>;
    sourceFile: ts.SourceFile;
    visitContextManager(node: MangusContextManager, collection: CollectionContext): ast.DocumentAst;
    collectCls(node: ts.ClassDeclaration, context: CollectionContext): ast.ScalarTypeDefinitionAst<any, any> | ast.InterfaceTypeDefinitionAst<any, any> | ast.InputObjectTypeDefinitionAst<any, any> | undefined;
    createObjectTypeDefinitionAst(name: string, fields: ast.FieldDefinitionAst[]): ast.ObjectTypeDefinitionAst<any, any>;
}
