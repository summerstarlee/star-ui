<template>
  <section class="filter-reOrder-container">
    <div class="info"> ?=Re-Order Point</div>
    <div>
      <el-checkbox v-model="relation.lt" @change="handleCheckbox('lt', $event)"> ? < 0 </el-checkbox>
      <el-checkbox v-model="relation.eq" @change="handleCheckbox('eq', $event)">? == 0</el-checkbox>
    </div>
    <div>
      <el-checkbox v-model="relation.gt" @change="handleCheckbox('gt', $event)"> ? > 0 </el-checkbox>
      , <el-input placeholder="Min"
                  :size="size"
                  type="number"
                  ref="minInput"
                  v-model="formDataSelf.min"
                  class="input-mini"
                  :disabled="!relation.gt"
                  v-correct-val
                  v-validata="[{minValue : 0,message:'Value error !'}]"
    ></el-input>
        <el-input placeholder="Max"
                  :size="size"
                  ref="maxInput"
                  type="number"
                  v-model="formDataSelf.max"
                  class="input-mini"
                  :disabled="!relation.gt"
                  v-correct-val
                  v-validata="[{'custom':(val) => {
                    return Number(val) && Number(val) < Number(formDataSelf.min)
                  },message:'Max error !'}]"
        ></el-input>
    </div>
    <div class="center">
      <el-button :size="size" type="primary" @click="confirm">OK</el-button>
      <el-button :size="size" @click="cancel">Cancel</el-button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'filter-reOrder',
  props: {
    filterDate: {
      type: Object,
      default: () => {
      }
    },
    size: {
      type: String,
      default: 'mini'
    }
  },
  data() {
    return {
      formDataSelf: {},
      relation: {
        gt: false,
        lt: false,
        eq: false
      }
    }
  },
  watch: {
    filterDate(val) {
      this.formDataSelf = Object.assign({}, val)
      Object.keys(this.relation).map(item => {
        this.$set(this.relation, item, false)
      })
      this.relation[this.formDataSelf.relation] = true
    }
  },
  methods: {
    handleCheckbox(flag, val) {
      Object.keys(this.relation).map(item => {
        this.$set(this.relation, item, false)
      })
      this.$set(this.relation, flag, val)
    },
    confirm() {
      if (!this.$refs.maxInput.validate() || !this.$refs.minInput.validate()) {

      } else {
        this.formDataSelf.relation = Object.keys(this.relation).filter(i => this.relation[i] === true)[0] || null
        if (this.formDataSelf.relation !== 'gt') {
          this.formDataSelf.max = null
          this.formDataSelf.min = null
        }
        this.$emit('changePopover', this.formDataSelf)
      }
    },
    cancel() {
      this.formDataSelf = {
        relation: null,
        min: null,
        max: null
      }
      Object.keys(this.relation).map(item => {
        this.$set(this.relation, item, false)
      })
      console.log('cancelvalue', this.formDataSelf)
      this.$emit('changePopover', this.formDataSelf)
    }
  },
  created() {
    this.formDataSelf = Object.assign({}, this.filterDate)
    this.relation[this.formDataSelf.relation] = true
  }
}
</script>

<style scoped>

</style>
