import Vue from 'vue'
import Router from 'vue-router'
import VueTime from '@/components/VueTime'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'VueTime',
      component: VueTime
    }
  ]
})
