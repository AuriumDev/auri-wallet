import base58 from "./base58";
import blake2b from '../utils/blake2b'

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

    return "aur_" + base58.binary_to_base58(inputU8Array);
}

function getRandomBytes(size) {
    return crypto.getRandomValues(new Uint8Array(size));
}

function isArrayEqual(a, b) {
    const ALength = a.length;
    const BLength = b.length;
    if (ALength !== BLength) return false;
    for (var i = 0; i < ALength; i++) {
        if (a[i] !== b[i]) return false;
    }

    return true;
}

function decodeAddress(address) {
    if (!address.startsWith("aur_")) throw Error("Address isn't an Aurium Address");
    const decoded = base58.base58_to_binary(address.slice(4));

    const publicKey = decoded.subarray(0, 32);
    const checksum = blake2b.blake2b(publicKey, null, 8);

    if (isArrayEqual(checksum, decoded.subarray(32))) {
        return publicKey;
    } else {
        throw Error("Address is corrupted");
    }
}

export {
    U8Conversion_Hex,
    encodeAddress,
    decodeAddress,
    getRandomBytes
}
