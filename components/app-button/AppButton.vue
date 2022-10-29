<template>
  <button
      @click="handleClick"
      :disabled="disabled"
      class="app-button"
      :class="{
      'app-button--disabled': disabled,
      'app-button--secondary': type === 'secondary',
    }"
      :data-cy="'app-button-' + dataCy"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { withDefaults } from "vue";
interface Props {
  type?: "primary" | "secondary";
  disabled?: boolean;
  dataCy?: string;
}
withDefaults(defineProps<Props>(), {
  type: "primary",
  disabled: false,
  dataCy: "",
});

const emit = defineEmits<{ (e: "click"): void }>();
function handleClick() {
  emit("click");
}
</script>

<style scoped>
.app-button {
  cursor: pointer;
  padding: 0.5rem;
  background-color: #bbffbb;
  border-radius: 0.25rem;
  height: 2.25rem;
}
.app-button--secondary {
  background-color: #ffbbbb;
}
.app-button--disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
