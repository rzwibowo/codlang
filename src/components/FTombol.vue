<template>
  <button class="button" :class="kelasLain" @click="klikTombol" :disabled="isNonaktif">
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'FTombol',
  props: {
    kelasLain: {
      type: String,
      default: '',
    },
    isNonaktif: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      required: true,
      default: "",
    },
  },
  methods: {
    klikTombol: function (event) {
      this.$emit('klik', event)
    }
  }
};
</script>