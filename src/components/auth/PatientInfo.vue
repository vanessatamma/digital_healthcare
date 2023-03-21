<script setup>

import ItemText from "@/components/shared/ItemText.vue";
</script>
<template>
  <h2 class="mb-3">Dati anagrafici Paziente</h2>
  <div class="row">
    <div class="col-12 col-md-4">
      <div class="col-12">
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

</template>
<style lang="scss" scoped>
.row {
  margin-bottom: 10px;
}
</style>