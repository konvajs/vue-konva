import Vue from 'vue'
import VueKonva from '../src/lib'
import App from './App'

Vue.use(VueKonva)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
