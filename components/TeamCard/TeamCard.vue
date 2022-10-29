<template>
  <div class="team" :data-cy="'team-card-' + dataCy">
    <div class="team-inner">
      <img :src="imageSrc" :alt="teamName">
      <div class="team-name">
        {{ teamName }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'TeamCard',
  props: {
    teamId: { type: Number, required: true },
    teamName: { type: String, required: true },
    imageSrc: { type: String, required: true },
    dataCy: { type: [String, Number], required: false, default: '' }
  }
})
</script>
<style scoped>
.team {
  margin-bottom: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.team-inner {
  position: relative;
  margin: 0 10px;
}

.team-inner .team-name {
  padding: 20px 10px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

.team img {
  width: 250px;
  height: 250px;
  object-fit: contain;
}
</style>
