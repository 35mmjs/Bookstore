import { Modal } from 'antd'

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

const isPromise = promiseLike => promiseLike && typeof promiseLike.then === 'function' && typeof promiseLike.catch === 'function'

const promiseLike = target => isPromise(target) ? target : ({ then: fn => fn(target) })

const composeAsync = (...list) => (...args) => list.length > 0 ? promiseLike(list[0](...args)).then(() => composeAsync(...list.slice(1))(...args)) : undefined

const unique = (arr) => arr.reduce((res, v) => res.includes(v) ? res : res.concat([v]), [])

const map = (obj, fn) => Object.keys(obj).reduce((output, key, index) => output.concat(fn(obj[key], key, index)), [])

const isEmpty = (obj) => Object.keys(obj).length === 0

const obj2arr = (obj) => Object.keys(obj).map(k => obj[k])

const removeConfirm = () => new Promise((resolve, reject) => Modal.confirm({ title: '确定要删除吗', content: '', onOk: () => { resolve() }, onCancel: () => { reject() } }))

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
  composeAsync,
  isPrefix,
  removeConfirm,
  obj2arr,
}
