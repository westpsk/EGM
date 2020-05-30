"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initTemplate = exports.extract = exports.download = exports.createStream = exports.saveFile = exports.getVersionInfo = exports.getInfo = void 0;
const mkdirp_1 = __importDefault(require("mkdirp"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const fs_1 = require("fs");
const os_1 = require("os");
const path_1 = require("path");
const decompress = require("decompress");
const decompressTargz = require("decompress-targz");
const timeout = 30000;
const registry = "http://registry.npm.taobao.org";
async function getInfo(name) {
    const url = `${registry}/${name}`;
    const res = await node_fetch_1.default(url, { timeout });
    const info = await res.json();
    if (!info || !info.versions || info.error) {
        throw new Error(`Cannot find module '${name}'`);
    }
    return info;
}
exports.getInfo = getInfo;
async function getVersionInfo(name, version) {
    const modInfo = (await getInfo(name)) || {};
    const distTags = modInfo["dist-tags"] || {};
    version = version || "latest";
    version = distTags[version] || version;
    const lastVersion = Object.keys(modInfo.versions).pop();
    return modInfo.versions[version] || modInfo.versions[lastVersion];
}
exports.getVersionInfo = getVersionInfo;
function saveFile(filename, readStream) {
    return new Promise((reslove) => {
        const writeStream = fs_1.createWriteStream(filename);
        writeStream.on("finish", () => {
            setTimeout(reslove, 500);
        });
        readStream.pipe(writeStream);
    });
}
exports.saveFile = saveFile;
function createStream(url) {
    return node_fetch_1.default(url).then((res) => {
        return res.body;
    });
}
exports.createStream = createStream;
async function download(name, version) {
    const info = await getVersionInfo(name, version);
    const pkgDir = path_1.resolve(os_1.homedir(), "./.gem-cli/modules");
    await mkdirp_1.default.sync(pkgDir);
    const pkgFile = path_1.resolve(pkgDir, `${name}@${info.version}.tgz`);
    if (fs_1.existsSync(pkgFile))
        return pkgFile;
    const tmpFile = pkgFile + ".tmp";
    if (fs_1.existsSync(tmpFile))
        fs_1.unlinkSync(tmpFile);
    const url = info && info.dist && info.dist.tarball;
    if (!url)
        throw new Error(`Cannot download ${name}`);
    const readStream = await createStream(url);
    await saveFile(tmpFile, readStream);
    fs_1.renameSync(tmpFile, pkgFile);
    return pkgFile;
}
exports.download = download;
async function extract(filename, dist, upIndex) {
    upIndex = upIndex || 0;
    return decompress(filename, dist, {
        plugins: [decompressTargz()],
        map: (file) => {
            file.path = file.path
                .split("/")
                .slice(upIndex)
                .join("/");
            return file;
        },
    });
}
exports.extract = extract;
async function initTemplate(name, dist) {
    const filename = await download(name);
    await extract(filename, dist, 1);
}
exports.initTemplate = initTemplate;
