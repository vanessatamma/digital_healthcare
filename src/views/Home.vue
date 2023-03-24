<script setup lang="ts">
import Navbar from "@/components/shared/Navbar.vue";

</script>

<template>
  <main class="wrapper-page">
    <section class="section site-portfolio">
      <div class="container">
        <Navbar />
        <br>
        <div id="portfolio-grid" class="row no-gutter" data-aos="fade-up" data-aos-delay="200">
          <span class="title-box">Lista Pazienti</span>
          <div @click="$router.push('/list-patients')"  class="item web col-sm-6 col-md-6 col-lg-6 mb-4">
            <div class="item-wrap fancybox">
              <div class="work-info">
                <h3>Lista Pazienti</h3>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-card-list" viewBox="0 0 16 16">
                    <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                    <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
                  </svg>
                </span>
              </div>
              <img class="img-fluid" src="../assets/lists.jpg">
            </div>
          </div>
          <span class="title-box">Aggiungi Paziente</span>
          <div  @click="$router.push('/add-new-patient')" class="item photography col-sm-6 col-md-6 col-lg-6 mb-4">
            <div class="item-wrap fancybox">
              <div class="work-info">
                <h3>Aggiungi Paziente</h3>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-add" viewBox="0 0 16 16">
                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
                    <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z"/>
                  </svg>
                </span>
              </div>
              <img class="img-fluid" src="../assets/add.jpg">
            </div>
          </div>
          <span class="title-box">Lista Referti / Carica Referto</span>
          <div @click="$router.push('/upload-document')"  class="item photography col-sm-6 col-md-6 col-lg-6 mb-4">
            <div class="item-wrap fancybox">
              <div class="work-info">
                <h3>Lista Referti / Carica Referto</h3>
                <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-cloud-upload" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/>
                  <path fill-rule="evenodd" d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z"/>
                </svg>
                </span>
              </div>
              <img class="img-fluid" src="../assets/doc.jpg">
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<style scoped lang="scss">
.home {
 // background: url("../assets/bg.png") no-repeat;
  //background-size: cover;
  //
}
.title-box {
  padding: 10px;
  font-size: 25px;
  text-align: center;
  font-weight: 300;
  display: none;
  @media(max-width: 576px) {
    display: inline;
  }

}
</style>
