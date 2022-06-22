<script setup>
import { useEmitter, useWalletData } from '../utils/globals.js'
import { U8Conversion_Hex } from '../utils'
import { ref } from 'vue'

const walletData = useWalletData();

function truncateAddress(addr) {
    return addr.slice(0, 9) + "..." + addr.slice(-5);
}

const showSecKey = ref(false);
</script>
<template>
<div class="mainPanelHeader">Wallet - {{truncateAddress(walletData.address)}}</div>
<div class="importContainer">
    <q-field style="margin-bottom: 15px;" stack-label standout="bg-none-ext" bg-color="none" label="Address" :dark="true"  >
        <template v-slot:prepend>
            <q-icon color="blue-grey-3" name="wallet" size="xs" />
        </template>
        <template v-slot:control>
          {{walletData.address}}
        </template>
    </q-field>
    <q-field stack-label standout="bg-none-ext" bg-color="none" label="Private Key" :dark="true" :class="showSecKey ? '' : 'text-hidden'" :type="showSecKey ? 'text' : 'password'"  >
        <template v-slot:prepend>
            <q-icon color="blue-grey-3" name="key" size="xs" />
        </template>
        <template v-slot:control>
          {{U8Conversion_Hex.to(walletData.privateKey)}}
        </template>
    </q-field>
</div>
</template>