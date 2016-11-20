import test from 'ava'
import Cell from '../../src/data/Cell'
import nakedDouble from '../../src/algorithms/nakedDouble'
import {validateRegion} from '../../src/utils'

const testRegion = [
  new Cell(0, [2, 3]),
  new Cell(1, [2, 3]),
  new Cell(2, [1]),
  new Cell(3, [7, 8]),
  new Cell(4, [7, 8]),
  new Cell(5, [4, 5]),
  new Cell(6, [1, 2, 3, 4, 5, 6, 7, 8, 9]),
  new Cell(7, [1, 2, 3, 4, 5, 6, 7, 8, 9]),
  new Cell(8, [1, 2, 3, 4, 5, 6, 7, 8, 9])
]

test('nakedDouble', t => {
  const result = nakedDouble.runAlg(testRegion)
  t.is(result.length, 9, 'region still has 9 cells')
  t.true(validateRegion(result), 'region is valid')
  t.deepEqual(result[0].values, [2, 3], 'values have not changed')
  t.deepEqual(result[1].values, [2, 3], 'values have not changed')
  t.deepEqual(result[2].values, [1], 'values have not changed')
  t.deepEqual(result[3].values, [7, 8], 'values have not changed')
  t.deepEqual(result[8].values, [1, 4, 5, 6, 9], 'values 2, 3, 7 and 8 have been removed')
  t.is(result[0].index, 0, 'index of 0 is preserved')
  t.is(result[1].index, 1, 'index of 1 is preserved')
  t.is(result[2].index, 2, 'index of 2 is preserved')
})
