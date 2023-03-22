<script setup lang="ts">
import { useForm } from 'vee-validate';
import { ref, computed, provide } from 'vue';

const props = defineProps({
  validationSchema: {
    type: Array,
    required: true,
  },
  canAbort: {
    type: Boolean,
    required: false,
  }
});

const emit = defineEmits(['submit', 'reset', 'next', 'previous']);
const currentStepIdx = ref(0);

// Injects the starting step, child <form-steps> will use this to generate their ids
const stepCounter = ref(0);
provide('STEP_COUNTER', stepCounter);

// Inject the live ref of the current index to child components
// will be used to toggle each form-step visibility
provide('CURRENT_STEP_INDEX', currentStepIdx);

// if this is the last step
const isLastStep = computed(() => {
  return currentStepIdx.value === stepCounter.value - 1;
});

// If the `previous` button should appear
const hasPrevious = computed(() => {
  return currentStepIdx.value > 0;
});

// extracts the individual step schema
const currentSchema = computed(() => {
  return props.validationSchema[currentStepIdx.value];
});

const { values, handleSubmit } = useForm({
  // vee-validate will be aware of computed schema changes
  validationSchema: currentSchema,
  // turn this on so each step values won't get removed when you move back or to the next step
  keepValuesOnUnmount: true,
});

// We are using the "submit" handler to progress to next steps
// and to submit the form if it's the last step
const onSubmit = handleSubmit((values) => {
  if (!isLastStep.value) {
    currentStepIdx.value++;
    emit('previous', currentStepIdx.value);
    return;
  }

  // Let the parent know the form was filled across all steps
  emit('submit', values);
});

function goToPrev() {
  if (currentStepIdx.value === 0) {
    return;
  }
  currentStepIdx.value--;
  emit('previous', currentStepIdx.value);
}
</script>

<template>
  <form @submit="onSubmit">
    <slot />

    <div class="row mt-5">
      <div class="col-12 col-sm-4" v-if="props.canAbort">
        <button class="btn btn-warning mr-1 w-100" @click="emit('reset')">
          Annulla Inserimento
        </button>
      </div>
      <div class="col-12 col-sm-4" :class="{'col-sm-6': !props.canAbort}">
        <button class="btn btn-outline-primary mr-1 w-100" v-if="hasPrevious" type="button" @click="goToPrev">
          Step Precedente
        </button>
      </div>

      <div class="col-12 col-sm-4" :class="{'col-sm-6': !props.canAbort}">
        <button class="btn btn-outline-primary mr-1 w-100" type="submit">
          {{ isLastStep ? 'Salva PSS' : 'Step Successivo' }}
        </button>
      </div>
    </div>
    <!--  <pre>{{ values }}</pre> -->

  </form>
</template>

<style scoped lang="scss">

</style>

