import React, { useState } from 'react'
import Parameter from 'parameter/index.es5'
import { Button, Input, Icon, Form, Select } from 'antd'
import { mapValues, each, pick, filter, obj2arr } from '../common/utils'
import { FORM_ITEM_LAYOUT_MODAL } from '../common/constant'
import validates from '../../validates'

const Option = Select.Option
const FormItem = Form.Item
const parameter = new Parameter()
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
 * @param {String} name - app/validates文件下边的对应的名字，如 'user', 内部会自动去做索引
 * @param {Object} schema
 * @param {Function} handleSubmit
 * @param {Function} onChange
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
export default function useForm({ name, handleSubmit, schema = {}, values = {}, onChange }) {
  if (name && !validates[name]) throw new Error(`Unknown validate key ${name}`)
  const validators = { ...validates[name], ...schema }
  let hasError = false
  // 表单校验, TODO 支持异步校验
  function check(validator, key, value) {
    // 隐藏字段不做校验
    if (validator.type === 'hidden') return ''
    if (validator.type === 'enum') {
      validator = { ...validator, values: validator.options.map(opt => opt.value) }
    }
    if (validator.type === 'json') {
      validator = { ...validator, type: 'string' }
    }
    const errors = parameter.validate({ data: validator }, { data: value })
    if (errors) {
      hasError = true
      return errorTranslate(errors[0].message, { ...validator, required: validator.required || false })
    }
    return ''
  }
  const formItems = mapValues(validators, (validator, key) => {
    // checked代表是否已经输入过了
    const [stateValue, onStateChange] = useState({ checked: false, inputValue: validator.default })
    let { checked, inputValue } = stateValue
    // 输入的表单值
    if (!checked && values[key] !== undefined) {
      checked = true
      inputValue = values[key]
    }
    const value = validator.transform ? validator.transform(inputValue, validator) : defaultTransform(inputValue, validator)
    const error = checked ? check(validator, key, value) : ''
    return {
      validator,
      placeholder: validator.placeholder,
      validateStatus: error ? 'error' : '',
      help: error || '',
      value,
      onChange(e) {
        let val = e
        if (e && e.target && typeof e.stopPropagation === 'function') {
          if (e.target.type === 'checkbox') {
            val = e.target.checked
          } else {
            val = e.target.value
          }
        }
        onStateChange({ checked: true, inputValue: val })
        if (onChange) onChange({ value: val, key, setValues: api.setValues })
      },
      onStateChange,
      stateValue,
    }
  })
  const api = {
    // 用于formItem上的错误信息提醒描述
    getStatus(key) {
      if (!formItems[key]) throw new Error(`Unknown form decorator "${key}" from "${schema}[${Object.keys(validators)}]".`)
      return pick(formItems[key], ['validateStatus', 'help'])
    },
    getProps(key) {
      if (!formItems[key]) throw new Error(`Unknown form decorator "${key}" from "${schema}[${Object.keys(validators)}]".`)
      return pick(formItems[key], ['value', 'onChange', 'placeholder'])
    },
    getForm() {
      return (
        <Form>
          {obj2arr(mapValues(filter(formItems, item => item.validator.type !== 'hidden'), (item, key) => {
            let content
            switch (item.validator.type) {
              case 'password':
                content = <Input type="password" {...api.getProps(key)} />
                break
              case 'enum':
                content = (
                  <Select {...api.getProps(key)}>
                    {item.validator.options.map(opt => (
                      <Option key={opt.value} value={opt.value}>{ opt.label}</Option>
                    ))}
                  </Select>
                )
                break
              case 'json':
                content = <Input.TextArea rows={4} {...api.getProps(key)} />
                break
              default:
                content = <Input {...api.getProps(key)} />
            }
            return (
              <FormItem key={key} {...api.getStatus(key)} {...FORM_ITEM_LAYOUT_MODAL} label={item.validator.label} required={item.validator.required}>
                {content}
              </FormItem>
            )
          }))}
        </Form>
      )
    },
    hasError,
    reset() {
      each(formItems, (obj, key) => obj.onStateChange({ inputValue: validators[key].default, checked: false }))
    },
    setValues(data) {
      each(data, (val, key) => {
        if (formItems[key]) {
          formItems[key].onStateChange({ inputValue: val, checked: true })
        }
      })
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
  return api
}
