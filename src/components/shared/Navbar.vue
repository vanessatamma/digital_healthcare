<script setup>
import {useAuthStore} from "@/stores/auth";
import {formattedLastLoginDate} from "@/shared/utils";
const userAuth = useAuthStore()

/*
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand ms-4" href="#">Digital Healthcare</a>
      <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">

        <form>
          <button
              v-if="!userAuth.isLoggedIn"
              type="button"
              class="btn btn-outline-primary mx-2"
              data-bs-toggle="modal"
              data-bs-target="#login"
          >
            Log in
          </button>
          <!-- Cerrar sesión -->
          <button
              v-if="userAuth.isLoggedIn"
              class="btn btn-outline-danger me-2"
              @click="userAuth.signout"
          >
            Log out
          </button>
          <!-- Regístrate -->
          <button
              v-if="!userAuth.isLoggedIn"
              type="button"
              class="btn btn-outline-warning"
              data-bs-toggle="modal"
              data-bs-target="#registro"
          >
            Regístrate
          </button>
        </form>
      </div>
    </div>
  </nav>
 */
</script>

<template>
  <div class="navbar row mb-5 align-items-center" data-aos="fade-up">
    <div class="col-md-9 col-lg-9 mb-4 mb-lg-0" >
      <h2>Benvenuto {{ userAuth.capitalizedName }} </h2>
      <p class="mb-0">Ultimo Login: {{ userAuth.lastLogin }}</p>
    </div>
    <div class="col-md-12 col-lg-3 mb-4 mb-lg-0 text-center">
      <!-- Settings -->
      <button type="button" class="btn btn-outline-primary mx-2" >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
          <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
        </svg>
      </button>
      <!-- Logout -->
      <button type="button" class="btn btn-outline-danger"  @click="userAuth.logout">
        <div class="spinner-border loader" role="status" v-if="userAuth.isLoading">
          <span class="visually-hidden">Loading...</span>
        </div>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left danger-svg" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"></path>
          <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"></path>
        </svg>
        Logout
      </button>

    </div>
  </div>
</template>

<style scoped lang="scss">
.navbar {
  .danger-svg {
    color: red;
  }
}
.loader {
  height: 16px;
  width: 16px;
}
</style>