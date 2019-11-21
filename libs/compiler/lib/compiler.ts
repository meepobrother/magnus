import * as morph from "ts-morph";
import { join } from 'path';
import { MagnusVisitor, MangusContextManager } from './visitors/magnus';
import { CollectionContext, collectionVisitor } from './visitors/collection';
import * as ast from "./visitors/visitor";
import { AstToGraphqlVisitor } from './visitors/astToGraphql';
import { toJson } from "@notadd/magnus-graphql";
import { print } from "graphql";
import { writeFileSync, ensureDirSync } from 'fs-extra';
import { AstToProtoVisitor } from './visitors/astToProto';
import { ast as grpcAst } from '@notadd/magnus-grpc';
export function compile(inputs: string[], assets: string, name: string, isServer: boolean = true) {
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
    const astToProto = new AstToProtoVisitor()
    astToProto.config = {} as any;
    astToProto.config.name = name;
    const protoRoot = astToProto.visitDocumentAst(documentAst, collectionContext);
    const protoStr = new grpcAst.ParseVisitor().visitRoot(protoRoot, ``);
    const documentAstJson = toJson(documentAst);
    if (!documentAstJson.isEmpty) {
        const content = print(documentAstJson);
        // 搜集metadata entity数据库 类名 依赖名
        writeFileSync(join(assets, `magnus.graphql`), content);
    }
    writeFileSync(join(assets, `magnus.proto`), protoStr);
}