/**
 * Created by shli on 2018/8/16.
 */

import { numeric } from 'vuelidate/lib/validators'
export default {
  bind(el, binding, vnode) {
    const validator = binding.value
    if (validator.findIndex(i => i.required) >= 0) {
      var style = document.createElement('style')
      style.innerHTML = ".validate-require::before{ color:#f56c6c; content:'*'; position:absolute;right:-10px; top:0; }"
      document.head.appendChild(style)

      el.className += ' ' + 'validate-require'
    }

    const addWaringText = (item) => {
      if (!el.getElementsByClassName('warning-text').length) {
        const warningDom = document.createElement('div')
        warningDom.className = 'warning-text'
        if (item.message) warningDom.innerHTML = item.message
        warningDom.style.color = '#f56c6c'
        warningDom.style.fontSize = '12px'
        warningDom.style.lineHeight = '12px'
        el.appendChild(warningDom)
        var style = document.createElement('style')
        style.innerHTML = `.warning-text{ color:#f56c6c; content:'${warningDom.innerHTML}'; position:absolute;left:0; bottom:-15px;white-space:nowrap; }`
        document.head.appendChild(style)
      }
    }
    const removeWarningText = () => {
      if (el.getElementsByClassName('warning-text').length) {
        el.removeChild(el.getElementsByClassName('warning-text')[0])
      }
    }
    const updateValidateDom = (validate, item) => {
      if (validate) {
        addWaringText(item)
        return false
      } else {
        removeWarningText()
        return true
      }
    }

    // required
    const requireValidate = (item) => {
      const validate = el.getElementsByTagName('input')[0].value.trim().length === 0
      return updateValidateDom(validate, item)
    }

    // minLength
    const minLengthValidate = (item) => {
      const validate = el.getElementsByTagName('input')[0].value.trim().length < item.minLength
      return updateValidateDom(validate, item)
    }

    // maxLength
    const maxLengthValidate = (item) => {
      const validate = el.getElementsByTagName('input')[0].value.trim().length > item.maxLength
      return updateValidateDom(validate, item)
    }
    const minValueValidate = (item) => {
      if (isNaN(el.getElementsByTagName('input')[0].value.trim())) return updateValidateDom(false)
      const validate = el.getElementsByTagName('input')[0].value.trim() < item.minValue
      return updateValidateDom(validate, item)
    }
    const maxValueValidate = (item) => {
      if (isNaN(el.getElementsByTagName('input')[0].value.trim())) return updateValidateDom(false)
      const validate = el.getElementsByTagName('input')[0].value.trim() > item.maxValue
      return updateValidateDom(validate, item)
    }
    const numericValidate = (item) => {
      if (isNaN(el.getElementsByTagName('input')[0].value.trim())) return updateValidateDom(false)
      const validate = !numeric(el.getElementsByTagName('input')[0].value.trim())
      console.log('validate', validate)
      return updateValidateDom(validate, item)
    }

    const customValidate = (item) => {
      const validate = item.custom(el.getElementsByTagName('input')[0].value.trim())
      return updateValidateDom(validate, item)
    }

    const validate = (item) => {
      if (item.required) return requireValidate(item)

      if (Object.keys(item).indexOf('minLength') >= 0) return minLengthValidate(item)
      if (Object.keys(item).indexOf('maxLength') >= 0) return maxLengthValidate(item)
      if (Object.keys(item).indexOf('minValue') >= 0) return minValueValidate(item)
      if (Object.keys(item).indexOf('maxValue') >= 0) return maxValueValidate(item)
      if (Object.keys(item).indexOf('numeric') >= 0) return numericValidate(item)
      if (Object.keys(item).indexOf('custom') >= 0) return customValidate(item)

      const regExp = item.regExp.reg && item.regExp.flags
        ? new RegExp(item.regExp.reg, item.regExp.flags)
        : (item.regExp.reg ? new RegExp(item.regExp.reg) : null)
      if (regExp) {
        if (regExp.test(el.getElementsByTagName('input')[0].value.trim())) {
          removeWarningText()
          return true
        } else {
          addWaringText(item)
          return false
        }
      }
    }

    el.validate = () => {
      const result = validator.map(i => {
        return validate(i)
      })
      if (result.filter(i => i === false).length > 0) {
        el.getElementsByTagName('input')[0].style.borderColor = '#f56c6c'
        return false
      } else {
        el.getElementsByTagName('input')[0].style.borderColor = '#dcdfe6'
        return true
      }
    }

    vnode.child.validate = () => {
      const result = validator.map(i => {
        return validate(i)
      })
      if (result.filter(i => i === false).length > 0) {
        el.getElementsByTagName('input')[0].style.borderColor = '#f56c6c'
        return false
      } else {
        el.getElementsByTagName('input')[0].style.borderColor = '#dcdfe6'
        return true
      }
    }

    el.getElementsByTagName('input')[0].addEventListener('blur', () => {
      const result = validator.map(i => {
        return validate(i)
      })
      if (result.filter(i => i === false).length > 0) {
        el.getElementsByTagName('input')[0].style.borderColor = '#f56c6c'
        return false
      } else {
        el.getElementsByTagName('input')[0].style.borderColor = '#dcdfe6'
        return true
      }
    }, false)

    // vnode.child.$emit('dragDialog')
    vnode.child.unValidate = () => {
      if (el.getElementsByClassName('warning-text').length) {
        el.removeChild(el.getElementsByClassName('warning-text')[0])
        el.getElementsByTagName('input')[0].style.borderColor = '#dcdfe6'
      }
    }
  },
  update(el, bingding, vnode) {
    (() => {
      if (el.getElementsByClassName('warning-text').length) {
        el.removeChild(el.getElementsByClassName('warning-text')[0])
        el.getElementsByTagName('input')[0].style.borderColor = '#dcdfe6'
      }
    })()
  }
}
