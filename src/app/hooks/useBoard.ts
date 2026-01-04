import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react"
import { useTimer } from "./useTimer"

export type BoardDifficulty = "easy" | "medium" | "hard"

const boardStats = {
  "easy": {
    numberOfBombs: 3,
    size: 5,
    time: 120,
  },
  "medium": {
    numberOfBombs: 7,
    size: 7,
    time: 300,
  },
  "hard": {
    numberOfBombs: 14,
    size: 9,
    time: 480,
  },
  "test": {
    numberOfBombs: 2,
    size: 9,
    time: 5,
  },
}

export function useBoard(difficulty: BoardDifficulty) {
  const { resetTimer, startTimer, timeLeft, pauseTimer, usedTime } = useTimer(
    boardStats[difficulty].time
  )
  const [board, setBoard] = useState(() => generateBoard(difficulty))
  const [opened, setOpened] = useState(() => generateOpenedCells(difficulty))
  const [marked, setMarked] = useState(() => generateMarkedCells(difficulty))
  const [isEndGame, setIsEndGame] = useState(false)
  const [win, setWin] = useState<boolean | null>(null)
  const openedCount = useRef(0)

  const stats = boardStats[difficulty]
  console.log(difficulty, stats)

  function openCell(coord: number[]) {
    const [i, j] = coord
    const visited = new Set<string>()
    let stop = false

    open([i, j])

    function open([i, j]: number[]) {
      const key = `${i}-${j}`

      if (win) return

      if (board?.[i]?.[j] === undefined || opened[key] || stop || marked[key]) {
        return //não existe essa coordenada
      }
      if (visited.has(key)) return
      visited.add(key)

      if (board[i][j] === -1) {
        stop = true
        gameOver()

        return
      }
      if (openedCount.current === 0) startTimer()
      openedCount.current++
      if (board[i][j] !== 0) {
        setOpened((opened) => {
          return { ...opened, [key]: true }
        })
        checkWin(
          stats.numberOfBombs,
          stats.size,
          openedCount,
          setIsEndGame,
          setWin,
          pauseTimer
        )
        return
      }
      setOpened((opened) => {
        return { ...opened, [key]: true }
      })
      checkWin(
        stats.numberOfBombs,
        stats.size,
        openedCount,
        setIsEndGame,
        setWin,
        pauseTimer
      )

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
    setBoard(generateBoard(difficulty))
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
    const newBoard = generateBoard(difficulty)

    setBoard(newBoard)
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

function generateBoard(difficulty: BoardDifficulty) {
  const { numberOfBombs, size } = boardStats[difficulty]

  const board: number[][] = []
  for (let i = 0; i < size; i++) {
    const array = []
    for (let j = 0; j < size; j++) {
      array.push(0)
    }
    board.push(array)
  }

  let count = 0
  while (count < numberOfBombs) {
    const [x, y] = randomCoordenate(size)
    if (board[x][y] === -1) continue

    board[x][y] = -1
    count++
  }

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (board[i][j] === -1) continue

      const topMiddle = board?.[i + 1]?.[j] === -1 ? 1 : 0
      const topLeft = board?.[i + 1]?.[j - 1] === -1 ? 1 : 0
      const topRight = board?.[i + 1]?.[j + 1] === -1 ? 1 : 0
      const left = board?.[i]?.[j - 1] === -1 ? 1 : 0
      const right = board?.[i]?.[j + 1] === -1 ? 1 : 0
      const bottomMiddle = board?.[i - 1]?.[j] === -1 ? 1 : 0
      const bottomLeft = board?.[i - 1]?.[j - 1] === -1 ? 1 : 0
      const bottomRight = board?.[i - 1]?.[j + 1] === -1 ? 1 : 0

      const count =
        topMiddle +
        topLeft +
        topRight +
        left +
        right +
        bottomLeft +
        bottomMiddle +
        bottomRight

      board[i][j] = count
    }
  }

  return board
}

function randomCoordenate(size: number) {
  const randomX = Math.floor(Math.random() * size)
  const randomY = Math.floor(Math.random() * size)
  return [randomX, randomY]
}

function generateOpenedCells(difficulty: BoardDifficulty) {
  const { size } = boardStats[difficulty]
  const openList: Record<string, boolean> = {}

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      openList[`${i}-${j}`] = false
    }
  }
  console.log("sizeeee", size)
  return openList
}

function generateMarkedCells(difficulty: BoardDifficulty) {
  const { size } = boardStats[difficulty]
  const markedList: Record<string, boolean> = {}

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      markedList[`${i}-${j}`] = false
    }
  }

  return markedList
}

function checkWin(
  numberOfBombs: number,
  size: number,
  openedCount: RefObject<number>,
  setIsEndGame: Dispatch<SetStateAction<boolean>>,
  setWin: Dispatch<SetStateAction<boolean | null>>,
  pauseTimer: () => void
) {
  if (numberOfBombs === size ** 2 - openedCount.current) {
    setIsEndGame(true)
    setWin(true)
    pauseTimer()
    return
  }
}
