import R from 'ramda'
import Cell from './Cell'
import {getResolvedCells} from '../utils'

class Puzzle {
  constructor (state) {
    this.initialState = state
    this.currentState = state
    this.solveOrder = []
  }

  get isComplete () {
    const resolvedCells = getResolvedCells(this.currentState)
    return resolvedCells.length === 81
  }

  get isValid () {
    return true
  }

}

const parse = input => {
  const str = String(input)
  if (input === undefined) {
    throw new Error('Invalid state: No state specified')
  } else if (str.length !== 81) {
    throw new Error('Invalid state: only standard 9x9 sudokus are supported, so state should be 81 characters long but was: ' + str.length)
  } else if (!/^[0-9]+$/.test(str)) {
    throw new Error('Invalid state: state should only contain digits 0-9')
  } else {
    const state = str.split('').map((x, i) => {
      return x === '0' ? new Cell(i, [1, 2, 3, 4, 5, 6, 7, 8, 9]) : new Cell(i, [Number(x)])
    })
    const puzzle = new Puzzle(state)
    if (!puzzle.isValid) {
      throw new Error('Invalid state: breaks rules of sudoku')
    } else {
      return puzzle
    }
  }
}

export default {
  parse: parse
}
