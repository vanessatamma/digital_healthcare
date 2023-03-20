<script setup lang="ts">
import { RouterView } from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthStore } from "@/stores/auth";
import { onMounted } from "vue";
import AOS from "aos";
import router from "@/router";

const userAuth = useAuthStore()
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  console.log("OASC")
  if (user) {
   // const uid = user.uid;
    userAuth.isLoggedIn = true;
    console.log('Logged In')
  } else {
    userAuth.isLoggedIn = false;
    router.push({name: 'Login'});
    console.log('Logged Out')
  }
});
onMounted(() => {
  AOS.init();
})
</script>

<template>
  <RouterView />
</template>

