import { defineStore } from 'pinia'
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  type UserCredential,
} from "firebase/auth";
import router from "@/router";
import type {ILoginCredentials, IUser} from "@/interfaces/user.interfaces";
import { setDoc, doc, getDoc } from "firebase/firestore";
import {db} from "@/firebase/init";
import {useToast} from "vue-toast-notification";

export const useAuthStore = defineStore('auth',  {
  state: () => ({
    isLoading: false,
    isLoggedIn: false,
    user: {
        firstName: "",
        lastName:"",
        email: "",
        password: undefined,
        confirmPassword: undefined,
        userType:"",
    },
    errorMessage: "",
  }),
  getters: {},
  actions: {
      async register(user: IUser) {
        // Register User with email and password on firebase
        try {
            const auth = getAuth();
            const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, user.email, user.password!);
            // Retrieve unique id from firebase Auth
            const {uid} = userCredential.user;
            // Set user in firestore with the current user info
            await setDoc(doc(db, "users", uid), {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                userType: user.userType,
            });
            this.user = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                userType: user.userType,
                password: undefined,
                confirmPassword: undefined,
            };
            useToast({position: 'top', duration: 2000,}).success(
                "Registrazione effettuata con successo. " +
                "Redirect in corso...");
            // Navigate to home page
            setTimeout(async() => {
                await router.push({name: 'Home'});
            }, 2500)
        } catch (e) {
            console.log("error ",e)
            if((e as any).message.includes('email-already-in-use')) {
                this.errorMessage = "Email già utilizzata.";
            } else {
                this.errorMessage = "Errore durante la registrazione dell'utente";
            }
            // Show toast error
            useToast({position: 'top', duration: 2500,}).error(this.errorMessage);
        }
    },
      async signIn(credentials: ILoginCredentials) {
          try {
              this.isLoading = true;
              const auth = getAuth();
              const userCredential: UserCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
              // retrieve user from firestore
              const {uid} = userCredential.user;
              // set current user in the store
              const userSnap = await getDoc(doc(db, "users", uid));
              if (userSnap.exists()) {
                  this.user = {
                      ...userSnap.data() as IUser,
                      confirmPassword: undefined,
                      password: undefined,
                  };
              } else {
                  // doc.data() will be undefined in this case
                  console.log("No such document!");
              }
              useToast({position: 'top', duration: 2000,}).success(
                  "Login effettuato con successo. " +
                  "Redirect in corso...");
              setTimeout(async() => {
                  await router.push({name: 'Home'});
                  this.isLoading = false;
              }, 2500)
          } catch (e) {
              if((e as any).code === 'auth/wrong-password' || (e as any).code === 'auth/user-not-found') {
                  this.errorMessage = "Credenziali errate.";
              } else {
                  this.errorMessage = "Impossibile effettuare il login.";
              }
              useToast({position: 'top', duration: 2500,}).error(this.errorMessage);
              this.isLoading = false;
          }
    },
    async signout() {
      try {
          const auth = getAuth();
          await signOut(auth);
         // await router.push({name: 'Login'});
      } catch (e) {
          useToast({position: 'top', duration: 4000,}).error("Impossibile effettuare il logout");
      }
    },
  },
})
