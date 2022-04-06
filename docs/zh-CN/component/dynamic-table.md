---
title: DynamicTable 动态表格
lang: zh-CN
---

## DynamicTable 动态表格

ElTable 表格列的顺序都由 ElTableColumn 的模板决定，在动态更改 column 数据方面不够灵活，因此在兼容 ElTable 表格的所有属性及方法前提下，结合常见的业务场景集成了诸如导航分页加载，滚动加载数据的等功能封装成动态表格组件。所谓动态表格，就是将原先 ElTableColumn 表格列的模板内容用数据 columnItem 表示，在表格列数据发生变化时，能够自动更新表格内容。 好处是方便抽离出数据及无状态组件，灵活的维护表格列的顺序，更新表格列的数据，以及添加新的表格列。

## 基础用法

基础的动态表格展示用法。

:::demo 当 table-data 对象数组为源数据，column 对象数组表示表格列，其中用 prop 属性来对应对象中的键名即可填入数据，用 label 属性来定义表格的列名。 可以使用 width 属性来定义列宽。

dynamic-table/basic-usage

:::

## 带斑马纹表格

使用带斑马纹的表格，可以更容易区分出不同行的数据。

:::demo `stripe` 属性可以创建带斑马纹的表格。 如果 `true`, 表格将会带有斑马纹。

dynamic-table/striped

:::

## 带边框表格

:::demo 默认情况下，Table 组件是不具有竖直方向的边框的， 如果需要，可以使用 `border` 属性，把该属性设置为 `true` 即可启用。

dynamic-table/with-border

:::

## 带状态表格

可将表格内容 highlight 显示，方便区分「成功、信息、警告、危险」等内容。

:::demo 可以通过指定 Table 组件的 `row-class-name` 属性来为 Table 中的某一行添加 class， 表明该行处于某种状态。

dynamic-table/with-status

:::

## 固定列和表头

纵向内容过多时，可选择固定表头。

:::demo 只要在 `dynamic-table` 元素中定义了 `height` 属性，即可实现固定表头的表格，而不需要额外的代码。固定列需要使用 `fixed` 属性，它接受 Boolean 值 如果为 `true`, 列将被左侧固定. 它还接受传入字符串，left 或 right，表示左边固定还是右边固定。

dynamic-table/fixed-column-and-header

:::

## 流体高度

当数据量动态变化时，可以为 Table 设置一个最大高度。

:::demo 通过设置 `max-height` 属性为 Table 指定最大高度。 此时若表格所需的高度大于最大高度，则会显示一个滚动条。

dynamic-table/fixed-header-with-fluid-header

:::

## 多级表头

数据结构比较复杂的时候，可使用多级表头来展现数据的层次关系。

:::demo 只需要在 `columnItem['children']` 里面嵌套 `columnItem`，就可以实现多级表头。

dynamic-table/grouping-header

:::

## 单选

选择单行数据时使用色块表示。

:::demo Table 组件提供了单选的支持， 只需要配置 `highlight-current-row` 属性即可实现单选。 之后由 `current-change` 事件来管理选中时触发的事件，它会传入 `currentRow`，`oldCurrentRow`。 如果需要显示索引，可以增加一列 `columnItem`，设置 `type` 属性为 `index` 即可显示从 1 开始的索引号。

dynamic-table/single-select

:::

## 多选

你也可以选择多行。

:::demo 实现多选非常简单: 手动添加一个 `columnItem`，设 `type` 属性为 `selection` 即可； 除了多个选项，此示例还使用 `showOverflowTooltip`：默认， 如果内容过长，它会分成多行。 若需要单行显示可以使用 `showOverflowTooltip` 属性，它接受一个 `Boolean`， 为 `true` 时多余的内容会在 hover 时以 tooltip 的形式显示出来。

dynamic-table/multi-select

:::

## 待续
