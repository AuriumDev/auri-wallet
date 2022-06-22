'use strict';
(function () {
const base58_chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

/**
 * Converts a `base58` string to its corresponding binary representation.
 * @kind function
 * @name base58_to_binary
 * @param {base58_chars} base58String base58 encoded string
 * @returns {Uint8Array} binary representation for the base58 string.
 * @example <caption>Ways to `import`.</caption>
 * ```js
 * import { base58_to_binary } from 'base58-js'
 * ```
 * @example <caption>Ways to `require`.</caption>
 * ```js
 * const { base58_to_binary } = require('base58-js')
 * ```
 * @example <caption>Usage.</caption>
 * ```js
 * const bin = base58_to_binary("6MRy")
 * console.log(bin)
 * ```
 * Logged output will be Uint8Array(3) [15, 239, 64].
 */
const base58_to_binary = base58String => {
  if (!base58String || typeof base58String !== 'string')
    throw new Error(`Expected base58 string but got “${base58String}”`)
  if (base58String.match(/[IOl0]/gmu))
    throw new Error(
      `Invalid base58 character “${base58String.match(/[IOl0]/gmu)}”`
    )
  const lz = base58String.match(/^1+/gmu)
  const psz = lz ? lz[0].length : 0
  const size =
    ((base58String.length - psz) * (Math.log(58) / Math.log(256)) + 1) >>> 0

  return new Uint8Array([
    ...new Uint8Array(psz),
    ...base58String
      .match(/.{1}/gmu)
      .map(i => base58_chars.indexOf(i))
      .reduce((acc, i) => {
        acc = acc.map(j => {
          const x = j * 58 + i
          i = x >> 8
          return x
        })
        return acc
      }, new Uint8Array(size))
      .reverse()
      .filter(
        (
          lastValue => value =>
            (lastValue = lastValue || value)
        )(false)
      )
  ])
}

window.base58_to_binary = base58_to_binary

const create_base58_map = () => {
  const base58M = Array(256).fill(-1)
  for (let i = 0; i < base58_chars.length; ++i)
    base58M[base58_chars.charCodeAt(i)] = i

  return base58M
}

const base58Map = create_base58_map()

/**
 * Converts a [Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) into a base58 string.
 * @kind function
 * @name binary_to_base58
 * @param {Uint8Array | Array} uint8array Unsigned integer.
 * @returns {base58_chars} The base58 string representation of the binary array.
 * @example <caption>Ways to `require`.</caption>
 * ```js
 * const { binary_to_base58 } = require("base58-js")
 * ```
 * @example <caption>Ways to `import`.</caption>
 * ```js
 * import { binary_to_base58 } from 'base58-js'
 * ```
 * @example <caption>Usage.</caption>
 * ```js
 * const str = binary_to_base58([15, 239, 64])
 * console.log(str)
 * ```
 * Logged output will be 6MRy.
 */
const binary_to_base58 = uint8array => {
  const result = []

  for (const byte of uint8array) {
    let carry = byte
    for (let j = 0; j < result.length; ++j) {
      const x = (base58Map[result[j]] << 8) + carry
      result[j] = base58_chars.charCodeAt(x % 58)
      carry = (x / 58) | 0
    }
    while (carry) {
      result.push(base58_chars.charCodeAt(carry % 58))
      carry = (carry / 58) | 0
    }
  }

  for (const byte of uint8array)
    if (byte) break
    else result.push('1'.charCodeAt(0))

  result.reverse()

  return String.fromCharCode(...result)
}

window.binary_to_base58 = binary_to_base58

})();
