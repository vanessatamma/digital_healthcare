import { defineStore } from 'pinia'
import {
    getAuth,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    type UserCredential,
} from "firebase/auth";
import {getDownloadURL, getMetadata, getStorage, listAll, ref, uploadBytes, type StorageReference} from "firebase/storage";
import router from "@/router";
import type {ILoginCredentials, IUser} from "@/interfaces/user.interfaces";
import {setDoc, doc, getDoc, collection, addDoc, getDocs, query, where} from "firebase/firestore";
import {db} from "@/firebase/init";
import {useToast} from "vue-toast-notification";
import {
    capitalizeString, checkIfNull,
    formattedLastLoginDate, inverseRecursivelyNullifyUndefinedValues,
    isEmptyObject,
    recursivelyNullifyUndefinedValues
} from "@/shared/utils";

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import {v4 as uuidv4} from "uuid";

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
export const initialPssState = {
    lastName: '-',
    firstName: '-',
    cf: '-',
};
export const initialUserState = {
    firstName: "",
    lastName: "",
    email: "",
    password: undefined,
    confirmPassword: undefined,
    lastLogin: null,
    userType: "",
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
export const initialPatientState = {
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
export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLoading: false,
        isLoggedIn: false,
        user: initialUserState,
        errorMessage: "",
        patient: initialPatientState,
        patientsList: {
            headers: [],
            items: [],
            patientsCF: [],
        },
        patientDocList: [],
    }),
    getters: {
        capitalizedName(state) {
            return `${capitalizeString(state.user.firstName)} ${capitalizeString(state.user.lastName)}`
        },
        lastLogin(state) {
            if (state.user.lastLogin) {
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
                setTimeout(async () => {
                    await router.push({name: 'Home'});
                }, 2500)
            } catch (e) {
                console.log("error ", e)
                if ((e as any).message.includes('email-already-in-use')) {
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
                setTimeout(async () => {
                    await router.push({name: 'Home'});
                    this.isLoading = false;
                }, 2500)
            } catch (e) {
                if ((e as any).code === 'auth/wrong-password' || (e as any).code === 'auth/user-not-found') {
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
            if (!patientSnap.exists()) {
                //create the current patient and the related collection of pss
                const patientRef = doc(db, "patients", formattedCF);
                await setDoc(patientRef, {});
                //write an empty subcollection pss
                //  const pssRef = collection(patientRef, "pss")
                //  await addDoc(pssRef, {});
                useToast({
                    position: 'top',
                    duration: 2000
                }).success("Registrazione Codice Fiscale paziente effettuata con successo.");
            } else {
                useToast({
                    position: 'top',
                    duration: 2000
                }).success("Il paziente risulta già registrato, scaricamento PSS in corso..");
            }
            // Retireve all pss of the current patient
            if (this.patient.pssList.length === 0) {
                await this.getPssList();
            }

            this.patient.isCreating = true;
            this.patient.isLoading = false;

        },
        async getPatientInfo() {
            const userSnap = await getDoc(doc(db, "patients", this.patient.cf));
            if (!isEmptyObject(userSnap.data())) {
                this.patient.info = (userSnap.data() as any)
                await this.getPssList();
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
            if (!pssSnapshot.empty) {
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
        async downloadPdf() {
            const dd = {
                content: [
                    {
                        text: `Paziente: ${this.patient.info.lastName} ${this.patient.info.firstName}`,
                        margin: [0, 0, 0, 10],

                        style: 'header'
                    },
                    {
                        text: `PSS del ${(this.patient.currentPss as any).date}`,
                        margin: [0, 0, 0, 25],
                        style: 'subheader'
                    },
                    {
                        text: [
                            {
                                text: 'Il seguente form di inserimento dati PSS segue le linee guida FSE/PSS-PS,',
                                fontSize: 13
                            },
                            {text: ' "versione 31 marzo 2014" ', fontSize: 13, bold: true, italics: true,},
                        ]
                    },
                    // Dati Paziente
                    {
                        style: 'tableExample',
                        color: '#444',
                        margin: [0, 10, 0, 10],
                        table: {
                            widths: [200, '*'],
                            body: [
                                [{
                                    text: 'Dati identificati del Paziente/Care Giver',
                                    style: 'header',
                                    colSpan: 2,
                                    alignment: 'left',
                                }, {}],
                                ['Cognome', `${checkIfNull((this.patient.info as any).lastName)}`,],
                                ['Nome', `${checkIfNull((this.patient.info as any).firstName)}`,],
                                ['Data di nascita', `${checkIfNull((this.patient.info as any).dateOfBirth)}`,],
                                ['Codice Fiscale', `${checkIfNull((this.patient.info as any).cf.toUpperCase())}`,],
                                ['Recapito Telefonico', `${checkIfNull((this.patient.info as any).phone)}`,],
                                ['Email', `${checkIfNull((this.patient.info as any).email)}`,],
                                ['PEC', `${checkIfNull((this.patient.info as any).pec)}`,],
                                ['Comune di nascita', `${checkIfNull((this.patient.info as any).cityOfBirth)}`,],
                                ['Comune di domicilio', `${checkIfNull((this.patient.info as any).domicile)}`,],
                                ['Info Care Giver', `${checkIfNull((this.patient.info as any).infoCaregiver)}`,],
                                ['Recapito Telefonico Care Giver', `${checkIfNull((this.patient.info as any).phoneCaregiver)}`,],
                            ]
                        }
                    },
                    // Dati medico
                    {
                        style: 'tableExample',
                        color: '#444',
                        margin: [0, 10, 0, 10],
                        table: {
                            widths: [200, '*'],
                            body: [
                                [{text: 'Dati del medico', style: 'header', colSpan: 2, alignment: 'left',}, {}],
                                ['Cognome', `${checkIfNull((this.patient.currentPss as any).lastName)}`,],
                                ['Nome', `${checkIfNull((this.patient.currentPss as any).firstName)}`,],
                                ['Codice Fiscale', `${checkIfNull((this.patient.currentPss as any).cf.toUpperCase())}`,],
                                ['Recapito Telefonico', `${checkIfNull((this.patient.currentPss as any).phone)}`,],
                                ['Email', `${checkIfNull((this.patient.currentPss as any).email)}`,],
                                ['PEC', `${checkIfNull((this.patient.currentPss as any).pec)}`,],
                            ]
                        }
                    },
                    // Dati sanitari del paziente
                    {
                        style: 'tableExample',
                        color: '#444',
                        margin: [0, 10, 0, 10],
                        table: {
                            widths: [200, '*'],
                            body: [
                                [{
                                    text: 'Dati sanitari del paziente',
                                    style: 'header',
                                    colSpan: 2,
                                    alignment: 'left',
                                }, {}],
                                ['Capacità Motoria Paziente', `${checkIfNull((this.patient.currentPss as any).motorSkills)}`,],
                                ['Attività Lavorativa', `${checkIfNull((this.patient.currentPss as any).workingActivity)}`,],
                                ['Patologie Croniche Rilevanti', `${checkIfNull((this.patient.currentPss as any).chronicPathologies)}`,],
                                ['Organi Mancanti', `${checkIfNull((this.patient.currentPss as any).missingOrgans)}`,],
                                ['Trapianti', `${checkIfNull((this.patient.currentPss as any).transplants)}`,],
                                ['Malformazioni rilevanti', `${checkIfNull((this.patient.currentPss as any).relevantMalformations)}`,],
                                ['Reazioni avverse farmaci e alimenti', `${checkIfNull((this.patient.currentPss as any).adverseReactions)}`,],
                                ['Allergie cutanee, respiratorie e sistemiche', `${checkIfNull((this.patient.currentPss as any).skinAllergies)}`,],
                                ['Allergie a veleno di imenotteri', `${checkIfNull((this.patient.currentPss as any).venomAllergies)}`,],
                                ['Protesi/Impianti permanenti', `${checkIfNull((this.patient.currentPss as any).prosthetics)}`,],
                                ['Ausili', `${checkIfNull((this.patient.currentPss as any).aids)}`,],
                                ['Patologie in atto paziente', `${checkIfNull((this.patient.currentPss as any).actualPathologies)}`,],
                                ['Terapie Farmacologiche Croniche', `${checkIfNull((this.patient.currentPss as any).chronicPharmacologicalTherapies)}`,],
                                ['Terapie Farmacologiche Altre', `${checkIfNull((this.patient.currentPss as any).othersPharmacologicalTherapies)}`,],
                                ['Vaccinazioni', `${checkIfNull((this.patient.currentPss as any).vaccinations)}`,],
                            ]
                        }
                    },
                    {
                        style: 'tableExample',
                        color: '#444',
                        margin: [0, 10, 0, 10],
                        table: {
                            widths: [200, '*'],
                            body: [
                                [{
                                    text: 'Parametri di monitoraggio',
                                    style: 'header',
                                    colSpan: 2,
                                    alignment: 'left',
                                }, {}],
                                ['Altezza', `${checkIfNull((this.patient.currentPss as any).height)}`,],
                                ['Peso', `${checkIfNull((this.patient.currentPss as any).weight)}`,],
                                ['BMI', `${checkIfNull((this.patient.currentPss as any).bmi)}`,],
                                ['Pressione Arteriosa', `${checkIfNull((this.patient.currentPss as any).bloodPressure)}`,],
                                ['ADI', `${checkIfNull((this.patient.currentPss as any).adi)}`,],
                                ['ADP', `${checkIfNull((this.patient.currentPss as any).adp)}`,],
                            ]
                        }
                    },
                    {
                        style: 'tableExample',
                        color: '#444',
                        margin: [0, 10, 0, 10],
                        table: {
                            widths: [200, '*'],
                            body: [
                                [{
                                    text: 'Anamnesi ed informazioni',
                                    style: 'header',
                                    colSpan: 2,
                                    alignment: 'left',
                                }, {}],
                                ['Anamnesi Familiare', `${checkIfNull((this.patient.currentPss as any).medicalHistory)}`,],
                                ['Fattori di rischio', `${checkIfNull((this.patient.currentPss as any).riskFactors)}`,],
                                ['Gravidenze e parti', `${checkIfNull((this.patient.currentPss as any).pregnancies)}`,],
                                ['Donazioni Organi', `${checkIfNull((this.patient.currentPss as any).organDonation)}`,],
                            ]
                        }
                    },
                    {
                        text: 'PSS redato secondo le linee guida indicate in intestazione. Il PSS corrente può essere oggetto di modifica e aggiornamenti.',
                        margin: [0, 10, 0, 10],
                        style: ['quote', 'small']
                    }
                ],
                styles: {
                    header: {
                        fontSize: 18,
                        bold: true,
                        padding: 10,
                        alignment: 'center'
                    },
                    subheader: {
                        fontSize: 15,
                        bold: true,
                        alignment: 'center'
                    },
                    quote: {
                        italics: true
                    },
                    small: {
                        fontSize: 8
                    }
                }

            }
            pdfMake.createPdf(dd).download(`PSS-${(this.patient.currentPss as any).date}`);
            useToast({position: 'top', duration: 2000}).success("PSS scaricato.");
        },
        async getPatientsList() {
            const colRef = collection(db, "patients");
            const docsSnap = await getDocs(colRef);
            /* this.patientsList.headers = (Object.keys(docsSnap.docs[0].data()) as any).map((header: any) => {
                 return {
                       text: header,
                       value: header
                 }
             });*/

            const patientsBody: any[] = [];
            const patientsCF: any[] = [];
            docsSnap.forEach(doc => {
                // Check that patient has data
                if (Object.keys(doc.data()).length > 0) {
                    patientsBody.push((doc.data() as any));
                    patientsCF.push((doc.id as any));
                }

            });
            // Put char: '-' every time value is null
            (patientsBody as never[]).map((value) => {
                inverseRecursivelyNullifyUndefinedValues(value, '-')
            });
            this.patientsList.items = (patientsBody as never[]);
            this.patientsList.patientsCF = (patientsCF as never[]);
        },
        async uploadDoc(doc: any, cf: string) {
            const storage = getStorage();
            const docName = `${cf}_${uuidv4()}`;
            const storageRef = ref(storage, `reports/${docName}`);

            //console.log('uploadDoc', doc)
            uploadBytes(storageRef, doc).then((snapshot) => {
                useToast({position: 'top', duration: 2000}).success(`Documento ${docName} caricato con successo.`);
            });

        },
        async getDocByCf(cf: string) {
            const storage = getStorage();
            const storageRef = ref(storage, `reports`);
            const filteredDoc: any[] = [];
            listAll(storageRef)
              .then((res) => {
                  res.prefixes.forEach((folderRef) => {
                      // All the prefixes under listRef.
                      // You may call listAll() recursively on them.
                  });
                  res.items.forEach((itemRef) => {
                      if(itemRef.name.split('_').includes(cf)) {
                          filteredDoc.push(itemRef);
                      }
                  });

                  this.patientDocList = filteredDoc as any;
              }).catch((error) => {
              // Uh-oh, an error occurred!
          });
        },
        async downloadDocByPath(path: string) {
            const storage = getStorage();
            getDownloadURL(ref(storage, path))
                .then((url) => {
                    // `url` is the download URL for 'images/stars.jpg'

                    // This can be downloaded directly:
                    const xhr = new XMLHttpRequest();
                    xhr.responseType = 'blob';
                    xhr.onload = (event) => {
                        const blob = xhr.response;
                    };
                    xhr.open('GET', url);
                    xhr.send();

                })
                .catch((error) => {
                    // Handle any errors
                });
        }
  },
})
