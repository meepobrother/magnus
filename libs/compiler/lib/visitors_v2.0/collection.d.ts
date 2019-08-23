import { CompilerOptions } from 'typescript';
import { MagnusConfig } from '@nger/magnus-core';
export declare class CollectionVisitor {
}
export declare type Statement = CollectionClass | CollectionInterface | CollectionType | CollectionFunction;
export declare class CollectionClass {
    name: string;
}
export declare class CollectionInterface {
    name: string;
}
export declare class CollectionType {
    name: string;
}
export declare class CollectionFunction {
    name: string;
}
export declare const cache: Map<string, CollectionFile>;
/**
 * 这是一个文件
 */
export declare class CollectionFile {
    /**
     * 根目录
     */
    root: string;
    statements: Map<string, Statement>;
    /**
     * 导出的文件
     */
    exports: Map<string, Statement>;
    /**
     * 获取statement
     * @param key
     */
    getStatement(key: string): Statement | undefined;
    /**
     * 解析
     */
    resolve(file: string): string;
}
/**
 * 这是一个项目 多个文件
 */
export declare class CollectionProject {
    /**
    * 根目录
    */
    root: string;
    /**
     * 文件
     */
    files: Map<string, CollectionFile>;
    /**
     * 编译选项
     */
    compilerOptions: CompilerOptions;
    /**
     * magnus配置
     */
    config: MagnusConfig;
    /**
     * 获取文件
     */
    getFile(key: string): CollectionFile | undefined;
    /**
     * 添加文件
     * @param key
     * @param file
     */
    addFile(key: string, file: CollectionFile): void;
    /**
     * 解析
     */
    resolve(file: string): string;
}
/**
 * 多个项目
 */
export declare class Collection {
    projects: Map<string, CollectionProject>;
    /**
     * 根目录
     */
    root: string;
    /**
     * 编译选项
     */
    compilerOptions: CompilerOptions;
    /**
     * 解析
     */
    resolve(file: string): string;
    /**
     * 获取指定名称的项目
     */
    getProject(key: string): CollectionProject | undefined;
    /**
     * 获取指定项目下某文件
     */
    getProjectFile(project: string, file: string): CollectionFile | undefined;
    /**
     * 添加项目
     */
    addProject(key: string, project: CollectionProject): void;
}
