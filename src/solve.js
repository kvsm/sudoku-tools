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

export const funcs = {
  runAlgorithms: runAlgorithms
}

export const solve = puzzle => {
  return new Promise((resolve, reject) => {
    const before = JSON.stringify(puzzle)
    const newPuzzle = funcs.runAlgorithms(puzzle)
    const after = JSON.stringify(newPuzzle)
    if (before === after) {
      reject(newPuzzle)
    } else {
      if (newPuzzle.isComplete) {
        resolve(newPuzzle)
      } else {
        solve(newPuzzle)
      }
    }
  })
}
