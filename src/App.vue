<template>
  <div id="app">
    <u-navigasi @open="isOpen=true" @keluar="direset" />
    
    <div class="container">
      <d-pengguna :class="{'is-active': isOpen}" @close="isOpen=false" />
  
      <u-message label="Editor Kode" kelas-lain="is-primary">
        <template #isi>
          <v-pilihan-editor
            :input-kode="dataKode.inputKode"
            :bahasa.sync="dataKode.bahasa"
            :twoslash.sync="dataKode.twoslash"
            :nama-berkas.sync="dataKode.namaBerkas"
            :sorotan.sync="dataKode.sorotan"
            :hasil-sorot.sync="hasilSorot"
            @tersimpan="getKode"
            @reset="direset"
          />
      
          <v-editor
            :input-kode.sync="dataKode.inputKode"
            :hasil-sorot="hasilSorot"
            :bahasa="dataKode.bahasaPemrogramanTerpilih"
          />
        </template>
      </u-message>
  
      <div v-if="$store.state.pengguna.idPengguna">
        <u-message label="Daftar Kode">
          <template #isi>
            <v-pilihan-daftar-kode
              :halaman.sync="filter.halaman"
              :banyak-data.sync="filter.banyakData"
              :urut-berdasar.sync="filter.urutkanBerdasarkan"
              :urutkan.sync="filter.urutkan"
              :apakah-highlight-menyala.sync="filter.apakahHighlightMenyala"
            />
            <v-daftar-kode
              :apakah-highlight-menyala="filter.apakahHighlightMenyala"
              :dapatkan-daftar-kode="getKode"
            />
          </template>
        </u-message>
      </div>
  
      <u-notifikasi />
      <u-proses />
    </div>
  </div>
</template>

<script>
import { stringifyUrl } from 'query-string'
import debounce from 'debounce-fn'

import DPengguna from './components/partial/DPengguna'
import VPilihanEditor from './components/partial/VPilihanEditor'
import VEditor from './components/partial/VEditor'
import VPilihanDaftarKode from './components/partial/VPilihanDaftarKode'
import VDaftarKode from './components/partial/VDaftarKode'

import UNavigasi from './components/UNavigasi'
import UNotifikasi from './components/UNotifikasi'
import UProses from './components/UProses'
import UMessage from './components/UMessage'

import { kirimData } from './utils'
import { URL_API, OPSI_STRINGIFY } from './constants'

export default {
  name: 'App',
  components: {
    DPengguna,

    VPilihanEditor,
    VEditor,
    VPilihanDaftarKode,
    VDaftarKode,

    UNotifikasi,
    UProses,
    UNavigasi,
    UMessage
  },
  data: function () {
    return {
      isOpen: false,
      dataKode: {
        inputKode: null,
        bahasa: null,
        namaBerkas: null,
        sorotan: null,
        twoslash: null,
      },
      hasilSorot: '',
      filter: {
        halaman: 1,
        banyakData: 6,
        urutkanBerdasarkan: 'createdAt',
        urutkan: 'DESC',
        apakahHighlightMenyala: 1,
      },
    }
  },
  watch: {
    '$store.state.pengguna.idPengguna'(idPengguna) {
      if (idPengguna) {this.getKode()}
    },
    dataKode: {
      handler: debounce(function (dataKode) {
        this.hasilSorot = ''
        this.penyorot(dataKode.inputKode)
      }, {wait: 500}),
      deep: true
    },
    filter: {
      handler: debounce(function () {
        this.getKode()
      }, {wait: 500}),
      deep: true
    }
  },
  created: async function () {
    await this.getKode()
  },
  methods: {
    direset: function () {
      this.dataKode = {
        inputKode: null,
        bahasa: null,
        namaBerkas: null,
        sorotan: null,
        twoslash: null,
      }
    },
    getKode: async function () {
      await this.$store.dispatch('kode/dapatkanSemuaKode', {
        idPengguna: this.$store.state.pengguna.idPengguna,
        filter: {
          halaman: this.filter.halaman,
          banyakData: this.filter.banyakData,
          urutkanBerdasarkan: this.filter.urutkanBerdasarkan,
          urutkan: this.filter.urutkan,
          apakahHighlightMenyala: this.filter.apakahHighlightMenyala,
        },
      })
    },
    penyorot: async function (inputKode, download) {
      try {
        this.$store.dispatch('proses/tampilkanProses', null)
        const objekUrl = {
          url: URL_API,
          query: {
            lang: this.dataKode.bahasaPemrogramanTerpilih,
            fileName: this.dataKode.namaBerkas,
            highlight: this.dataKode.highlight,
            twoslash: this.dataKode.twoslashTerpilih,
            download
          }
        }
        const url = stringifyUrl(objekUrl, OPSI_STRINGIFY)

        const respon = await kirimData(url, {
          code: inputKode
        })

        if (respon.success && !respon.error) {
          this.hasilSorot = respon.data
        } else {
          throw new Error(respon.message)
        }
      } catch (error) {
        const dataNotifikasiGalat = {
          apakahTampil: true,
          pesan: error.message || 'Bahasa Pemrograman dan Kode wajib diisi'
        }
        this.$store.dispatch('notifikasi/tampilkanNotifikasi', dataNotifikasiGalat)
        console.log(error)
      } finally {
        this.$store.dispatch('proses/hilangkanProses', null)
      }
    }
  },
}
</script>