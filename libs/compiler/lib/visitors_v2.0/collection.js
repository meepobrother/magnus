"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CollectionVisitor {
}
exports.CollectionVisitor = CollectionVisitor;
class CollectionClass {
}
exports.CollectionClass = CollectionClass;
class CollectionInterface {
}
exports.CollectionInterface = CollectionInterface;
class CollectionType {
}
exports.CollectionType = CollectionType;
class CollectionFunction {
}
exports.CollectionFunction = CollectionFunction;
exports.cache = new Map();
/**
 * 这是一个文件
 */
class CollectionFile {
    constructor() {
        this.statements = new Map();
        /**
         * 导出的文件
         */
        this.exports = new Map();
    }
    /**
     * 获取statement
     * @param key
     */
    getStatement(key) {
        return this.statements.get(key);
    }
    /**
     * 解析
     */
    resolve(file) {
        return require.resolve(file);
    }
}
exports.CollectionFile = CollectionFile;
/**
 * 这是一个项目 多个文件
 */
class CollectionProject {
    constructor() {
        /**
         * 文件
         */
        this.files = new Map();
    }
    /**
     * 获取文件
     */
    getFile(key) {
        return this.files.get(key);
    }
    /**
     * 添加文件
     * @param key
     * @param file
     */
    addFile(key, file) {
        this.files.set(key, file);
    }
    /**
     * 解析
     */
    resolve(file) {
        return require.resolve(file);
    }
}
exports.CollectionProject = CollectionProject;
/**
 * 多个项目
 */
class Collection {
    constructor() {
        this.projects = new Map();
    }
    /**
     * 解析
     */
    resolve(file) {
        return require.resolve(file);
    }
    /**
     * 获取指定名称的项目
     */
    getProject(key) {
        return this.projects.get(key);
    }
    /**
     * 获取指定项目下某文件
     */
    getProjectFile(project, file) {
        const _project = this.getProject(project);
        if (_project)
            return _project.getFile(file);
    }
    /**
     * 添加项目
     */
    addProject(key, project) {
        this.projects.set(key, project);
    }
}
exports.Collection = Collection;
//# sourceMappingURL=collection.js.map