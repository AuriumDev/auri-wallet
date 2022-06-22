class U8Conversion_Hex {
    static to(array) {
        return [...array].map(x=>x.toString(16).padStart(2, "0")).join("").toUpperCase();
    }
    static from(hex) {
        return new Uint8Array(hex.match(/.{1,2}/g).map(x=>parseInt(x, 16)));
    }
}

function encodeAddress(publicKey) {
    const checksum = blake2b.blake2b(publicKey, null, 8);

    const inputU8Array = new Uint8Array(40);
    inputU8Array.set(publicKey);
    inputU8Array.set(checksum, 32);

    return "aur_" + binary_to_base58(inputU8Array);
}

function decodeAddress(address) {
    if (!address.startsWith("aur_")) throw Error("Address isn't an Aurium Address");
    const decoded = Buffer.from(
        base58_to_binary(address.slice(4))
    );

    let checksum = blake2.createHash('blake2b', { digestLength: 8 });
    checksum.update(decoded.subarray(0, 32));
    checksum = checksum.digest();

    if (checksum.equals(decoded.subarray(32))) {
        return decoded.subarray(0, 32);
    } else {
        throw Error("Address is corrupted");
    }
}

window.addEventListener("load", () => {
    const walletData = {
        scalarKey: null,
        privateKey: null,
        publicKey: null,
        address: null
    };

    window.walletData = walletData; // Expose walletData to window.

    const walletAddrDiv = document.getElementById("walletAddr");
    const accBtn = document.getElementById("accBtn");
    const genBtn = document.getElementById("genBtn");
    const privKeyInput = document.getElementById("privKey");

    genBtn.addEventListener("click", () => {
        const randomHex = U8Conversion_Hex.to(crypto.getRandomValues(new Uint8Array(32)));
        privKeyInput.value = randomHex;
    })

    accBtn.addEventListener("click", () => {
        const value = privKeyInput.value;
        if (!/^[0-9a-fA-F]{64}$/.test(value)) return;

        const privateKey = U8Conversion_Hex.from(value);
        const scalarKey = blake2b.blake2b(privateKey);
        const publicKey = ed25519.getPublicKey(scalarKey);
        const address = encodeAddress(publicKey);

        walletData.privateKey = privateKey;
        walletData.scalarKey = scalarKey;
        walletData.publicKey = publicKey;
        walletData.address = address;

        walletAddrDiv.innerText = "Wallet Address: " + address;

    })

});
