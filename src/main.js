// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Vuetify from 'vuetify'
import('../node_modules/vuetify/dist/vuetify.min.css')
Vue.use(Vuetify)
Vue.use(require('vue-moment'))

import VCalendar from 'v-calendar';
import ('../node_modules/v-calendar/lib/v-calendar.min.css')
Vue.use(VCalendar, {
  componentPrefix: 'vc'
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})