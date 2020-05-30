"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showCat = exports.showBrand = void 0;
const react_1 = __importStar(require("react"));
const ink_1 = require("ink");
const BigText = require("ink-big-text");
const pkg = require("../../package.json");
function showBrand() {
    ink_1.render(react_1.default.createElement(BigText, { text: pkg.displayName }));
}
exports.showBrand = showBrand;
const cat0 = `
        (\`.
         ) )
        ( (
         \\ \\
          \\ \\
        .-'  \`-.
       /        \`.
      (      )    \`-._ ,    _
       )   ,'         (.\\--'(
       \\  (         ) /      \\
        \\  \\_(     / (    <6 (6
         \\_)))\\   (   \`._  .:Y)__
          '''  \\   \`-._.'\`---^_)))
                \`-._ )))       \`\`\`
                     \`\`\`           EGM
`;
const cat1 = `
          .\`)
         ( (
          ) )
          \\ \\
          \\ \\
        .-'  \`-.
       /        \`.
      (      )    \`-._ ,    _
       )   ,'         (.\\--'(
       \\  (         ) /      \\
        \\  \\_(     / (    <6 (66
         \\_)))\\   (   \`._  .:Y)__
          '''  \\   \`-._.'\`---^_)))
                \`-._ )))       \`\`\`
                     \`\`\`           EGM
`;
const list = [cat0, cat1];
const CurCat = () => {
    const [cur, setCur] = react_1.useState(0);
    react_1.useEffect(() => {
        const timer = setInterval(() => {
            setCur((pre) => (pre === 2 ? 0 : pre + 1));
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);
    return react_1.default.createElement(ink_1.Box, null, list[cur]);
};
function showCat() {
    ink_1.render(react_1.default.createElement(CurCat, null));
}
exports.showCat = showCat;
