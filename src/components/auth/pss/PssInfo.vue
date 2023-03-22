<script setup>
import ItemText from "@/components/shared/ItemText.vue";
import {useAuthStore} from "@/stores/auth";
import {ref} from "vue";
import PssForm from "@/components/auth/pss/PssForm.vue";
const userAuth = useAuthStore()



</script>

<template>
  <div v-if="!userAuth.patient.isUpdatingCurrentPss">
    <div class="accordion" id="accordionExample">
      <!-- Dati sanitari del paziente -->
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            Dati del medico
          </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <div class="row">
              <div class="col-12 col-sm-6">
                <div class="col-12">
                  <!-- Lastname -->
                  <ItemText title="Cognome" :value='userAuth.patient.currentPss.lastName' />
                </div>
                <div class="col-12">
                  <!-- firstname -->
                  <ItemText title="Nome" :value='userAuth.patient.currentPss.firstName'  />
                </div>
                <!-- cf -->
                <div class="col-12">
                  <ItemText title="Codice Fiscale" :value='userAuth.patient.currentPss.cf.toUpperCase()' />
                </div>
                <!-- phone -->
                <div class="col-12">
                  <ItemText title="Recapito Telefonico" :value='userAuth.patient.currentPss.phone' />
                </div>
              </div>
              <div class="col-12 col-sm-6">
                <div class="col-12">
                  <!-- email -->
                  <div class="col-12">
                    <ItemText title="Email" :value='userAuth.patient.currentPss.email' />
                  </div>
                  <!-- email -->
                  <div class="col-12">
                    <ItemText title="Pec" :value='userAuth.patient.currentPss.pec' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingTwo">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            Dati sanitari del paziente
          </button>
        </h2>
        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <div class="row">
              <div class="col-12 col-sm-12">
                <div class="col-12">
                  <!-- Capacità Motoria Paziente -->
                  <ItemText title="Capacità Motoria Paziente" :value='userAuth.patient.currentPss.motorSkills' />
                </div>
                <div class="col-12">
                  <!-- Attività Lavorativa -->
                  <ItemText title="Attività Lavorativa" :value='userAuth.patient.currentPss.workingActivity'  />
                </div>
                <!-- Patologie Croniche Rilevanti -->
                <div class="col-12">
                  <span class="title fw-bold">Patologie Croniche Rilevanti: </span>
                  <span class="content" v-for="(value, index) in userAuth.patient.currentPss.chronicPathologies" :key="index">
                  {{ value }}<span v-if="index !== Object.keys(userAuth.patient.currentPss.chronicPathologies).length - 1">, </span>
                </span>
                </div>
                <!-- Organi Mancanti -->
                <div class="col-12">
                  <ItemText title="Organi Mancanti" :value='userAuth.patient.currentPss.missingOrgans'  />
                </div>
                <!-- Trapianti -->
                <div class="col-12">
                  <ItemText title="Trapianti" :value='userAuth.patient.currentPss.transplants'  />
                </div>
                <!-- Malformazioni rilevanti -->
                <div class="col-12">
                  <ItemText title="Malformazioni rilevanti" :value='userAuth.patient.currentPss.relevantMalformations'  />
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-12 col-sm-12">
                <div class="col-12">
                  <!-- Reazioni avverse farmaci e alimenti -->
                  <ItemText
                      title="Reazioni avverse farmaci e alimenti"
                      :value='userAuth.patient.currentPss.adverseReactions'
                  />
                </div>
                <div class="col-12">
                  <!-- Allergie cutanee, respiratorie e sistemiche -->
                  <ItemText
                      title="Allergie cutanee, respiratorie e sistemiche"
                      :value='userAuth.patient.currentPss.skinAllergies'
                  />
                </div>
                <div class="col-12">
                  <!-- Allergie a veleno di imenotteri -->
                  <ItemText
                      title="Allergie a veleno di imenotteri"
                      :value='userAuth.patient.currentPss.venomAllergies'
                  />
                </div>
                <div class="col-12">
                  <!-- Protesi/Impianti permanenti -->
                  <ItemText
                      title="Protesi/Impianti permanenti"
                      :value='userAuth.patient.currentPss.prosthetics'
                  />
                </div>
                <div class="col-12">
                  <!-- Ausili -->
                  <ItemText
                      title="Ausili"
                      :value='userAuth.patient.currentPss.aids'
                  />
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-12 col-sm-12">
                <div class="col-12">
                  <!-- Patologie in atto paziente -->
                  <span class="title fw-bold">Patologie in atto paziente: </span>
                  <span class="content" v-for="(value, index) in userAuth.patient.currentPss.actualPathologies" :key="index">
                  {{ value }}<span v-if="index !== Object.keys(userAuth.patient.currentPss.actualPathologies).length - 1">, </span>
                </span>
                </div>
                <div class="col-12">
                  <!-- Terapie Farmacologiche Croniche -->
                  <ItemText
                      title="Terapie Farmacologiche Croniche"
                      :value='userAuth.patient.currentPss.chronicPharmacologicalTherapies'
                  />
                </div>
                <div class="col-12">
                  <!-- Terapie Farmacologiche Altre -->
                  <ItemText
                      title="Terapie Farmacologiche Altre"
                      :value='userAuth.patient.currentPss.othersPharmacologicalTherapies'
                  />
                </div>
                <div class="col-12">
                  <!-- Vaccinazioni -->
                  <ItemText
                      title="Vaccinazioni"
                      :value='userAuth.patient.currentPss.vaccinations'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingThree">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            Parametri di monitoraggio
          </button>
        </h2>
        <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <div class="row">
              <div class="col-12 col-sm-12">
                <div class="col-12">
                  <!-- Altezza -->
                  <ItemText title="Altezza" :value='userAuth.patient.currentPss.height' />
                </div>
                <div class="col-12">
                  <!-- Peso -->
                  <ItemText title="Peso" :value='userAuth.patient.currentPss.weight' />
                </div>
                <div class="col-12">
                  <!-- BMI -->
                  <ItemText title="BMI" :value='userAuth.patient.currentPss.bmi' />
                </div>
                <div class="col-12">
                  <!-- Pressione Arteriosa -->
                  <ItemText title="Pressione Arteriosa" :value='userAuth.patient.currentPss.bloodPressure' />
                </div>
                <div class="col-12">
                  <!-- ADI -->
                  <ItemText title="ADI" :value='userAuth.patient.currentPss.adi' />
                </div>
                <div class="col-12">
                  <!-- ADP -->
                  <ItemText title="ADP" :value='userAuth.patient.currentPss.adp' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingFour">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
            Anamnesi ed informazioni
          </button>
        </h2>
        <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <div class="row">
              <div class="col-12 col-sm-6">
                <div class="col-12">
                  <!-- Anamnesi Familiare -->
                  <ItemText title="Anamnesi Familiare" :value='userAuth.patient.currentPss.medicalHistory' />
                </div>
                <div class="col-12">
                  <!-- Fattori di rischio -->
                  <ItemText title="Fattori di rischio" :value='userAuth.patient.currentPss.riskFactors' />
                </div>
                <div class="col-12">
                  <!-- Gravidenze e parti -->
                  <ItemText title="Gravidenze e parti" :value='userAuth.patient.currentPss.pregnancies' />
                </div>
                <div class="col-12">
                  <!-- Donazioni Organi -->
                  <ItemText title="Donazioni Organi" :value='userAuth.patient.currentPss.organDonation' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row my-3 pss-actions text-center">
      <div class="col-6">
        <button type="button" class="btn btn-outline-success arrow-back w-100" @click="userAuth.downloadPdf">
          Scarica PSS
        </button>
      </div>
      <div class="col-6">
        <button type="button" class="btn btn-outline-primary arrow-back w-100" @click="userAuth.patient.isUpdatingCurrentPss = true">
          Modifica PSS selezionato
        </button>
      </div>
    </div>
  </div>

  <!-- Modifica PSS corrente -->
  <div class="row my-3 pss-actions" v-if="userAuth.patient.isUpdatingCurrentPss">

    <PssForm :model="JSON.parse(JSON.stringify(userAuth.patient.currentPss))" />

    <!-- Actions -->
    <div class="row my-5">
      <div class="col-12">
        <div class="btn btn-outline-warning  w-100"  @click="userAuth.patient.isUpdatingCurrentPss = false">
          Annulla Creazione
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.title {
  text-transform: uppercase;
  font-size: 14px;
}
.item-text {
  font-size: 14px;
}
.pss-actions {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}
</style>