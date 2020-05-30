"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const path_1 = require("path");
const inquirer_1 = require("inquirer");
const fs_1 = require("fs");
const os_1 = require("os");
const exec_1 = require("../common/exec");
const module_1 = require("../common/module");
const logger_1 = require("../common/logger");
const fs_2 = require("../common/fs");
async function input() {
    return inquirer_1.prompt([
        {
            type: "input",
            message: "请输入项目名称:",
            name: "name",
            default: "bi-test",
            validate: (value) => !!value,
        },
        {
            type: "input",
            message: "请输入项目版本号:",
            name: "version",
            default: "1.0.0",
            validate: (value) => !!value,
        },
    ]);
}
async function init(template = "default") {
    const files = await fs_2.readDir(process.cwd());
    if (files && files.length > 0) {
        throw new Error("Current directory is non-empty directory");
    }
    logger_1.logger.info("开始下载...");
    const pkgName = `template-${template}`;
    await module_1.initTemplate(pkgName, process.cwd());
    const pkgFile = path_1.resolve(process.cwd(), "./package.json");
    const pkg = require(pkgFile);
    Object.assign(pkg, await input());
    fs_1.writeFileSync(pkgFile, JSON.stringify(pkg, null, "") + os_1.EOL);
    logger_1.logger.info("安装依赖...");
    await exec_1.exec("npm i");
    await exec_1.exec("git init");
    logger_1.logger.info("完成~");
}
exports.init = init;
