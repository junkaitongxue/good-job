import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import i18n from './lang'
import UserStore from './stores/userStore'
import { createStore } from 'vuex'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

const store = createStore(new UserStore()); 
app.use(store)

app.mount('#app')
