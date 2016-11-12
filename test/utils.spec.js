import test from 'ava'
import {getResolvedCells, getResolvedCount} from '../src/utils'
import {validIncompletePuzzle, validIncompleteRegion} from './fixtures.js'

test('getResolvedCells', t => {
  t.is(getResolvedCells(validIncompleteRegion).length, 2, 'returns only cells which are resolved')
})

test('getResolvedCount', t => {
  t.is(getResolvedCount(validIncompletePuzzle), 80, 'returns the correct number of resolved cells')
})
