"use client"

import { RefObject, useEffect, useEffectEvent, useRef, useState } from "react"
import { useTimer } from "../useTimer"
import { checkWin } from "./functions/checkWin"
import { generateBoard } from "./functions/generateBoard"
import { generateEmptyBoard } from "./functions/generateEmptyBoard"
import { generateMarkedCells } from "./functions/generateMarkedCells"
import { generateOpenedCells } from "./functions/generateOpenedCells"
import { boardStats } from "./constants/boardStats"
import { BoardDifficulty } from "./types/boardTypes"
import { countNumberOfFlagsRounding } from "./functions/countNumberOfFlagsRounding"
import { countNumberOfOpenedCellsRounding } from "./functions/countNumberOfOpenedCellsRounding"

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

  function checkCanOpenNumberCell(coord: number[]) {
    const [x, y] = coord
    const key = `${x}-${y}`

    //Se tiver marcado n pode abrir
    if (marked[key]) return false

    //Se n tiver aberto da pra abrir
    if (!opened[key]) return true

    //Se tiver aberto e o numero de bandeiras for igual ao valor da celula, abre tudo em volta
    const cellValue = board[x][y]
    const numberOfFlags = countNumberOfFlagsRounding(coord, marked)
    const cellsOpened = countNumberOfOpenedCellsRounding(coord, opened)

    if (cellsOpened + numberOfFlags === 8) return false

    if (cellValue === numberOfFlags && cellValue !== 0) return true

    //todo se o numero de flags

    return false
  }

  function openNumberCell([i, j]: number[]) {
    const cellValue = board[i][j]
    const numberOfFlags = countNumberOfFlagsRounding([i, j], marked)

    // Se o número de bandeiras não corresponde ao valor, não faz nada
    if (cellValue !== numberOfFlags) return

    const visited = new Set<string>()
    const cellsToOpen = new Set<string>() // NOVA: coleta células
    const stopRef = { current: false }

    // Abrir células vizinhas NÃO marcadas
    const neighbors = [
      [i + 1, j],
      [i - 1, j],
      [i + 1, j - 1],
      [i + 1, j + 1],
      [i - 1, j + 1],
      [i - 1, j - 1],
      [i, j - 1],
      [i, j + 1],
    ]

    neighbors.forEach(([x, y]) => {
      const key = `${x}-${y}`
      // Só abre se NÃO estiver marcada e NÃO estiver aberta
      if (!marked[key] && !opened[key]) {
        open([x, y], visited, cellsToOpen, stopRef)
      }
    })

    // Atualiza tudo de uma vez só!
    if (cellsToOpen.size > 0 && !stopRef.current) {
      setOpened((o) => {
        const newOpened = { ...o }
        cellsToOpen.forEach((key) => {
          newOpened[key] = true
        })
        return newOpened
      })

      openedCount.current += cellsToOpen.size

      checkWin(
        stats.numberOfBombs,
        stats.size,
        openedCount,
        setIsEndGame,
        setWin,
        pauseTimer,
      )
    }
  }

  function openCell(coord: number[]) {
    const [x, y] = coord
    const key = `${x}-${y}`

    if (shouldGenerateBoard) {
      firstClick.current = coord
      setBoard(generateBoard(difficulty, coord))
      setShouldGenerateBoard(false)
      return
    }

    // Se a célula já está aberta, tenta abrir as vizinhas
    if (opened[key]) {
      openNumberCell(coord)
      return
    }

    openFromCoord(coord)
  }

  function open(
    [i, j]: number[],
    visited: Set<string>,
    cellsToOpen: Set<string>,
    stopRef: RefObject<boolean>,
  ) {
    const key = `${i}-${j}`

    if (win) return
    if (
      board?.[i]?.[j] === undefined ||
      opened[key] ||
      stopRef.current ||
      marked[key]
    )
      return
    if (visited.has(key)) return
    visited.add(key)

    if (board[i][j] === -1) {
      stopRef.current = true
      gameOver()
      return
    }

    // MUDANÇA: ao invés de setOpened, apenas adiciona na lista
    cellsToOpen.add(key)

    if (board[i][j] !== 0) return

    open([i + 1, j], visited, cellsToOpen, stopRef)
    open([i - 1, j], visited, cellsToOpen, stopRef)
    open([i + 1, j - 1], visited, cellsToOpen, stopRef)
    open([i + 1, j + 1], visited, cellsToOpen, stopRef)
    open([i - 1, j + 1], visited, cellsToOpen, stopRef)
    open([i - 1, j - 1], visited, cellsToOpen, stopRef)
    open([i, j - 1], visited, cellsToOpen, stopRef)
    open([i, j + 1], visited, cellsToOpen, stopRef)
  }

  function openFromCoord([i, j]: number[]) {
    const visited = new Set<string>()
    const cellsToOpen = new Set<string>() // NOVA: coleta células
    const stopRef = { current: false }

    open([i, j], visited, cellsToOpen, stopRef)

    // Atualiza tudo de uma vez só!
    if (cellsToOpen.size > 0 && !stopRef.current) {
      setOpened((o) => {
        const newOpened = { ...o }
        cellsToOpen.forEach((key) => {
          newOpened[key] = true
        })
        return newOpened
      })

      // Inicia timer e verifica vitória UMA VEZ
      if (openedCount.current === 0) startTimer()
      openedCount.current += cellsToOpen.size

      checkWin(
        stats.numberOfBombs,
        stats.size,
        openedCount,
        setIsEndGame,
        setWin,
        pauseTimer,
      )
    }
  }

  function resetGame() {
    setWin(null)
    setIsEndGame(false)
    setOpened(generateOpenedCells(difficulty))
    setMarked(generateMarkedCells(difficulty))
    setShouldGenerateBoard(true)
    setBoard(generateEmptyBoard(boardStats[difficulty].size))
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
    checkCanOpenNumberCell,
    openNumberCell,
  }
}
