<template>
  <section class="filter-time-container"  :class="showValue ? 'select-value' : ''">
    <el-select
      :size="size"
      ref="selectValue"
      v-model="formDataSelf.value"
      :placeholder="`${filter}: Select`"
      multiple
      collapse-tags
    >
      <div v-if="!this.selectOptions || !this.selectOptions.length" class="info" style="text-align: center;margin: 5px" >No Date</div>
      <el-option
        v-else
        v-for="item in selectOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <sst-date-range :disabled="!formDataSelf.value.length" v-if="showValue" :time="formDataSelf.time" @change="formDataSelf.time = $event"/>
    <div v-if="showValue">
      <div>
        <span class="item-label">Min:</span>
        <el-input
          :size="size"
          :disabled="!formDataSelf.value.length"
          ref="minInput"
          v-model.trim="formDataSelf.min"
          class="input-small"
          placeholder="Min"
          @keyup.native="valueValidate('min')"
          @blur="valueValidate('min')"
        />
      </div>
      <div class="max-value">
        <span class="item-label">Max:</span>
        <el-input
          :size="size"
          :disabled="!formDataSelf.value.length"
          v-model.trim="formDataSelf.max"
          ref="maxInput"
          class="input-small"
          placeholder="Max"
          @keyup.native="valueValidate('max')"
          @blur="valueValidate('max')"
        ></el-input>
      </div>
    </div>
    <div v-if="maxValidate">
      <i class="el-icon-error sst-red"></i>&nbsp;&nbsp;
      <!--<span class="sst-red" v-if="integerValidate">Value not a integer <span v-if="maxValidate">、</span></span>-->
      <span class="sst-red" v-if="maxValidate">Max must be greater than the min</span>
    </div>
    <div class="center">
      <el-button :size="size" type="primary" :disabled="maxValidate" @click="confirm">OK</el-button>
      <el-button :size="size" @click="cancel">Cancel</el-button>
    </div>
  </section>

</template>

<script>
import validate from './valueValidate'
export default {
  name: 'filter-select',
  mixins: [validate],
  props: {
    size: {
      type: String,
      default: 'mini'
    },
    showValue: {
      type: Boolean,
      default: false
    },
    filterDate: {
      type: Object,
      default: () => {
      }
    },
    popoverShow: {
      type: Boolean,
      default: false
    },
    filter: {
      type: String,
      default: 'Option'
    },
    selectOptions: {
      type: Array,
      default: () => [{
        value: null,
        label: 'No Date'
      }]
    },
    valueType: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      time: null,
      formDataSelf: {
        time: null,
        min: null,
        max: null,
        value: null
      },
      minValidator: null
    }
  },
  watch: {
    filterDate: {
      handler(val) {
        this.formDataSelf = JSON.parse(JSON.stringify(val))
      },
      deep: true
    }
  },

  methods: {
    confirm() {
      this.formDataSelf.value = this.formDataSelf.value[0] === null ? null : this.formDataSelf.value
      this.$emit('changePopover', this.formDataSelf)
    },
    cancel() {
      this.formDataSelf = this.showValue ? {
        time: null,
        min: null,
        max: null,
        value: []
      } : {
        value: []
      }
      console.log('cancelvalue', this.formDataSelf)
      this.$emit('changePopover', this.formDataSelf)
    }
  },
  created() {
    this.formDataSelf = Object.assign({}, this.filterDate)
  }
}
</script>

<style scoped>

</style>
