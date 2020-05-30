import fs from 'fs';
import path from 'path';

export function readDir(dir: string) {
  return new Promise<string[]>((resolve, reject) => {
    fs.readdir(dir, (err, files) => (err ? reject(err) : resolve(files)));
  });
}

export function rename(oldPath: string, newPath: string) {
  return new Promise<string>((resolve, reject) => {
    fs.rename(oldPath, newPath, (err) =>
      err ? reject(err) : resolve(newPath)
    );
  });
}

export function deleteFile(dirPath: string) {
  if (fs.existsSync(dirPath)) {
    fs.unlinkSync(dirPath);
  }
}

export function isDirectory(dirPath: string) {
  if (fs.existsSync(dirPath)) {
    return fs.statSync(dirPath).isDirectory();
  }
  return false;
}

export function deleteDir(dirPath: string) {
  if (fs.existsSync(dirPath)) {
    if (isDirectory(dirPath)) {
      fs.readdirSync(dirPath).forEach(function (file) {
        let curPath = path.join(dirPath, file);
        if (isDirectory(curPath)) {
          //删除文件夹
          deleteDir(curPath);
        } else {
          //删除文件
          fs.unlinkSync(curPath);
        }
      });
      //删除当前文件夹
      fs.rmdirSync(dirPath);
    } else {
      fs.unlinkSync(dirPath);
    }
  }
}
