<template>
  <page>
    <div slot="pageTitle" class="filter-time-container">
      <div>
        <el-input style="margin-right: 10px" :size="size" v-model.trim="params.brandName" class="input-lg"
                  placeholder="Device Name"></el-input>
        <el-select :size="size" v-model="params.brandId" filterable placeholder="Brand: Select" @change="brandSelected"
                   :class="params.brandId ? '' : 'place-holder'"
        >
          <el-option class="info" :value="null" :label="'Brand: Select'"></el-option>
          <el-option
            v-for="item in deviceBrandList"
            :key="item.itemId"
            :label="item.fullName"
            :value="item.itemId">
          </el-option>
        </el-select>
        <el-select :size="size" v-model="params.seriesId" filterable placeholder="Series: Select"
                   @change="seriesSelected"
                   :class="params.seriesId ? '' : 'place-holder'"
        >
          <el-option class="info" :value="null" :label="'Series: Select'"></el-option>
          <el-option
            v-for="item in deviceSeriesList"
            :key="item.seriesId"
            :label="item.seriesName"
            :value="item.seriesId">
          </el-option>
        </el-select>
        <el-button :size="size" type="warning" @click="searchDevice">Search</el-button>
      </div>
      <div class="device-select">
        <span class="page-title">Selected Devices: </span>
        <div class="device-options" v-for="item in selection" :key="item.id">
                  <span class="device-text" :title="item.shortName+'('+item.itemCount+')'">
                    <span>{{item.shortName}}</span>
                    <span>({{item.itemCount || 0}})</span>
                  </span>
          <span class="delete-icon-device" @click="deleteDevice(item)">
                    X
                  </span>
        </div>
      </div>
    </div>
    <el-table :size="size" ref="deviceTable"
              border
              :data="deviceBatchList.list"
              v-loading="loading"
              :height="400"
              @select-all="handleSelectAll"
              @select="handleSelect"
    >
      <el-table-column label="Device Name" header-align="center" prop="shortName"></el-table-column>
      <el-table-column label="Brand Name" header-align="center" prop="fullName"></el-table-column>
      <el-table-column label="Item Count" align="center" prop="itemCount"></el-table-column>
      <el-table-column label="On Filter" align="center" prop="onFilter"></el-table-column>
      <el-table-column type="selection"></el-table-column>
    </el-table>
    <div slot="pageFooter" style="text-align: center">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
        :page-size="params.pageSize"
        :current-page="params.pageNum"
        :page-sizes="[30, 60, 100, 150]"
        layout="total, sizes, prev, pager, next,jumper"
        :total="deviceBatchList.total">
      </el-pagination>
      <div style="text-align: center">
        <el-button :size="size" type="primary" @click="confirm">OK</el-button>
        <el-button :size="size" @click="cancelSelect">Cancel</el-button>
      </div>
    </div>
  </page>
</template>

<script>
export default {
  name: 'filter-device',
  props: {
    size: {
      type: String,
      default: 'mini'
    },
    deviceBrandList: {
      type: Array,
      default: () => []
    },
    deviceSeriesList: {
      type: Array,
      default: () => []
    },
    SeriesList: {
      type: Array,
      default: () => []
    },
    deviceBatchList: {
      type: Object,
      default: () => {
        return {
          list: [],
          total: null
        }
      }
    },
    deviceDate: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      brandName: null,
      brandId: null,
      seriesId: null,
      loading: false,
      selection: [],
      params: {
        brandName: null,
        brandId: null,
        seriesId: null,
        pageNum: 1,
        pageSize: 30
      },
      currentPageSelection: []
    }
  },
  watch: {
    deviceBatchList: {
      handler(val) {
        this.selection.map(item => {
          const index = this.deviceBatchList.list.findIndex(i => i.id === item.id)
          setTimeout(() => {
            index >= 0 && this.$refs.deviceTable.toggleRowSelection(val.list[index], true)
          }, 0)
        })
      },
      deep: true
    }
  },
  methods: {
    deleteDevice(item) {
      const index = this.selection.findIndex(i => i === item)
      this.selection.splice(index, 1)
      this.$refs.deviceTable.toggleRowSelection(item, false)
    },
    async brandSelected(val) {
      this.$emit('deviceBrandChange', this.params)
    },
    async seriesSelected(val) {
      this.$emit('deviceSeriesChange', this.params)
    },
    handleSizeChange(pageSize) {
      this.params.pageSize = pageSize
      this.loadingDeviceList()
    },
    handlePageChange(pageNum) {
      this.params.pageNum = pageNum
      this.loadingDeviceList()
    },
    async loadingDeviceList() {
      this.$emit('devicePageChange', this.params)
    },
    async searchDevice() {
      this.$emit('deviceSearch', this.params)
    },
    handleSelect(selection, row) {
      if (this.selection.findIndex(item => item.id === row.id) < 0) {
        this.selection = [...new Set([...this.selection, row])]
      } else {
        this.selection.splice(this.selection.findIndex(item => item.id === row.id), 1)
      }
    },
    handleSelectAll(selection) {
      if (selection.length) {
        this.selection = [...new Set([...this.selection, ...selection])]
      } else {
        this.deviceBatchList.list.forEach((d, idx) => {
          this.selection.forEach((s, index) => {
            if (s.id === d.id) this.selection.splice(index, 1)
          })
        })
      }
    },
    confirm() {
      console.log(JSON.stringify(this.selection))
      this.$emit('closeDialog', 'device', this.selection)
    },
    cancelSelect() {
      this.$refs.deviceTable.clearSelection()
      this.selection = []
    }
  },
  async created() {
    this.selection = Object.assign([], this.deviceDate)
    this.selection.map(item => {
      const index = this.deviceBatchList.list.findIndex(i => i.id === item.id)
      setTimeout(() => {
        index >= 0 && this.$refs.deviceTable.toggleRowSelection(this.deviceBatchList.list[index], true)
      })
    })
  }
}
</script>

<style scoped>

</style>
