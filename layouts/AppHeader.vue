<template>
  <header class="app-header">
    <router-link class="app-header__link" to="/">
      <h1>Teams Page!</h1>
    </router-link>
    <app-button
      v-show="showAddButton"
      class="app-header__add-button"
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

<style>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: #bbffbb;
  padding: 1.5rem;
  height: 5.25rem;
}

.app-header__link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: inherit;
  color: inherit;
}

.app-header__add-button {
  justify-self: flex-end;
}
</style>
