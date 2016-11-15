import test from 'ava'
import Cell from '../../src/data/Cell'
import nakedSingle from '../../src/algorithms/nakedSingle'
import {validateRegion} from '../../src/utils'
import {validIncompletePuzzle} from '../fixtures'

const testRegion = [
  new Cell(0, [1, 2, 3]),
  new Cell(1, [1, 2]),
  new Cell(2, [1]),
  new Cell(3, [1, 2, 3, 4, 5, 6, 7, 8, 9]),
  new Cell(4, [1, 2, 3, 4, 5, 6, 7, 8, 9]),
  new Cell(5, [1, 2, 3, 4, 5, 6, 7, 8, 9]),
  new Cell(6, [1, 2, 3, 4, 5, 6, 7, 8, 9]),
  new Cell(7, [1, 2, 3, 4, 5, 6, 7, 8, 9]),
  new Cell(8, [1, 2, 3, 4, 5, 6, 7, 8, 9])
]

test('nakedSingle', t => {
  const result = nakedSingle.runAlg(testRegion)
  t.is(result.length, 9, 'region still has 9 cells')
  t.true(validateRegion(result), 'region is valid')
  t.deepEqual(result[0].values, [2, 3], 'value 1 has been removed')
  t.deepEqual(result[1].values, [2], 'value 1 has been removed')
  t.deepEqual(result[2].values, [1], 'value 1 is still present')
  t.is(result[0].index, 0, 'index of 0 is preserved')
  t.is(result[1].index, 1, 'index of 1 is preserved')
  t.is(result[2].index, 2, 'index of 2 is preserved')
})

test('run', t => {
  const result = nakedSingle.run(validIncompletePuzzle.currentState)
  t.is(result[80].values.length, 1, 'last cell has 1 value')
  t.is(result[80].values[0], 8, 'last cell value is 8')
})
