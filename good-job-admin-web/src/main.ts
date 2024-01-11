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
import { cookies } from './utils/cookies'
import AuthUtils from './utils/AuthUtils'


async function initializeApp() {
  const app = createApp(App)
  app.use(createPinia())
  app.use(router)
  app.use(i18n)
  app.use(store)
  app.use(VueCookies)
  app.use(ElementPlus)
  app.mount('#app')

  // 进行登录验证
  AuthUtils.checkLogin().then(isLoggedIn => {
    if (isLoggedIn) {
      // 如果已登录，挂载应用到根元素上
      ElMessage({
        message: '已登录',
        type: 'success',
      })
      store.dispatch('login', {useName: 'admin'})
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