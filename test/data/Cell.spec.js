import test from 'ava'
import Cell from '../../src/data/Cell'

test('isResolved', t => {
  const cell1 = new Cell(1, [1])
  t.true(cell1.isResolved, 'cell with 1 value is resolved')
  const cell2 = new Cell(2, [1, 2, 3])
  t.false(cell2.isResolved, 'cell with 3 values in not resolved')
})

test('clone', t => {
  const cell1 = new Cell(1, [1])
  const clone = Cell.clone(cell1)
  t.true(clone instanceof Cell, 'clone is an instance of Cell')
  t.false(clone === cell1, 'clone is not the same instance as original')
  t.throws(() => {
    Cell.clone('foobar')
  })
})
