<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <img src="../assets/logo.png" height="28" />
      </a>

      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <f-tombol label="Daftar/Masuk" class="is-primary" @klik="$emit('open')" v-if="!$store.state.pengguna.idPengguna" />
            <f-tombol label="Keluar" class="is-outline" @klik="keluar" v-else />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'UNavigasi',
  methods: {
    keluar: function () {
      this.$store.dispatch('pengguna/keluar')
      this.$emit('keluar')
    }
  }
}
</script>