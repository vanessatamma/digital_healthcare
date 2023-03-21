<script setup lang="ts">
import type { Header, Item } from "vue3-easy-data-table";
import {useAuthStore} from "@/stores/auth";
import PssForm from "@/components/auth/pss/PssForm.vue";
const userAuth = useAuthStore()
const headers: Header[] = [
  { text: "PLAYER", value: "player" },
  { text: "TEAM", value: "team"},
  { text: "NUMBER", value: "number"},
  { text: "POSITION", value: "position"},
  { text: "HEIGHT", value: "indicator.height"},
  { text: "WEIGHT (lbs)", value: "indicator.weight", sortable: true},
  { text: "LAST ATTENDED", value: "lastAttended", width: 200},
  { text: "COUNTRY", value: "country"},
];

const items: Item[] = [
  { player: "Stephen Curry", team: "GSW", number: 30, position: 'G', indicator: {"height": '6-2', "weight": 185}, lastAttended: "Davidson", country: "USA"},
  { player: "Lebron James", team: "LAL", number: 6, position: 'F', indicator: {"height": '6-9', "weight": 250}, lastAttended: "St. Vincent-St. Mary HS (OH)", country: "USA"},
  { player: "Kevin Durant", team: "BKN", number: 7, position: 'F', indicator: {"height": '6-10', "weight": 240}, lastAttended: "Texas-Austin", country: "USA"},
  { player: "Giannis Antetokounmpo", team: "MIL", number: 34, position: 'F', indicator: {"height": '6-11', "weight": 242}, lastAttended: "Filathlitikos", country: "Greece"},
];

/*
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
  <div v-if="userAuth.patient.pssList.length === 0">
    <div class="add-new-pss">
      <strong>Nessun PSS trovato.</strong>

      <button type="button" class="btn btn-outline-primary arrow-back" @click="userAuth.addNewPss">
        Aggiungi PSS
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-file-plus" viewBox="0 0 16 16">
          <path d="M8.5 6a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V10a.5.5 0 0 0 1 0V8.5H10a.5.5 0 0 0 0-1H8.5V6z"/>
          <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"/>
        </svg>
      </button>
    </div>

    <hr class="my-4">
    <!-- PSS LIST -->

    <!-- ADD NEW PSS -->
    <PssForm v-if="userAuth.patient.isCreatingNewPss" />

  </div>
  <div v-else>
    <div class="my-4"><strong>Dati del: </strong>inserire dropdown date</div>
  </div>
</template>
<style scoped lang="scss">
.add-new-pss {
  display: flex;
  justify-content: space-between;
  align-items: center;

}
</style>