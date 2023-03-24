<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useAuthStore} from "@/stores/auth";

const file = ref<File | null>();
const form = ref<HTMLFormElement>();
const isLoading = ref(false);
const selectedPatient = ref(null);
function onFileChanged($event: Event) {
  const target = $event.target as HTMLInputElement;
  if (target && target.files) {
    file.value = target.files[0];
  }
}

async function saveImage() {
  if (file.value) {
    try {
      // save file.value
    } catch (error) {
      console.error(error);
      form.value?.reset();
      file.value = null;
    } finally {
    }
  }
}



const userAuth = useAuthStore()
onMounted(() => {
  isLoading.value = true;
  userAuth.getPatientsList();
  isLoading.value = false;
});

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

</script>
<template>
  <div class="row">
    <div class="col-12 col-sm-12" v-if="!isLoading">
      <label for="formFile" class="form-label">
        Seleziona il <strong>Codice Fiscale</strong>
        del paziente per cui stai caricando il documento
      </label>
      <select class="form-select form-select-sm mb-3" aria-label=".form-select-lg example" @change="onSelectPatient($event)">
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
        <label for="formFile" class="form-label">Carica il documento ini formato <strong>DOC</strong> o  <strong>PDF</strong></label>
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
</template>
<style scoped lang="scss">

</style>