<template>
  <div id="nav">
    <nav class="navbar">
      <div class="div_logo">
        <img src="../src/assets/Plandetravail17@3x.png" alt="LOGO" srcset="" />
        <h2 class="logo">
          AwalNa
        </h2>
      </div>
      <a
        href="#"
        :class="active ? 'menu-btn menu-btn--active' : 'menu-btn'"
        @click="active = !active"
      ></a>
      <ul :class="active ? 'active' : ''">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/Search">search</router-link></li>
        <li><router-link to="/Form">contribute</router-link></li>
        <li v-if="Admin">
          <router-link to="/dashboard">dashboard</router-link>
        </li>
        <li @click="logOut"><router-link to="/">log out</router-link></li>
        <!-- <li><router-link to="/about">About</router-link></li> -->
      </ul>
    </nav>
  </div>
  <router-view />
</template>

<script>
import firebase from "firebase/app";
export default {
  data() {
    return {
      active: 0,
      isAuth: false,
      Admin: null,
    };
  },
  methods: {
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(function() {
          // Sign-out successful.
        })
        .catch(function(error) {
          // An error happened
          console.log(error);
        });
    },
  },
  created() {
    //var admin = false;
    const T =this ;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        firebase
          .auth()
          .currentUser.getIdTokenResult()
          .then((idTokenResult) => {
            // Confirm the user is an Admin.
            // eslint-disable-next-line no-extra-boolean-cast
            if (!!idTokenResult.claims.admin) {
              // Show admin UI.
              T.Admin = true;
            } else {
              // Show regular user UI.
              T.Admin = false;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        // No user is signed in.
        T.Admin = false;
      }
    });

    //this.Admin = admin;
  },
};
</script>

<style lang="scss">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }
nav {
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  position: relative;
  width: 90vw;
  margin: 1em auto;
  font-family: "Poppins", sans-serif;
  .div_logo {
    display: flex;
  }

  img {
    display: none;
    max-width: 150px;
  }
  .logo {
    font-size: 2em;
    font-family: "Comfortaa", cursive;
  }

  ul {
    list-style: none;
    display: flex;
    flex-direction: row;
    position: absolute;
    right: 0;
    top: 3em;
    //background-color: rgb(14, 14, 14);
    justify-content: center;
    align-items: center;
    align-self: center;
    align-content: center;
    transition: transform 0.4s ease-in;
    color: rgba(255, 255, 255, 0);
    transform: translateX(600px);
    &.active {
      transform: translateX(0);
    }

    li {
      display: flex;

      margin: 0 2em 0 auto;
    }
  }
}
@media (min-width: 900px) {
  nav {
    display: flex;
    justify-content: space-between;
    position: relative;
    .div_logo {
      display: flex;
    }

    img {
      display: inline;
      // max-width: 100px;
    }
    .logo {
      font-size: 2em;
      font-family: "Comfortaa", cursive;
      display: flex;
      align-items: flex-end;
    }

    ul {
      list-style: none;
      display: flex;
      flex-direction: row;
      transform: translateX(0px);

      li {
        display: flex;

        margin: 0 2em 0 auto;
      }
    }
  }
  .menu-btn {
    display: none !important;
  }
}

.menu-btn {
  display: block;
  right: 1em;
  bottom: 1em;

  position: absolute;
  top: 50%;
  width: 36px;
  transform: translate(-50%, -50%);
}

.menu-btn:before,
.menu-btn:after {
  background-color: #fff;
  content: "";
  display: block;
  height: 4px;
  transition: all 200ms ease-in-out;
}
.menu-btn:before {
  box-shadow: 0 10px 0 #fff;
  margin-bottom: 16px;
}
.menu-btn--active:before {
  box-shadow: 0 0 0 #fff;
  transform: translateY(10px) rotate(45deg);
}
.menu-btn--active:after {
  transform: translateY(-10px) rotate(-45deg);
}
</style>
