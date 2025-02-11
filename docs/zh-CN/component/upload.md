---
title: Upload 上传
lang: zh-CN
---

# Upload 上传

通过点击或者拖拽上传文件

## 基础用法

:::demo 通过 `slot` 你可以传入自定义的上传按钮类型和文字提示。 可通过设置 `limit` 和 `on-exceed` 来限制上传文件的个数和定义超出限制时的行为。 可通过设置 `before-remove` 来阻止文件移除操作。

upload/basic

:::

## 覆盖前一个文件

:::demo 设置 `limit` 和 `on-exceed` 可以在选中时自动替换上一个文件。

upload/limit-cover

:::

## 用户头像

在 `before-upload` 钩子中限制用户上传文件的格式和大小。

:::demo

upload/avatar

:::

## 照片墙

使用 `list-type` 属性来设定文件列表的样式。

:::demo

upload/photo-wall

:::

## 自定义缩略图

使用 `scoped-slot` 属性来改变默认的缩略图模板样式。

:::demo

upload/custom-thumbnail

:::

## 图片列表缩略图

:::demo

upload/file-list-with-thumbnail

:::

## 上传文件列表控制

通过 `on-change` 钩子函数来对列表进行控制

:::demo

upload/file-list

:::

## 拖拽上传

你可以将文件拖拽到特定区域以进行上传。

:::demo

upload/drag-and-drop

:::

## 手动上传

:::demo

upload/manual

:::

## 上传 API

### 属性

| 名称               | 描述                                                                                                                                 | 类型                                                                                          | 默认值             | 必填 |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- | ------------------ | ---- | --- |
| `action`           | 请求 URL                                                                                                                             | `string`                                                                                      | —                  | 是   |
| `headers`          | 设置上传的请求头部                                                                                                                   | `Headers \| Record<string, any>`                                                              | —                  | 否   |
| `method`           | 设置上传请求方法                                                                                                                     | `string`                                                                                      | `'post'`           | 否   |
| `multiple`         | 是否支持多选文件                                                                                                                     | `boolean`                                                                                     | `false`            | 否   |
| `data`             | 上传时附带的额外参数                                                                                                                 | `Record<string, any>`                                                                         | —                  | 否   |
| `name`             | 上传的文件字段名                                                                                                                     | `string`                                                                                      | `'file'`           | 否   |
| `with-credentials` | 支持发送 cookie 凭证信息                                                                                                             | `boolean`                                                                                     | `false`            | 否   |
| `show-file-list`   | 是否显示已上传文件列表                                                                                                               | `boolean`                                                                                     | `true`             | 否   |
| `drag`             | 是否启用拖拽上传                                                                                                                     | `boolean`                                                                                     | `false`            | 否   |
| `accept`           | 接受上传的[文件类型](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept)（thumbnail-mode 模式下此参数无效） | `string`                                                                                      | —                  | 否   |
| `on-preview`       | 点击文件列表中已上传的文件时的钩子                                                                                                   | `(uploadFile: UploadFile) => void`                                                            | —                  | 否   |
| `on-remove`        | 文件列表移除文件时的钩子                                                                                                             | `(uploadFile: UploadFile, uploadFiles: UploadFiles) => void`                                  | —                  | 否   |
| `on-success`       | 文件上传成功时的钩子                                                                                                                 | `(response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => void`                   | —                  | 否   |
| `on-error`         | 文件上传失败时的钩子                                                                                                                 | `(error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => void`                    | —                  | 否   |
| `on-progress`      | 文件上传时的钩子                                                                                                                     | `(evt: UploadProgressEvent, uploadFile: UploadFile, uploadFiles: UploadFiles) => void`        | —                  | 否   |
| `on-change`        | 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用                                                                       | `(uploadFile: UploadFile, uploadFiles: UploadFiles) => void`                                  | —                  | 否   |
| `on-exceed`        | 当超出限制时，执行的钩子函数                                                                                                         | `(files: File[], uploadFiles: UploadFiles) => void`                                           | —                  | 否   |
| `before-upload`    | 上传文件之前的钩子，参数为上传的文件， 若返回`false`或者返回` Promise` 且被 reject，则停止上传。                                     | `(rawFile: UploadRawFile) => Awaitable<void \| undefined \| null \| boolean \| File \| Blob>` | —                  | 否   |
| `before-remove`    | 删除文件之前的钩子，参数为上传的文件和文件列表， 若返回 `false `或者返回 `Promise `且被 reject，则停止删除。                         | `(uploadFile: UploadFile, uploadFiles: UploadFiles) => Awaitable<boolean>`                    | —                  | 否   |
| `file-list`        | 默认上传文件                                                                                                                         | `UploadUserFile[]`                                                                            | `[]`               | 否   |
| `list-type`        | 文件列表的类型                                                                                                                       | `"text" \| "picture" \| "picture-card"`                                                       | `'text'`           | 否   |
| `auto-upload`      | 是否自动上传文件                                                                                                                     | `boolean`                                                                                     | `true`             | 否   |
| `http-request`     | 覆盖默认的 Xhr 行为，允许自行实现上传文件的请求                                                                                      | (options: UploadRequestOptions) => XMLHttpRequest \                                           | Promise\<unknown\> | —    | 否  |
| `disabled`         | 是否禁用上传                                                                                                                         | boolean                                                                                       | `false`            | 否   |
| `limit`            | 允许上传文件的最大数量                                                                                                               | number                                                                                        | —                  | 否   |

### 插槽

| 名称      | 描述                 | Scope                  |
| --------- | -------------------- | ---------------------- |
| `default` | 自定义默认内容       | -                      |
| `trigger` | 触发文件选择框的内容 | -                      |
| `tip`     | 提示说明文字         | -                      |
| `file`    | 缩略图模板的内容     | `{ file: UploadFile }` |

### 外部方法

| 名称           | 描述                                                                        | 类型                                                                      |
| -------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `abort`        | 取消上传请求                                                                | `(file: UploadFile) => void`                                              |
| `submit`       | 手动上传文件列表                                                            | `() => void`                                                              |
| `clearFiles`   | 清空已上传的文件列表（该方法不支持在 `before-upload` 中调用）               | `(status?: Array<"ready" \| "uploading" \| "success" \| "fail">) => void` |
| `handleStart`  | 手动选择文件                                                                | `(rawFile: UploadRawFile) => void`                                        |
| `handleRemove` | 手动移除文件。 `file` 和`rawFile` 已被合并。 `rawFile` 将在 `v2.2.0` 中移除 | `(file: UploadFile \| UploadRawFile, rawFile?: UploadRawFile) => void`    |
