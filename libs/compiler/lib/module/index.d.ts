import { Node } from 'typescript';
/**
 * 找到模块入口、文件入口
 */
export declare class File {
    /**
     * 导出key: name,value: node
     */
    exports: Map<string, Node>;
    /**
     * 从某个文件引入某变量
     */
    imports: Map<string, Set<string>>;
    /**
     * 文件名
     */
    name: string;
    getExport(name: string): Node | undefined;
}
export declare class FileManager {
    files: Map<string, File>;
}
