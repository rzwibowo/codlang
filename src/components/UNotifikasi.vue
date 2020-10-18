<template>
  <div
    class="notification is-info custom-notif"
    v-show="$store.state.notifikasi.apakahTampil"
  >
    {{ $store.state.notifikasi.pesan }}
  </div>
</template>

<script>
export default {
  name: "UNotifikasi",
};
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