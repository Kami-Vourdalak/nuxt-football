<template>
  <div>
    <app-text-input
      label="Team name:"
      v-model="name"
      :error="nameError"
      @input="validateName"
      :data-cy="'team-form-name-' + dataCy"
    />
    <app-text-input
      label="Team logo url:"
      v-model="img"
      :error="imgError"
      @input="validateUrl"
      :data-cy="'team-form-img-' + dataCy"
    />
    <app-button
      @click="handleSave"
      :disabled="isSaveDisabled"
      :data-cy="'team-form-save-' + dataCy"
    >
      Save
    </app-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppTextInput from "@/components/AppTextInput/AppTextInput.vue";
import AppButton from "~/components/app-button/AppButton.vue";

export default defineComponent({
  name: "TeamForm",
  components: { AppButton, AppTextInput },
  props: {
    teamValues: {
      type: Object,
      required: false,
      default: () => ({ name: "", img: "" }),
    },
    dataCy: { type: String, required: false, default: "" },
  },
  emits: {
    "update:modelValue": Object,
    onSave: Object,
  },
  data() {
    return {
      name: this.teamValues.name,
      img: this.teamValues.img,
      nameError: "",
      imgError: "",
    };
  },
  computed: {
    isSaveDisabled() {
      return !this.img || !this.name || !!this.imgError || !!this.nameError;
    },
  },
  methods: {
    handleSave() {
      this.validateName();
      this.validateUrl();
      if (this.isSaveDisabled) return;
      this.$emit("onSave", { name: this.name, img: this.img });
    },
    validateName() {
      if (this.name === "") {
        return (this.nameError = "Required");
      }
      return (this.nameError = "");
    },
    validateUrl() {
      if (this.img === "") {
        return (this.imgError = "Required");
      }
      if (!/^(https?):\/\/[^\s$.?#].[^\s]*$/.test(this.img)) {
        return (this.imgError = "Not a valid Url");
      }
      return (this.imgError = "");
    },
  },
});
</script>

<style scoped></style>
