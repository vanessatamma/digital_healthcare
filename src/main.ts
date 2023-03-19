import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {initFirebase} from "@/firebase/init";

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

// Install Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'


// Init Firebase
//initFirebase();

app.use(createPinia())
app.use(router)

app.mount('#app')
