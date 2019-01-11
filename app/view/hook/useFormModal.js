import useModal from './useModal'
import useForm from './useForm'
/* eslint-disable no-use-before-define */

/**
 * 表单弹窗
 *
 * @param {String} name - 后台validates对应的Schema名字
 * @param {Object} schema - 自定义shcema
 * @param handleSubmit
 * @param values - 表单输入值
 * @return {{modal: *, modalShow: modalShow}}
 *
 * @example
 * function YourComp() {
 *    const { modal, modalShow } = useFormModal({ name: 'user', handleSubmit: () => {} })
 *    return (
 *      <div>
 *        <Button onClick={() => modalShow('用户登录', { username: '默认名字' })} >点击弹出登录</Button>
 *        {modal}
 *      </div>
 *    )
 * }
 */
export default function useFormModal({ name, schema, handleSubmit }) {
  const { submit, getForm, hasError, reset, setValues } = useForm({
    name,
    schema,
    async handleSubmit(data) {
      modalLoading()
      try {
        await handleSubmit(data)
      } finally {
        modalLoaded()
      }
      reset()
      modalHide()
    },
  })
  const { modal, modalShow, modalHide, modalLoading, modalLoaded } = useModal({
    disabled: hasError,
    onOk: submit,
    onCancel: () => {
      reset()
      modalHide()
    },
    content: getForm,
  })
  return {
    modal,
    modalShow(title, values) {
      if (values) setValues(values)
      modalShow(title)
    },
  }
}
