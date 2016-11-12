import R from 'ramda'
import Cell from '../data/Cell'
import {getResolvedCells} from '../utils'

const run = region => {
  const resolvedValues =
    R.reduce((acc, cell) => R.append(R.head(cell.values), acc), [], getResolvedCells(region))
  const removeResolvedValues = R.filter(val => !R.contains(val, resolvedValues))
  return region.map(cell => cell.isResolved ? cell : new Cell(cell.index, removeResolvedValues(cell.values)))
}

export default {
  run: run
}
