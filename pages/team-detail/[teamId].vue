<template>
  <div v-if="!team.name">
    Team not found!
  </div>
  <div v-else class="flex flex-col">
    <h2>{{ team.name }}</h2>
    <div>
      <img :src="team.img" :alt="team.name">
    </div>
    <div v-if="isEditing" class="self-start w-4/5">
      <app-button type="secondary" data-cy="cancel-edit" @click="handleCancel">
        Cancel
      </app-button>
      <team-form
        :team-values="{ name: team.name, img: team.img }"
        data-cy="edit"
        @onSave="handleSave"
      />
    </div>
    <app-button
      v-else
      class="self-start"
      data-cy="edit-team"
      @click="handleEditClick"
    >
      Edit!
    </app-button>
    <p v-if="error" data-cy="error">
      {{ error }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppButton from '~/components/app-button/AppButton.vue'
import TeamForm from '@/components/TeamForm/TeamForm.vue'
import { Team } from '@/types'
import TeamsClient from '@/api/teams.client'

export default defineComponent({
  name: 'TeamDetail',
  components: { TeamForm, AppButton },
  data () {
    return { isEditing: false, error: '', team: {} as Team }
  },
  computed: {
    teamId (): number {
      return +this.$route.params.teamId
    }
  },
  mounted () {
    if (process?.env?.VUE_APP_USE_API === 'true') {
      TeamsClient.getTeam(this.teamId)
        .then((teamFound) => {
          this.team = teamFound
        })
        .catch((err) => {
          console.log('err', err)
        })
    } else {
      import('~/data/football.json').then((_teams) => {
        const teams = _teams.default.map(TeamsClient.teamApiToTeam)
        this.team = teams.find(({ id }) => id === this.teamId)
      })
    }
  },
  methods: {
    handleEditClick () {
      this.isEditing = true
    },
    handleCancel () {
      this.isEditing = false
    },
    async handleSave (teamValues: Team) {
      try {
        await TeamsClient.updateTeam(this.teamId, teamValues)
        this.$router.push('/')
      } catch (err) {
        console.log(err)
        this.error = err.message
      }
    }
  }
})
</script>
