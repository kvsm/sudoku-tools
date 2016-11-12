import NakedSingle from './algorithms/nakedSingle'
import {getRowsFromState, getColumnsFromState, getBlocksFromState} from './utils'

const algorithms = [
  NakedSingle
]

const runAlgorithms = puzzle => {
  const rows = getRowsFromState(puzzle.state)
  const columns = getColumnsFromState(puzzle.state)
  const blocks = getBlocksFromState(puzzle.state)
  const solveOrder = puzzle.solveOrder

  return newPuzzle
}

const solve = puzzle => {
  const before = JSON.stringify(puzzle)
  const newPuzzle = runAlgorithms(puzzle)
  const after = JSON.stringify(newPuzzle)
  if (before === after) {
    const err = new Error('Solve Error: Unable to solve with current algorithms')
    err.puzzle = newPuzzle
    throw err
  }
  return newPuzzle.isComplete ? newPuzzle : solve(newPuzzle)
}

export default {
  solve: solve
}
