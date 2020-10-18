import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

import './assets/highlighter.css'
import './assets/tooltip.css'
import 'bulma/css/bulma.css'

import DataCode from './components/preset/DataCode'
import DataLsp from './components/preset/DataLsp'
import DataErr from './components/preset/DataErr'

//#region Komponen Form
import FTombol from './components/FTombol'
import FInput from './components/FInput'
import FTeksArea from './components/FTeksArea'
import FPilihan from './components/FPilihan'
//#endregion Komponen Form

//#region Vuex Store
import pengguna from './store/pengguna'
import notifikasi from './store/notifikasi'
import proses from './store/proses'
import kode from './store/kode'
//#endregion Vuex Store

Vue.config.productionTip = false

Vue.use(Vuex)

Vue.component(DataCode.name, DataCode)
Vue.component(DataLsp.name, DataLsp)
Vue.component(DataErr.name, DataErr)

Vue.component(FTombol.name, FTombol)
Vue.component(FInput.name, FInput)
Vue.component(FTeksArea.name, FTeksArea)
Vue.component(FPilihan.name, FPilihan)

const store = new Vuex.Store({
  state() {
    return {}
  },
  modules: {
    pengguna,
    notifikasi,
    proses,
    kode
  }
})

new Vue({
  render: h => h(App),
  store: store
}).$mount('#app')
