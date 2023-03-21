<script setup>
const props = defineProps(['title', 'value'])
</script>
<template>
  <div class="item-text">
    <span class="title fw-bold">
      {{ props.title }}:
    </span>
    <span class="value">
      {{ props.value ?? '-' }}
    </span>
  </div>
</template>
<style scoped lang="scss">
.title {
  text-transform: uppercase;
}
.item-text {
  display: flex;
  gap: 0.5rem;
  font-size: 18px;
}
</style>