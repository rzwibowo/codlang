<template>
  <div class="field">
    <label class="label">{{ label }}</label>
    <div class="control">
      <input class="input" :type="tipe" :value="value" @input="diubah" />
    </div>
  </div>
</template>

<script>
import { formulir } from '../mixins/index'

export default {
  name: 'FInput',
  mixins: [formulir],
  props: {
    tipe: {
      type: String,
      default: 'text'
    }
  },
  methods: {
    diubah: function (event) {
      this.tipe === 'number'
        ? this.$emit('input', parseInt(event.target.value))
        : this.$emit('input', event.target.value)
    }
  }
}
</script>