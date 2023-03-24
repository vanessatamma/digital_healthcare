<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {useAuthStore} from "@/stores/auth";

const file = ref<File | null>();
const form = ref<HTMLFormElement>();
const isLoading = ref(false);
const selectedPatient = ref();
const userAuth = useAuthStore()

onMounted(() => {
  isLoading.value = true;
  userAuth.getPatientsList();
  isLoading.value = false;
});

function onFileChanged($event: Event) {
  const target = $event.target as HTMLInputElement;
  if (target && target.files) {
    file.value = target.files[0];
  }
}
const saveFile = async () => {
  await userAuth.uploadDoc(file.value, selectedPatient.value);
  selectedPatient.value = null;
  file.value = null;
}
const hasMetaInfo = (patient: any) => {
  if(patient.firstName && patient.lastName) return `- ${patient.lastName} ${patient.firstName}`
}
const onSelectPatient= (event: any) => {
  // use id to get the specific Pss
  if(event.target.value === '-') {
    selectedPatient.value = null;
  } else {
    selectedPatient.value = event.target.value;
  }
}

watch(selectedPatient, (selection, prevSelection) => {
    userAuth.getDocByCf(selection);
})

</script>
<template>
  <div class="row">
    <div class="col-12 col-sm-12" v-if="!isLoading">
      <label for="formFile" class="form-label">
        Seleziona il <strong>Codice Fiscale</strong>
        del paziente di cui vorresti caricare un referto
        o visualizzare quelli precedentementi caricati
      </label>
      <select
          v-model="selectedPatient"
          class="form-select form-select-sm mb-3"
          aria-label=".form-select-lg example"
          @change="onSelectPatient($event)">
        <option :value="'-'" selected>Lista Pazienti</option>
        <option
            v-for="(cf, index) in userAuth.patientsList.patientsCF"
            :key="index"
            :value="cf"
        >
          {{ cf.toUpperCase() }} {{hasMetaInfo(userAuth.patientsList.items[index])}}
        </option>
      </select>
    </div>
    <div class="col-12 col-sm-12" v-else>
      <h3>Caricamento lista pazienti in corso</h3>
    </div>
  </div>
  <br>
  <div class="row" v-if="selectedPatient">
    <div class="col-12 col-sm-12">
      <div class="mb-3">
        <label for="formFile" class="form-label">Carica il documento in formato <strong>DOC</strong> o <strong>PDF</strong></label>
        <input
            class="form-control"
            type="file"
            id="formFile"
            accept=".doc, .docx, .pdf"
            @change="onFileChanged($event)"
        >
      </div>
    </div>
  </div>
  <div class="row text-center mt-3" v-if="file">
    <div class="col-12 col-sm-12">
      <button type="button" class="btn btn-outline-primary" @click="saveFile">
        Salva Referto
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-cloud-upload" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/>
          <path fill-rule="evenodd" d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z"/>
        </svg>
      </button>
    </div>
  </div>
  <hr class="my-5">
  <div class="row" v-if="selectedPatient">
    <div class="col-12 col-sm-12">
     <h4>Lista Referti Paziente: {{ selectedPatient }}</h4>
      <div v-if="userAuth.patientDocList.length > 0" v-for="doc in userAuth.patientDocList">
        <span>
          Doc: {{ doc.name}}
        </span>
      </div>
      <div v-else class="col-12 col-sm-12 mt-4">
        <span>Nessun Documento trovato.</span>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">

</style>