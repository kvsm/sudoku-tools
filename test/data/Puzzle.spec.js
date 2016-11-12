import test from 'ava'
import {wrongLengthInput, notNumericInput, invalidStateInput, invalidPuzzle, validCompletePuzzle, validIncompletePuzzle} from '../fixtures'
import Puzzle from '../../src/data/Puzzle'

test('parse', t => {
  t.throws(() => {
    Puzzle.parse()
  }, 'Parse Error: No state specified',
    'throws Error when no string is specified')
  t.throws(() => {
    Puzzle.parse(wrongLengthInput)
  }, 'Parse Error: only standard 9x9 sudokus are supported, so state should be 81 characters long but was: 3',
    'throws Error when state string is wrong length')
  t.throws(() => {
    Puzzle.parse(notNumericInput)
  }, 'Parse Error: state should only contain digits 0-9',
    'throws Error when state string is not numeric')
  t.throws(() => {
    Puzzle.parse(invalidStateInput)
  }, 'Parse Error: breaks rules of sudoku',
    'throws Error when state string is not a valid sudoku state')
})

test('isComplete', t => {
  t.true(validCompletePuzzle.isComplete, 'complete puzzle is complete')
  t.false(validIncompletePuzzle.isComplete, 'incomplete puzzle is not complete')
})

test('isValid', t => {
  t.true(validCompletePuzzle.isValid, 'valid puzzle is valid')
  t.false(invalidPuzzle.isValid, 'invalid puzzle is not valid')
})
