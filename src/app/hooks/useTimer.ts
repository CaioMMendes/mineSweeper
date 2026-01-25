"use client"

import { useEffect, useRef, useState } from "react"

export function useTimer(initialTime: number, onTimeEnd?: () => void) {
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const [lostTimer, setLostTimer] = useState(false)
  const usedTime = useRef(0)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const isRunningRef = useRef(false)

  function startTimer() {
    if (isRunningRef.current) return

    isRunningRef.current = true

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          pauseTimer()
          setLostTimer(true)
          onTimeEnd?.()
          return 0
        }
        usedTime.current = initialTime - (prev - 1)
        return prev - 1
      })
    }, 1000)
  }

  function pauseTimer() {
    if (!isRunningRef.current) return

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    isRunningRef.current = false
  }

  function resetTimer(newTime = initialTime) {
    pauseTimer()
    setLostTimer(false)
    setTimeLeft(newTime)
  }

  function teste() {
    pauseTimer()
    setLostTimer(false)
    setTimeLeft(timeLeft)
  }

  useEffect(() => {
    //? aqui esta parando o timer quando sai da pagina, depois de um tempo fora para de passar o tempo, mas acho que esta de boa assim
    return () => pauseTimer()
  }, [])

  return {
    timeLeft,
    lostTimer,
    startTimer,
    pauseTimer,
    resetTimer,
    teste,
    usedTime,
  }
}
