<template>
  <div class="flex items-center w-full" :data-cy="'search-box-' + dataCy">
    <app-text-input
      v-model="searchText"
      label="Search a team for it's name"
      :data-cy="'search-box-' + dataCy"
      @keydown.enter="handleSearchClick"
    />
    <app-button :data-cy="'search-box-' + dataCy" @click="handleSearchClick">
      Go
    </app-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppTextInput from '@/components/AppTextInput/AppTextInput.vue'
import AppButton from '~/components/app-button/AppButton.vue'

export default defineComponent({
  name: 'SearchBox',
  components: { AppButton, AppTextInput },
  props: { dataCy: { type: String, required: false, default: '' } },
  emits: { onSearch: String },
  data () {
    return { searchText: '' }
  },
  methods: {
    handleSearchClick () {
      this.$emit('onSearch', this.searchText)
    }
  }
})
</script>
