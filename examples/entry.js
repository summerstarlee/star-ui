/**
 * Created By shli on 2018/10/25
 */
import Vue from 'vue'
import App from './app.vue'
import Sst from 'main/index.js'
import MainFooter from './components/footer'

Vue.component('main-footer', MainFooter)
Vue.use(Sst)
new Vue({
  render: h => h(App)
}).$mount('#app')
