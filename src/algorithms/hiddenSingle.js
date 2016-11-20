import R from 'ramda'
import Cell from '../data/Cell'
import {regionTypes, getStateFromRegions} from '../utils'

const hiddenSingle = region => {
  const hiddenSingles = region.reduce((acc, cell) => {
    return R.concat(acc, cell.values)
  }, []).filter((val, idx, arr) => {
    return arr.indexOf(val) === arr.lastIndexOf(val)
  })
  return region.map(cell => {
    if (cell.isResolved) {
      return Cell.clone(cell)
    } else {
      let values = cell.values
      hiddenSingles.forEach(hs => {
        if (R.contains(hs, values)) {
          values = [hs]
        }
      })
      return new Cell(cell.index, values)
    }
  })
}

const run = state => {
  for (let fetchRegions of regionTypes) {
    const regions = fetchRegions(state)
    const newRegions = regions.map(region => hiddenSingle(region))
    state = getStateFromRegions(newRegions)
  }
  return state
}

export default {
  run: run,
  runAlg: hiddenSingle
}
