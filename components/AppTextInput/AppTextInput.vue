<template>
  <div class="app-text-input" :data-cy="'app-text-input-' + dataCy">
    <label for="id" :data-cy="'app-text-input-label-' + dataCy">
      {{ label }}
    </label>
    <input
      :id="id"
      type="text"
      class="app-text-input__input"
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
      :data-cy="'app-text-input-input-' + dataCy"
    />
    <span
      v-if="error"
      class="app-text-input__error"
      :data-cy="'app-text-input-error-' + dataCy"
    >
      {{ error }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, ref } from "vue";

interface Props {
  label: string;
  modelValue: string;
  error?: string;
  dataCy?: string;
}
withDefaults(defineProps<Props>(), {
  error: "",
  dataCy: "",
});
const id = ref(1);
const emit = defineEmits<{ (e: "update:modelValue"): string }>();
</script>
<style scoped>
.app-text-input {
  width: 100%;
  height: 4.5rem;
  position: relative;
}
.app-text-input__input {
  padding: 0.5rem;
  border-radius: 0.375rem;
  width: 100%;
}
.app-text-input__error {
  position: absolute;
  color: red;
  font-size: 11px;
  bottom: 0.25rem;
  left: 0;
}
</style>
