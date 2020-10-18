<template>
  <section>
    <div class="buttons">
      <f-tombol
        label="Sebelumnya"
        :is-nonaktif="halaman === 1"
        @klik="mundur"
      />
      <f-tombol label="Selanjutnya" @klik="maju" />
    </div>
    <div class="columns">
      <div class="column">
        <f-input
          :value="banyakData"
          label="Banyak Data"
          tipe="number"
          @input="$emit('update:banyakData', $event)"
        />
      </div>
      <div class="column">
        <f-pilihan
          :value="urutBerdasar"
          label="Urutkan Berdasar"
          :pilihans="daftarUrutBerdasar"
          :pilihan-objeks="true"
          @input="$emit('update:urutBerdasar', $event)"
        />
      </div>
      <div class="column">
        <f-pilihan
          :value="urutkan"
          label="Urutkan"
          :pilihans="daftarUrutan"
          :pilihan-objeks="true"
          @input="$emit('update:urutkan', $event)"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      daftarHighlightMenyala: [
        { nilai: 1, teks: 'Menyala' },
        { nilai: 0, teks: 'Tidak Menyala' }
      ],
      daftarUrutBerdasar: [
        { nilai: 'fileName', teks: 'Nama Berkas' },
        { nilai: 'lang', teks: 'Bahasa Pemrograman' },
        { nilai: 'createdAt', teks: 'Kapan Dibuat' }
      ]
    }
  },
  props: {
    halaman: {
      type: Number,
      required: true,
      default: 1
    },
    banyakData: {
      type: Number,
      required: true,
      default: 5
    },
    urutBerdasar: {
      type: String,
      required: true,
      default: 'fileName'
    },
    urutkan: {
      type: String,
      required: true,
      default: 'DESC'
    },
    apakahHighlightMenyala: {
      type: Number,
      required: true,
      default: 1
    }
  },
  computed: {
    daftarUrutan() {
      if (this.urutBerdasar === 'createdAt') {
        return [
          { nilai: 'ASC', teks: 'Terlama' },
          { nilai: 'DESC', teks: 'Terbaru' }
        ]
      }
      return [
        { nilai: 'ASC', teks: 'A-Z' },
        { nilai: 'DESC', teks: 'Z-A' }
      ]
    }
  },
  methods: {
    mundur: function () {
      if (this.halaman - 1 < 1) {
        return
      }
      this.$emit('update:halaman', this.halaman - 1)
    },
    maju: function () {
      this.$emit('update:halaman', this.halaman + 1)
    }
  }
}
</script>