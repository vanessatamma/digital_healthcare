<script setup>
import {useAuthStore} from "@/stores/auth";
import {useToast} from "vue-toast-notification";
const props = defineProps(['withIcon'])
const userAuth = useAuthStore()


const addNewPss = async () => {
  const patientInfo = await userAuth.checkPatientInfo()
  if(Boolean(patientInfo.firstName) && Boolean(patientInfo.lastName) && Boolean(patientInfo.dateOfBirth)) {
    userAuth.patient.isCreatingNewPss = true
  } else {
    useToast({position: 'top', duration: 5000}).warning("Salvare Nome, Cognome e Data di nascita del paziente per proseguire");
  }
}

</script>
<template>
  <button type="button" class="btn btn-outline-primary arrow-back" @click="addNewPss">
    Aggiungi PSS
    <svg v-if="props.withIcon" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-file-plus" viewBox="0 0 16 16">
      <path d="M8.5 6a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V10a.5.5 0 0 0 1 0V8.5H10a.5.5 0 0 0 0-1H8.5V6z"/>
      <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"/>
    </svg>
  </button>
</template>