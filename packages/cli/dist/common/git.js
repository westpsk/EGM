"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGitRepository = exports.getGitCommitHash = void 0;
const exec_1 = require("./exec");
const logger_1 = require("../common/logger");
async function getGitCommitHash(filePath = './') {
    let commitHash = '';
    try {
        const cmd = `cd ${filePath} && git log -1 --pretty=format:"%H"`;
        commitHash = await exec_1.resultOfExec(cmd, { encoding: 'utf8' });
    }
    catch (err) {
        logger_1.logger.error('你的代码还未提交过');
    }
    return commitHash;
}
exports.getGitCommitHash = getGitCommitHash;
async function getGitRepository() {
    let git = '';
    try {
        git = await exec_1.resultOfExec('git config --get remote.origin.url');
    }
    catch (err) {
        logger_1.logger.error('获取git仓库失败');
    }
    return git.trim();
}
exports.getGitRepository = getGitRepository;
