<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import FormWizard from "@/components/auth/pss/FormWizard.vue";
import FormStep from "@/components/auth/pss/FormStep.vue";


// break down the validation steps into multiple schemas
const validationSchema = [
  yup.object({
    fullName: yup.string().required().label('Full Name'),
    email: yup.string().required().email().label('Email Address'),
  }),
  yup.object({
    password: yup.string().min(8).required(),
    confirmPass: yup
        .string()
        .required()
        .oneOf([yup.ref('password')], 'Passwords must match'),
  }),
  yup.object({
    favoriteDrink: yup
        .string()
        .required()
        .oneOf(['coffee', 'tea', 'soda'], 'Choose a drink'),
  }),
];

/**
 * Only Called when the last step is submitted
 */
function onSubmit(formData: any) {
  console.log(JSON.stringify(formData, null, 2));
}
</script>

<template>
  <div>
    <h2>INSERIMENTO DATI PAZIENTE</h2>
    <p>
      Il seguente form di inserimento dati PSS segue le linee guida FSE/PSS-PS, <i>"versione 31 marzo 2014"</i>
    </p>

    <FormWizard :validation-schema="validationSchema" @submit="onSubmit">
      <!-- Dati del medico -->
      <FormStep>
        <Field name="fullName" type="text" placeholder="Type your Full name" />
        <ErrorMessage name="fullName" />

        <Field name="email" type="email" placeholder="Type your email" />
        <ErrorMessage name="email" />
      </FormStep>

      <!-- Dati sanitari del paziente -->
      <FormStep>
        <Field
            name="password"
            type="password"
            placeholder="Type a strong one"
        />
        <ErrorMessage name="password" />

        <Field
            name="confirmPass"
            type="password"
            placeholder="Confirm your password"
        />
        <ErrorMessage name="confirmPass" />
      </FormStep>

      <!-- Parametri di monitoraggio -->
      <FormStep>
        <Field name="favoriteDrink" as="select">
          <option>Select a drink</option>
          <option value="coffee">Coffee</option>
          <option value="tea">Tea</option>
          <option value="soda">Soda</option>
        </Field>
        <ErrorMessage name="favoriteDrink" />
      </FormStep>

      <!-- Anamnesi ed informazioni -->




    </FormWizard>
  </div>
</template>

<style scoped lang="scss">
@import '../../../assets/form.scss';
input,
select {
  margin: 10px 0;
  display: block;
}
</style>
