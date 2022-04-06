---
title: Tooltip V2
lang: zh-CN
---

# Tooltip V2

对于现有的 Tooltip 来说，它有太多的 API，这些 API 不是非常直观和易于获取的。 所以我们创建了这个简单得多的工具提示。它只做了一件简单的事情 — 显示提示信息。 虽然两者结构相似，但 API 是不同的。 在这个版本中，我们单独提供了组件。你可以通过使用组件来创建自己的工具提示。

## 基础用法

在图标上以 **Hover** 或者 **tab** 方式触发文字提示。

:::demo

tooltip-v2/basic-usage

:::

## 可访问性友好的文字提示

:::demo

tooltip-v2/a11y

:::

## 转场/动画

You may set transition/animation via `CSS` animation/transition or [Transition](https://vuejs.org/guide/built-ins/transition.html#transition) component for your tooltip content when opening.

:::tip

By default, tooltip v2 ONLY allows a half-way transition/animation which only occurs when the tooltip is shown. This is because the implementation uses `v-if` to show/hide the tooltip. When closing, the content element is removed from DOM, so that the transition / animation will be interrupted.

:::

:::demo

tooltip-v2/transition

:::

### 完全过渡

Of course, you can have full transition for your tooltip content. But this requires using [Transition](https://vuejs.org/guide/built-ins/transition.html#transition) component, checkout the demo below.

:::demo

tooltip-v2/full-transition

:::

## 渲染到根元素

By default, unlike [tooltip v1](./tooltip.md), the tooltip will be rendered to the body element. **tooltip v2** will render to where the trigger/reference element is. But you can still render to to the root element by using `Teleport` component.

:::demo

tooltip-v2/render-to-root

:::

## 带箭头

:::demo

tooltip-v2/arrow

:::

<!-- ## Composing your own tooltip

## Tooltip V2 APIs

### Tooltip Root

### Tooltip Trigger

### Tooltip Content

### Tooltip Arrow

### Tooltip Reference -->
