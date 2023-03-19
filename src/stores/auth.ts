import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import router from "@/router";

export const useAuthStore = defineStore('auth',  {
  state: () => ({
    isLoggedIn: true,
    email: "",
    password: "",
    confirmPassword: "",
    errorMessage: "",
  }),
  getters: {},
  actions: {
    register() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            const user = userCredential.user;
            alert("Utente Registrato");
          })
          .catch((error) => {
            const errorCode = error.code;
            this.errorMessage = error.message;
            alert(this.errorMessage);
          });
    },
    signIn() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            alert("¡Sesión iniciada!");
            router.push("/auth");
            const user = userCredential.user;
          })
          .catch((error) => {
            const errorCode = error.code;
            this.errorMessage = error.message;
            alert(this.errorMessage);
          });
    },
    signout() {
      const auth = getAuth();
      signOut(auth)
          .then(() => {
            alert("Sessione Terminata.");
          })
          .catch((error) => {
            const errorCode = error.code;
            this.errorMessage = error.message;
            alert(this.errorMessage);
          });
    },
  },
})
