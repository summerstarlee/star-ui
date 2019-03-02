<template>
  <section>
    <div class="condition flex-column-center">
      <el-input :size="size" class="input-lgest" suffix-icon="iconfont icon-searchplus primaryText">
      </el-input>
      <el-checkbox-group style="margin-top: 10px">
        <el-checkbox label="OOS"></el-checkbox>
        <el-checkbox label="Sold"></el-checkbox>
        <el-checkbox label="PO"></el-checkbox>
        <el-checkbox label="eBay"></el-checkbox>
        <el-checkbox label="Admin"></el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="selected-label">
      <sst-line-title class="info" title="Selected Labels" :left="30" :isTitle="false">
        <el-radio-group v-model="relation" slot="fix">
          <el-radio label="and">And</el-radio>
          <el-radio label="or">Or</el-radio>
        </el-radio-group>
      </sst-line-title>
      <div class="label-container">
        <div class="label-item regularText" v-for="label in labels" :key="label.name">
          <div class="label-name">{{label.shortName}}</div> <div>({{label.itemCount}})</div>
          <i class="delete-icon el-icon-close danger pointer"></i>
        </div>
      </div>
    </div>
    <div class="search-label">
      <sst-line-title class="info" title="Search Results" :left="30" :isTitle="false" />
      <div class="label-container">
        <div class="label-item regularText pointer" v-for="label in labels" :key="label.name" @click="HandleSelectLabel">
          <div class="label-name">{{label.shortName}}</div> <div>({{label.itemCount}})</div>
        </div>
      </div>
    </div>
    <div class="center">
      <el-button  :size="size" type="primary" @click="confirm">OK</el-button>
      <el-button :size="size" @click="cancel">Cancel</el-button>
    </div>
  </section>
</template>

<script>

export default {
  name: 'filter-labels',
  props: {
    size: {
      type: String,
      default: 'mini'
    }
  },
  data() {
    return {
      relation: 'and',
      labels: [
        { shortName: '2332', itemCount: 12 },
        { shortName: '23132', itemCount: 12 },
        { shortName: '232332', itemCount: 12 },
        { shortName: '23432', itemCount: 12 },
        { shortName: '235632', itemCount: 12 },
        { shortName: '237832', itemCount: 12 },
        { shortName: '23532', itemCount: 12 },
        { shortName: '232732', itemCount: 12 }
      ]
    }
  },
  methods: {
    HandleSelectLabel() {

    },
    confirm() {
      this.$emit('closeDialog', 'label', this.labels)
    },
    cancel() {
    }
  },
  created() {
    // TODO:  有数据时，取消注释
    // this.labels = Object.assign([], this.labelsDate)
  }
}
</script>

<style scoped>

</style>
