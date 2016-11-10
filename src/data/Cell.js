export default class Cell {
  constructor (index, values) {
    this.index = index
    this.values = values
  }

  isResolved () {
    return this.values.length === 1
  }
}
