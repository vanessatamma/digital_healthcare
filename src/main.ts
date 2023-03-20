import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'vue-toast-notification/dist/theme-bootstrap.css';
// importing AOS css style globally
import 'aos/dist/aos.css'

import App from './App.vue'
import router from './router'

import './assets/main.scss'

const app = createApp(App)

// Install Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

app.use(createPinia())
app.use(router)


app.mount('#app')
