<script setup>
import { Form, Field } from 'vee-validate';
import ItemText from "@/components/shared/ItemText.vue";
import {onMounted} from "vue";
import {useAuthStore} from "@/stores/auth";
import * as Yup from "yup";
const userAuth = useAuthStore()
onMounted(() => {
  userAuth.getPatientInfo();
});

const schemaPatient = Yup.object().shape({
  firstName: Yup.string()
      .required('Campo Obbligatorio.'),
  lastName: Yup.string()
      .required('Campo Obbligatorio.'),
});

async function onSubmit(values) {
  console.log('onSubmit patient info', values)
}

const updateForm = () => {
  userAuth.patient.isUpdating = true
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
            <Field name="lastName" type="text" class="input" id="lastName" :class="{ 'is-invalid': errors.lastName }" />
            <div class="invalid-feedback">{{errors.lastName}}</div>
          </div>
        </div>
        <div class="col-12">
          <div class="input-field">
            <label for="firstName">Nome</label>
            <Field name="firstName" type="text" class="input" id="firstName" :class="{ 'is-invalid': errors.firstName }" />
            <div class="invalid-feedback">{{errors.firstName}}</div>
          </div>
        </div>
        <div class="col-12">
          <ItemText title="Codice Fiscale" :value='"Giuseppe"' />
        </div>
        <div class="col-12">
          <ItemText title="Genere" :value='"Giuseppe"' />
        </div>
      </div>
      <div class="col-12 col-md-5">
        <div class="col-12">
          <ItemText title="Data di nascita" :value='"Giuseppe"' />
        </div>
        <div class="col-12">
          <ItemText title="Comune di nascita" :value='"Giuseppe"' />
        </div>
        <div class="col-12">
          <ItemText title="Domicilio" :value='"Giuseppe"' />
        </div>
        <div class="col-12">
          <ItemText title="Telefono" :value='"Giuseppe"' />
        </div>
        <div class="col-12">
          <ItemText title="Email" :value='"Giuseppe"' />
        </div>
        <div class="col-12">
          <ItemText title="PEC" :value='"Giuseppe"' />
        </div>
      </div>
      <div class="col-12 col-md-3">
        <h4 class="fw-semibold my-sm-2">Caregiver</h4>
        <div class="col-12">
          <ItemText title="Info" :value='"Giuseppe"' />
        </div>
        <div class="col-12">
          <ItemText title="Telefono" :value='"Giuseppe"' />
        </div>
      </div>
    </div>
    <hr>
    <div class="row d-flex justify-content-end">
      <div class="col-4" v-if="!userAuth.patient.isUpdating">
        <button type="reset" @click="updateForm" class="btn btn-primary mr-1 w-100">
          Modifica dati paziente
        </button>
      </div>
      <div class="col-4" v-else>
        <button type="submit" @click="saveForm" class="btn btn-primary mr-1 w-100">
          Salva
        </button>
      </div>
    </div>
  </Form>

  <!-- Info not updatable -->
  <div v-else>
    <div class="row">
      <div class="col-12 col-md-4">
        <div class="col-12">
          <!-- Lastname -->
          <ItemText title="Cognome" :value='"Giuseppe"' />
        </div>
        <div class="col-12">
          <ItemText title="Nome" :value='"Giuseppe"' />
        </div>
        <div class="col-12">
          <ItemText title="Codice Fiscale" :value='"Giuseppe"' />
        </div>
        <div class="col-12">
          <ItemText title="Genere" :value='"Giuseppe"' />
        </div>
      </div>
      <div class="col-12 col-md-5">
        <div class="col-12">
          <ItemText title="Data di nascita" :value='"Giuseppe"' />
        </div>
        <div class="col-12">
          <ItemText title="Comune di nascita" :value='"Giuseppe"' />
        </div>
        <div class="col-12">
          <ItemText title="Domicilio" :value='"Giuseppe"' />
        </div>
        <div class="col-12">
          <ItemText title="Telefono" :value='"Giuseppe"' />
        </div>
        <div class="col-12">
          <ItemText title="Email" :value='"Giuseppe"' />
        </div>
        <div class="col-12">
          <ItemText title="PEC" :value='"Giuseppe"' />
        </div>
      </div>
      <div class="col-12 col-md-3">
        <h4 class="fw-semibold my-sm-2">Caregiver</h4>
        <div class="col-12">
          <ItemText title="Info" :value='"Giuseppe"' />
        </div>
        <div class="col-12">
          <ItemText title="Telefono" :value='"Giuseppe"' />
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
</style>