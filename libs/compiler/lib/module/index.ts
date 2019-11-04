import { Node } from 'typescript';
/**
 * 找到模块入口、文件入口
 */
export class File {
    /**
     * 导出key: name,value: node
     */
    exports: Map<string, Node> = new Map();
    /**
     * 从某个文件引入某变量
     */
    imports: Map<string, Set<string>> = new Map();
    /**
     * 文件名
     */
    name: string;

    getExport(name: string) {
        return this.exports.get(name)
    }
}

export class FileManager {
    files: Map<string, File> = new Map();
}
