import { getCurrentInstance } from 'vue'

export function useEmitter() {
    const internalInstance = getCurrentInstance(); 
    const emitter = internalInstance.appContext.config.globalProperties.emitter;

    return emitter;
}

export function useWalletData() {
    const internalInstance = getCurrentInstance(); 
    const WalletData = internalInstance.appContext.config.globalProperties.WalletData;

    return WalletData;
}
