import test from 'ava'
import {getResolvedCells, getResolvedCount} from '../src/utils'
import {validIncompletePuzzle} from './fixtures.js'

test('getResolvedCount(state)', t => {
  t.is(getResolvedCount(validIncompletePuzzle), 80, 'returns the correct number of resolved cells')
})
