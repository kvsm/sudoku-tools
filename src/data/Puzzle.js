import R from 'ramda'
import Cell from './Cell'
import {getResolvedCells, getRegionsFromState} from '../utils'

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
    const regions = getRegionsFromState(this.currentState)
    return R.all(validateRegion, regions)
  }
}

const validateRegion = region => {
  const resolvedCells = getResolvedCells(region)
  return resolvedCells.length === R.uniq(R.map(R.compose(R.head, R.prop('values')), resolvedCells)).length
}

const parse = input => {
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

export default {
  parse: parse
}
