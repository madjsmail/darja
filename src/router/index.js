/* eslint-disable no-extra-boolean-cast */
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Search from "../views/Search.vue";
import Form from "../views/Form.vue";
import Auth from "../views/Auth.vue";
import Admin from "../views/admin/Admin.vue";
import NotFound from "../views/404.vue";
import firebase from 'firebase/app'
// import word from '../views/word.vue'
// const currentUser = Firebase.auth().currentUser;
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
    beforeEnter: (to, from, next) => {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          // User is signed in.
          next({ name: 'Form' })

        } else {
          // No user is signed in.
          //next({ name: 'Home' })
          next()

        }
      });
    }
  },
  {
    path: "/Admin",
    name: "Admin",
    //props: true,
    meta: { requiresAuth: true },

    component: Admin,
    beforeEnter: (to, from, next) => {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          firebase
            .auth()
            .currentUser.getIdTokenResult()
            .then((idTokenResult) => {
              // Confirm the user is an Admin.
              // eslint-disable-next-line no-extra-boolean-cast
              if (!!idTokenResult.claims.admin) {
                // Show admin UI.
                next()
              } else {
                // Show regular user UI.
                next({ path: '/' })
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          next({ path: '/' })


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
    // beforeEnter: (to, from, next) => {
    //   if (to.params.name) {
    //     next();
    //   } else {
    //     next({ name: "Home" });
    //   }
    // }
  },
  {
    path: "/word",
    name: "word",
    //component: word
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Word.vue"),
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
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
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
