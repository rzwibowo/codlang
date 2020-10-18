<template>
  <div 
		class="notification is-info is-light custom-notif"
		v-show="$store.state.proses.apakahProsesTampil">
    Menghubungi server...
  </div>
</template>

<script>
export default {
	name: 'UProses'
}
</script>

<style>
.custom-notif {
  position: absolute !important;
  top: 1em;
  right: 0;
  max-width: 25em;
  z-index: 200;
  opacity: 0.7;
}
</style>