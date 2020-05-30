import program from "commander";
import { init } from "./commands/init";
import { brand } from "./commands/brand";

const pkg = require("../package.json");

program.version(pkg.version);

program
  .command("init [template]")
  .description("初始化项目")
  .option("-c, --clone", "指定git仓库拉取")
  .option("--offline", "Use cached template")
  .action(init);

program
  .command("brand")
  .description("brand")
  .action(brand);

program.parse(process.argv);
