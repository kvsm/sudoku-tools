import R from 'ramda'

export default class Cell {
  static clone (cell) {
    if (cell instanceof Cell) {
      return new Cell(cell.index, cell.values)
    } else {
      throw new Error('Cell.clone(arg): arg is not an instance of Cell')
    }
  }

  constructor (index, values) {
    this.index = index
    this.values = R.clone(values)
  }

  get isResolved () {
    return this.values.length === 1
  }
}
