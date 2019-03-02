<template>
  <div>
    <div>
      <a href="javascript:;" class="sst-filter__link" style="line-height: 2.5;" @click="handleAll">Select/Unselect All</a>
    </div>
    <div class="sst-filter__content">
        <span v-if="selectedList.length" class="info">Selected Filter(s)</span>
        <el-checkbox-group v-model="selectedList" @change="handleSelect" style="margin-top: 10px">
          <div class="filter-select-group">
            <div v-for="option in selectedItems" :key="option">
              <el-checkbox :label="option"></el-checkbox>
            </div>
          </div>
        </el-checkbox-group>
      <div>
        <sst-line-title class="info" title="All Filter(s)" :left="10"></sst-line-title>
        <span v-if="notSelectedItems.length" class="info"></span>
        <el-checkbox-group v-model="notSelectedList"  @change="handlerNotSelect">
          <div class="filter-select-group">
            <div v-for="option in notSelectedItems" :key="option">
              <el-checkbox :label="option"></el-checkbox>
            </div>
          </div>
        </el-checkbox-group>
      </div>
      <span class="selections-tip label-color" v-if="!notSelectedItems.length">All selected</span>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'filterOption',
  props: {
    size: {
      type: String,
      default: 'mini'
    },
    type: {
      type: String,
      default: 'manager'
    },
    selectOptions: {
      type: Array,
      default: () => {
        return []
      }
    },
    filterConfig: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      notSelectedList: [],
      notSelectedItems: [],
      selectedList: [],
      selectedItems: [],
      options: this.type === 'detail' ? this.filterConfig.detail : this.filterConfig.manager,
      hasSelectAll: false
    }
  },
  methods: {
    handleSelect(value) {
      this.hasSelectAll = false
      this.notSelectedItems = _.difference(this.options, value)
      this.notSelectedList = []
      this.selectedItems = value
      this.selectedList = value

      this.$emit('cancel', value)
    },
    handlerNotSelect(value) {
      this.notSelectedItems = _.difference(this.notSelectedItems, value)
      this.selectedItems = [...new Set(_.concat(this.selectedList, value))]
      this.selectedList = [...new Set(_.concat(this.selectedList, value))]
      if (this.notSelectedItems.length) this.hasSelectAll = true
      this.$emit('select', value)
    },
    handleAll() {
      if (this.hasSelectAll) {
        this.selectedList = []
        this.selectedItems = []
        this.notSelectedItems = this.options
        this.hasSelectAll = false
        this.$emit('cancelAll')
      } else {
        this.notSelectedItems = []
        this.selectedList = this.options
        this.selectedItems = this.options
        this.hasSelectAll = true
        this.$emit('selectAll', this.options)
      }
    }
  },
  created() {
    this.options = this.type === 'detail' ? Object.assign([], this.filterConfig.detail) : Object.assign([], this.filterConfig.manager)
    this.notSelectedItems = _.difference(this.options, this.selectOptions)
    this.selectedList = Object.assign([], this.selectOptions)
    this.selectedItems = Object.assign([], this.selectOptions)
    if (this.options.length === this.selectOptions.length) {
      this.hasSelectAll = true
    }
  }
}
</script>

<style lang="scss">
  .select-label{
    position: absolute;
    top: -9px;
    left: 10px;
    background-color: #fff;
  }
  .selections-tip{
    text-align: center;
    display: block;
  }
  .label-color{
    color: #999999;
  }
  .filter-select-group{
    &>div{
      padding:5px 10px;
     }
  }

  .sst-filter__content{
    max-height: 300px;
    overflow-y: auto;
  }
</style>
