"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppInfo = void 0;
const path_1 = require("path");
const consts_1 = require("./consts");
const fs_1 = require("fs");
class AppInfo {
    constructor(options = {}) {
        this.options = options;
    }
    get startPoint() {
        const cwd = process.cwd();
        return this.options.$1 ? path_1.resolve(cwd, this.options.$1) : cwd;
    }
    get env() {
        return this.options.env || process.env.NODE_ENV;
    }
    isSystemRootDir(dir) {
        return !dir || dir === '/' || dir.endsWith(':\\') || dir.endsWith(':\\\\');
    }
    existsPackage(dir) {
        return fs_1.existsSync(path_1.normalize(`${dir}/package.json`));
    }
    get root() {
        if (this.__root)
            return this.__root;
        let root = this.startPoint;
        while (!this.isSystemRootDir(root) && !this.existsPackage(root)) {
            root = path_1.dirname(root);
        }
        if (this.isSystemRootDir(root) || root === '.')
            root = process.cwd();
        this.__root = root;
        return this.__root;
    }
    get config() {
        const { Parser } = require('confman');
        const configParser = new Parser({ env: this.env });
        const configFile = path_1.resolve(this.root, './configs/config');
        const configObject = configParser.load(configFile);
        return configObject;
    }
    load(filename, defaultValue = null) {
        try {
            return require(filename);
        }
        catch (_a) {
            return defaultValue;
        }
    }
    get package() {
        const pkgFile = path_1.resolve(this.root, './package.json');
        return this.load(pkgFile, {});
    }
    get tsConfig() {
        return this.load(this.tsConfigFile);
    }
    get tsConfigFile() {
        return path_1.resolve(this.root, './tsconfig.json');
    }
    get name() {
        return Object.assign(Object.assign({}, this.package), this.config).name;
    }
    get jsEntry() {
        const tsconfig = Object.assign({ outDir: consts_1.DIST_PATH }, this.tsConfig);
        return path_1.resolve(this.root, path_1.normalize(`./${tsconfig.outDir}/app.js`));
    }
    get tsEntry() {
        const tsconfig = Object.assign({ rootDir: consts_1.SRC_PATH }, this.tsConfig);
        return path_1.resolve(this.root, path_1.normalize(`./${tsconfig.rootDir}/app.ts`));
    }
    get srcPath() {
        const tsconfig = Object.assign({ rootDir: consts_1.SRC_PATH }, this.tsConfig);
        return tsconfig.rootDir;
    }
    get distPath() {
        const tsconfig = Object.assign({ outDir: consts_1.DIST_PATH }, this.tsConfig);
        return tsconfig.outDir;
    }
}
exports.AppInfo = AppInfo;
