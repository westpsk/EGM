import { resultOfExec } from './exec';
import { logger } from '../common/logger';

export async function getGitCommitHash(filePath: string = './') {
  // const cmd = `cd ${filePath} && git log -1 --date=iso --pretty=format:'{%n  "commit": "%H",%n  "author": "%aN",%n  "date": "%ad",%n  "message": "%f"%n},'`;
  let commitHash = '';
  try {
    const cmd = `cd ${filePath} && git log -1 --pretty=format:"%H"`;
    commitHash = await resultOfExec(cmd, { encoding: 'utf8' });
  } catch (err) {
    logger.error('你的代码还未提交过');
  }
  return commitHash;
}

export async function getGitRepository() {
  let git = '';
  try {
    git = await resultOfExec('git config --get remote.origin.url');
  } catch (err) {
    logger.error('获取git仓库失败');
  }
  return git.trim();
}
