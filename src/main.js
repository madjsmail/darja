import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '../src/style/style.scss'
// eslint-disable-next-line no-unused-vars
import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth'





createApp(App).use(router).mount('#app')
