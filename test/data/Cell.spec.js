import test from 'ava'
import Cell from '../../src/data/Cell'

test('isResolved', t => {
  const cell1 = new Cell(1, [1])
  t.true(cell1.isResolved, 'cell with 1 value is resolved')
  const cell2 = new Cell(2, [1, 2, 3])
  t.false(cell2.isResolved, 'cell with 3 values in not resolved')
})
