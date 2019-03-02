# sst-date-range 
基于 Element-ui el-date-picker 组件封装改写的 带有快捷选择的 日期范围组件

# 优化
1. 内置 20 个日期快捷范围
```
  Today,
  Last 5 days,
  Last 10 days, 
  Last 15 days, 
  Last 30 days,
  Last 90 days,
  Last 180 days,
  Yesterday,
  Yesterday-to-Date,
  Last Week,
  Last Week-to-Date,
  Last Month,
  Last Month-to-Date,
  Last Quarter,
  Last Quarter-to-Date,
  Year-to-Date,
  Last Year,
  Last Year-to-Date,
  Last Two Years,
  Last Two Years-to-Date
``` 

2. 优化 `pickerOptions` 参数的算法。 如需修改快捷日期，只需要传入 'pickerOptions' 参数覆盖默认 `pickerOptions` 的默认值就好。

## pickerOptions 参数  < Array >
<table>
  <theader>
    <tr>
      <td>属性</td>
      <td>说明</td>
      <td>值</td>
    </tr>
  </theader>
  <tbody>
    <tr>
      <td>label</td>
      <td>快捷日期说明文字</td>
      <td>String</td>
    </tr>
    <tr>
      <td>start</td>
      <td>该时间范围的开始日期距离今天的天数</td>
      <td>Number</td>
    </tr>
     <tr>
        <td>end</td>
        <td>该时间范围的结束日期距离今天的天数</td>
        <td>Number</td>
      </tr>
  </tbody>
</table>


# Attributes

<table>
  <theader>
    <tr>
      <td>参数</td>
      <td>说明</td>
      <td>类型</td>
      <td>可选值</td>
      <td>默认值</td>
    </tr>
  </theader>
  <tbody>
    <tr>
      <td>size</td>
      <td>输入框尺寸</td>
      <td>string</td>
      <td>large, small, mini</td>
      <td>size</td>
    </tr>
    <tr>
      <td>width</td>
      <td>组件宽度</td>
      <td>Number</td>
       <td>--</td>
       <td>300</td>
    </tr>
     <tr>
        <td>format</td>
        <td>显示在输入框中的格式</td>
        <td>string</td>
        <td>见 <a href="http://element-cn.eleme.io/#/zh-CN/component/date-picker">Element 日期格式</a></td>
        <td>MM/dd/yyyy</td>
      </tr>
      <tr>
        <td>valueFormat</td>
        <td>绑定值的格式。</td>
        <td>string</td>
        <td>见 <a href="http://element-cn.eleme.io/#/zh-CN/component/date-picker">Element 日期格式</a></td>
        <td>MM/dd/yyyy</td>
      </tr>
      <tr>
        <td>rangeSeparator</td>
        <td>选择范围时的分隔符</td>
        <td>string</td>
        <td>-</td>
        <td>'To'</td>
      </tr> 
      <tr>
        <td>startPlaceholder</td>
        <td>范围选择时开始日期的占位内容</td>
        <td>string</td>
        <td>-</td>
        <td>Start Date</td>
      </tr> 
      <tr>
        <td>endPlaceholder</td>
        <td>范围选择时结束日期的占位内容</td>
        <td>string</td>
        <td>-</td>
        <td>End Date</td>
      </tr> 
      <tr>
        <td>time</td>
        <td>组件绑定的值, 例如 [ "10/12/2018", "10/16/2018" ], <strong>数组内日期格式需要同 format 相同</stong></td>
        <td>Array</td>
        <td>-</td>
        <td>-</td>
      </tr> 
      <tr>
        <td>selectOptions</td>
        <td>当前时间日期选择器特有的选项 参考 上表 selectOptions</td>
        <td>Array</td>
        <td>-</td>
        <td>默认值参考下表</td>
      </tr>
  </tbody>
</table>


# selectOptions
```js
  [
      {
        label: 'Today',
        start: 0,
        end: 0
      },
      {
        label: 'Last 5 days',
        start: 4,
        end: 0
      },
      {
        label: 'Last 10 days',
        start: 9,
        end: 0
      },
      {
        label: 'Last 15 days',
        start: 14,
        end: 0
      },
      {
        label: 'Last 30 days',
        start: 29,
        end: 0
      },
      {
        label: 'Last 90 days',
        start: 89,
        end: 0
      },
      {
        label: 'Last 180 days',
        start: 179,
        end: 0
      },
      {
        label: 'Yesterday',
        start: 1,
        end: 1
      },
      {
        label: 'Yesterday-to-Date',
        start: 1,
        end: 0
      },
      {
        label: 'Last Week',
        start: new Date().getDay() + 7 - 1,
        end: new Date().getDay()
      },
      {
        label: 'Last Week-to-Date',
        start: new Date().getDay() + 7 - 1,
        end: 0
      },
      {
        label: 'Last Month',
        start: new Date().getDate() + getMonthDays(new Date().getFullYear(), new Date().getMonth()) - 1,
        end: new Date().getDate()
      },
      {
        label: 'Last Month-to-Date',
        start: new Date().getDate() + getMonthDays(new Date().getFullYear(), new Date().getMonth()) - 1,
        end: 0
      },
      {
        label: 'Last Quarter',
        start: getLastQuarterMountsToToday(new Date().getFullYear(), new Date().getMonth() + 1) - 1,
        end: getQuarterMountsToToday(new Date().getFullYear(), new Date().getMonth() + 1)
      },
      {
        label: 'Last Quarter-to-Date',
        start: getLastQuarterMountsToToday(new Date().getFullYear(), new Date().getMonth() + 1) - 1,
        end: 0
      },
      {
        label: 'Year-to-Date',
        start: getYearMountsToToday(new Date().getFullYear(), new Date().getMonth() + 1) - 1,
        end: 0
      },
      {
        label: new Date().getFullYear() - 1,
        start: getLastYearMountsToToday(new Date().getFullYear(), new Date().getMonth() + 1) - 1,
        end: getYearMountsToToday(new Date().getFullYear(), new Date().getMonth() + 1)
      },
      // {
      //   label: 'Last Year-to-Date',
      //   start: getLastYearMountsToToday(new Date().getFullYear(), new Date().getMonth() + 1) - 1,
      //   end: 0
      // },
      {
        label: new Date().getFullYear() - 2,
        start: getlastTwoYearsMountsToToday(new Date().getFullYear(), new Date().getMonth() + 1),
        end: getYearMountsToToday(new Date().getFullYear(), new Date().getMonth() + 1)
      }
      // {
      //   label: 'Last Two Years-to-Date',
      //   start: getlastTwoYearsMountsToToday(new Date().getFullYear(), new Date().getMonth() + 1),
      //   end: 0
      // }
  ]
            
```

# Events

<table>
  <theader>
    <tr>
      <td>事件名称</td>
      <td>说明</td>
      <td>回调参数</td>
    </tr>
  </theader>
  <tbody>
    <tr>
      <td>onBlur</td>
      <td>当 input 失去焦点时触发</td>
      <td>组件实例</td>
    </tr>
    <tr>
      <td>onFocus</td>
      <td>当 input 获得焦点时触发</td>
      <td>组件实例</td>
    </tr>
  </tbody>
</table>

# Methods

<table>
  <theader>
    <tr>
      <td>方法名</td>
      <td>说明</td>
      <td>参数</td>
    </tr>
  </theader>
  <tbody>
    <tr>
      <td>handlerFocus</td>
      <td>使 input 获取焦点</td>
      <td>-</td>
    </tr>
  </tbody>
</table>




