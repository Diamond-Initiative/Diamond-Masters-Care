import { useEffect, useState } from 'react'

export function useAnimatedCounter(end: number, duration: number = 1000, start: number = 0) {
  const [count, setCount] = useState(start)

  useEffect(() => {
    if (end === start) {
      setCount(end)
      return
    }

    const startTime = Date.now()
    const range = end - start

    const timer = setInterval(() => {
      const now = Date.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      const easeOutQuad = progress * (2 - progress)
      const currentCount = Math.floor(start + range * easeOutQuad)

      setCount(currentCount)

      if (progress === 1) {
        clearInterval(timer)
        setCount(end)
      }
    }, 16)

    return () => clearInterval(timer)
  }, [end, duration, start])

  return count
}
