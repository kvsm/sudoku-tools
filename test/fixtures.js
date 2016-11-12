import Puzzle from '../src/data/Puzzle'
import Cell from '../src/data/Cell'

export const wrongLengthInput = '123'
export const notNumericInput = '12345678912345678912345678912345678912345678912345678912345678912345678912345678a'
export const invalidStateInput = '111111789456789123789123456234567891567891234891234567345678912678912345912345670'
export const validInput = '123456789456789123789123456234567891567891234891234567345678912678912345912345670'
export const invalidPuzzle = Puzzle.parse(validInput)
invalidPuzzle.currentState[1].values = [1]
export const validIncompletePuzzle = Puzzle.parse(validInput)
export const validCompletePuzzle = Puzzle.parse(validInput)
validCompletePuzzle.currentState[80].values = [8]
export const validIncompleteRegion = [
  { values: [1] },
  { values: [2] },
  { values: [8, 9] },
  { values: [8, 9] }
]
export const nakedSingleRegion = [
  new Cell(0, [1, 2, 3]),
  new Cell(1, [1, 2]),
  new Cell(2, [1])
]
