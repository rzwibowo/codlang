<template>
  <div 
		class="notification is-info is-light"
		v-show="$store.state.proses.apakahProsesTampil">
    <button class="delete"></button>
    Menghubungi server...
  </div>
</template>

<script>
export default {
	name: 'UProses'
}
</script>