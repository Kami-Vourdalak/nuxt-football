<template>
  <div>
    <app-text-input
      v-model="name"
      label="Team name:"
      :error="nameError"
      :data-cy="'team-form-name-' + dataCy"
      @input="validateName"
    />
    <app-text-input
      v-model="img"
      label="Team logo url:"
      :error="imgError"
      :data-cy="'team-form-img-' + dataCy"
      @input="validateUrl"
    />
    <app-button
      :disabled="isSaveDisabled"
      :data-cy="'team-form-save-' + dataCy"
      @click="handleSave"
    >
      Save
    </app-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppTextInput from '@/components/AppTextInput/AppTextInput.vue'
import AppButton from '~/components/app-button/AppButton.vue'

export default defineComponent({
  name: 'TeamForm',
  components: { AppButton, AppTextInput },
  props: {
    teamValues: {
      type: Object,
      required: false,
      default: () => ({ name: '', img: '' })
    },
    dataCy: { type: String, required: false, default: '' }
  },
  emits: {
    'update:modelValue': Object,
    onSave: Object
  },
  data () {
    return {
      name: this.teamValues.name,
      img: this.teamValues.img,
      nameError: '',
      imgError: ''
    }
  },
  computed: {
    isSaveDisabled () {
      return !this.img || !this.name || !!this.imgError || !!this.nameError
    }
  },
  methods: {
    handleSave () {
      this.validateName()
      this.validateUrl()
      if (this.isSaveDisabled) { return }
      this.$emit('onSave', { name: this.name, img: this.img })
    },
    validateName () {
      if (this.name === '') {
        return (this.nameError = 'Required')
      }
      return (this.nameError = '')
    },
    validateUrl () {
      if (this.img === '') {
        return (this.imgError = 'Required')
      }
      if (!/^(https?):\/\/[^\s$.?#].[^\s]*$/.test(this.img)) {
        return (this.imgError = 'Not a valid Url')
      }
      return (this.imgError = '')
    }
  }
})
</script>
