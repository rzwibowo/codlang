<template>
  <section>
    <u-kode
      v-for="itemKode in $store.state.kode.daftarKode"
      :key="itemKode.id"
      :id-kode="itemKode.id"
      :kode="itemKode.code"
      :bahasa-pemrograma="itemKode.lang"
      :apakah-highlight-menyala="apakahHighlightMenyala"
      @terhapus="dapatkanDaftarKode"
    />
  </section>
</template>

<script>
import UKode from '../UKode'

export default {
  components: {
    UKode
  },
  props: {
    apakahHighlightMenyala: {
      type: Number,
      default: 1,
      required: true
    },
    dapatkanDaftarKode: {
      type: Function,
      default() {
        return () => {}
      },
      required: true
    }
  }
}
</script>