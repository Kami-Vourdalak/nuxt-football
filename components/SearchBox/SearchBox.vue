<template>
  <div class="search-box" :data-cy="'search-box-' + dataCy">
    <app-text-input
      label="Search a team for it's name"
      v-model="searchText"
      @keydown.enter="handleSearchClick"
      :data-cy="'search-box-' + dataCy"
    />
    <app-button @click="handleSearchClick" :data-cy="'search-box-' + dataCy">
      Go
    </app-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppTextInput from "@/components/AppTextInput/AppTextInput.vue";
import AppButton from "~/components/app-button/AppButton.vue";

export default defineComponent({
  name: "SearchBox",
  components: { AppButton, AppTextInput },
  emits: { onSearch: String },
  props: { dataCy: { type: String, required: false, default: "" } },
  data() {
    return { searchText: "" };
  },
  methods: {
    handleSearchClick() {
      this.$emit("onSearch", this.searchText);
    },
  },
});
</script>
<style scoped>
.search-box {
  display: flex;
  align-items: center;
  width: 100%;
}
</style>
