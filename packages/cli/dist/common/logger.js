"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const chalk_1 = __importDefault(require("chalk"));
const os_1 = require("os");
const util_1 = require("util");
const colors = {
    log: (text) => text,
    info: chalk_1.default.green.bind(chalk_1.default),
    warn: chalk_1.default.yellow.bind(chalk_1.default),
    error: chalk_1.default.red.bind(chalk_1.default)
};
function wrapConsole(originConsole) {
    const newConsole = Object.create(originConsole);
    ['log', 'info', 'warn', 'error'].forEach(name => {
        const func = newConsole[name];
        newConsole[name] = (formater, ...args) => {
            const text = util_1.format(formater, ...args);
            if (text.includes(os_1.EOL)) {
                return func.call(newConsole, formater, ...args);
            }
            const time = `[${new Date().toLocaleString()}]`;
            return func.call(newConsole, chalk_1.default.blue(time), colors[name](text));
        };
    });
    return newConsole;
}
exports.logger = wrapConsole(console);
