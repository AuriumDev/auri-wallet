<script setup>

import { ref } from 'vue'
import ImportPage from './components/ImportPage.vue'
import MainPage from './components/MainPage.vue'
import { useEmitter } from './utils/globals.js'

const emitter = useEmitter()

const pageID = ref(0);

emitter.on("import", (privateKey) => {
  pageID.value = 1;
})

const balanceText = ref("0");

</script>

<template>
<div id="sidePanel">
    <div id="balanceContainer">
        <div>Balance:</div>
        <br>
        <div id="balance">{{balanceText || "0"}}</div>
        <div>&nbsp;Auri</div>
    </div>
</div>
<div id="mainPanel">

    <!-- <div id="walletAddr" style="color: white;">Wallet Address: Not active</div>             -->
    <ImportPage v-if="pageID === 0" />
    <MainPage v-else-if="pageID === 1" />
    <!-- <br>
    <br>
    <input type="text" placeholder="Recipient Address" />
    <input type="text" placeholder="Amount (AURI)" />
    <button id="sendBtn">Send</button>-->

</div>
</template>

<style>

@font-face {
  font-family: 'password';
  font-style: normal;
  font-weight: 400;
  src: url(/src/assets/password.ttf);
}

.text-hidden > .q-field__inner > .q-field__control > .col > .q-field__native {
  font-family:password;
}

html, body {
    margin: 0;
}

.mainPanelHeader {
  font-size: 30px;
  color: white;
  font-weight: 500;
  margin-top: 20px;
  margin-left: 55px;
}

.bg-none {
  background: rgba(255, 255, 255, 0.07) !important;
  color: white !important;
}

.bg-none-ext {
  background: rgba(255, 255, 255, 0.1) !important;
  color: white !important;

}

.bg-none-ext > .q-field__control-container > div {
  transition: box-shadow 0.36s cubic-bezier(0.4, 0, 0.2, 1), color 0.36s cubic-bezier(0.4, 0, 0.2, 1) || transform 0.36s cubic-bezier(0.4, 0, 0.2, 1), color 0.396s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.bg-none > .col > input, .bg-none > .col > div {
  color: white !important;
}

.bg-button-import {
  background: hsla(217, 17%, 26%, 1) !important;
}

#sidePanel {
    width: 250px;
    height: 100%;
    background-color: #2d343f;
    position: absolute;
}

#mainPanel {
    width: calc(100% - 250px);
    height: 100%;
    left: 250px;
    background-color: #222730;
    position: absolute;
}

#balanceContainer {
    margin-top: 50px;
    display: flex;
    align-items: center;
    flex-direction: column;
    font-size: 20px;
    font-family: 'Open Sans', sans-serif;
    color: #f3f3f3;
    text-align: center;
}

#balanceContainer > div {
    display: contents;
}

#balance {
    font-size: 25px;
    font-weight: 500;
}

#privKey {
    width: 475px;
}
</style>
