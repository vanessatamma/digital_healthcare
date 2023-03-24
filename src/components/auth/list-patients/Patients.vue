<script setup lang="ts">
import type {ClickRowArgument, Header, Item} from "vue3-easy-data-table";
import {ref} from "vue";
import {onMounted} from "vue";
import {useAuthStore} from "@/stores/auth";
import { useRouter } from 'vue-router';

const router = useRouter()

const headers: Header[] = [
  { text: "NOME", value: "firstName" },
  { text: "COGNOME", value: "lastName"},
  { text: "CODICE FISCALE", value: "cf"},
  { text: "COMUNE DI NASCITA", value: "cityOfBirth"},
  { text: "COMUNE DI DOMICILIO", value: "domicile"},
  { text: "TELEFONO", value: "phone",},
  { text: "EMAIL", value: "email", },
  { text: "PEC", value: "pec"},
  { text: "INFO CAREGIVER", value: "infoCaregiver"},
  { text: "TELEFONO CAREGIVER", value: "phoneCaregiver"},
];



const searchValue = ref("");
const isLoading = ref(false);

const userAuth = useAuthStore()
onMounted(() => {
  isLoading.value = true;
  userAuth.getPatientsList();
  isLoading.value = false;
});

const showRow = (item: ClickRowArgument) => {
  console.log( item);
  userAuth.patient.isCreating = true;
  userAuth.patient.cf = item.cf.toUpperCase();
  router.push('/add-new-patient');
};

/*
mostro lista dei pazienti con alcune informazioni e poi al click
setto nello store il loro cf
e vado nella pagina dettaglio che ha gli stessi componenti di add-new-patient


 */
</script>
<template>
  <div class="row mb-5">
    <div class="input-field">
      <input type="text" class="input" id="value" v-model="searchValue" placeholder="..."/>
      <label class="label-search" for="value">Cerca un paziente</label>
    </div>
  </div>
  <div class="row" v-if="!isLoading">
    <DataTable
        :headers="headers"
        :items="userAuth.patientsList.items"
        :hide-footer="true"
        :search-value="searchValue"
        @click-row="showRow"
    >
      <template #empty-message>
        <span >Nessun dato presente.</span>
      </template>

    </DataTable>
  </div>
  <div class="row" v-else>
    <h3>Caricamento Pazienti in corso...</h3>
  </div>
</template>

<style scoped lang="scss">
@import '../../../assets/form.scss';
.label-search {
  font-size: 20px!important;
  margin-top: 10px;
}
</style>