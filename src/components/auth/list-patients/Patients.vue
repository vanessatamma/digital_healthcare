<script setup lang="ts">


import type {Header, Item} from "vue3-easy-data-table";
import {ref} from "vue";
import {onMounted} from "vue";
import {useAuthStore} from "@/stores/auth";


const headers: Header[] = [
  { text: "NOME", value: "firstName" },
  { text: "COGNOME", value: "lastName"},
  { text: "CODICE FISCALE", value: "cf"},
  { text: "COMUNE DI NASCITA", value: "cityOfBirth"},
  { text: "COMUNE DI DOMICILIO", value: "domicile"},
  { text: "PHONE", value: "phone",},
  { text: "EMAIL", value: "email", },
  { text: "PEC", value: "pec"},
];

const items: Item[] = [
  { firstName: "Stephen Curry", lastName: "GSW", number: 30, position: 'G', indicator: {"height": '6-2', "weight": 185}, lastAttended: "Davidson", country: "USA"},
];

const searchValue = ref("");
const isLoading = ref(false);

const userAuth = useAuthStore()
onMounted(() => {
  isLoading.value = true;
  userAuth.getPatientsList();
  isLoading.value = false;
});


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
        :headers="userAuth.patientsList.headers"
        :items="userAuth.patientsList.items"
        :hide-footer="true"
        :search-value="searchValue"
    />
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