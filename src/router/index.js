import { createRouter, createWebHashHistory } from 'vue-router'
import { getDeviceType } from '../utils/device.js'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: () => `/${getDeviceType()}`
    },
    {
      path: '/pc',
      name: 'pc',
      component: () => import('../views/PcView.vue')
    },
    {
      path: '/h5',
      name: 'h5',
      component: () => import('../views/H5View.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: () => `/${getDeviceType()}`
    }
  ]
})


export default router
