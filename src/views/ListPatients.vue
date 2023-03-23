<script setup>

import Navbar from "@/components/shared/Navbar.vue";
import Patients from "@/components/auth/list-patients/Patients.vue";

</script>
<template>
  <main class="wrapper-page">
    <section class="section site-portfolio">
      <div class="container">
        <Navbar :arrow-back="true" />
        <br>
        <div class="card-wrapper">
          <div class="card card__new-patient">
            <Patients />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<style lang="scss" scoped>


.card {
  &__new-patient {
    border-radius: 10px;
    background: #fff;
    box-shadow: 5px 5px 10px 1px rgba(0, 0, 0, 0.2);
    padding: 1.5rem;
  }
}
</style>