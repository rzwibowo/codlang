<template>
  <article class="message" :class="kelasLain">
    <div class="message-header">
      <p>{{ label }}</p>
    </div>
    <div class="message-body">
      <slot name="isi" />
    </div>
  </article>
</template>

<script>
export default {
  name: 'UMessage',
  props: {
    label: {
      type: String,
      required: true,
      default: ''
    },
    kelasLain: {
      type: String,
      default: ''
    }
  }
}
</script>