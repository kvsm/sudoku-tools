import test from 'ava'
import * as Utils from '../src/utils'
import {validCompletePuzzle, validIncompletePuzzle, validIncompleteRegion} from './fixtures.js'

const invalidRegion = [
  { values: [1] },
  { values: [1] },
  { values: [2] },
  { values: [2] },
  { values: [3] },
  { values: [4] },
  { values: [5] },
  { values: [6] },
  { values: [7] }
]

test('getResolvedCells', t => {
  t.is(Utils.getResolvedCells(validIncompleteRegion).length, 2, 'returns only cells which are resolved')
})

test('getResolvedCount', t => {
  t.is(Utils.getResolvedCount(validIncompletePuzzle), 79, 'returns the correct number of resolved cells')
})

test('getStateFromRegions', t => {
  const regions = Utils.getBlocksFromState(validIncompletePuzzle.currentState)
  const result = Utils.getStateFromRegions(regions)
  t.is(result.length, 81, 'returns state with the correct number of cells')
  t.is(result[0].values[0], 1, 'has correct value in first cell')
  t.is(result[80].values.length, 9, 'has all values in last cell')
})

test('validateRegion', t => {
  t.true(Utils.validateRegion(validIncompleteRegion), 'valid region returns true')
  t.false(Utils.validateRegion(invalidRegion), 'invalid region returns false')
})

test('getDifferenceOfStates', t => {
  const start = validIncompletePuzzle.currentState
  const end = validCompletePuzzle.currentState
  t.deepEqual(Utils.getDifferenceOfStates(start, end), [79, 80], 'it returns the list of indexes in the state which are resolved in end but not start')
})
