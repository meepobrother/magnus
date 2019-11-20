import * as morph from "ts-morph";
import { join } from 'path';
import { MagnusVisitor, MangusContextManager } from './visitors/magnus';
import { CollectionContext, collectionVisitor } from './visitors/collection';
import * as ast from "./visitors/visitor";
import { AstToGraphqlVisitor } from './visitors/astToGraphql';
import { toJson } from "@notadd/magnus-graphql";
import { print } from "graphql";
import { writeFileSync, ensureDirSync } from 'fs-extra';

export function compile(inputs: string[], assets: string, isServer: boolean = true) {
    ensureDirSync(assets);
    const project = new morph.Project();
    project.addSourceFilesFromTsConfig(join(process.cwd(), "tsconfig.json"));
    const languageService = project.getLanguageService();
    const manager = new MangusContextManager();
    manager.isServer = isServer;
    const magnus = new MagnusVisitor(manager);
    const collectionContext = new CollectionContext();
    collectionContext.isServer = isServer;
    project.getSourceFiles().map((sourceFile: any) => {
        const fileName = sourceFile.getFilePath();
        if (inputs.includes(fileName)) {
            const node = ast.tsVisitor.visitSourceFile(
                new ast.SourceFile(),
                sourceFile.compilerNode
            );
            node.visit(collectionVisitor, collectionContext);
        }
    });
    // 处理class
    collectionContext.classes
        .map(cls => magnus.visitClassDeclaration(cls, collectionContext))
        .filter(item => !!item);
    const astToGraphqlVisitor = new AstToGraphqlVisitor();
    const documentAst = astToGraphqlVisitor.visitContextManager(
        manager,
        collectionContext
    );
    const documentAstJson = toJson(documentAst);
    const content = print(documentAstJson);
    // 搜集metadata entity数据库 类名 依赖名
    writeFileSync(join(assets, `magnus.server.graphql`), content);
    return content;
}