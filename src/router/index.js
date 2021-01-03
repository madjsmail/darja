import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/user/Home.vue";
import Search from "@/views/user/Search.vue";
import Form from "@/views/user/Form.vue";
import Auth from "@/views/user/Auth.vue";
import NotFound from "@/views/user/404.vue";
import editWord from "@/views/admin/editWord.vue";
import firebase from 'firebase/app'

import dashboard from '@/views/admin/dashboard.vue'

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Auth",
    name: "Auth",
    props: true,
    component: Auth,


  },
  {
    path: "/editWord",
    name: "editWord",
    props: true,
    component: editWord,


  },

  {
    path: "/dashboard",
    name: "dashboard",
    component: dashboard,
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {

      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          // User is signed in.
          firebase.auth().currentUser.getIdTokenResult()
            .then((idTokenResult) => {
              // Confirm the user is an Admin.
              // eslint-disable-next-line no-extra-boolean-cast
              if (!!idTokenResult.claims.admin) {
                // Show admin UI.
                next()
              } else {
                // Show regular user UI.
                next('404')

              }
            })
            .catch((error) => {
              console.log(error);
            });

        } else {
          // No user is signed in.
          next('auth')

        }
      });

    }

  },
  {
    path: "/Form",
    name: "Form",
    component: Form,
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {

      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          // 
          next()
        } else {
          // No user is signed in.
          next('auth')

        }
      });

    }

  },
  {
    path: "/word",
    name: "word",
    //component: word
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/user/Word.vue"),
    props: true,
  },
  {
    path: "/Search",
    name: "Search",
    component: Search,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/user/About.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
