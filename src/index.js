/* Automatically generated by './build/bin/build-entry.js' */

import Filter from '../packages/filter'
import LineTitle from '../packages/line-title'
import DateRange from '../packages/date-range'
import Input from '../packages/input'
import directives from './directives'
import FilterPopup from '../packages/filter-popop'
import Select from '../packages/filter-select'
import Page from '../packages/page'

const components = [
  FilterPopup,
  Filter,
  LineTitle,
  DateRange,
  Input,
  Select,
  Page
]

const install = (Vue, opts = {}) => {
  components.forEach(component => {
    Vue.component(component.name, component)
  })

  Vue.use(directives)
  Vue.prototype.$sst = {
    size: opts.size || '',
    zIndex: opts.zIndex || 2000
  }
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.install)
}

export default {
  version: '1.0.0',
  install,
  Filter,
  LineTitle,
  DateRange,
  Input,
  FilterPopup,
  Select,
  Page
}
