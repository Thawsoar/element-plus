---
title: Image 图片
lang: zh-CN
---

# Image 图片

图片容器，在保留所有原生 img 的特性下，支持懒加载，自定义占位、加载失败等

## 基础用法

:::demo 可通过`fit`确定图片如何适应到容器框，同原生 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)。

image/basic-usage

:::

## 占位内容

:::demo 可通过`slot = placeholder`可自定义占位内容

image/placeholder

:::

## 加载失败

:::demo 可通过`slot = error`可自定义加载失败内容

image/load-failed

:::

## 懒加载

:::demo 可通过`lazy`开启懒加载功能， 当图片滚动到可视范围内才会加载。 可通过 `scroll-container` 来设置滚动容器， 若未定义，则为最近一个 overflow 值为 auto 或 scroll 的父元素。

image/lazy-load

:::

## 图片预览

:::demo 可通过 `previewSrcList` 开启预览大图的功能。 你可以通过 `initial-index` 初始化第一张预览图片的位置。 默认初始位置为 0。

image/image-preview

:::

## Image API

### Image Attributes

| Name                  | 说明                                                                                                                                              | 类型                                                        | Default                                                                 |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------- |
| `src`                 | image source, same as native.                                                                                                                     | `string`                                                    | —                                                                       |
| `fit`                 | indicate how the image should be resized to fit its container, same as [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit). | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale'-down'` | —                                                                       |
| `hide-on-click-modal` | when enabling preview, use this flag to control whether clicking on backdrop can exit preview mode.                                               | `boolean`                                                   | `false`                                                                 |
| `lazy`                | whether to use lazy load.                                                                                                                         | `boolean`                                                   | `false`                                                                 |
| `scroll-container`    | the container to add scroll listener when using lazy load.                                                                                        | `string \| HTMLElement`                                     | the nearest parent container whose overflow property is auto or scroll. |
| `alt`                 | native attribute `alt`.                                                                                                                           | `string`                                                    | —                                                                       |
| `referrer-policy`     | native attribute `referrerPolicy`.                                                                                                                | `string`                                                    | —                                                                       |
| `preview-src-list`    | allow big image preview.                                                                                                                          | `string[]`                                                  | —                                                                       |
| `z-index`             | set image preview z-index.                                                                                                                        | `number`                                                    | —                                                                       |
| `initial-index`       | initial preview image index, less than the length of `url-list`.                                                                                  | `number`                                                    | `0`                                                                     |
| `preview-teleported`  | whether to append image-viewer to body. A nested parent element attribute transform should have this attribute set to `true`.                     | `boolean`                                                   | `false`                                                                 |

### Image Events

| Name     | 说明                                                                                              | Type                      |
| -------- | ------------------------------------------------------------------------------------------------- | ------------------------- |
| `load`   | same as native load.                                                                              | `(e: Event) => void`      |
| `error`  | same as native error.                                                                             | `(e: Error) => void`      |
| `switch` | trigger when switching images.                                                                    | `(index: number) => void` |
| `close`  | trigger when clicking on close button or when `hide-on-click-modal` enabled clicking on backdrop. | `() => void`              |

### Image Slots

| 插槽名        | 说明                             |
| ------------- | -------------------------------- |
| `placeholder` | triggers when image load.        |
| `error`       | triggers when image load failed. |
| `viewer`      | description of the image.        |

## Image Viewer API

### Image Viewer Attributes

| Name                  | 说明                                                                                                                     | 类型               | Default |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------ | ------- |
| `url-list`            | preview link list.                                                                                                       | `string[]`         | `[]`    |
| `z-index`             | preview backdrop z-index.                                                                                                | `number \| string` | —       |
| `initial-index`       | the initial preview image index, less than or equal to the length of `url-list`.                                         | `number`           | `0`     |
| `infinite`            | whether preview is infinite.                                                                                             | `boolean`          | `true`  |
| `hide-on-click-modal` | whether user can emit close event when clicking backdrop.                                                                | `boolean`          | `false` |
| `teleported`          | image 自身是否插入至 body 元素上。 A nested parent element attribute transform should have this attribute set to `true`. | `boolean`          | `false` |

### Image Viewer Events

| 事件名   | 说明                                                                                              | Type                      |
| -------- | ------------------------------------------------------------------------------------------------- | ------------------------- |
| `close`  | trigger when clicking on close button or when `hide-on-click-modal` enabled clicking on backdrop. | `() => void`              |
| `switch` | trigger when switching images.                                                                    | `(index: number) => void` |
