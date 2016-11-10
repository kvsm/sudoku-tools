export default class Cell {
  constructor (index, values) {
    this.index = index
    this.values = values
  }

  get isResolved () {
    return this.values.length === 1
  }
}
