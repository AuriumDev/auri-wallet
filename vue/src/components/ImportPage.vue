<script setup>

import { getRandomBytes, U8Conversion_Hex, encodeAddress } from '../utils'
import blake2b from '../utils/blake2b'
import ed25519 from '../utils/ed25519'

import { ref } from 'vue'
import { useEmitter, useWalletData } from '../utils/globals.js'

const emitter = useEmitter()

const walletData = useWalletData();

const privateKeyValue = ref('');

const PrivKeyRegex = /[0-9A-Fa-f]{64}/;

function genRandom() {
  const bytes = getRandomBytes(32);
  privateKeyValue.value = U8Conversion_Hex.to(bytes);
}

function activate() {
  const value = privateKeyValue.value;
  if (!PrivKeyRegex.test(value)) return;

  const privateKey = U8Conversion_Hex.from(value);
  const scalarKey = blake2b.blake2b(privateKey);
  const publicKey = ed25519.getPublicKey(scalarKey);
  const address = encodeAddress(publicKey);

  console.log(address)

  walletData.value = {
    privateKey,
    scalarKey,
    publicKey,
    address
  }

  emitter.emit("import");
}
</script>

<template>
<div class="mainPanelHeader">Import Private Key</div>
<div class="importContainer">
  <q-input standout="bg-none-ext" bg-color="none"  v-model="privateKeyValue" label="Private Key" :dark="true" :rules="[ val => PrivKeyRegex.test(val) || 'Private Key is expected to be a 64 character hexadecimal value.']" >
    <template v-slot:prepend>
      <q-icon color="blue-grey-3" name="key" size="xs" />
    </template>
  </q-input>
  <div class="importContainer-buttons">
    <q-btn color="button-import" @click="activate" label="Activate Wallet" />
    <q-btn color="button-import" @click="genRandom" label="Generate Private Key" />
  </div>
</div>
</template>

<style>

.importContainer {
  margin: 50px;
  margin-top: 30px;
  padding: 50px;
  width: calc(100% - 100px);
  border-radius: 5px;
  background-color: #3b4554 !important;
}

.importContainer-buttons {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 15px;
}

.importContainer-buttons > button {
  font-weight: 600;
}

.importContainer-buttons > button:last-child {
  margin-left: 5px;
}

.importContainer-buttons > button:first-child {
  margin-right: 5px;
}

</style>
