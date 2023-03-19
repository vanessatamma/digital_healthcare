import { defineStore } from 'pinia'
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  type UserCredential,
} from "firebase/auth";
import router from "@/router";
import type {IUser} from "@/interfaces/user.interfaces";
import { setDoc, doc } from "firebase/firestore";
import {db} from "@/firebase/init";


export const useAuthStore = defineStore('auth',  {
  state: () => (
      {
        isLoggedIn: true,
        user: {
            firstName: "",
            lastName:"",
            email:"",
            password:"",
            confirmPassword: "",
            userType:"",
        },
        errorMessage: "",
      }
  ),
  getters: {},
  actions: {
    async register(user: IUser) {
        // Register User with email and password on firebase
        try {
            const auth = getAuth();
            const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
            // Retrieve unique id from firebase Auth
            const { uid } = userCredential.user;
            // Set user in firestore with the current user info
            await setDoc(doc(db, "users", uid), {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                userType: user.userType,
            });
        } catch (e) {
            this.errorMessage = "Errore durante la registrazione dell'utente";
            alert("Errore durante la registrazione dell'utente");
            console.log("Errore ", this.errorMessage, e);
        }

    },
    signIn() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.user.email, this.user.password)
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
