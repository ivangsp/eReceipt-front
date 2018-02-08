import Vue from 'vue'
import Router from 'vue-router'

import Receipts from '@/components/Receipts'
import Statistics from '@/components/Statistics'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Receipts },
    { path: '/statistics', component: Statistics }
  ]
})
