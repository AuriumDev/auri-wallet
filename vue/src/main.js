import { createApp, ref } from 'vue'
import { Quasar } from 'quasar'
import App from './App.vue'

const vueApp = createApp(App);

import 'quasar/src/css/index.sass'
import '@quasar/extras/material-icons/material-icons.css'
vueApp.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
})

import mitt from 'mitt';
const emitter = mitt();

vueApp.config.globalProperties.emitter = emitter;
vueApp.config.globalProperties.WalletData = ref({
    privateKey: null,
    scalarKey: null,
    publicKey: null,
    address: null
});

window.WalletData = vueApp.config.globalProperties.WalletData;

vueApp.mount('body');
