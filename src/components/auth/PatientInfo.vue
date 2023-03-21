<script setup>
import { Form, Field } from 'vee-validate';
import ItemText from "@/components/shared/ItemText.vue";
import {onMounted, ref} from "vue";
import {useAuthStore} from "@/stores/auth";
import * as Yup from "yup";
const userAuth = useAuthStore()
onMounted(() => {
  userAuth.getPatientInfo();
});
const date = ref();
const schemaPatient = Yup.object().shape({
  firstName: Yup.string()
      .required('Campo Obbligatorio.'),
  lastName: Yup.string()
      .required('Campo Obbligatorio.'),
  domicile: Yup.string()
      .required('Campo Obbligatorio.'),
  cityOfBirth: Yup.string()
      .required('Campo Obbligatorio.'),
  phone: Yup.string()
      .required('Campo Obbligatorio.')
      .trim()
      .matches(/^(([+])39)?((3[1-6][0-9]))(\d{7})$/, 'Formato numero non corretto.'),
  cf: Yup.string()
      .uppercase()
      .required('Campo Obbligatorio.')
      .matches(/^([A-Z]{6}[0-9LMNPQRSTUV]{2}[ABCDEHLMPRST]{1}[0-9LMNPQRSTUV]{2}[A-Z]{1}[0-9LMNPQRSTUV]{3}[A-Z]{1})$|([0-9]{11})$/, 'Formato codice fiscale non valido.'),
  genre: Yup.string(),
      //.required('Campo Obbligatorio.'),
  email: Yup.string()
      .required('Campo Obbligatorio.')
      .email('Formato email non valido.'),
  pec: Yup.string()
      .matches(/(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:\w*.?pec(?:.?\w+)*)/g,'Formato PEC non valido.'),
  infoCaregiver: Yup.string(),
  phoneCaregiver: Yup.string()
      .trim()
      .matches(/^(([+])39)?((3[1-6][0-9]))(\d{7})$/, 'Formato numero non corretto.'),
});

async function onSubmit(values) {
  await userAuth.setPatientInfo({
    ...values,
    dateOfBirth: date.value.toLocaleString().substring(0, 9)
  })
}

const updateForm = () => {
  userAuth.patient.isUpdating = !userAuth.patient.isUpdating;
}

const saveForm = () => {

}

