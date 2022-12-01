<template>
  <header class="flex items-center justify-between w-full bg-green-200 p-6 h-24">
    <nuxt-link class="flex items-center gap-2" to="/">
      <h1 class="text-lg">
        Teams Page!
      </h1>
    </nuxt-link>
    <app-button
      v-show="showAddButton"
      class="justify-self-end"
      type="secondary"
      data-cy="add-team"
      @click="handleAddTeam"
    >
      Add Team
    </app-button>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppButton from '@/components/app-button/AppButton.vue'

export default defineComponent({
  name: 'AppHeader',
  components: { AppButton },
  computed: {
    showAddButton () {
      return this.$route.path !== '/add-team'
    }
  },
  methods: {
    handleAddTeam () {
      this.$router.push('/add-team')
    }
  }
})
</script>
