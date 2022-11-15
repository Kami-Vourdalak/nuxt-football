<template>
  <button
    :disabled="disabled"
    class="p-2 rounded bg-green-200"
    :class="{
      'cursor-not-allowed bg-gray-100': disabled,
      'bg-red-200': type === 'secondary',
    }"
    :data-cy="'app-button-' + dataCy"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'
interface Props {
  type?: 'primary' | 'secondary';
  disabled?: boolean;
  dataCy?: string;
}
withDefaults(defineProps<Props>(), {
  type: 'primary',
  disabled: false,
  dataCy: ''
})

const emit = defineEmits<{(e: 'click'): void }>()
function handleClick () {
  emit('click')
}
</script>
