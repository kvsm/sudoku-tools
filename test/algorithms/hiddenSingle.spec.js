import test from 'ava'
import Cell from '../../src/data/Cell'
import hiddenSingle from '../../src/algorithms/hiddenSingle'
import {validateRegion} from '../../src/utils'

const testRegion = [
  new Cell(0, [1, 2, 3]),
  new Cell(1, [1, 2]),
  new Cell(2, [1]),
  new Cell(3, [1, 2, 4, 5, 6, 7, 8]),
  new Cell(4, [1, 2, 4, 5, 6, 7, 8]),
  new Cell(5, [1, 2, 4, 5, 6, 7, 8]),
  new Cell(6, [1, 2, 4, 5, 6, 7, 8]),
  new Cell(7, [1, 2, 4, 5, 6, 7, 8, 9]),
  new Cell(8, [1, 2, 4, 5, 6, 7, 8])
]

test('hiddenSingle', t => {
  const result = hiddenSingle.runAlg(testRegion)
  t.is(result.length, 9, 'region still has 9 cells')
  t.true(validateRegion(result), 'region is valid')
  t.deepEqual(result[0].values, [3], 'value 3 is the only value remaining')
  t.deepEqual(result[1].values, testRegion[1].values, 'values have not changed')
  t.deepEqual(result[2].values, testRegion[2].values, 'values have not changed')
  t.deepEqual(result[7].values, [9], 'value 9 is the only value remaining')
  t.is(result[0].index, 0, 'index of 0 is preserved')
  t.is(result[1].index, 1, 'index of 1 is preserved')
  t.is(result[2].index, 2, 'index of 2 is preserved')
})
