---
title: Space 间距
lang: zh-CN
---

# Space 间距

虽然我们拥有 [Divider 组件](/zh-CN/component/divider)，但很多时候我们需要不是一个被 [Divider 组件](/zh-CN/component/divider) 分割开的页面结构，因此我们会重复的使用很多的 [Divider 组件](/zh-CN/component/divider)，这在我们的开发效率上造成了一定的困扰。 **间距组件**就是为了解决这种困扰应运而生的。

## 基础用法

最基础的用法，通过这个组件来给组件之间提供统一的间距。

:::demo 通过间距组件来给多个组件之间提供间距

space/basic

:::

## 垂直布局

使用 `direction` 来控制布局的方式, 背后实际上是利用了 `flex-direction` 来控制.

:::demo 我们也提供垂直布局方式。

space/vertical-layout

:::

## 控制间距的大小

通过调整 `size` 的值来控制间距的大小

您可以用内置大小 `small`, `默认`, `large`, 这些大小对应于 `4px`, `8px`, `12px`, `16px`. 默认的间距大小为 `small`，也就是 `8px`。

您也可以通过自定义的 size 来控制大小， 参见下一个部分。

:::demo

space/control-size

:::

## 自定义 Size

很多时候, 内建的大小不满足设计师的要求, 我们可以通过传入自己定义的大小 (数字类型) 来设置

:::demo

space/customized-size

:::

:::tip

不要让 `ElSpace` 与使用依赖父元素百分比宽度 (高度) 的元素一起使用, 例如 `ElSlider`, 这样会造成光标不同步

:::

## 自动换行

在**水平 (horizontal) **模式下, 通过控制 `wrap `**(布尔类型) **来控制是否自动换行

:::demo 利用 `wrap` 属性控制换行

space/auto-wrapping

:::

## 行间分隔符

有时候, 仅仅在行间加空白, 并不能满足我们的日常需求, 此时分隔符 (spacer) 就可以发挥非常好的作用了.

## 字母数字类型分隔符

:::demo

space/literal-type-spacer

:::

## 分隔符还可以是 VNode 类型

:::demo

space/vnode-type-spacer

:::

## 对齐方式

设置该值可以调整所有子节点在容器内的对齐方式, 可设置的值与 [align-items ](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items)一致

:::demo 使用 `alignment` 属性来对齐

space/alignment

:::

## 填充容器

通过 `fill` **(Boolean Type)** 参数，您可以控制子节点是否自动填充容器。

下面的例子中，当设置为 `fill` 时，子节点的宽度会自动适配容器的宽度。

:::demo 用 fill 属性让子节点自动填充容器

space/fill

:::

也可以使用 `fillRatio` 参数，自定义填充的比例， 默认值为 `100`，代表基于父容器宽度的 ` 100%` 进行填充

需要注意的是，水平布局和垂直布局的表现形式稍有不同，具体的效果可以查看下面的例子

:::demo 用 fillRatio 自定义填充比例

space/fill-ratio

:::

## Space 属性

| 属性       | 说明                      | 类型                               | 可选值                                                                      | 默认值     |
| ---------- | ------------------------- | ---------------------------------- | --------------------------------------------------------------------------- | ---------- | --- |
| alignment  | 对齐的方式                | string                             | [align-items](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items) | 'center'   |
| class      | 类名                      | string / Array<Object \\           | String> / Object                                                            | -          | -   |
| direction  | 排列的方向                | string                             | vertical/horizontal                                                         | horizontal |
| prefix-cls | 给 space-items 的类名前缀 | string                             | el-space                                                                    | -          |
| style      | 额外样式                  | string / Array<Object \\           | String> / Object                                                            | -          | -   |
| spacer     | 间隔符                    | string / number / VNode            | -                                                                           | -          |
| size       | 间隔大小                  | string / number / [number, number] | -                                                                           | 'small'    |
| wrap       | 设置是否自动折行          | boolean                            | true / false                                                                | false      |
| fill       | 子元素是否填充父容器      | boolean                            | true / false                                                                | false      |
| fill-ratio | 填充父容器的比例          | number                             | -                                                                           | 100        |

## Space 插槽

| 名称    | 说明               |
| ------- | ------------------ |
| default | 需要添加间隔的元素 |
