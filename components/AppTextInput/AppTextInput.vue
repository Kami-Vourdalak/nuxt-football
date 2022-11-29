<template>
  <div class="w-full h-24 relative" :data-cy="'app-text-input-' + dataCy">
    <label for="id" :data-cy="'app-text-input-label-' + dataCy">
      {{ label }}
    </label>
    <input
      :id="id"
      type="text"
      class="p-3 rounded-md w-full border-neutral-300 border"
      :value="modelValue"
      :data-cy="'app-text-input-input-' + dataCy"
      @input="emitInput"
    >
    <span
      v-if="error"
      class="absolute text-red-600 text-xs bottom-1 left-0"
      :data-cy="'app-text-input-error-' + dataCy"
    >
      {{ error }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, ref } from 'vue'

interface Props {
  label: string;
  modelValue: string;
  error?: string;
  dataCy?: string;
}
withDefaults(defineProps<Props>(), {
  error: '',
  dataCy: ''
})
const id = ref('1')
const emit = defineEmits<{(e: 'update:modelValue', value: string): string }>()

const emitInput = (event: Event) => emit('update:modelValue', (event.target as HTMLInputElement).value)
</script>
