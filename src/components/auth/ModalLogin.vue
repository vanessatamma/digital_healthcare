<script setup>
import {useAuthStore} from "@/stores/auth";
const userAuth = useAuthStore()
</script>

<template>
  <div class="modal fade" id="login">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Iniciar sesión</h5>
          <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="userAuth.signIn">
            <!-- CORREO -->
            <div class="input-group mb-3">
              <span class="input-group-text">Correo</span>
              <input
                  v-model="userAuth.email"
                  type="email"
                  required="true"
                  class="form-control"
              />
            </div>
            <!-- PASSWORD -->
            <div class="input-group mb-3">
              <span class="input-group-text">Password</span>
              <input
                  v-model="userAuth.password"
                  type="password"
                  required="true"
                  class="form-control"
              />
            </div>
            <div class="d-grid gap-2">
              <button
                  type="submit"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
              >
                <!-- Cierra el modal -->
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
