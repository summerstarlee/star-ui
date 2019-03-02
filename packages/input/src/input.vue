<template>
  <div class="el-input--mini sst-input">
    <template v-if="type !== 'textarea'">
      <input
        :id="`test-${_uid}`"
        class="sst-input__inner"
        v-bind="$attrs"
        :type="type"
        :value="currentValue"
        ref="input"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @mouseenter="handleMouseEnter"
        @mouseout="handleMouseOut"
      />

      <!--前置内容-->
      <span class="el-input__prefix" v-if="$slots.prefix">
          <slot name="prefix"></slot>
        </span>

      <span class="el-input__suffix" v-if="$slots.suffix">
          <slot name="suffix"></slot>
        </span>
      <!--isFocus-->
      <div class="input-edit__append" v-if="isEdit && isFocus"
           :class="['edit-append-' + placement, delay && placement === 'end' ? 'optTime-end' : '']">
        <i class="warning optTime" v-if="delay && placement !== 'end'">{{ parseSecondTime }}</i>
        <span class="opts">
           <i class="el-icon-check" title="confirm" @click="handleConfirm"></i>
           <i class="el-icon-close" title="Cancel" @click="handleCancel"></i>
         </span>
      </div>
      <i class="input-edit__append input-edit__append--end warning optTime"
         v-if="isEdit && isFocus && delay && placement === 'end'">{{ parseSecondTime }}</i>

    </template>
    <template v-else>
      <textarea class="el-textarea__inner" v-bind="$attrs" :value="currentValue" @focus="handleFocus" @input="handleInput"  @blur="handleBlur" @mouseenter="handleMouseEnter" @mouseout="handleMouseOut"></textarea>
      <div class="input-edit__append" v-if="isEdit && isFocus"
           :class="['edit-append-' + placement, delay && placement === 'end' ? 'optTime-end' : '']">
        <i class="warning optTime" v-if="delay && placement !== 'end'">{{ parseSecondTime }}</i>
        <span class="opts">
           <i class="el-icon-check" title="confirm" @click="handleConfirm"></i>
           <i class="el-icon-close" title="Cancel" @click="handleCancel"></i>
         </span>
      </div>
      <i class="input-edit__append input-edit__append--end warning optTime input-edit__append--textarea"
         v-if="isEdit && isFocus && delay && placement === 'end'">{{ parseSecondTime }}</i>
    </template>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'SstInput',
  props: {
    valueType: String,
    value: [String, Number],
    type: { type: String, default: 'text' },
    placement: { type: String, default: 'end' },
    isEdit: { type: Boolean, default: false },
    delay: { type: Number, default: 0 },
    autoFocus: { type: Boolean, default: false }
  },
  data() {
    return {
      isFocus: false,
      isHover: false,
      isBlur: true,
      timer: null,
      date: null,
      time: null,
      currentValue: this.value === undefined || this.value === null
        ? null
        : this.value
    }
  },
  watch: {
    delay: {
      handler(val) {
        this.time = val
      },
      immediate: true
    },
    value(val, oldValue) {
      this.currentValue = val
    }
  },
  computed: {
    parseSecondTime() {
      return parseInt(this.time / 1000) + ': ' + (this.time % 1000) / 10
    }
  },
  methods: {
    focus() {
      this.$refs.input.focus()
    },
    blur() {
      this.$refs.input.blur()
    },
    handleInput(event) {
      const value = event.target.value
      if (this.$attrs.max && Number(value) > Number(this.$attrs.max)) {
        this.currentValue = ''
        this.currentValue = this.$attrs.max
      } else if (!!this.$attrs.min && Number(value) < Number(this.$attrs.min)) {
        this.currentValue = ''
        this.currentValue = this.$attrs.min
      } else {
        this.currentValue = value || null
      }
      if (!this.isEdit) {
        this.$emit('input', value)
      }
    },
    handleFocus(event) {
      this.isFocus = true
      this.timer && clearTimeout(this.timer)
      this.time = this.delay
      this.$emit('focus', this.currentValue)
    },
    handleBlur() {
      if (!this.delay) {
        if (!this.isEdit) this.isEdit = false
      } else {
        if (this.isFocus && this.isEdit && this.delay) {
          this.timer = setInterval(() => {
            if (this.time <= 10) {
              clearTimeout(this.timer)
              this.timer = null
              this.isFocus = false
              this.handleConfirm()
            }
            this.time -= 10
          }, 10)
        }
      }
      this.$emit('blur', this.currentValue)
    },
    handleMouseEnter() {
      this.autoFocus && this.focus()
    },
    handleMouseOut() {
      this.autoFocus && this.blur()
    },
    handleConfirm() {
      this.timer && clearTimeout(this.timer)
      this.isFocus = false
      this.$emit('confirm', this.currentValue)
    },
    handleCancel(event) {
      this.isFocus = false
      this.currentValue = this.value
    }
  }
}
</script>

<style lang="scss" scoped>
  .sst-input {
    display: inline-block;
    position: relative;
    .sst-input__inner {
      width: 100%;
      flex: 1;
      background-color: #fff;
      background-image: none;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      box-sizing: border-box;
      color: #606266;
      font-size: inherit;
      height: 24px;
      line-height: 24px;
      outline: 0;
      padding: 0 5px;
      transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
      &:hover {
        border-color: #c0c4cc;
      }
      &:active, &:focus, &:visited {
        border-color: #409EFF;
      }
    }
    .optTime {
      font-weight: bolder;
      margin-right: 5px;
      color: red;
    }
  }
  .input-edit__append {
    background-color: #fff;
    position: absolute;
    right: 0px;
    top: 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 10;
    i {
      cursor: pointer;
      font-weight: bolder;
      &:hover {
        border-radius: 3px;
        background-color: #e4e7ed;
      }
    }
  }
  .edit-append-end {
    right: -15px;
    .opts {
      display: flex;
      flex-direction: column;
    }
  }
  .input-edit__append.input-edit__append--end {
    top: -28px;
    right: 1px;
  }
  .edit-append-top, .edit-append-bottom {
    flex-direction: row;
    right: 0px;
    z-index: 10000;
    .opts {
      padding: 3px;
      border: 1px solid #dcdfe6;
      border-top: none;
      i {
        margin: 0 3px;
      }
    }
  }
  .edit-append-top {
    top: -20px;
    .opts {
      border: 1px solid #dcdfe6;
      border-bottom: none;
    }

  }
  .input-edit__append.input-edit__append--end.input-edit__append--textarea{
    top: -15px;
    right: 1px;
  }
  .edit-append-bottom {
    top: 24px;
  }

</style>
