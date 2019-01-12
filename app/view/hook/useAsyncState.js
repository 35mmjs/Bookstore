import React, { useState } from 'react'

export default function useAsyncState(asyncFn, defaultValue = {}) {
  const [data, setData] = useState({ loaded: false, result: defaultValue })
  if (!data.loaded) asyncFn().then(result => setData({ loaded: true, result }))
  return [
    data.result,
    function reload() {
      asyncFn().then(result => setData({ loaded: true, result }))
    },
  ]
}
