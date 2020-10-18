<template>
  <div class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Daftar / Masuk</p>
        <button class="delete" @click="$emit('close')"></button>
      </header>
      <section class="modal-card-body">
        <v-pengguna />
      </section>
      <footer class="modal-card-foot">
        <u-notifikasi />
        <u-proses />
      </footer>
    </div>
  </div>
</template>

<script>
import VPengguna from "./VPengguna";
import UNotifikasi from "../UNotifikasi";
import UProses from "../UProses";

export default {
  name: "DPengguna",
  components: {
    VPengguna,
    UNotifikasi,
    UProses,
  },
};
</script>