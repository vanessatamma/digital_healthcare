<script setup lang="ts">
import { RouterView } from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthStore } from "@/stores/auth";
import { onMounted } from "vue";
import AOS from "aos";
import router from "@/router";
import { version } from "../package.json";

console.log('version', version)

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
  <div class="footer">Version: <strong>{{version}}</strong> </div>
</template>
<style scoped lang="scss">
.footer {
  background: #ececec;
  padding: 10px;
  text-align: left;
  font-size: 10px;
}
</style>

