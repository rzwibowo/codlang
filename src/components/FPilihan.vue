<template>
  <div class="field">
    <div class="control">
      <label class="label">{{ label }}</label>
      <div class="select" :class="kelasLain" @change="diubah">
        <select>
          <option value="">Pilih</option>
          <option
            v-for="(pilihan, index) in pilihans"
            :key="index"
            :value="nilaiPilihan(pilihan)"
            :selected="apakahTerpilih(pilihan)"
          >
            {{ tampilanPilihan(pilihan) }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { formulir } from "../mixins";

export default {
  name: "FPilihan",
  mixins: [formulir],
  props: {
    kelasLain: {
      type: String,
      default: '',
    },
    pilihans: {
      type: Array,
      required: true,
      default: function () {
        return [];
      },
    },
    pilihanObjeks: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    apakahTerpilih: function () {
      return (pilihan) => {
        if (this.pilihanObjeks) {
          return this.value === pilihan.nilai;
        }
        return this.value === pilihan;
      };
    },
    tampilanPilihan: function () {
      return (pilihan) => {
        if (this.pilihanObjeks) {
          return pilihan.teks;
        }
        return pilihan;
      };
    },
    nilaiPilihan: function () {
      return (pilihan) => {
        if (this.pilihanObjeks) {
          return pilihan.nilai;
        }
        return pilihan;
      };
    },
  },
  methods: {
    diubah: function (event) {
      event.target.value && event.target.value.length > 0
        ? this.$emit("input", event.target.value)
        : this.$emit("input", null);
    },
  },
};
</script>