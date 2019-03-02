/**
 * Created by shli on 2018/10/11.
 */
export default {
  bind (el, binding, vnode) {
    let input = el.querySelector('input')
    input.onkeydown = () => {
      let dotIndex = input.value.indexOf('.')
      console.log('input.value', input.value)
      if (input.value) {
        if (binding.value && binding.value.max) {
          if (Number(input.value) > binding.value.max) {
            input.value = ''
          }
        } else {
          if (Number(input.value) > 999999) {
            input.value = input.value.substring(0, 5)
          }
        }
        if (dotIndex > 0 && input.value.length > dotIndex + 2) input.value = input.value.substr(0, dotIndex + 2)
      } else {
        // console.log('*********', input.value)
        // input.value = input.value ? input.value : ''
      }
    }
  }
}
