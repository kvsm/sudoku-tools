import R from 'ramda'
import Cell from '../data/Cell'
import {getResolvedCells, regionTypes, getStateFromRegions} from '../utils'

const nakedSingle = region => {
  const resolvedValues =
    R.reduce((acc, cell) => R.append(R.head(cell.values), acc), [], getResolvedCells(region))
  return region.map(cell => cell.isResolved ? Cell.clone(cell) : new Cell(cell.index, R.without(resolvedValues, cell.values)))
}

const run = state => {
  for (let fetchRegions of regionTypes) {
    const regions = fetchRegions(state)
    const newRegions = regions.map(region => nakedSingle(region))
    state = getStateFromRegions(newRegions)
  }
  return state
}

export default {
  run: run,
  runAlg: nakedSingle
}
