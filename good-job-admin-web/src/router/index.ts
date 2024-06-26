import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import { useStore } from 'vuex';
import { ElNotification } from 'element-plus';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
      name: 'root'
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import('../views/DemoView.vue')
    },
    {
      path: '/executerMgr',
      name: 'executerMgr',
      component: () => import('../views/ExecuterMgr.vue')
    },
    {
      path: '/taskMgr',
      name: 'taskMgr',
      component: () => import('../views/TaskMgr.vue')
    },
    {
      path: '/login',
      component: LoginView
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 在这里执行你的逻辑，比如权限判断、登录状态检查等
 
  // 调用 next() 继续路由切换，调用 next({ path: '/login' }) 跳转到其他页面
  // debugger

  console.log(to)
  if (to.fullPath !== "/login") {
    let store = useStore(); // 获取Vuex Store实例
    console.log(store)
    if (!store.state.isLoggedIn) {
      // 获取公共的store数据进行判断
      store.dispatch("logout")
      ElNotification({
        title: '通知',
        message: '未登录，请先登录',
        type: 'warning'
      })
      next("/login")
    } else{
      next()
    }
  } else {
    next()
  }  
})

export default router
