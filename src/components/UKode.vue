<template>
  <div>
    <data-code
      :code="kode"
      :lang="bahasaPemrograman"
      :is-highlighted="apakahHighlightMenyala"
    />
    <button v-if="idKode" @click="hapus" class="button">Hapus</button>
  </div>
</template>

<script>
import { validator } from '../utils'

export default {
  name: 'UKode',
  props: {
    idKode: {
      type: String,
      default: null
    },
    kode: {
      default: '',
      required: true,
      validator
    },
    bahasaPemrograman: {
      default: '',
      required: true,
      validator
    },
    apakahHighlightMenyala: {
      type: Number,
      default: 1
    }
  },
  methods: {
    hapus: async function () {
      const hasilKonfirmasi = confirm('Apakah kamu yakin?')
      if (hasilKonfirmasi && this.idKode) {
        await this.$store.dispatch('kode/hapusKode', {
          idPengguna: this.$store.state.pengguna.idPengguna,
          idKode: this.idKode
        })
        await this.$emit('terhapus')
      }
    }
  }
}
</script>