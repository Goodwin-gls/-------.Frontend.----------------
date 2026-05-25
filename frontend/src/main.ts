import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import '@vue-flow/controls/dist/style.css'
import './styles/global.scss'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

app.mount('#app')

