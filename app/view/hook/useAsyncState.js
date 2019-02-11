import React, { useState } from 'react'

export default function useAsyncState(asyncFn, defaultValue = {}, loadingInit = true, args) {
  const [data, setData] = useState({ loading: false, result: defaultValue })
  if (loadingInit && !data.loading) {
    data.loading = true
    asyncFn(args).then(result => setData({ loading: true, result }))
  }
  return [
    data.result,
    function reload(newArgs) {
      data.loading = true
      asyncFn(newArgs).then(result => setData({ loading: true, result }))
    },
  ]
}
