<template>
  <div 
    class="notification is-info" 
    v-show="$store.state.notifikasi.apakahTampil">
    <button class="delete"></button>
    {{ $store.state.notifikasi.pesan }}
  </div>
</template>

<script>
export default {
  name: 'UNotifikasi'
}
</script>