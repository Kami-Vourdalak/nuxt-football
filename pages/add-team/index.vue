<template>
  <div class="add-team">
    <h2>Add Team</h2>
    <p>You can add a team by filling the form</p>
    <team-form @onSave="saveTeam" data-cy="add" />
    <p data-cy="error" v-if="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TeamForm from "~/components/TeamForm/TeamForm.vue";
import { Team } from "~/types";
import TeamsClient from "~/api/teams.client";

export default defineComponent({
  name: "AddTeam",
  components: { TeamForm },
  data() {
    return { error: "" };
  },
  methods: {
    async saveTeam(teamValues: Team) {
      try {
        await TeamsClient.addTeam(teamValues);
        this.$router.push("/");
      } catch (err) {
        this.error = err.message;
      }
    },
  },
});
</script>

<style scoped>
.add-team {
  width: 80%;
}
</style>
