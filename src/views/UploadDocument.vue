<script setup>

import Navbar from "@/components/shared/Navbar.vue";
import Upload from "@/components/auth/documents/Upload.vue";
</script>
<template>
  <main class="wrapper-page">
    <section class="section site-portfolio">
      <div class="container">
        <Navbar :arrow-back="true" />
        <br>
        <div class="card-wrapper">
          <div class="card card__new-patient">
            <Upload />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<style scoped lang="scss">
@import '../assets/form.scss';


.card {
  &__new-patient {
    border-radius: 10px;
    background: #fff;
    box-shadow: 5px 5px 10px 1px rgba(0, 0, 0, 0.2);
    padding: 1.5rem;
  }
}

</style>