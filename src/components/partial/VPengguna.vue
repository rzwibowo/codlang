<template>
  <section>
    <f-input label="Login Pengguna" v-model="loginPengguna" />
    <f-tombol label="Masuk" class="is-primary" @klik="masuk" />

    <f-input label="Daftar Pengguna Baru" v-model="daftarPengguna" />
    <f-tombol label="Daftar" class="is-primary" @klik="daftar" />
  </section>
</template>

<script>
export default {
  data() {
    return {
      loginPengguna: 'alien',
      daftarPengguna: null
    }
  },
  methods: {
    masuk: function () {
      this.$store.dispatch('pengguna/masuk', {
        namaPengguna: this.loginPengguna
      })
    },
    daftar: function () {
      this.$store.dispatch('pengguna/daftar', {
        namaPengguna: this.daftarPengguna
      })
    }
  }
}
</script>