import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@element-plus/icons-vue'
import 'element-plus/theme-chalk/index.css'
import ElementPlus  from 'element-plus'

createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
