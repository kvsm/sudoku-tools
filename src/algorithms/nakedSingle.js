import R from 'ramda'
import Cell from '../data/Cell'
import {getResolvedCells, regionTypes, getStateFromRegions} from '../utils'

const nakedSingle = region => {
  const resolvedValues =
    R.reduce((acc, cell) => R.append(R.head(cell.values), acc), [], getResolvedCells(region))
  const removeResolvedValues = R.filter(val => !R.contains(val, resolvedValues))
  return region.map(cell => cell.isResolved ? cell : new Cell(cell.index, removeResolvedValues(cell.values)))
}

const run = state => {
  let newRegions
  let newState = R.clone(state)
  for (let fetchRegions of regionTypes) {
    const regions = fetchRegions(newState)
    newRegions = regions.map(region => nakedSingle(region))
    newState = getStateFromRegions(newRegions)
  }
  return newState
}

export default {
  run: run,
  runAlg: nakedSingle
}
