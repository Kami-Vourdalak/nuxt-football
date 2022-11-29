<template>
  <div>
    <app-header />
    <main class="p-8">
      <slot />
    </main>
  </div>
</template>

<script lang="ts">
import AppHeader from '@/layouts/AppHeader.vue'

export default defineComponent({
  name: 'AppLayout',
  components: { AppHeader }
})
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
</style>
