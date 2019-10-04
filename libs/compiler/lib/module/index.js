"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 找到模块入口、文件入口
 */
class File {
    constructor() {
        /**
         * 导出key: name,value: node
         */
        this.exports = new Map();
        /**
         * 从某个文件引入某变量
         */
        this.imports = new Map();
    }
    getExport(name) {
        return this.exports.get(name);
    }
}
exports.File = File;
class FileManager {
    constructor() {
        this.files = new Map();
    }
}
exports.FileManager = FileManager;
//# sourceMappingURL=index.js.map