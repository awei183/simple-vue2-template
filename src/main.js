import 'normalize.css/normalize.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './styles/main.css'
import ElementPlus from 'element-plus'

import { createApp } from 'vue'

import store from './store'
import router from './router'
import './permission'
import vPermission from './directive/permission'

import App from './App.vue'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(ElementPlus)
app.directive('permission', vPermission)

app.mount('#app')
