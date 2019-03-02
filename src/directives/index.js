/**
 * Created By shli on 2018/10/13
 */
import CorrectVal from './correct-val'
import Validata from './validata'
import SelectGroup from './select-group'
import Focus from './focus'

export default {
  install (Vue, options) {
    Vue.directive('validata', Validata)
    Vue.directive('correct-val', CorrectVal)
    Vue.directive('select-group', SelectGroup)
    Vue.directive('focus', Focus)
  }
}
