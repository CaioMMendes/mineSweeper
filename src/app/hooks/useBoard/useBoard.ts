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
import { countNumberOfHideCellsRounding } from "./functions/countNumberOfHideCellsRounding"

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

  //todo quando ta em um nivel e vai pra outro e completa instantaneo marca o tempo que tava no outro

  //todo ver se da pra propagar a parada de abrir

  function checkCanMarkRoundCells(coord: number[]) {
    const [x, y] = coord
    const key = `${x}-${y}`

    if (!opened[key]) return false

    //se tiver aberto e o numero de celulas em volta que não estão abertas for igual ao numero, da pra marcar todas
    const cellValue = board[x][y]
    const numberOfFlagsRounding = countNumberOfFlagsRounding(coord, marked)
    const numberOfHideCellsRounding = countNumberOfHideCellsRounding(
      coord,
      opened,
      stats.size,
    )

    if (cellValue === numberOfFlagsRounding) return false
    if (cellValue === 0) return false
    return cellValue === numberOfHideCellsRounding
  }

  function markRoundCells(coord: number[]) {
    const [x, y] = coord
    const size = stats.size

    const neighbors = [
      [x + 1, y],
      [x - 1, y],
      [x + 1, y - 1],
      [x + 1, y + 1],
      [x - 1, y + 1],
      [x - 1, y - 1],
      [x, y - 1],
      [x, y + 1],
    ]

    neighbors.forEach(([x, y]) => {
      const key = `${x}-${y}`
      if (
        x >= 0 &&
        x < size &&
        y >= 0 &&
        y < size &&
        !marked[key] &&
        !opened[key]
      ) {
        handleMarkCell([x, y])
      }
    })
  }

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

    // Conta quantos vizinhos VÁLIDOS esta célula tem (dentro do tabuleiro)
    const neighbors = [
      [x + 1, y],
      [x - 1, y],
      [x + 1, y - 1],
      [x + 1, y + 1],
      [x - 1, y + 1],
      [x - 1, y - 1],
      [x, y - 1],
      [x, y + 1],
    ]

    const validNeighborsCount = neighbors.filter(
      ([nx, ny]) => nx >= 0 && nx < stats.size && ny >= 0 && ny < stats.size,
    ).length

    // Se todas as células vizinhas válidas estão abertas ou marcadas, não pode abrir
    if (cellsOpened + numberOfFlags === validNeighborsCount) return false

    if (cellValue === numberOfFlags && cellValue !== 0) return true

    return false
  }

  function openNumberCell([i, j]: number[]) {
    const cellValue = board[i][j]
    const numberOfFlags = countNumberOfFlagsRounding([i, j], marked)

    // Se o número de bandeiras não corresponde ao valor, não faz nada
    if (cellValue !== numberOfFlags) return

    const allCellsToOpen = new Set<string>()
    const stopRef = { current: false }

    // Fila de células para processar propagação
    const queue: number[][] = [[i, j]]
    const processedCells = new Set<string>()

    while (queue.length > 0 && !stopRef.current) {
      const [x, y] = queue.shift()!
      const currentKey = `${x}-${y}`

      // Evita processar a mesma célula duas vezes
      if (processedCells.has(currentKey)) continue
      processedCells.add(currentKey)

      const currentValue = board[x][y]
      const currentFlags = countNumberOfFlagsRounding([x, y], marked)

      // Verifica se esta célula deve propagar
      if (currentValue !== currentFlags || currentValue === 0) continue

      const neighbors = [
        [x + 1, y],
        [x - 1, y],
        [x + 1, y - 1],
        [x + 1, y + 1],
        [x - 1, y + 1],
        [x - 1, y - 1],
        [x, y - 1],
        [x, y + 1],
      ]

      neighbors.forEach(([nx, ny]) => {
        const key = `${nx}-${ny}`

        // Só abre se NÃO estiver marcada e NÃO estiver aberta
        if (!marked[key] && !opened[key] && !allCellsToOpen.has(key)) {
          const localVisited = new Set<string>()
          const localCellsToOpen = new Set<string>()

          open([nx, ny], localVisited, localCellsToOpen, stopRef)

          // Adiciona as células abertas ao conjunto global
          localCellsToOpen.forEach((cell) => allCellsToOpen.add(cell))

          // Se a célula aberta é um número > 0, adiciona na fila para processar
          if (
            !stopRef.current &&
            board[nx]?.[ny] !== undefined &&
            board[nx][ny] > 0
          ) {
            queue.push([nx, ny])
          }
        }
      })
    }

    // Atualiza tudo de uma vez só!
    if (allCellsToOpen.size > 0 && !stopRef.current) {
      setOpened((o) => {
        const newOpened = { ...o }
        allCellsToOpen.forEach((key) => {
          newOpened[key] = true
        })
        return newOpened
      })

      openedCount.current += allCellsToOpen.size

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

  // function openNumberCell([i, j]: number[]) {
  //   const cellValue = board[i][j]
  //   const numberOfFlags = countNumberOfFlagsRounding([i, j], marked)

  //   // Se o número de bandeiras não corresponde ao valor, não faz nada
  //   if (cellValue !== numberOfFlags) return

  //   const visited = new Set<string>()
  //   const cellsToOpen = new Set<string>() // NOVA: coleta células
  //   const stopRef = { current: false }

  //   // Abrir células vizinhas NÃO marcadas
  //   const neighbors = [
  //     [i + 1, j],
  //     [i - 1, j],
  //     [i + 1, j - 1],
  //     [i + 1, j + 1],
  //     [i - 1, j + 1],
  //     [i - 1, j - 1],
  //     [i, j - 1],
  //     [i, j + 1],
  //   ]

  //   neighbors.forEach(([x, y]) => {
  //     const key = `${x}-${y}`
  //     // Só abre se NÃO estiver marcada e NÃO estiver aberta
  //     if (!marked[key] && !opened[key]) {
  //       open([x, y], visited, cellsToOpen, stopRef)
  //     }
  //   })

  //   // Atualiza tudo de uma vez só!
  //   if (cellsToOpen.size > 0 && !stopRef.current) {
  //     setOpened((o) => {
  //       const newOpened = { ...o }
  //       cellsToOpen.forEach((key) => {
  //         newOpened[key] = true
  //       })
  //       return newOpened
  //     })

  //     openedCount.current += cellsToOpen.size

  //     checkWin(
  //       stats.numberOfBombs,
  //       stats.size,
  //       openedCount,
  //       setIsEndGame,
  //       setWin,
  //       pauseTimer,
  //     )
  //   }
  // }

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
    const cellsToOpen = new Set<string>()
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
    const key = `${i}-${j}`
    setMarked((marked) => {
      return { ...marked, [key]: !marked[key] }
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
    stats,
    isEndGame,
    marked,
    win,
    timeLeft,
    usedTime,
    openCell,
    resetGame,
    handleMarkCell,
    gameOver,
    checkCanOpenNumberCell,
    openNumberCell,
    checkCanMarkRoundCells,
    markRoundCells,
  }
}
