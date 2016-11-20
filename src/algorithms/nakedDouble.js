import R from 'ramda'
import Cell from '../data/Cell'
import {regionTypes, getStateFromRegions} from '../utils'

const nakedDouble = region => {
  const candidates = region.filter(cell => cell.values.length === 2)
  const doubles = R.pluck('values', candidates).filter((cellValues, idx, arr) => {
    return idx !== R.lastIndexOf(cellValues, arr)
  })
  return region.map(cell => {
    if (cell.isResolved || R.contains(cell.values, doubles)) {
      return Cell.clone(cell)
    } else {
      const values = cell.values.filter(val => !R.contains(val, R.flatten(doubles)))
      return new Cell(cell.index, values)
    }
  })
}

const run = state => {
  for (let fetchRegions of regionTypes) {
    const regions = fetchRegions(state)
    const newRegions = regions.map(region => nakedDouble(region))
    state = getStateFromRegions(newRegions)
  }
  return state
}

export default {
  run: run,
  runAlg: nakedDouble
}
