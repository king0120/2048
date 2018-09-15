class Tile {
  constructor (row, col) {
    this.value = 0
    this.row = row
    this.col = col
  }

  getValue() {
    return this.value
  }

  canMove(direction){
    switch (direction) {
      case 'up':
        console.log('cell row ' + this.row)
        return this.row > 0
      case 'down':
        return this.row < 3
      case 'left':
        return this.col > 0
      case 'right':
        return this.col < 3
    }
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
