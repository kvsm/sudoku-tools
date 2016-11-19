import R from 'ramda'
import Cell from './Cell'
import {getResolvedCells, getRegionsFromState, validateRegion, cloneState} from '../utils'

export default class Puzzle {
  static clone (puzzle) {
    if (puzzle instanceof Puzzle) {
      const clone = new Puzzle(puzzle.currentState)
      clone.initialState = puzzle.initialState
      clone.solveOrder = R.clone(puzzle.solveOrder)
      return clone
    } else {
      throw new Error('Puzzle.clone(arg): arg is not an instance of Puzzle')
    }
  }

  static parse (input) {
    const str = String(input)
    if (input === undefined) {
      throw new Error('Parse Error: No state specified')
    } else if (str.length !== 81) {
      throw new Error('Parse Error: only standard 9x9 sudokus are supported, so state should be 81 characters long but was: ' + str.length)
    } else if (!/^[0-9]+$/.test(str)) {
      throw new Error('Parse Error: state should only contain digits 0-9')
    } else {
      const state = str.split('').map((x, i) => {
        return x === '0' ? new Cell(i, [1, 2, 3, 4, 5, 6, 7, 8, 9]) : new Cell(i, [Number(x)])
      })
      const puzzle = new Puzzle(state)
      if (!puzzle.isValid) {
        throw new Error('Parse Error: breaks rules of sudoku')
      } else {
        return puzzle
      }
    }
  }

  constructor (state) {
    this.initialState = state
    this.currentState = cloneState(state)
    this.solveOrder = []
  }

  get isComplete () {
    const resolvedCells = getResolvedCells(this.currentState)
    return resolvedCells.length === 81
  }

  get isValid () {
    const regions = getRegionsFromState(this.currentState)
    return R.all(validateRegion, regions)
  }
}
