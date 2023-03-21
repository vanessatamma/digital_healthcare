<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import FormWizard from "@/components/auth/pss/FormWizard.vue";
import FormStep from "@/components/auth/pss/FormStep.vue";
import {useAuthStore} from "@/stores/auth";
import * as Yup from "yup";
import {reactive, ref} from "vue";
const userAuth = useAuthStore()


const validationSchema = [
  // dati del medico
  yup.object({
    lastName: yup.string().required('Campo Obbligatorio.').label('Cognome Medico'),
    firstName: yup.string().required('Campo Obbligatorio.').label('Nome Medico'),
    cf: Yup.string()
        .uppercase()
        .required('Campo Obbligatorio.')
        .matches(/^([A-Z]{6}[0-9LMNPQRSTUV]{2}[ABCDEHLMPRST]{1}[0-9LMNPQRSTUV]{2}[A-Z]{1}[0-9LMNPQRSTUV]{3}[A-Z]{1})$|([0-9]{11})$/, 'Formato codice fiscale non valido.'),
    phone: Yup.string()
        .required('Campo Obbligatorio.')
        .trim()
        .matches(/^(([+])39)?((3[1-6][0-9]))(\d{7})$/, 'Formato numero non corretto.'),
    email: yup.string().required().email().label('Email Address'),
    pec: Yup.string()
        .matches(/(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:\w*.?pec(?:.?\w+)*)/g,'Formato PEC non valido.'),
  }),

  yup.object({
    motorSkills: yup
        .string()
        .required('Seleziona un opzione')
        .oneOf(['Autonomo', 'Assistito', 'Allettato']),
    workingActivity: yup.string().label('Cognome Medico'),
    missingOrgans: yup.string().label('Organi mancanti'),
    transplants: yup.string().label('Trapianti'),
    relevantMalformations: yup.string().label('Malformazioni rilevanti'),
  }),

  yup.object({
    adverseReactions: yup.string().label('Reazioni avverse'),
    skinAllergies: yup.string().label('Allergie cutanee, respiratorie e sistemiche'),
    venomAllergies: yup.string().label('Allergie a veleno di imenotteri'),
    prosthetics: yup.string().label('Protesi/Impianti permanenti'),
    aids: yup.string().label('Ausili'),
  }),

  yup.object({
    chronicPharmacologicalTherapies: yup.string().label('Terapie Farmacologiche Croniche'),
    othersPharmacologicalTherapies: yup.string().label('Terapie Farmacologiche Altre'),
    vaccinations: yup.string().label('Vaccinazioni'),
  }),

  yup.object({
    height: yup.number().min(1, "Inserire un'altezza valida").label('Altezza'),
    weight: yup.number().min(1, "Inserire un peso valido").label('Peso'),
    bmi: yup.number().label('BMI'),
    bloodPressure: yup.number().label('Pressione Arteriosa'),
    adi: yup.string().label('ADI'),
    adp: yup.string().label('ADP'),
  }),

  yup.object({
    medicalHistory: yup.string().label('Anamnesi Famigliare'),
    riskFactors: yup.string().label('Fattori di rischio'),
    pregnancies: yup.string().label('Gravidanze e parti'),
    organDonation: yup.string().label('Gravidanze e parti'),
  }),

];

/**
 * Only Called when the last step is submitted
 */

const chronicPathologies: string[] = reactive([]);
const actualPathologies: string[] = reactive([]);
function onSubmit(formData: any) {
  userAuth.addNewPss({
    ...formData,
    chronicPathologies,
    actualPathologies,
    date: new Date()
  });
  //console.log(JSON.stringify(formData, null, 2));
}
const onReset = () => {
  userAuth.patient.isCreatingNewPss = false;
}

let currentStep = ref(1);
const onChangeStep = (stepIndex: number) => {
  currentStep.value = stepIndex + 1;
}

const addPatology = (patology: string, arrayToCheck: string[]) => {
  if (!arrayToCheck.includes(patology)) {
    arrayToCheck.push(patology);
  } else {
    arrayToCheck.splice(chronicPathologies.indexOf(patology), 1);
  }
}


</script>

