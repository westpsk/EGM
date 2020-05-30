"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDir = exports.isDirectory = exports.deleteFile = exports.rename = exports.readDir = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function readDir(dir) {
    return new Promise((resolve, reject) => {
        fs_1.default.readdir(dir, (err, files) => (err ? reject(err) : resolve(files)));
    });
}
exports.readDir = readDir;
function rename(oldPath, newPath) {
    return new Promise((resolve, reject) => {
        fs_1.default.rename(oldPath, newPath, (err) => err ? reject(err) : resolve(newPath));
    });
}
exports.rename = rename;
function deleteFile(dirPath) {
    if (fs_1.default.existsSync(dirPath)) {
        fs_1.default.unlinkSync(dirPath);
    }
}
exports.deleteFile = deleteFile;
function isDirectory(dirPath) {
    if (fs_1.default.existsSync(dirPath)) {
        return fs_1.default.statSync(dirPath).isDirectory();
    }
    return false;
}
exports.isDirectory = isDirectory;
function deleteDir(dirPath) {
    if (fs_1.default.existsSync(dirPath)) {
        if (isDirectory(dirPath)) {
            fs_1.default.readdirSync(dirPath).forEach(function (file) {
                let curPath = path_1.default.join(dirPath, file);
                if (isDirectory(curPath)) {
                    deleteDir(curPath);
                }
                else {
                    fs_1.default.unlinkSync(curPath);
                }
            });
            fs_1.default.rmdirSync(dirPath);
        }
        else {
            fs_1.default.unlinkSync(dirPath);
        }
    }
}
exports.deleteDir = deleteDir;
