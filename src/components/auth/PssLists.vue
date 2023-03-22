<script setup lang="ts">
import {useAuthStore} from "@/stores/auth";
import PssForm from "@/components/auth/pss/PssForm.vue";
import {ref} from "vue";
import ButtonAddNewPss from "@/components/auth/pss/ButtonAddNewPss.vue";
const userAuth = useAuthStore()
const date = ref();

/*

le date del ropdworn sono quelle dei pss


  <DataTable
      :headers="headers"
      :items="items"
      :hide-footer="true"
  />

  <div class="accordion" id="accordionFlushExample">
      <div class="accordion-item">
        <h2 class="accordion-header" id="flush-headingOne">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
            Accordion Item #1
          </button>
        </h2>
        <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
        </div>
      </div>
    </div>
 */
</script>
<template>
  <h2 class="mb-3">Lista dei PSS disponibili</h2>
  <div>
    <div v-if="userAuth.patient.pssList.length === 0" class="add-new-pss">
      <strong>Nessun PSS trovato.</strong>

      <ButtonAddNewPss :with-icon="true"/>
    </div>

    <hr class="my-4">
    <!-- PSS LIST -->
    <div class="row my-4">
      <div class="col-3 col-sm-2 d-flex align-items-center">
        <strong>Dati del: </strong>
      </div>
      <div class="col-9 col-sm-6">
        <VueDatePicker
            :format="'dd/MM/yyyy'"
            :enable-time-picker="false"
            locale="it"
            v-model="date"
        />
      </div>
      <div class="col-12 col-sm-4 mt-4 mt-sm-0 text-center">
        <ButtonAddNewPss class="w-100" :with-icon="false"/>
      </div>
    </div>
    data {{ date }} {{ userAuth.pssDateList }}

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