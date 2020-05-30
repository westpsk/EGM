import { resolve } from "path";
import { prompt } from "inquirer";
import { writeFileSync } from "fs";
import { EOL } from "os";
import { exec } from "../common/exec";
import { initTemplate } from "../common/module";
import { logger } from "../common/logger";
import { readDir } from "../common/fs";

async function input() {
  return prompt([
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

export async function init(template: string = "default") {
  // 检查非空
  const files = await readDir(process.cwd());
  if (files && files.length > 0) {
    throw new Error("Current directory is non-empty directory");
  }
  // 下载模板
  logger.info("开始下载...");
  const pkgName = `template-${template}`;
  await initTemplate(pkgName, process.cwd());
  // 更新信息
  const pkgFile = resolve(process.cwd(), "./package.json");
  const pkg = require(pkgFile);
  Object.assign(pkg, await input());
  writeFileSync(pkgFile, JSON.stringify(pkg, null, "") + EOL);
  // 安装依赖
  logger.info("安装依赖...");
  await exec("npm i");
  await exec("git init");
  logger.info("完成~");
}
