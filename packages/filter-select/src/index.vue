<template>
  <sst-filter-popup :label="placeholder"
                :common="showText"
                v-model="show"
                :value="show"
                @input="show = $event"
                popper-class="sst-filter-popper__class"
                @close="handleClose"
                @show="popupShow"
  >
    <div v-if="filterable" class="filterable-input">
      <el-input
        ref="searchInput"
        suffix-icon="el-icon-search"
        :value="showText"
        @input="querySearch"
      />
    </div>
    <el-scrollbar
      wrap-class="el-select-dropdown__wrap"
      view-show="el-select-dropdown__list"
    >
      <ul class="el-select-dropdown__list">
        <li class="el-select-dropdown__item info" @click="handleItem">{{`${placeholder}: Select`}}</li>
        <li class="el-select-dropdown__item"
            v-for="(item, index) in copyDataList" :key="item[itemKey]" @click="handleItem(item)"
            :class="index === currentItemIndex ? 'selected hover' : ''"
        >
          {{item[itemLabel]}}
        </li>
      </ul>
    </el-scrollbar>
    <slot></slot>
  </sst-filter-popup>
</template>

<script>
import sstFilterPopup from '../../filter-popop'

export default {
  name: 'SstSelect',
  components: { sstFilterPopup },
  props: {
    placeholder: { type: String, default: 'Label' },
    value: { type: [String, Number, Object] },
    itemLabel: { type: String, default: 'label' },
    itemKey: { type: String, default: 'key' },
    itemValue: { type: String, default: 'value' },
    dataList: { type: Array, default: () => [] },
    filterable: { type: Boolean, default: false }
  },
  data() {
    return {
      showText: null,
      show: false,
      currentItemIndex: -1,
      copyDataList: []
    }
  },
  watch: {
    value: {
      handler(val) {
        this.currentItemIndex = this.dataList.findIndex(item => item[this.itemValue] === val)
        this.showText = this.currentItemIndex > -1 ? this.dataList[this.currentItemIndex][this.itemLabel] : null
      },
      immediate: true
    },
    dataList: {
      handler(val) {
        this.copyDataList = JSON.parse(JSON.stringify(val))
      },
      immediate: true
    }
  },

  methods: {
    popupShow() {
      this.filterable && this.$nextTick(() => {
        this.$refs.searchInput.focus()
      })
      this.copyDataList = JSON.parse(JSON.stringify(this.dataList))
    },
    handleItem(item) {
      item ? this.handleClose(item[this.itemValue]) : this.handleClose(null)
    },
    handleClose(value) {
      this.show = !this.show
      this.$emit('input', value)
    },
    querySearch(queryString) {
      this.copyDataList = this.dataList.filter(item => {
        return item[this.itemLabel].toLowerCase().indexOf(queryString.toLowerCase()) > -1
      })
    }
  }
}
</script>

<style>
  .sst-filter-popper__class{
    padding: 0;
  }
  .filterable-input{
   text-align: center;
    padding-top: 5px;
  }
  .filterable-input .el-input{
    width: 95%;
  }
</style>
