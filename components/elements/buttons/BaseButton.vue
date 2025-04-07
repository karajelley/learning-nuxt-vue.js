<template>
  <v-btn
    :color="color"
    :variant="variant"
    :loading="loading"
    :block="block"
    class="base-button"
    @click="emit('click')"
  >
    <slot />
  </v-btn>
</template>

<script setup lang="ts">
defineProps<{
  color?: string
  variant?: 'flat' | 'outlined' | 'elevated' | 'tonal' | 'text' | 'plain'
  loading?: boolean
  block?: boolean
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<style scoped>
.base-button:hover {
  background-color: var(--v-secondary-base) !important;
  color: white !important;
}
</style>

 