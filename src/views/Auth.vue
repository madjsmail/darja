<template>
  <div class="login">
    <button @click="login" class="btn">
      <img src="../assets/search.png" alt="" /> <span>log in</span>
    </button>
  </div>
</template>

<script>
import firebase from "firebase/app";
import db from "../firebase/init";
import router from "../router";
var provider = new firebase.auth.GoogleAuthProvider();
//provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

export default {
  methods: {
    login() {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function (result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
          console.log(token, user);

          var Users = db
            .collection("Users")
            .doc(user.displayName.toLowerCase());

          Users.get()
            .then(function (doc) {
              if (doc.exists) {
                console.log("Document data:", doc.data());
              } else {
                // doc.data() will be undefined in this case
                Users.set({
                  user: user.displayName.toLowerCase(),
                  photoUrl: user.photoURL,
                  word: [],
                  contribution: 0,
                });
              }
            })
            .catch(function (error) {
              console.log("Error getting document:", error);
            });

          router.push({
            name: "Form",
          });
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
          console.log(errorCode, errorMessage, email, credential);
        });
    },
  },
  created() {

  },
};
</script>

<style scoped lang="scss">
.login {
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  .btn {
    position: relative;

    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;

    img {
      max-width: 25px;
      display: inline;
      margin-right: 6px;
    }
  }
}
</style>
