<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { useAuthStore } from "@/stores/auth";

const userAuth = useAuthStore()

const schema = Yup.object().shape({
  firstName: Yup.string()
      .required('Nome Obbligatorio.'),
  lastName: Yup.string()
      .required('Cognome Obbligatorio.'),
 /* dob: Yup.string()
      .required('Date of Birth is required')
      .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Date of Birth must be a valid date in the format YYYY-MM-DD'),*/
  email: Yup.string()
      .required('Email Obbligatoria.')
      .email('Formato email non valido.'),
  password: Yup.string()
      .min(6, 'La Password deve avere almeno 6 caratteri.')
      .required('Password Obbligatoria.'),
  confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Le Password devono essere uguali.')
      .required('Conferma Password Obbligatorio.'),
  userType: Yup.string().required('Selezionare un opzione'),
});

function onSubmit(values) {
  userAuth.register(values);
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
              <!-- Name -->
              <div class="input-field">
                <Field name="firstName" type="text" class="input" id="firstName" :class="{ 'is-invalid': errors.firstName }" />
                <label for="firstName">Nome*</label>
                <div class="invalid-feedback">{{errors.firstName}}</div>
              </div>
              <!-- Surname -->
              <div class="input-field">
                <Field name="lastName" type="text" class="input" id="lastName" :class="{ 'is-invalid': errors.lastName }" />
                <label for="lastName">Cognome*</label>
                <div class="invalid-feedback">{{errors.lastName}}</div>
              </div>
              <!-- Email -->
              <div class="input-field">
                <Field name="email" type="text" class="input" id="email" :class="{ 'is-invalid': errors.email }" />
                <div class="invalid-feedback">{{errors.email}}</div>
                <label for="email">Email*</label>
              </div>
              <!-- User type -->
              <div class="container user-type">
                <span>Tipo di utente</span>
                <div class="col-12">
                  <div class="form-check">
                    <Field
                        name="userType"
                        class="form-check-input"
                        type="radio"
                        id="doctor"
                        :class="{ 'is-invalid': errors.userType }"
                        :value="'doctor'"
                    />
                    <label class="form-check-label" for="doctor">
                      Medico
                    </label>
                  </div>
                </div>
                <div class="col-12">
                    <div class="form-check">
                      <Field
                          name="userType"
                          class="form-check-input"
                          type="radio"
                          id="volunteer"
                          :class="{ 'is-invalid': errors.userType }"
                          :value="'volunteer'"
                      />
                      <label class="form-check-label" for="volunteer">
                        Volontario
                      </label>
                    </div>
                </div>
                <div class="col-12">
                  <div class="invalid-feedback">{{errors.userType}}</div>
                </div>
              </div>
              <!-- Password -->
              <div class="input-field">
                <Field name="password" type="password" class="input" id="password" :class="{ 'is-invalid': errors.password }" autocomplete="off"/>
                <div class="invalid-feedback">{{errors.password}}</div>
                <label for="password">Password</label>
              </div>
              <!-- Confirm Password -->
              <div class="input-field">
                <Field name="confirmPassword" type="password" class="input" id="confirmPassword" :class="{ 'is-invalid': errors.confirmPassword }" autocomplete="off" />
                <div class="invalid-feedback">{{errors.confirmPassword}}</div>
                <label for="confirmPassword">Conferma Password</label>
              </div>
              <!-- Actions -->
              <div class="container d-flex gap-3">
                <div class="col-3">
                  <button type="reset" class="btn btn-secondary w-100">Reset</button>
                </div>
                <div class="col-9">
                  <button type="submit" class="btn btn-primary mr-1 w-100">Registra Utente</button>
                </div>
              </div>
              <div class="signin">
                <span>Hai già un account? <a href="#">Login</a></span>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
.input-field{
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0 10px 0 10px;
  margin-bottom: 20px;
}
.input{
  height: 45px;
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(0,0,0,0.2);
  outline: none;

  color: #40414a;
}
.input-box .input-field label{
  position: absolute;
  top: 10px;
  left: 10px;
  pointer-events: none;
  transition: .5s;
}
.input-field .input:focus ~ label{
  top: -10px;
  font-size: 13px;
}
.input-field .input:valid ~ label{
  top: -10px;
  font-size: 13px;
  color: #5d5076;
}
.input-field .input:focus, .input-field .input:valid{
  border-bottom: 1px solid #743ae1;
}
.submit{
  border: none;
  outline: none;
  height: 45px;
  background: #ececec;
  border-radius: 5px;
  transition: .4s;
}
.submit:hover{
  background: rgba(37, 95, 156,0.9);
  color: #fff;
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