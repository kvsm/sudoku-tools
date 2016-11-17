import R from 'ramda'
import {Puzzle} from './data/Puzzle'
import NakedSingle from './algorithms/nakedSingle'
import {getDifferenceOfStates} from './utils'

const algorithms = [
  NakedSingle
]

const runAlgorithms = puzzle => {
  const newPuzzle = Puzzle.clone(puzzle)
  for (let algorithm of algorithms) {
    const startState = puzzle.currentState
    const endState = algorithm.run(newPuzzle.currentState)
    const solvedCellIndexes = getDifferenceOfStates(startState, endState)
    newPuzzle.currentState = endState
    newPuzzle.solveOrder = R.concat(newPuzzle.solveOrder, solvedCellIndexes)
  }
  return newPuzzle
}

export const funcs = {
  runAlgorithms: runAlgorithms
}

export const solve = puzzle => {
  return new Promise((resolve, reject) => {
    let newPuzzle = puzzle
    while (true) {
      const before = JSON.stringify(newPuzzle)
      newPuzzle = funcs.runAlgorithms(newPuzzle)
      const after = JSON.stringify(newPuzzle)
      if (newPuzzle.isComplete) {
        return resolve(newPuzzle)
      } else if (before === after) {
        return reject(newPuzzle)
      }
    }
  })
}
