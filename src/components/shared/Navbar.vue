<script setup>
import {useAuthStore} from "@/stores/auth";
const userAuth = useAuthStore()
</script>

<template>
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
</template>
