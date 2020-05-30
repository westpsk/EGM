# EGM

test

## template-default

渲染器脚手架

脚手架发布：

cd packages/template-default
npm run pub

## 代码格式化

prettier

## 代码提交规范

[commit lint rules](https://commitlint.js.org/#/reference-rules?id=rules)

> `<type>(<scope>): <subject>`

Header 部分只有一行，包括三个字段：type（必需）、scope（可选）和 subject（必需）。Body 和 Footer 不做限制。

type 用于说明 commit 的类别，只允许使用下面 7 个标识。

- feat 新功能（feature）
- fix 修补 bug
- docs 文档（documentation）
- style 格式（不影响代码运行的变动）
- refactor 重构（即不是新增功能，也不是修改 bug 的代码变动）
- test 增加测试
- chore 构建过程、辅助工具的变动
- perf 提高性能
- build 修改项目的的构建系统（glup，webpack，rollup 等）的提交
- ci 修改项目的持续集成流程（Jenkins、GitLab CI 等）的提交

如果 type 为 feat 和 fix，则该 commit 将肯定出现在 Change log 之中。

scope 用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

subject 是 commit 目的的简短描述，不超过 50 个字符。
