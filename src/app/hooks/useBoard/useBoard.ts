import { useEffect, useEffectEvent, useRef, useState } from "react"
import { useTimer } from "../useTimer"
import { checkWin } from "./functions/checkWin"
import { generateBoard } from "./functions/generateBoard"
import { generateEmptyBoard } from "./functions/generateEmptyBoard"
import { generateMarkedCells } from "./functions/generateMarkedCells"
import { generateOpenedCells } from "./functions/generateOpenedCells"
import { boardStats } from "./constants/boardStats"
import { BoardDifficulty } from "./types/boardTypes"

export function useBoard(difficulty: BoardDifficulty) {
  const { resetTimer, startTimer, timeLeft, pauseTimer, usedTime } = useTimer(
    boardStats[difficulty].time,
  )
  const [board, setBoard] = useState(() =>
    generateEmptyBoard(boardStats[difficulty].size),
  )
  const firstClick = useRef<number[] | null>(null)
  const [shouldGenerateBoard, setShouldGenerateBoard] = useState(true)
  const [opened, setOpened] = useState(() => generateOpenedCells(difficulty))
  const [marked, setMarked] = useState(() => generateMarkedCells(difficulty))
  const [isEndGame, setIsEndGame] = useState(false)
  const [win, setWin] = useState<boolean | null>(null)
  const openedCount = useRef(0)

  const stats = boardStats[difficulty]

  function openCell(coord: number[]) {
    if (shouldGenerateBoard) {
      firstClick.current = coord
      setBoard(generateBoard(difficulty, coord))
      setShouldGenerateBoard(false)
      return
    }

    openFromCoord(coord)
  }

  function openFromCoord([i, j]: number[]) {
    const visited = new Set<string>()
    let stop = false

    open([i, j])

    function open([i, j]: number[]) {
      const key = `${i}-${j}`

      if (win) return
      if (board?.[i]?.[j] === undefined || opened[key] || stop || marked[key])
        return
      if (visited.has(key)) return
      visited.add(key)

      if (board[i][j] === -1) {
        stop = true
        gameOver()
        return
      }

      if (openedCount.current === 0) startTimer()
      openedCount.current++

      setOpened((o) => ({ ...o, [key]: true }))

      checkWin(
        stats.numberOfBombs,
        stats.size,
        openedCount,
        setIsEndGame,
        setWin,
        pauseTimer,
      )

      if (board[i][j] !== 0) return

      open([i + 1, j])
      open([i - 1, j])
      open([i + 1, j - 1])
      open([i + 1, j + 1])
      open([i - 1, j + 1])
      open([i - 1, j - 1])
      open([i, j - 1])
      open([i, j + 1])
    }
  }

  function resetGame() {
    setWin(null)
    setIsEndGame(false)
    setOpened(generateOpenedCells(difficulty))
    setMarked(generateMarkedCells(difficulty))
    setShouldGenerateBoard(true)
    setBoard(generateEmptyBoard(boardStats[difficulty].size))
    // setBoard(generateBoard(difficulty))
    resetTimer()

    openedCount.current = 0
  }

  function handleMarkCell([i, j]: number[]) {
    setMarked((marked) => {
      return { ...marked, [`${i}-${j}`]: !marked[`${i}-${j}`] }
    })
  }

  function handleOpenEveryCells() {
    setOpened((opened) => {
      const newOpened: Record<string, boolean> = {}
      for (const objectKey in opened) {
        newOpened[objectKey] = true
      }
      return newOpened
    })
  }

  function gameOver() {
    setIsEndGame(true)
    setWin(false)
    handleOpenEveryCells()
    pauseTimer()
  }

  const handleDificultyChange = useEffectEvent(() => {
    // const newBoard = generateBoard(difficulty)

    // setBoard(newBoard)
    resetGame()
  })

  useEffect(() => {
    handleDificultyChange()
  }, [difficulty])

  useEffect(() => {
    if (timeLeft <= 0 && !isEndGame) {
      gameOver()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, isEndGame])

  useEffect(() => {
    if (!shouldGenerateBoard && firstClick.current) {
      openFromCoord(firstClick.current)
      firstClick.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board])

  return {
    board,
    opened,
    openCell,
    isEndGame,
    resetGame,
    marked,
    handleMarkCell,
    win,
    gameOver,
    timeLeft,
    usedTime,
  }
}
