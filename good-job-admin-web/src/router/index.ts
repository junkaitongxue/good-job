import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import axios from './'
import { useStore } from 'vuex';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      // 重定向
      // redirect: '/good-job-admin/login'
      component: LoginView
    },
    // {
    //   path: '/good-job-admin/login',
    //   component: LoginView
    // },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 在这里执行你的逻辑，比如权限判断、登录状态检查等
 
  // 调用 next() 继续路由切换，调用 next({ path: '/login' }) 跳转到其他页面
  // debugger

  // console.log(to)
  if (to.fullPath === "noLogin") {
    let store = useStore(); // 获取Vuex Store实例

    // 获取公共的store数据进行判断
    store.dispatch("login")


    // console.log('hjk')
    next("/login")
  } else {
    next()
  }  
})

export default router
