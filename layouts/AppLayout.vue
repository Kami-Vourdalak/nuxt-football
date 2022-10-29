<template>
  <app-header />
  <main class="default-layout">
    <slot />
  </main>
</template>

<script lang="ts">
import AppHeader from "@/layouts/AppHeader.vue";

export default defineComponent({
  name: "AppLayout",
  components: { AppHeader },
});
</script>

<style>
html {
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
  Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-size: 15px;
}
.default-layout {
  padding: 2rem;
}
</style>
