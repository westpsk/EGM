---
order: 6
iframe: 250
title: 顶部公告
---

页面顶部通告形式，默认有图标且 `type` 为 'warning'。

```json
{
  "type": "page",
  "body": {
    "label": "弹个框",
    "type": "button",
    "level": "dark",
    "actionType": "dialog",
    "dialog": {
      "title": "弹框",
      "body": "这是个简单的弹框。"
    }
  }
}
```
