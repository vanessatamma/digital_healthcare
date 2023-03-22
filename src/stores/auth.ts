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
import {setDoc, doc, getDoc, collection, addDoc, getDocs} from "firebase/firestore";
import {db} from "@/firebase/init";
import {useToast} from "vue-toast-notification";
import {
    capitalizeString,
    formattedLastLoginDate,
    isEmptyObject,
    recursivelyNullifyUndefinedValues
} from "@/shared/utils";

export const initialPssState = {
        lastName: '-',
        firstName: '-',
        cf: '-',
    };
export const initialUserState = {
        firstName: "",
        lastName:"",
        email: "",
        password: undefined,
        confirmPassword: undefined,
        lastLogin: null,
        userType:"",
    };
export const initialPatientInfoState = {
    lastName: '-',
    firstName: '-',
    cf: '-',
    cityOfBirth: '-',
    dateOfBirth: '-',
    domicile: '-',
    email: '-',
    genre: '-',
    infoCaregiver: '-',
    pec: '-',
    phone: '-',
    phoneCaregiver: '-',
}
export const initialPatientState =  {
    isCreating: false,
    isUpdating: false,
    isLoading: false,
    cf: "",
    info: initialPatientInfoState,
    pssList: [],
    currentPss: initialPssState,
    isCreatingNewPss: false,
    isUpdatingCurrentPss: false,
};
export const useAuthStore = defineStore('auth',  {
  state: () => ({
      isLoading: false,
      isLoggedIn: false,
      user: initialUserState,
      errorMessage: "",
      patient: initialPatientState
  }),
  getters: {
      capitalizedName(state) {
          return `${capitalizeString(state.user.firstName)} ${capitalizeString(state.user.lastName)}`
      },
      lastLogin(state) {
          if(state.user.lastLogin) {
              return formattedLastLoginDate(state.user.lastLogin);
          }
          return '-';
      },
      pssDateList(state) {
          return state.patient.pssList.map(pss => {
              return {
                  date: (pss as any).date,
                  id: (pss as any).id
              }
          });
      }
  },
  actions: {
      resetState() {
          this.patient.isCreating = false;
          this.patient.info = initialPatientInfoState;
      },
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
                lastLogin: (userCredential.user.metadata as any).lastLoginAt
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
                      lastLogin: (userCredential.user.metadata as any).lastLoginAt
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
      logout() {
          try {
              this.isLoading = true;
              const auth = getAuth();
              useToast({position: 'top', duration: 2000,}).success("Logout in corso.. ");
              this.patient = JSON.parse(JSON.stringify(initialPatientState));
              this.user = JSON.parse(JSON.stringify(initialUserState));
                this.resetState();
              setTimeout(async () => {
                    await signOut(auth);
                  this.patient.isCreating = false;
                   this.isLoading = false;
              }, 2000)
          } catch (e) {
              useToast({position: 'top', duration: 4000,}).error("Impossibile effettuare il logout");
              this.isLoading = false;
          }
    },
      async checkCF(cf: string) {
          this.patient.isLoading = true;
          // check on firestore the inserted CF
          const formattedCF = cf.toUpperCase();
          this.patient.cf = formattedCF;
          const patientSnap = await getDoc(doc(db, "patients", formattedCF));
          if(!patientSnap.exists()) {
              //create the current patient and the related collection of pss
              const patientRef = doc(db, "patients", formattedCF);
              await setDoc(patientRef, {});
            //write an empty subcollection pss
            //  const pssRef = collection(patientRef, "pss")
            //  await addDoc(pssRef, {});
              useToast({position: 'top', duration: 2000}).success("Registrazione Codice Fiscale paziente effettuata con successo.");
          } else {
              useToast({position: 'top', duration: 2000}).success("Il paziente risulta già registrato, scaricamento PSS in corso..");
          }
          // Retireve all pss of the current patient
          await this.getPssList();

          this.patient.isCreating = true;
          this.patient.isLoading = false;

      },
      async getPatientInfo() {
          const userSnap = await getDoc(doc(db, "patients", this.patient.cf));
          if(!isEmptyObject(userSnap.data())) {
              this.patient.info = (userSnap.data() as any)
          }
      },
      async setPatientInfo(patientInfo: any) {
          const patientRef = doc(db, "patients", this.patient.cf);
          await setDoc(patientRef, recursivelyNullifyUndefinedValues(patientInfo));
          useToast({position: 'top', duration: 2000}).success("Dati paziente inseriti con successo.");
          this.patient.isUpdating = false;
          await this.getPatientInfo();
      },
      async getPssList() {
          const patientRef = doc(db, "patients", this.patient.cf);
          const pssRef = collection(patientRef, "pss")
          const pssSnapshot = await getDocs(pssRef);
          let pssList: any[] = [];
          if(!pssSnapshot.empty) {
              pssSnapshot.forEach((doc) => {
                 // console.log(doc.id, " => ", doc.data());
                  const data = doc.data();
                  pssList.push(data as any);
              });
              this.patient.pssList = pssList as any;
          }
        //  this.patient.currentPss = pssList[0];
      },
      async addNewPss(pss: any) {
         // console.log('addNewPss', this.patient.cf, recursivelyNullifyUndefinedValues(pss))
          const patientRef = doc(db, "patients", this.patient.cf);
          const pssRef = collection(patientRef, "pss")
          await addDoc(pssRef, recursivelyNullifyUndefinedValues(pss));

          useToast({position: 'top', duration: 2000}).success("PSS caricato con successo.");

          await this.getPssList();
            //dopo metterlo a false
          this.patient.isCreatingNewPss = false;
          this.patient.isUpdatingCurrentPss = false;
      },
  },
})
