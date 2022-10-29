<template>
  <div v-if="!team.name">Team not found!</div>
  <div v-else class="team-detail">
    <h2>{{ team.name }}</h2>
    <div>
      <img :src="team.img" :alt="team.name" />
    </div>
    <div v-if="isEditing" class="team-detail__form">
      <app-button @click="handleCancel" type="secondary" data-cy="cancel-edit">
        Cancel
      </app-button>
      <team-form
        :team-values="{ name: team.name, img: team.img }"
        @onSave="handleSave"
        data-cy="edit"
      />
    </div>
    <app-button
      class="team-detail__edit-button"
      v-else
      @click="handleEditClick"
      data-cy="edit-team"
    >
      Edit!
    </app-button>
    <p v-if="error" data-cy="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppButton from "~/components/app-button/AppButton.vue";
import TeamForm from "@/components/TeamForm/TeamForm.vue";
import { Team } from "@/types";
import TeamsClient from "@/api/teams.client";

export default defineComponent({
  name: "TeamDetail",
  components: { TeamForm, AppButton },
  data() {
    return { isEditing: false, error: "", team: {} as Team };
  },
  mounted() {
    if (process?.env?.VUE_APP_USE_API === "true") {
      TeamsClient.getTeam(this.teamId)
          .then((teamFound) => {
            this.team = teamFound;
          })
          .catch((err) => {
            console.log("err", err);
          });
    } else {
      import("~/data/football.json").then((_teams) => {
        const teams = _teams.default.map(TeamsClient.teamApiToTeam);
        this.team = teams.find(({id})=> id === this.teamId)
      });
    }
  },
  computed: {
    teamId(): number {
      return +this.$route.params.teamId;
    },
  },
  methods: {
    handleEditClick() {
      this.isEditing = true;
    },
    handleCancel() {
      this.isEditing = false;
    },
    async handleSave(teamValues: Team) {
      try {
        await TeamsClient.updateTeam(this.teamId, teamValues);
        this.$router.push("/");
      } catch (err) {
        console.log(err);
        this.error = err.message;
      }
    },
  },
});
</script>

<style scoped>
.team-detail {
  display: flex;
  flex-direction: column;
}
.team-detail__form {
  align-self: flex-start;
  width: 80%;
}
.team-detail__edit-button {
  align-self: flex-start;
}
</style>
