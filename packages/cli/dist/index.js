"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const init_1 = require("./commands/init");
const brand_1 = require("./commands/brand");
const pkg = require("../package.json");
commander_1.default.version(pkg.version);
commander_1.default
    .command("init [template]")
    .description("初始化项目")
    .option("-c, --clone", "指定git仓库拉取")
    .option("--offline", "Use cached template")
    .action(init_1.init);
commander_1.default
    .command("brand")
    .description("brand")
    .action(brand_1.brand);
commander_1.default.parse(process.argv);
