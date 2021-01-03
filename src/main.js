import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '../src/style/style.scss'
// eslint-disable-next-line no-unused-vars
import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth'

router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser;
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if (to.name=='Form' && requiresAuth && !currentUser) {
        next('/Auth');
    } else if (requiresAuth && currentUser) {
        next();
    } else {
        next();
    }
});




createApp(App).use(router).mount('#app')
