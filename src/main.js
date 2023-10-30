import { createApp } from 'vue'
import App from './App.vue'
import './styles/style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/index.js'
import store from "./store"
import "@/access";


const app = createApp(App)
app.use(ElementPlus)
app.use(store)
app.use(router)


app.mount('#app')
