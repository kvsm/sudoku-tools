import test from 'ava'
import nakedSingle from '../../src/algorithms/nakedSingle'
import {nakedSingleRegion} from '../fixtures'

test('run', t => {
  const result = nakedSingle.run(nakedSingleRegion)
  t.is(result.length, 3, 'region still has 3 cells')
  t.deepEqual(result[0].values, [2, 3], 'value 1 has been removed')
  t.deepEqual(result[1].values, [2], 'value 1 has been removed')
  t.deepEqual(result[2].values, [1], 'value 1 is still present')
  t.is(result[0].index, 0, 'index of 0 is preserved')
  t.is(result[1].index, 1, 'index of 1 is preserved')
  t.is(result[2].index, 2, 'index of 2 is preserved')
})
