const objKeys = Object.keys

const reduce = (obj = {}, fn, origin) => objKeys(obj).reduce((res, key) => fn(res, obj[key], key), origin)

const mapValues = (obj, fn) => reduce(obj, (res, val, key) => Object.assign(res, { [key]: fn(val, key) }), {})

const mapKeys = (obj, fn) => reduce(obj, (res, val, key) => Object.assign(res, { [fn(key)]: val }), {})

const each = (obj, fn) => reduce(obj, (res, val, key) => fn(val, key), {})

const filter = (obj, fn) => reduce(obj, (res, val, key) => (fn(val, key) ? Object.assign(res, { [key]: val }) : res), {})

const pick = (obj, keys = []) => filter(obj, (val, key) => keys.indexOf(key) !== -1)

const omit = (obj, keys = []) => filter(obj, (val, key) => keys.indexOf(key) === -1)

const partial = (fn, ...argv) => (...rest) => fn.call(this, ...argv, ...rest)

const partialRight = (fn, ...argv) => (...rest) => fn.call(this, ...rest, ...argv)

const isPrefix = (str, prefix) => str.slice(0, prefix.length) === prefix

const compose = (...fns) => (...args) => fns.forEach(fn => fn(...args))

const promiseMap = (keys, fn) => Promise.all(keys.map(k => fn(k)))

const promiseChain = (...list) => list.length > 0 ? list[0]().then(() => promiseChain(...list.slice(1))) : undefined

const unique = (arr) => arr.reduce((res, v) => res.includes(v) ? res : res.concat([v]), [])

const map = (obj, fn) => Object.keys(obj).reduce((output, key, index) => output.concat(fn(obj[key], key, index)), [])

const isEmpty = (obj) => Object.keys(obj).length === 0
const obj2arr = (obj) => Object.keys(obj).map(k => obj[k])

export {
  reduce,
  mapValues,
  mapKeys,
  isEmpty,
  map,
  each,
  filter,
  pick,
  omit,
  partial,
  unique,
  partialRight,
  compose,
  isPrefix,
  promiseMap,
  promiseChain,
  obj2arr,
}
