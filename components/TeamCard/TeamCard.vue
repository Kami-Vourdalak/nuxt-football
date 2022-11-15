<template>
  <div class="flex items-center justify-center mb-6 cursor-pointer" :data-cy="'team-card-' + dataCy">
    <div class="relative mx-2.5">
      <img :src="imageSrc" :alt="teamName" class="w-64 h-64 object-contain">
      <div class="py-5 px-2.5 bg-black opacity-80 text-white absolute bottom-0 left-0 w-full">
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
