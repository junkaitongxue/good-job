import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from './lang'
import store from './stores'
import VueCookies from 'vue-cookies'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { ElMessage } from 'element-plus'

// 检查登录状态
async function checkLogin() {
  // 你可以在这里进行登录验证，例如通过请求后端接口或检查本地存储中的登录状态
  // 这里假设使用 store 中的登录状态进行判断
  const isLoggedIn = store.state.isLoggedIn
  console.log(store.state.isLoggedIn)
  if (!isLoggedIn) {
    // 如果未登录，重定向到登录页面或执行其他操作
    return false
  } 
 
  return true
}

async function initializeApp() {
  const app = createApp(App)
  app.use(createPinia())
  app.use(router)
  app.use(i18n)
  app.use(store)
  app.use(VueCookies)
  app.mount('#app')

  // 进行登录验证
  checkLogin().then(isLoggedIn => {
    if (isLoggedIn) {
      // 如果已登录，挂载应用到根元素上
      app.mount('#app')
    } else {
      ElMessage({
        message: '未登录，无法访问应用, 请登录',
        type: 'warning',
      })
      router.push('/login')
      // 如果未登录，可以选择不挂载应用或执行其他操作
    }
  })
}
 
// 启动应用程序初始化过程
initializeApp();