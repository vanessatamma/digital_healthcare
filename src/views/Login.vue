<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { useAuthStore } from "@/stores/auth";

const userAuth = useAuthStore()

const schema = Yup.object().shape({
  email: Yup.string()
      .required('Email Obbligatoria.')
      .email('Formato email non valido.'),
  password: Yup.string()
      .required('Password Obbligatoria.'),
});

async function onSubmit(values) {
 // userAuth.isLoading = true;
  await userAuth.signIn(values);
 // userAuth.isLoading = false;
}
</script>

<template>
  <div class="wrapper form-wrapper">
    <div class="container main">
      <div class="row form-wrapper__card">
        <div class="col-md-6 side-image" />
        <div class="col-md-6 right">
          <div class="input-box">
            <!-- Logo -->
            <header>
              <svg xmlns="http://www.w3.org/2000/svg"  width="50" height="50" fill="currentColor" class="bi bi-heart-pulse-fill" viewBox="0 0 16 16">
                <path d="M1.475 9C2.702 10.84 4.779 12.871 8 15c3.221-2.129 5.298-4.16 6.525-6H12a.5.5 0 0 1-.464-.314l-1.457-3.642-1.598 5.593a.5.5 0 0 1-.945.049L5.889 6.568l-1.473 2.21A.5.5 0 0 1 4 9H1.475Z"/>
                <path d="M.88 8C-2.427 1.68 4.41-2 7.823 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C11.59-2 18.426 1.68 15.12 8h-2.783l-1.874-4.686a.5.5 0 0 0-.945.049L7.921 8.956 6.464 5.314a.5.5 0 0 0-.88-.091L3.732 8H.88Z"/>
              </svg>
            </header>
            <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
              <!-- Email -->
              <div class="input-field">
                <Field name="email" type="text" class="input" id="email" :class="{ 'is-invalid': errors.email }" />
                <div class="invalid-feedback">{{errors.email}}</div>
                <label for="email">Email</label>
              </div>
              <!-- Password -->
              <div class="input-field">
                <Field name="password" type="password" class="input" id="password" :class="{ 'is-invalid': errors.password }" autocomplete="off"/>
                <div class="invalid-feedback">{{errors.password}}</div>
                <label for="password">Password</label>
              </div>
              <!-- Actions -->
              <div class="container d-flex gap-3">
                <div class="col-12" v-if="!userAuth.isLoading">
                  <button type="submit" class="btn btn-primary mr-1 w-100">
                    Login
                  </button>
                </div>
                <div v-else class="col-12 text-center">
                  <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
              <div class="signin">
                <span>Non hai un account? <a href="#" @click="$router.push('/signup')">Registrati</a></span>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/form.scss';
.form-wrapper {
  &__card {
    width: 900px;
    // height: 600px;
    border-radius: 10px;
    background: #fff;
    box-shadow: 5px 5px 10px 1px rgba(0,0,0,0.2);
  }
}
.user-type {
  margin-bottom: 20px;
}
.wrapper{
  background: #ececec;
  padding: 0 20px 0 20px;
}
.main{
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.side-image{
  background-image: url("../assets/logo-2.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  border-radius: 10px 0 0 10px;
}
img{
  width: 35px;
  position: absolute;
  top: 30px;
  left: 30px;
}
.text{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.text p{
  color: #fff;
  font-size: 18px;
}
i{
  font-weight: 400;
  font-size: 15px;
}
.right{
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 30px;
}
.input-box{
  width: 330px;
  box-sizing: border-box;
}
.input-box header{
  font-weight: 700;
  text-align: center;
  margin-bottom: 45px;

  svg {
    color:#a9e6e3;
  }
}

.signin{
  text-align: center;
  font-size: small;
  margin-top: 25px;
}
span a{
  text-decoration: none;
  font-weight: 700;
  color: #000;
  transition: .5s;
}
span a:hover{
  text-decoration: underline;
  color: #000;
}
@media only screen and (max-width: 768px){
  .side-image{
    border-radius: 10px 10px 0 0;
  }
  img{
    width: 35px;
    position: absolute;
    top: 20px;
    left: 47%;
  }
  .text{
    position: absolute;
    top: 70%;
    text-align: center;
  }
  .text p,i{
    font-size: 17px;
  }
  .row{
    max-width: 420px;
    width: 100%;
  }
}
</style>