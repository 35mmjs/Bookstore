import { useState } from 'react'
// import Parameter from 'parameter'
import { mapValues, each, pick } from '../common/utils'
import validates from '../../validates'

// const parameter = new Parameter()
const defaultTransform = (value, validator) => validator.type === 'string' && value ? value.trim() : value

// TODO 后边做i18n转换
function errorTranslate(msg, validator) {
  if (msg === 'should not be empty' || msg === 'required') return '不能为空'
  if (/bigger than/.test(msg)) return `长度不能少于${validator.min}位`
  if (/smaller than/.test(msg)) return `长度不能超过${validator.max}位`
  if (/should match/.test(msg)) return '格式不正确'
  return msg
}
/**
 * @param {String} ruleKey - app/validates文件下边的对应的名字，如 'user', 内部会自动去做索引
 * @param {Function} handleSubmit
 * @param {Object} extendRules
 * validate目前支持的选项:
 * - type 'string'
 * - max
 * - min
 * - format
 * - required 是否必选
 * - transform 转换
 * - default 初始值
 * 更多规则参见： https://github.com/node-modules/parameter
 */
export default function useFormState(ruleKey, handleSubmit, extendRules = {}) {
  if (!validates[ruleKey]) throw new Error(`Unknown validate key ${ruleKey}`)
  const validators = { ...validates[ruleKey], ...extendRules }
  let hasError = false
  // 表单校验, TODO 支持异步校验
  function check(validator, key, value) {
    // const errors = parameter.validate({ data: validator }, { data: value })
    const errors = ''
    if (errors) {
      hasError = true
      return errorTranslate(errors[0].message, { ...validator, required: validator.required || false })
    }
    return ''
  }
  const formItems = mapValues(validators, (validator, key) => {
    // checked代表是否已经输入过了
    const [stateValue, onStateChange] = useState({ checked: false, inputValue: validator.default })
    const { checked, inputValue } = stateValue
    const value = validator.transform ? validator.transform(inputValue, validator) : defaultTransform(inputValue, validator)
    const error = checked ? check(validator, key, value) : ''
    return {
      validateStatus: error ? 'error' : '',
      help: error || '',
      value,
      onChange(e) {
        if (e && e.target && typeof e.stopPropagation === 'function') {
          if (e.target.type === 'checkbox') {
            return onStateChange({ checked: true, inputValue: e.target.checked })
          }
          return onStateChange({ checked: true, inputValue: e.target.value })
        }
        return onStateChange({ checked: true, inputValue: e })
      },
      onStateChange,
      stateValue,
    }
  })
  return {
    // 用于formItem上的错误信息提醒描述
    getValidateStatus(key) {
      if (!formItems[key]) throw new Error(`Unknown form decorator "${key}" from "${ruleKey}[${Object.keys(validators)}]".`)
      return pick(formItems[key], ['validateStatus', 'help'])
    },
    getInputProps(key) {
      if (!formItems[key]) throw new Error(`Unknown form decorator "${key}" from "${ruleKey}[${Object.keys(validators)}]".`)
      return pick(formItems[key], ['value', 'onChange'])
    },
    hasError,
    reset() {
      each(formItems, (obj, key) => obj.onStateChange({ inputValue: validators[key].default, checked: false }))
    },
    submit() {
      // 强制校验一次并触发表单更新
      each(formItems, (obj, key) => {
        check(validators[key], key, obj.value)
        obj.onStateChange({ ...obj.stateValue, checked: true })
      })
      if (hasError) return
      if (handleSubmit) handleSubmit(mapValues(formItems, obj => obj.value))
    },
  }
}
