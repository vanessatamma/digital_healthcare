<script setup lang="ts">
import { RouterView } from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthStore } from "@/stores/auth";

const userAuth = useAuthStore()
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  console.log("onAuthStateChanged", user)
  if (user) {
    const uid = user.uid;
    userAuth.isLoggedIn = true;
    console.log('vero')
  } else {
    userAuth.isLoggedIn = false;
    console.log('falso')
  }
});
</script>

<template>
  <RouterView />
</template>

