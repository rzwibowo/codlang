<template>
  <section>
    <f-teks-area
      :value="inputKode"
      label="Input Kode"
      @input="$emit('update:inputKode', $event)" 
    />
    <u-kode
      :kode="hasilSorot"
      :bahasa-pemrograman="bahasa" 
    />
  </section>
</template>

<script>
import UKode from '../UKode'

import { validator } from '../../utils'

export default {
  components: {
    UKode
  },
  props: {
    inputKode: {
      default: '',
      required: true,
      validator
    },
    hasilSorot: {
      type: String,
      default: '',
      required: true
    },
    bahasa: {
      default: '',
      required: true,
      validator
    }
  }
}
</script>