</script>
<template>
  <h2 class="mb-3">Dati anagrafici Paziente</h2>

  <!-- Form  -->
  <Form :ref="'form'" @submit="onSubmit" :validation-schema="schemaPatient" v-slot="{ errors }" v-if="userAuth.patient.isUpdating">
    <div class="row">
      <div class="col-12 col-md-4">
        <div class="col-12">
          <!-- Lastname -->
          <div class="input-field">
            <label for="lastName">Cognome</label>
            <Field
                name="lastName"
                type="text"
                class="input"
                id="lastName"
                :class="{ 'is-invalid': errors.lastName }"
                v-model="userAuth.patient.info.lastName"
            />
            <div class="invalid-feedback">{{errors.lastName}}</div>
          </div>
        </div>
        <div class="col-12">
          <div class="input-field">
            <label for="firstName">Nome</label>
            <Field
                v-model="userAuth.patient.info.firstName"
                name="firstName" type="text" class="input" id="firstName" :class="{ 'is-invalid': errors.firstName }" />
            <div class="invalid-feedback">{{errors.firstName}}</div>
          </div>
        </div>
        <div class="col-12">
          <div class="input-field">
            <label for="cf">Codice Fiscale</label>
            <Field
                v-model="userAuth.patient.info.cf"
                name="cf"
                type="text"
                class="input"
                id="cf"
                :class="{ 'is-invalid': errors.cf }"
            />
            <div class="invalid-feedback">{{errors.cf}}</div>
          </div>

        </div>
        <div class="col-12">
          <label class="mb-1" for="genre">Genere</label>
          <Field
              v-model="userAuth.patient.info.genre"
              id="genre" name="genre" as="select" class="input" :class="{ 'is-invalid': errors.genre }">
            <option value="Non Specificato">Non specificato</option>
            <option value="Maschio">Maschio</option>
            <option value="Femmina">Femmina</option>
          </Field>
        </div>
      </div>
      <div class="col-12 col-md-5">
        <div class="col-12 mb-3" >
          <label class="mb-1" for="genre">Data di nascita</label>
          <VueDatePicker
              :format="'dd/MM/yyyy'"
              :enable-time-picker="false"
              locale="it"
              :placeholder="userAuth.patient.info.dateOfBirth"
              v-model="date"
          />
        </div>
        <div class="col-12">
          <div class="input-field">
            <label class="mb-1" for="cityOfBirth">Comune di nascita</label>
            <Field v-model="userAuth.patient.info.cityOfBirth" name="cityOfBirth" type="text" class="input" id="cityOfBirth" :class="{ 'is-invalid': errors.cityOfBirth }" />
            <div class="invalid-feedback">{{errors.cityOfBirth}}</div>
          </div>
        </div>
        <div class="col-12">
          <div class="input-field">
            <label class="mb-1" for="domicile">Domicilio</label>
            <Field v-model="userAuth.patient.info.domicile" name="domicile" type="text" class="input" id="domicile" :class="{ 'is-invalid': errors.domicile }" />
            <div class="invalid-feedback">{{errors.domicile}}</div>
          </div>
        </div>
        <div class="col-12">
          <div class="input-field">
            <label class="mb-1" for="phone">Telefono</label>
            <Field v-model="userAuth.patient.info.phone" name="phone" type="text" class="input" id="phone" :class="{ 'is-invalid': errors.phone }" />
            <div class="invalid-feedback">{{errors.phone}}</div>
          </div>
        </div>
        <div class="col-12">
          <div class="input-field">
            <label class="mb-1" for="email">Email</label>
            <Field v-model="userAuth.patient.info.email" name="email" type="text" class="input" id="email" :class="{ 'is-invalid': errors.email }" />
            <div class="invalid-feedback">{{errors.email}}</div>
          </div>
        </div>
        <div class="col-12">
          <div class="input-field">
            <label class="mb-1" for="pec">PEC</label>
            <Field v-model="userAuth.patient.info.pec" name="pec" type="text" class="input" id="email" :class="{ 'is-invalid': errors.pec }" />
            <div class="invalid-feedback">{{errors.pec}}</div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-3">
        <h4 class="fw-semibold my-sm-2">Caregiver</h4>
        <div class="col-12">
          <div class="input-field">
            <label class="mb-1" for="infoCaregiver">INFO</label>
            <Field v-model="userAuth.patient.info.infoCaregiver" name="infoCaregiver" type="text" class="input" id="infoCaregiver" :class="{ 'is-invalid': errors.infoCaregiver }" />
            <div class="invalid-feedback">{{errors.infoCaregiver}}</div>
          </div>
        </div>
        <div class="col-12">
          <div class="input-field">
            <label class="mb-1" for="phoneCaregiver">Telefono</label>
            <Field v-model="userAuth.patient.info.phoneCaregiver" name="phoneCaregiver" type="text" class="input" id="phoneCaregiver" :class="{ 'is-invalid': errors.phoneCaregiver }" />
            <div class="invalid-feedback">{{errors.phoneCaregiver}}</div>
          </div>
        </div>
      </div>
    </div>
    <hr class="my-4">
    <div class="row">
      <div class="col-4" v-if="!userAuth.patient.isUpdating">
        <button type="reset" @click="updateForm" class="btn btn-primary mr-1 w-100">
          Modifica dati paziente
        </button>
      </div>
      <div class="d-flex justify-content-end gap-2" v-else>
        <div class="col-4" >
          <button type="reset" @click="updateForm" class="btn btn-warning mr-1 w-100">
            Annulla
          </button>
        </div>
        <div class="col-4" >
          <button type="submit" @click="saveForm" class="btn btn-outline-primary mr-1 w-100">
            Salva
          </button>
        </div>
      </div>

    </div>
  </Form>

  <!-- Info not updatable -->
  <div v-else>
    <div class="row">
      <div class="col-12 col-md-4">
        <div class="col-12">
          <!-- Lastname -->
          <ItemText title="Cognome" :value='userAuth.patient.info.lastName' />
        </div>
        <div class="col-12">
          <ItemText title="Nome" :value='userAuth.patient.info.firstName'  />
        </div>
        <div class="col-12">
          <ItemText title="Codice Fiscale" :value='userAuth.patient.info.cf.toUpperCase()' />
        </div>
        <div class="col-12">
          <ItemText title="Genere" :value='userAuth.patient.info.genre'  />
        </div>
      </div>
      <div class="col-12 col-md-5">
        <div class="col-12">
          <ItemText title="Data di nascita" :value='userAuth.patient.info.dateOfBirth' />
        </div>
        <div class="col-12">
          <ItemText title="Comune di nascita" :value='userAuth.patient.info.cityOfBirth' />
        </div>
        <div class="col-12">
          <ItemText title="Domicilio" :value='userAuth.patient.info.domicile' />
        </div>
        <div class="col-12">
          <ItemText title="Telefono" :value='userAuth.patient.info.phone' />
        </div>
        <div class="col-12">
          <ItemText title="Email" :value='userAuth.patient.info.email' />
        </div>
        <div class="col-12">
          <ItemText title="PEC" :value='userAuth.patient.info.pec' />
        </div>
      </div>
      <div class="col-12 col-md-3">
        <h4 class="fw-semibold my-sm-2">Caregiver</h4>
        <div class="col-12">
          <ItemText title="Info" :value='userAuth.patient.info.infoCaregiver' />
        </div>
        <div class="col-12">
          <ItemText title="Telefono" :value='userAuth.patient.info.phoneCaregiver'  />
        </div>
      </div>
    </div>
  </div>
  <hr v-if="!userAuth.patient.isUpdating" >
  <div v-if="!userAuth.patient.isUpdating" class="row d-flex justify-content-end">
    <div class="col-4" v-if="!userAuth.patient.isUpdating">
      <button @click="updateForm" class="btn btn-primary mr-1 w-100">
        Modifica dati paziente
      </button>
    </div>
    <div class="col-4" v-else>
      <button @click="saveForm" class="btn btn-primary mr-1 w-100">
        Salva
      </button>
    </div>
  </div >

</template>
<style lang="scss" scoped>
@import '../../assets/form.scss';
.row {
  margin-bottom: 10px;
}
.input {
  height: 25px;
}
.input-field {
  padding: 0;
}
</style>