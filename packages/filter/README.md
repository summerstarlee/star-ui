# SST-Filter Components 

## Quick Start 

```js
// main.js 
import Vue from 'vue'
import SstFilter from 'sst-filter'

Vue.use(SstFilter)

```

## use in template
```vue
<sst-filter />
```


# doc

## Attributes
```js
/*
effect				      String		  'light'		    filter 样式，light 和 dark 两种样式可选
filterConfig        Stirng      {}            filter 配置文件 必填项   包含 filter 的类型 种类 参考 filters.json 
filterType  		    String  	  'manage'    	filter 类型，可选 manage，detail
categoryList    	  Array   	   []	   	      filter 组件中 category 下拉框的备选项
deviceBrandList 	  Array		    []		        filter 组件中 deviceBrandList 下拉框的备选项
deviceBatchList 	  Array		    []		        filter 组件中 deviceBatch table 的数据 
deviceSeriesList	  Array		    []		        filter 组件中 deviceSeriesList 下拉框的备选项	
filters 			      Array		    []		        已选filter 数组
filterData          Object      {}            已选 filter 的数据
searchShow 			    Boolean		  true		      是否显示search 按钮
resetShow 			    Boolean		  true		      是否显示 reset 按钮
*/
```


## Events
search			当 filter 点击搜索时触发事件，第一个参数为 组件前面 输入框和选择框的值，后一个参数是后面filter的值，两个参数都是对象
reset			当 filter 点击 reset 时触发事件
save			当 filter 点击 save 时触发事件， 参数同 onSearch
saveAsNew 		当 filter 点击 saveAsNew 时触发事件， 参数同 onSearch
filterChange  	filter 选项发生变化时触发，参数为 已选择的 filter 数组, 当 filterType 为 detail 时，也会返回所有filter detail 
brandChange     当 brand下拉框发生改变时触发  参数为 当前改变的 brandId
categoryChange     当 category 下拉框发生改变时触发  参数为 当前改变的 categoryId
seriesChange     当 series 下拉框发生改变时触发  参数为 当前改变的 seriesId

//device 触发的函数
deviceBrandChange  当 deviceBrand 的值发生改变的时候触发
deviceSeriesChange	当 deviceSeries 的值发生改变的时候触发
devicePageChange    当 devicePage 的值发生改变的时候触发
deviceSearch	当 deviceSearch 时候触发

detailChange 当 filter detail 的数据发生改变时触发，参数为 filter和data  分别为当前改变的 filter 名称，以及改变后的数据
