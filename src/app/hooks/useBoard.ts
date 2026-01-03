import { Dispatch, RefObject, SetStateAction, useRef, useState } from "react"

type BoardDifficulty = "easy" | "medium" | "hard"

const boardStats = {
  "easy": {
    numberOfBombs: 5,
    size: 5,
  },
  "medium": {
    numberOfBombs: 15,
    size: 7,
  },
  "hard": {
    numberOfBombs: 20,
    size: 9,
  },
  "test": {
    numberOfBombs: 2,
    size: 9,
  },
}

export function useBoard(difficulty: BoardDifficulty) {
  const [board, setBoard] = useState(() => generateBoard(difficulty))
  const [opened, setOpened] = useState(() => generateOpenedCells(difficulty))
  const [marked, setMarked] = useState(() => generateMarkedCells(difficulty))
  const [isEndGame, setIsEndGame] = useState(false)
  const [win, setWin] = useState<boolean | null>(null)
  const openedCount = useRef(0)

  const stats = boardStats[difficulty]

  function openCell(coord: number[]) {
    const [i, j] = coord
    const visited = new Set<string>()
    let stop = false

    open([i, j])
    function open([i, j]: number[]) {
      const key = `${i}-${j}`

      if (win) return

      if (board?.[i]?.[j] === undefined || opened[key] || stop || marked[key])
        return //não existe essa coordenada
      if (visited.has(key)) return
      visited.add(key)

      if (board[i][j] === -1) {
        stop = true
        setIsEndGame(true)
        setWin(false)
        setOpened((opened) => {
          const newOpened: Record<string, boolean> = {}
          for (const objectKey in opened) {
            newOpened[objectKey] = true
          }
          return newOpened
        })

        return
      }
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
          setWin
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
        setWin
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
    setOpened((opened) => {
      const newOpened: Record<string, boolean> = {}
      for (const objectKey in opened) {
        newOpened[objectKey] = false
      }
      return newOpened
    })
    setMarked((marked) => {
      const newMarked: Record<string, boolean> = {}
      for (const objectKey in marked) {
        newMarked[objectKey] = false
      }
      return newMarked
    })
    setBoard(() => generateBoard(difficulty))
    openedCount.current = 0
  }

  function handleMarkCell([i, j]: number[]) {
    setMarked((marked) => {
      return { ...marked, [`${i}-${j}`]: !marked[`${i}-${j}`] }
    })
  }

  return {
    board,
    opened,
    openCell,
    isEndGame,
    resetGame,
    marked,
    handleMarkCell,
    win,
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
  setWin: Dispatch<SetStateAction<boolean | null>>
) {
  if (numberOfBombs === size ** 2 - openedCount.current) {
    setIsEndGame(true)
    setWin(true)
    return
  }
}

//todo fazer quando perde
//todo fazer verificação se a pessoa ganhou
