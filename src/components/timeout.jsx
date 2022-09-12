import React, { useEffect, useState } from 'react'

export default function Timeout() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const timer = setTimeout(() => {
      setCount(count + 1)
    }, 1000)
  })
  return (
    <div>{count}</div>
  )
}
