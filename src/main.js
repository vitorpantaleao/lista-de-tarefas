import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia'
import './assets/style.css'

import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"

const options = {
    position: "top-right",
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false
}

createApp(App)
    .use(router)
    .use(createPinia())
    .use(Toast, options)
    .mount('#app')
