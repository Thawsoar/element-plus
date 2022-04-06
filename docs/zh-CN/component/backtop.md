---
title: Backtop 回到顶部
lang: zh-CN
---

# Backtop 回到顶部

返回页面顶部的操作按钮。

## 基础用法

通过滑动来查看容器右下角的按钮

:::demo

backtop/basic

:::

## 自定义内容

显示区域被固定为 40px \* 40px 的区域, 其中的内容可支持自定义。

:::demo

backtop/custom

:::

## Backtop API

### Backtop 属性

| Name                | 说明                                                                 | 类型     | 默认值 |
| ------------------- | -------------------------------------------------------------------- | -------- | ------ |
| `target`            | the target to trigger scroll.                                        | `string` | —      |
| `visibility-height` | the button will not show until the scroll height reaches this value. | `number` | `200`  |
| `right`             | right distance.                                                      | `number` | `40`   |
| `bottom`            | bottom distance.                                                     | `number` | `40`   |

## Backtop 事件

| Name    | 说明                 | 回调参数                    |
| ------- | -------------------- | --------------------------- |
| `click` | triggers when click. | `(evt: MouseEvent) => void` |

## Backtop 插槽

| 插槽名    | 说明                       |
| --------- | -------------------------- |
| `default` | customize default content. |
