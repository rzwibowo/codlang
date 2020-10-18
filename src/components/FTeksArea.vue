<template>
  <div class="field">
    <div class="control">
      <label class="label">{{ label }}</label>
      <textarea
        class="textarea"
        :value="value"
        :class="kelasLain"
        @input="diubah"
      ></textarea>
    </div>
  </div>
</template>

<script>
import { formulir } from '../mixins'

export default {
  name: 'FTeksArea',
  mixins: [formulir],
  props: {
    kelasLain: {
      type: String,
      default: '',
    }
  },
  methods: {
    diubah: function (event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>