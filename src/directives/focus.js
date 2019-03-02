/**
 * Created By shli on 2018/11/7
 */
export default {
  bind (el, binding, vnode) {
    console.log(el)
    el.onmouseover = () => {
      el.focus()
    }
  }
}
