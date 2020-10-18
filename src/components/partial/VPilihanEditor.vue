<template>
  <section>
    <div class="columns">
      <div class="column">
        <f-pilihan
          :value="bahasa"
          label="Pilih Bahasa Pemrograman"
          :pilihans="pilihanBahasas"
          @input="$emit('update:bahasa', $event)"
        />
      </div>
      <div class="column">
        <f-pilihan
          v-if="bahasa === 'typescript' || bahasa === 'json'"
          :value="twoslash"
          label="Pilih Twoslash"
          :pilihans="pilihanTwoslashs"
          @input="$emit('update:twoslash', $event)"
        />
      </div>
      <div class="column">
        <f-input
          :value="namaBerkas"
          label="Nama Berkas"
          @input="$emit('update:namaBerkas', $event)"
        />
      </div>
      <div class="column is-2">
        <f-input
          :value="sorotan"
          label="Baris yang Disorot"
          @input="$emit('update:sorotan', $event)"
        />
      </div>
    </div>
    <div class="buttons">
      <f-tombol label="Reset" @klik="$emit('reset')" />
      <f-tombol
        v-if="hasilSorot && hasilSorot.length > 0"
        label="Unduh"
        @klik="unduh"
        class="is-primary"
      />
      <f-tombol
        v-if="$store.state.pengguna.idPengguna"
        label="Simpan"
        @klik="simpan"
        class="is-primary"
      />
    </div>
  </section>
</template>

<script>
import { stringifyUrl } from 'query-string'
import cleanDeep from 'clean-deep'

import { validator, dapatkanOpsi, unduhKode } from '../../utils'
import { URL_API, OPSI_STRINGIFY } from '../../constants'

import FTombol from '../FTombol'
import FInput from '../FInput'
import FPilihan from '../FPilihan'

export default {
  components: {
    FTombol,
    FInput,
    FPilihan
  },
  data: function () {
    return {
      pilihanBahasas: [],
      pilihanTwoslashs: ['twoslash', 'tsconfig']
    }
  },
  props: {
    inputKode: {
      required: true,
      validator
    },
    bahasa: {
      required: true,
      validator
    },
    twoslash: {
      required: true,
      validator
    },
    namaBerkas: {
      required: true,
      validator
    },
    sorotan: {
      required: true,
      validator
    },
    hasilSorot: {
      required: true,
      validator
    }
  },
  created: function () {
    this.getBahasas()      
  },
  methods: {
    getBahasas: async function () {
      try {
        const respon = await dapatkanOpsi()
          if (respon.success && !respon.error) {
            this.pilihanBahasas = respon.data.languages
          }
      } catch (err) {
        const notifError = {
          apakahTampil: true,
          pesan: err.message
        }
        this.$store.dispatch('notifikasi/tampilkanNotifikasi', notifError)
        console.error(err)
      }
    },
    unduh: async function () {
      try {
        this.$store.dispatch('proses/tampilkanProses', null)
        const objekUrl = {
          url: URL_API,
          query: {
            lang: this.bahasa,
            fileName: this.namaBerkas,
            highlight: this.sorotan,
            twoslash: this.twoslash,
            download: 1
          }
        }
        const url = stringifyUrl(objekUrl, OPSI_STRINGIFY)
        await unduhKode(url, {
          code: this.inputKode
        })
    } catch (err) {
      const notifError = {
        apakahTampil: true,
        pesan: err.message || 'Gagal mengunduh'
      }
      this.$store.dispatch('notifikasi/tampilkanNotifikasi', notifError)
      console.error(err)
    } finally {
      this.$store.dispatch('proses/hilangkanProses', null)
    }
  },
  simpan: async function () {
    try {
      const konten = cleanDeep({
        kode: this.inputKode,
        bahasaPemrograman: this.bahasa,
        highlight: this.sorotan,
        namaBerkas: this.namaBerkas,
        twoslash: this.twoslash
      })
      await this.$store.dispatch('kode/simpanKode', {
        idPengguna: this.$store.state.pengguna.idPengguna,
        konten: konten
      })
      await this.$emit('tersimpan')
    } catch (err) {
      const notifError = {
        apakahTampil: true,
        pesan: err.message || 'Gagal menyimpan'
      }
      this.$store.dispatch('notifikasi/tampilkanNotifikasi', notifError)
      console.error(err)
    }
  }
  }
}
</script>