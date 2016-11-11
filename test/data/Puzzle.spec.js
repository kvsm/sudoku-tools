import test from 'ava'
import Puzzle from '../../src/data/Puzzle'
import {validCompletePuzzle, validIncompletePuzzle} from '../fixtures'

test('isComplete()', t => {
  t.true(validCompletePuzzle.isComplete, 'it is complete')
  t.false(validIncompletePuzzle.isComplete, 'it is not complete')
})
