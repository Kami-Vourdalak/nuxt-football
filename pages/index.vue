<template>
  <div class="mx-auto my-0">
    <search-box data-cy="teams-search" @onSearch="filterTeams" />
    <app-loader v-if="isLoading" />
    <div class="grid grid-cols-1 w-full mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      <p v-if="!isLoading && filteredTeams.length === 0" data-cy="no-teams-found">
        No teams found :(
      </p>
      <team-card
        v-for="team in filteredTeams"
        :key="team.name"
        :team-id="team.id"
        :image-src="team.img"
        :team-name="team.name"
        :data-cy="team.id"
        @click="handleTeamCardClick(team.id)"
      />
    </div>
    <div class="flex gap-12 justify-center">
      <div
        v-for="page in teamPages"
        :key="page"
        class="border border-green-300 rounded-xl py-3 px-4 cursor-pointer"
        :class="{ 'bg-green-300': page === teamsPage }"
        :data-cy="'page-' + page"
        @click="handlePageChange(page)"
      >
        {{ page }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TeamsClient from '~/api/teams.client'
import { Team } from '~/types'
import TeamCard from '~/components/TeamCard/TeamCard.vue'
import SearchBox from '~/components/SearchBox/SearchBox.vue'
import AppLoader from '~/components/AppLoader.vue'

export default defineComponent({
  name: 'HomePage',
  components: { AppLoader, SearchBox, TeamCard },
  data () {
    return {
      isLoading: true,
      teams: [] as Team[],
      filteredTeams: [] as Team[],
      searchText: '',
      totalTeams: 0,
      teamsPage: 1,
      teamsLimit: 5
    }
  },
  computed: {
    teamPages (): number[] {
      return Array(this.totalTeams)
        .fill(null)
        .map((_, index) => index + 1)
    }
  },
  mounted () {
    // this.isLoading = true;
    if (this.$config.VUE_APP_USE_API !== 'true') {
      this.getTeams()
    } else {
      import('~/data/football.json').then((_teams) => {
        this.teams = _teams.default.map(TeamsClient.teamApiToTeam)
        this.filteredTeams = this.teams
        this.isLoading = false
      })
    }
  },
  methods: {
    getTeams () {
      TeamsClient.getTeams({
        page: this.teamsPage,
        limit: this.teamsLimit,
        filter: this.searchText
      })
        .then((data) => {
          this.teams = data.teams
          this.totalTeams = Math.ceil(data.total / this.teamsLimit)
          this.filteredTeams = data.teams
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    handleTeamCardClick (teamId: number) {
      this.$router.push(`/team-detail/${teamId}`)
    },
    filterTeams (searchText: string) {
      this.searchText = searchText
      this.getTeams()
    },
    handlePageChange (page: number) {
      this.teamsPage = page
      this.getTeams()
    }
  }
})
</script>
