---
title: Badge 徽章
lang: zh-CN
---

# Badge 徽章

按钮和图标上的数字或状态标记。

## 基础用法

可以用来展示新消息的数量。

:::demo 通过设置 `value` 来调整标记所展示的内容，支持 `Number` or `String` 作为参数

badge/basic

:::

## 最大值

你还可以自定义最大值

:::demo 由`max`属性定义，它接受一个`Number`， 要注意的是，该值当且仅当在 `value` 的值也是 `Number` 时生效。

badge/max

:::

## 自定义显示内容

你也可以展示除数字以外你想要展示的任何值。

:::demo 当 `value` 是一个 `String` 类型当时候，你可以展示任何你想展示的内容。

badge/customize

:::

## 小红点

通过一个小红点标记来告知用户有新内容。

:::demo 除了数字外，设置`is-dot`属性 ，它接受一个`Boolean` 类型作为参数。

badge/dot

:::

## Badge API

### Badge 属性

| 属性     | 说明                                                                      | 类型                                                        | 默认值     |
| -------- | ------------------------------------------------------------------------- | ----------------------------------------------------------- | ---------- |
| `value`  | 显示值                                                                    | `string \| number`                                          | `''`       |
| `max`    | 最大值，超过最大值会显示 `{max}+`。 只有当 `value` 是数字类型时才会工作。 | `number`                                                    | `99`       |
| `is-dot` | 是否显示小圆点。                                                          | `boolean`                                                   | `false`    |
| `hidden` | 是否隐藏 Badge。                                                          | `boolean`                                                   | `false`    |
| `type`   | badge 类型。                                                              | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'danger'` |

### Badge 插槽

| 插槽名    | 说明           |
| --------- | -------------- |
| `default` | 自定义默认内容 |
