---
title: Avatar 头像
lang: zh-CN
---

# Avatar 头像

Avatar 组件可以用来代表人物或对象， 支持使用图片，图标或者文字作为 Avatar

## 基础用法

使用 `shape` 和 `size` 属性来设置 Avatar 的形状和大小。

:::demo

avatar/basic

:::

## 展示类型

支持使用图片，图标或者文字作为 Avatar。

:::demo

avatar/types

:::

## 回退行为

图片加载失败时的回退行为。

:::demo

avatar/fallback

:::

## 适应容器

当使用图片作为用户头像时，设置该图片如何在容器中展示。与[ object-fit ](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) 属性一致

:::demo

avatar/fit

:::

## Avatar API

### Avatar 属性

| 名称      | 说明                                                      | 类型                                                       | 默认值      | 是否必需 |
| --------- | --------------------------------------------------------- | ---------------------------------------------------------- | ----------- | -------- |
| `icon`    | representation type to icon, more info on icon component. | `string \| Component`                                      | —           | No       |
| `size`    | avatar size.                                              | `number \| 'large' \| 'default' \| 'small'`                | `'default'` | No       |
| `shape`   | avatar shape.                                             | `'circle' \| 'square'`                                     | `'circle'`  | No       |
| `src`     | the source of the image for an image avatar.              | `string`                                                   | —           | No       |
| `src-set` | native attribute `srcset` of image avatar.                | `string`                                                   | —           | No       |
| `alt`     | native attribute `alt` of image avatar.                   | `string`                                                   | —           | No       |
| `fit`     | set how the image fit its container for an image avatar.  | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `'cover'`   | No       |

### Avatar 事件

| 名称    | 说明                           | 类型                 |
| ------- | ------------------------------ | -------------------- |
| `error` | trigger when image load error. | `(e: Event) => void` |

### Avatar 插槽

| 插槽名    | 说明                      |
| --------- | ------------------------- |
| `default` | customize avatar content. |
