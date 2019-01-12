import React, { useState } from 'react'

export default function useAsyncState(asyncFn, defaultValue = {}) {
  const [data, setData] = useState({ loading: false, result: defaultValue })
  if (!data.loading) {
    data.loading = true
    asyncFn().then(result => setData({ loading: true, result }))
  }
  return [
    data.result,
    function reload() {
      asyncFn().then(result => setData({ loading: true, result }))
    },
  ]
}
