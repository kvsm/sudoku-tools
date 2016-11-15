import R from 'ramda'
import NakedSingle from './algorithms/nakedSingle'
import {getDifferenceOfStates} from './utils'

const algorithms = [
  NakedSingle
]

const runAlgorithms = puzzle => {
  const newPuzzle = R.clone(puzzle)
  for (let algorithm of algorithms) {
    const startState = R.clone(newPuzzle.currentState)
    const endState = algorithm.run(newPuzzle.currentState)
    const solvedCells = getDifferenceOfStates(startState, endState)
    newPuzzle.currentState = endState
    newPuzzle.solveOrder = R.concat(newPuzzle.solveOrder, solvedCells)
  }
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
  } else {
    return newPuzzle.isComplete ? newPuzzle : solve(newPuzzle)
  }
}

export default {
  solve: solve
}
