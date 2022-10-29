<template>
  <div class="container">
    <search-box data-cy="teams-search" @onSearch="filterTeams" />
    <app-loader v-if="isLoading" />
    <div class="teams">
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
    <div class="paginator">
      <div
        v-for="page in teamPages"
        :key="page"
        class="paginator__page"
        :class="{ 'paginator__page--active': page === teamsPage }"
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
    if (process?.env?.VUE_APP_USE_API === 'true') {
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
      console.log('this.searchText', this.searchText)
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

<style scoped>
.container {
  margin: 0 auto;
}

.teams {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  width: 100%;
  margin-top: 1rem;
}

.teams:after {
  content: "";
  display: table;
  clear: both;
}

.paginator {
  display: flex;
  gap: 3rem;
  justify-content: center;
}

.paginator__page {
  border: 1px solid #bbffbb;
  border-radius: 1rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
}

.paginator__page--active {
  background-color: #bbffbb;
}

@media (min-width: 1280px) {
  .teams {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media (min-width: 890px) and (max-width: 1279px) {
  .teams {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (min-width: 630px) and (max-width: 889px) {
  .teams {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
