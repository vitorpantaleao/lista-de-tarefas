import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia'
import './assets/style.css'

createApp(App)
    .use(router)
    .use(createPinia())
    .mount('#app')
