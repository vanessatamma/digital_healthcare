<script setup lang="ts">
import {initialPssState, useAuthStore} from "@/stores/auth";
import PssForm from "@/components/auth/pss/PssForm.vue";
import {ref} from "vue";
import ButtonAddNewPss from "@/components/auth/pss/ButtonAddNewPss.vue";
import PssInfo from "@/components/auth/pss/PssInfo.vue";
const userAuth = useAuthStore()
const selectedDate = ref();
const selectedPssId = ref();

const onChangePss = (event: any) => {
  // use id to get the specific Pss
  if(event.target.value === '-') {
    selectedPssId.value = null;
    userAuth.patient.currentPss = initialPssState;
  } else {
    selectedPssId.value = event.target.value;
    userAuth.patient.currentPss = userAuth.patient.pssList.find(pss => (pss as any).id === event.target.value)!;
  }
}

</script>
<template>
  <div v-if="!userAuth.patient.isUpdatingCurrentPss">
    <hr class="my-4">
    <h2 class="mb-3" v-if="!userAuth.patient.isCreatingNewPss">Lista dei PSS disponibili</h2>
  </div>

  <div>
    <div v-if="userAuth.patient.pssList.length === 0" class="add-new-pss">
      <strong>Nessun PSS trovato.</strong>

      <ButtonAddNewPss :with-icon="true"/>
    </div>
    <!-- PSS LIST -->
    <div class="row my-4" v-if="userAuth.patient.pssList.length > 0 && !userAuth.patient.isCreatingNewPss && !userAuth.patient.isUpdatingCurrentPss">
      <div class="col-3 col-sm-2 d-flex align-items-center">
        <strong>Dati del: </strong>
      </div>
      <div class="col-9 col-sm-6">
        <select class="form-select" v-model="selectedDate" @change="onChangePss($event)">
          <option :value="'-'">Seleziona una data</option>
          <option
              v-for="(pss, index) in userAuth.pssDateList"
              :key="pss.id"
              :value="pss.id"
          >
            {{ pss.date }}
          </option>
        </select>
      </div>
      <div class="col-12 col-sm-4 mt-4 mt-sm-0 text-center">
        <ButtonAddNewPss class="w-100" :with-icon="false"/>
      </div>
    </div>

    <div class="row" v-if="userAuth.patient.pssList.length > 0 && Boolean(selectedPssId) && !userAuth.patient.isCreatingNewPss">
     <PssInfo />
    </div>

    <!-- ADD NEW PSS -->
    <PssForm v-if="userAuth.patient.isCreatingNewPss" />

  </div>

</template>
<style scoped lang="scss">
.add-new-pss {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>