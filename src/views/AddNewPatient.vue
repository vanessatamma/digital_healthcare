<script setup>
import Navbar from "@/components/shared/Navbar.vue";
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { useAuthStore } from "@/stores/auth";
import PssLists from "@/components/auth/PssLists.vue";
import PatientInfo from "@/components/auth/PatientInfo.vue";
import {onMounted} from "vue";
import { useRouter } from 'vue-router';

const router = useRouter()
const userAuth = useAuthStore()

onMounted(() => {
  if(!userAuth.patient.cf) {
    //router.push('/home')
  }
})

const schema = Yup.object().shape({
  cf: Yup.string()
      .uppercase()
      .required('Campo Obbligatorio.')
      .matches(/^([A-Z]{6}[0-9LMNPQRSTUV]{2}[ABCDEHLMPRST]{1}[0-9LMNPQRSTUV]{2}[A-Z]{1}[0-9LMNPQRSTUV]{3}[A-Z]{1})$|([0-9]{11})$/, 'Formato codice fiscale non valido.'),
});

async function onSubmit(values) {
  await userAuth.checkCF(values.cf);
}

</script>
<template>
  <main class="wrapper-page">
    <section class="section site-portfolio">
      <div class="container">
        <Navbar :arrow-back="true" />
        <br>
        <div class="card-wrapper">
          <div class="card card__new-patient" >
            <Form class="check-cf" v-if="!userAuth.patient.isCreating" @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
              <!-- CF -->
              <div class="input-field">
                <span>
                  Se il paziente è già presente nel sistema potrà scegliere di modificare i dati, altrimenti inserirà da zero un nuovo paziente nel database.
                </span>
                <Field
                    name="cf"
                    type="text"
                    class="input"
                    id="cf"
                    :class="{ 'is-invalid': errors.cf }"
                />
                <div class="invalid-feedback">{{errors.cf}}</div>
                <label for="cf">Codice Fiscale</label>
              </div>

              <div class="container d-flex gap-3">
                <div class="col-12" v-if="!userAuth.patient.isLoading">
                  <button type="submit" class="btn btn-primary mr-1 w-100">
                    Verifica Codice Fiscale
                  </button>
                </div>
                <div v-else class="col-12 text-center">
                  <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
            </Form>
            <div v-else>
              <!-- Dati Paziente -->
              <PatientInfo />
              <!-- Form PSS -->
              <PssLists />
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<style lang="scss" scoped>
@import '../assets/form.scss';

.card-wrapper {
  //width: 900px;
  display: flex;
  justify-content: center;
}

.card {
  &__new-patient {
    border-radius: 10px;
    background: #fff;
    box-shadow: 5px 5px 10px 1px rgba(0, 0, 0, 0.2);
    padding: 1.5rem;
    width: 100%;
  }
}


</style>