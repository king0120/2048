class Tile {
  constructor (row, col, num, value = 0) {
    this.row = row
    this.col = col
    this.num = num
    this.value = value
    console.log(this)
  }

  getValue() {
    return this.value
  }

  canMove(direction){
    switch (direction) {
      case 'up':
        console.log('cell row ' + this.row)
        return this.row > 1
      case 'down':
        return this.row < 4
      case 'left':
        return this.col > 1
      case 'right':
        return this.col < 4
    }
  }

  draw(newCell){
    let cellNode = document.querySelector(`.cell-${this.num}`)
    cellNode.classList.remove(`cell-${this.num}`)
    cellNode.classList.add(`cell-${newCell}`)

  }

  compareNeighborTile(comparisonTile){
    const {row, col} = this
    if (comparisonTile.value > 0 && comparisonTile.value !== this.value) {
      return false
    } else if (comparisonTile.value === this.value) {
      this.value *= 2
      return true
    }
  }

  setValue(val) {
    this.value += val
  }
}
