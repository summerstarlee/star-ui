# filter-popup

该组件基于 `el-popup`, 适用于于 PO 项目中的 popup filter 的情景。

# 使用方法：
 
使用方式和 `el-popup` 组件使用完全一样，只是针对组件的占位显示做了调整，新增了三个属性：

## Attributes

label    String    组件占位现实的label  String  default: 'Label'

value    -         组件绑定的值， 如果改值为真， 显示为 `label: value`, 反之显示 `label: Select`

format   Function    value 属性的显示格式