<template>
  <div class="pss-form">
    <div class="d-flex justify-content-between align-items-center">
      <h2>
        INSERIMENTO DATI PAZIENTE
      </h2>
      <span class="fw-semibold">STEP {{ currentStep }} / {{validationSchema.length}}</span>
    </div>

    <p>
      Il seguente form di inserimento dati PSS segue le linee guida FSE/PSS-PS, <i>"versione 31 marzo 2014"</i>
    </p>

    <hr class="my-5">

    <FormWizard
        class="mt-3"
        :validation-schema="validationSchema"
        @submit="onSubmit"
        @reset="onReset"
        @next="onChangeStep($event)"
        @previous="onChangeStep($event)"
    >

      <!-- Dati del medico -->
      <FormStep>
        <h4>Dati del medico</h4>
        <div class="row">
          <div class="col-4">
            <div class="input-field">
              <label for="lastName">Cognome</label>
              <Field id="lastName" name="lastName" class="input" type="text"  />
              <ErrorMessage name="lastName" class="is-invalid" />
            </div>
          </div>
          <div class="col-4">
            <div class="input-field">
              <label for="firstName">Nome</label>
              <Field id="firstName" name="firstName" class="input" type="text"  />
              <ErrorMessage name="firstName" class="is-invalid" />
            </div>
          </div>
          <div class="col-4">
            <div class="input-field">
              <label for="cf">Codice Fiscale</label>
              <Field id="cf" name="cf" class="input" type="text"  />
              <ErrorMessage name="cf" class="is-invalid" />
            </div>
          </div>
        </div>
        <div class="row">
         <div class="col-4">
           <div class="input-field">
             <label for="phone">Recapito Telefonico</label>
             <Field id="phone" name="phone" class="input" type="text"  />
             <ErrorMessage name="phone" class="is-invalid" />
           </div>
         </div>
         <div class="col-4">
           <div class="input-field">
             <label for="email">Email</label>
             <Field id="email" name="email" class="input" type="text"  />
             <ErrorMessage name="email" class="is-invalid" />
           </div>
         </div>
         <div class="col-4">
           <div class="input-field">
             <label for="pec">PEC</label>
             <Field id="pec" name="pec" class="input" type="text"  />
             <ErrorMessage name="pec" class="is-invalid" />
           </div>
         </div>
       </div>
      </FormStep>

      <!-- Dati sanitari del paziente -->
      <FormStep>
        <h4>Dati sanitari del paziente</h4>
        <div class="row">
          <div class="col-4">
            <div class="input-field">
              <label for="motorSkills">Capacità Motoria Paziente</label>
              <Field class="input" id="motorSkills" name="motorSkills" as="select">
                <option>Seleziona un opzione</option>
                <option value="Autonomo">Autonomo</option>
                <option value="Assistito">Assistito</option>
                <option value="Allettato">Allettato</option>
              </Field>
              <ErrorMessage name="motorSkills" class="is-invalid" />
            </div>
          </div>
          <div class="col-4">
            <div class="input-field">
              <label for="workingActivity">Attività Lavorativa</label>
              <Field id="workingActivity" name="workingActivity" class="input" type="text"  />
              <ErrorMessage name="workingActivity" class="is-invalid" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="input-field">
              <label for="chronicPathologies">Patologie Croniche Rilevanti</label>
              <div class="row">
                <div class="col-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" @change="addPatology('Allergie SAI (995.3)', chronicPathologies)"  id="Allergie_SAI">
                    <label class="form-check-label" for="Allergie_SAI">
                      Allergie SAI (995.3)
                    </label>
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" @change="addPatology('Cardiopatia ischemica (410* 414*)', chronicPathologies)"  id="Cardiopatia">
                    <label class="form-check-label" for="Cardiopatia">
                      Cardiopatia ischemica (410* 414*)
                    </label>
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" @change="addPatology('IMA pregresso (412)', chronicPathologies)"  id="IMA">
                    <label class="form-check-label" for="IMA">
                      IMA pregresso (412)
                    </label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" @change="addPatology('Aneurismi: aorta (441*)', chronicPathologies)"  id="Aneurismi">
                    <label class="form-check-label" for="Aneurismi">
                      Aneurismi: aorta (441*)
                    </label>
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" @change="addPatology('Aneurismi: altre sedi (442*)', chronicPathologies)"  id="Aneurismi_altri">
                    <label class="form-check-label" for="Aneurismi_altri">
                      Aneurismi: altre sedi (442*)
                    </label>
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" @change="addPatology('Ipertensione arteriosa (401*-405*)', chronicPathologies)"  id="Ipertensione">
                    <label class="form-check-label" for="Ipertensione">
                      Ipertensione arteriosa (401*-405*)
                    </label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" @change="addPatology('Aritmie cardiache (427*)', chronicPathologies)"  id="Aritmie">
                    <label class="form-check-label" for="Aritmie">
                      Aritmie cardiache (427*)
                    </label>
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" @change="addPatology('Portatore di pacemaker', chronicPathologies)"  id="pacemaker">
                    <label class="form-check-label" for="pacemaker">
                      Portatore di pacemaker
                    </label>
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" @change="addPatology('Malattie cerebrovascolari (430*-438*)', chronicPathologies)"  id="cerebrovascolari">
                    <label class="form-check-label" for="cerebrovascolari">
                      Malattie cerebrovascolari (430*-438*)
                    </label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" @change="addPatology('Insuff. respiratoria cronaca (518.83)', chronicPathologies)"  id="Insuff_respiratoria">
                    <label class="form-check-label" for="Insuff_respiratoria">
                      Insuff. respiratoria cronaca (518.83)
                    </label>
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" @change="addPatology('Diabete (250*)', chronicPathologies)"  id="Diabete">
                    <label class="form-check-label" for="Diabete">
                      Diabete (250*)
                    </label>
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" @change="addPatology('Patologie neurologiche (20* 326*)', chronicPathologies)"  id="neurologiche">
                    <label class="form-check-label" for="neurologiche">
                      Patologie neurologiche (20* 326*)
                    </label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" @change="addPatology('Epilessia (345*)', chronicPathologies)"  id="Epilessia">
                    <label class="form-check-label" for="Epilessia">
                      Epilessia (345*)
                    </label>
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" @change="addPatology('Patologia oncologica (140*-239*)', chronicPathologies)"  id="oncologica">
                    <label class="form-check-label" for="oncologica">
                      Patologia oncologica (140*-239*)
                    </label>
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" @change="addPatology('Insuff. renale cronica (585)', chronicPathologies)"  id="renale_cronica">
                    <label class="form-check-label" for="renale_cronica">
                      Insuff. renale cronica (585)
                    </label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" @change="addPatology('Traumi recenti (800*-859*)', chronicPathologies)"  id="Traumi_recenti">
                    <label class="form-check-label" for="Traumi_recenti">
                      Traumi recenti (800*-859*)
                    </label>
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" @change="addPatology('Epatite virale (070.*)', chronicPathologies)"  id="Epatite">
                    <label class="form-check-label" for="Epatite">
                      Epatite virale (070.*)
                    </label>
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" @change="addPatology('Infezione HIV (0.42)', chronicPathologies)"  id="HIV">
                    <label class="form-check-label" for="HIV">
                      Infezione HIV (0.42)
                    </label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" @change="addPatology('Elementi di sintesi ferromagnetici (RMN): protesi e/o impianti', chronicPathologies)"  id="ferromagnetici">
                    <label class="form-check-label" for="ferromagnetici">
                      Elementi di sintesi ferromagnetici (RMN): protesi e/o impianti
                    </label>
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" @change="addPatology('Terapia anticoagulante (warfarin/acenocumarolo) (B01AA03/B01AA07)', chronicPathologies)"  id="anticoagulante">
                    <label class="form-check-label" for="anticoagulante">
                      Terapia anticoagulante (warfarin/acenocumarolo) (B01AA03/B01AA07)
                    </label>
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" @change="addPatology('Inibitori diretti Trombina (B01AE*)', chronicPathologies)"  id="Trombina">
                    <label class="form-check-label" for="Trombina">
                      Inibitori diretti Trombina (B01AE*)
                    </label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" @change="addPatology('Terapia antiaggregante (B01AC*)', chronicPathologies)"  id="antiaggregante">
                    <label class="form-check-label" for="antiaggregante">
                      Terapia antiaggregante (B01AC*)
                    </label>
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" @change="addPatology('Terapia con insulina (A10A*)', chronicPathologies)"  id="insulina">
                    <label class="form-check-label" for="insulina">
                      Terapia con insulina (A10A*)
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <div class="input-field">
              <label for="missingOrgans">Organi Mancanti</label>
              <Field id="missingOrgans" name="missingOrgans" class="input" type="text"  />
              <ErrorMessage name="missingOrgans" class="is-invalid" />
            </div>
          </div>
          <div class="col-4">
            <div class="input-field">
              <label for="transplants">Trapianti</label>
              <Field id="transplants" name="transplants" class="input" type="text"  />
              <ErrorMessage name="transplants" class="is-invalid" />
            </div>
          </div>
          <div class="col-4">
            <div class="input-field">
              <label for="relevantMalformations">Malformazioni rilevanti</label>
              <Field id="relevantMalformations" name="relevantMalformations" class="input" type="text"  />
              <ErrorMessage name="relevantMalformations" class="is-invalid" />
            </div>
          </div>
        </div>
      </FormStep>

      <!-- Dati sanitari del paziente 2 -->
      <FormStep>
        <h4>Dati sanitari del paziente</h4>
        <div class="row">
          <div class="col-6">
            <div class="input-field">
              <label for="adverseReactions">Reazioni avverse farmaci e alimenti</label>
              <Field id="adverseReactions" name="adverseReactions" class="input" type="text"  />
              <ErrorMessage name="adverseReactions" class="is-invalid" />
            </div>
          </div>
          <div class="col-6">
            <div class="input-field">
              <label for="skinAllergies">Allergie cutanee, respiratorie e sistemiche</label>
              <Field id="skinAllergies" name="skinAllergies" class="input" type="text"  />
              <ErrorMessage name="skinAllergies" class="is-invalid" />
            </div>
          </div>
          <div class="col-6">
            <div class="input-field">
              <label for="venomAllergies">Allergie a veleno di imenotteri</label>
              <Field id="venomAllergies" name="venomAllergies" class="input" type="text"  />
              <ErrorMessage name="venomAllergies" class="is-invalid" />
            </div>
          </div>
          <div class="col-6">
            <div class="input-field">
              <label for="prosthetics">Protesi/Impianti permanenti</label>
              <Field id="prosthetics" name="prosthetics" class="input" type="text"  />
              <ErrorMessage name="prosthetics" class="is-invalid" />
            </div>
          </div>
          <div class="col-12">
            <div class="input-field">
              <label for="aids">Ausili</label>
              <Field id="aids" name="aids" class="input" type="text"  />
              <ErrorMessage name="aids" class="is-invalid" />
            </div>
          </div>
        </div>
      </FormStep>

      <!-- Dati sanitari del paziente 3 -->
      <FormStep>
        <h4>Dati sanitari del paziente</h4>
        <div class="row">
          <div class="col-12">
            <div class="input-field">
              <label for="chronicPathologies">Patologie in atto paziente</label>
              <div class="row">
                <div class="col-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" @change="addPatology('Cardiache', actualPathologies)"  id="Cardiache">
                    <label class="form-check-label" for="Cardiache">
                      Cardiache
                    </label>
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" @change="addPatology('Ipertensione arteriosa', actualPathologies)"  id="Ipertensione">
                    <label class="form-check-label" for="Ipertensione">
                      Ipertensione arteriosa
                    </label>
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" @change="addPatology('Respiratorie', actualPathologies)"  id="Respiratorie">
                    <label class="form-check-label" for="Respiratorie">
                      Respiratorie
                    </label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" @change="addPatology('Oculari', actualPathologies)"  id="Oculari">
                    <label class="form-check-label" for="Oculari">
                      Oculari
                    </label>
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" @change="addPatology('Otorinolaingoriatiche', actualPathologies)"  id="Otorinolaingoriatiche">
                    <label class="form-check-label" for="Otorinolaingoriatiche">
                      Otorinolaingoriatiche
                    </label>
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" @change="addPatology('Gastroenteriche', actualPathologies)"  id="Gastroenteriche">
                    <label class="form-check-label" for="Gastroenteriche">
                      Gastroenteriche
                    </label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" @change="addPatology('Renali', actualPathologies)"  id="Renali">
                    <label class="form-check-label" for="Renali">
                      Renali
                    </label>
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" @change="addPatology('Genitali-urinarie', actualPathologies)"  id="Genitali-urinarie">
                    <label class="form-check-label" for="Genitali-urinarie">
                      Genitali-urinarie
                    </label>
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" @change="addPatology('Cutanee', actualPathologies)"  id="Cutanee">
                    <label class="form-check-label" for="Cutanee">
                      Cutanee
                    </label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" @change="addPatology('Muscolo-scheletriche', actualPathologies)"  id="Muscolo-scheletriche">
                    <label class="form-check-label" for="Muscolo-scheletriche">
                      Muscolo-scheletriche
                    </label>
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" @change="addPatology('Endocrino-metaboliche', actualPathologies)"  id="Endocrino-metaboliche">
                    <label class="form-check-label" for="Diabete">
                      Endocrino-metaboliche
                    </label>
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" @change="addPatology('Psichiatrico-comportamentale', actualPathologies)"  id="Psichiatrico-comportamentale">
                    <label class="form-check-label" for="Psichiatrico-comportamentale">
                      Psichiatrico-comportamentale
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <div class="input-field">
              <label for="chronicPharmacologicalTherapies">Terapie Farmacologiche Croniche</label>
              <Field id="chronicPharmacologicalTherapies" name="chronicPharmacologicalTherapies" class="input" type="text"  />
              <ErrorMessage name="chronicPharmacologicalTherapies" class="is-invalid" />
            </div>
          </div>
          <div class="col-6">
            <div class="input-field">
              <label for="othersPharmacologicalTherapies">Terapie Farmacologiche Altre</label>
              <Field id="othersPharmacologicalTherapies" name="othersPharmacologicalTherapies" class="input" type="text"  />
              <ErrorMessage name="othersPharmacologicalTherapies" class="is-invalid" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="input-field">
              <label for="vaccinations">Vaccinazioni</label>
              <Field id="vaccinations" name="vaccinations" class="input" type="text"  />
              <ErrorMessage name="vaccinations" class="is-invalid" />
            </div>
          </div>
        </div>
      </FormStep>

      <!-- Parametri di monitoraggio -->
      <FormStep>
        <h4>Parametri di monitoraggio</h4>
        <div class="row">
          <div class="col-3">
            <div class="input-field">
              <label for="height">Altezza</label>
              <Field id="height" name="height" class="input" type="text"  />
              <ErrorMessage name="height" class="is-invalid" />
            </div>
          </div>
          <div class="col-3">
            <div class="input-field">
              <label for="weight">Peso</label>
              <Field id="weight" name="weight" class="input" type="text"  />
              <ErrorMessage name="weight" class="is-invalid" />
            </div>
          </div>
          <div class="col-3">
            <div class="input-field">
              <label for="bmi">BMI</label>
              <Field id="bmi" name="bmi" class="input" type="text"  />
              <ErrorMessage name="bmi" class="is-invalid" />
            </div>
          </div>
          <div class="col-3">
            <div class="input-field">
              <label for="bloodPressure">Pressione Arteriosa</label>
              <Field id="bloodPressure" name="bloodPressure" class="input" type="text"  />
              <ErrorMessage name="bloodPressure" class="is-invalid" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <div class="input-field">
              <div class="d-flex gap-3 align-items-center">
                <label for="adi" class="mr-4">ADI</label>
                <div class="form-check">
                  <Field id="adi_si" name="adi" class="form-check-input"  type="radio" value="Si" />
                  <label class="form-check-label" for="adi_si">
                    Si
                  </label>
                </div>
                <div class="form-check">
                  <Field id="adi_no" name="adi" class="form-check-input" type="radio" value="No" />
                  <label class="form-check-label" for="adi_no">
                    No
                  </label>
                </div>
              </div>
              </div>
          </div>
          <div class="col-6">
            <div class="input-field">
              <div class="d-flex gap-3 align-items-center">
                <label for="adp" class="mr-4">ADP</label>
                <div class="form-check">
                  <Field id="adp_si" name="adp" class="form-check-input"  type="radio" value="Si" />
                  <label class="form-check-label" for="adp_si">
                    Si
                  </label>
                </div>
                <div class="form-check">
                  <Field id="adp_no" name="adp" class="form-check-input" type="radio" value="No" />
                  <label class="form-check-label" for="adp_no">
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FormStep>

      <!-- Anamnesi ed informazioni -->
      <FormStep>
        <h4>Anamnesi ed informazioni </h4>
        <div class="row">
          <div class="col-4">
            <div class="input-field">
              <label for="medicalHistory">Anamnesi Familiare</label>
              <Field id="medicalHistory" name="medicalHistory" class="input" type="text"  />
              <ErrorMessage name="medicalHistory" class="is-invalid" />
            </div>
          </div>
          <div class="col-4">
            <div class="input-field">
              <label for="riskFactors">Fattori di rischio</label>
              <Field id="riskFactors" name="riskFactors" class="input" type="text"  />
              <ErrorMessage name="riskFactors" class="is-invalid" />
            </div>
          </div>
          <div class="col-4">
            <div class="input-field">
              <label for="pregnancies">Gravidenze e parti</label>
              <Field id="pregnancies" name="pregnancies" class="input" type="text"  />
              <ErrorMessage name="pregnancies" class="is-invalid" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <div class="input-field">
              <div class="d-flex gap-3 align-items-center">
                <label for="organDonation" class="mr-4">Donazioni Organi</label>
                <div class="form-check">
                  <Field id="organDonation_si" name="organDonation" class="form-check-input"  type="radio" value="Si" />
                  <label class="form-check-label" for="organDonation_si">
                    Si
                  </label>
                </div>
                <div class="form-check">
                  <Field id="organDonation_no" name="organDonation" class="form-check-input" type="radio" value="No" />
                  <label class="form-check-label" for="organDonation_no">
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FormStep>

    </FormWizard>
  </div>
</template>

<style scoped lang="scss">
@import '../../../assets/form.scss';
.pss-form {
  padding: 20px;
  background: #9e9e9e17;
}
input,
select {
  margin: 10px 0;
  display: block;
}
.input {
  height: 20px;
}
.is-invalid {
  color: red;
}
.form-check {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
