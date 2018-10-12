class Tiles {
  constructor() {
    const tiles = []
    this.tiles = tiles
  }

  onEachTile(callback) {
    for (let cell = 0; cell < this.tiles.length; cell++) {
      callback(this.tiles[cell])
    }
  }

  insertTile(tile) {
    return this
      .tiles
      .push(tile)
  }

  findTile(num) {
    console.log(this.tiles)
    return this.tiles.find(tile => tile && tile.num === num)
  }

  remove(tileToRemove) {
    this.tiles = this
      .tiles
      .filter(tile => tile.num === tileToRemove)
    tileToRemove.eraseFromDom()
  }
}

class Tile {
  constructor(num, value = 0) {
    this.num = num
    this.value = value
    this.draw(num)
  }

  getValue() {
    return this.value
  }

  get row() {
    if (this.num >= 1 && this.num <= 4) {
      return 1
    } else if (this.num >= 5 && this.num <= 8) {
      return 2
    } else if (this.num >= 9 && this.num <= 12) {
      return 3
    } else if (this.num >= 13 && this.num <= 16) {
      return 4
    }
  }

  get col() {
    if ([1, 5, 9, 13].indexOf(this.num) > -1) {
      return 1
    } else if ([2, 6, 10, 14].indexOf(this.num) > -1) {
      return 2
    } else if ([3, 7, 11, 15].indexOf(this.num) > -1) {
      return 3
    } else if ([4, 8, 12, 16].indexOf(this.num) > -1) {
      return 4
    }
  }

  canMove(direction) {
    switch (direction) {
      case 'up':
        return this.row > 1
      case 'down':
        return this.row < 4
      case 'left':
        return this.col > 1
      case 'right':
        return this.col < 4
    }
  }

  draw(newCell) {
    let cellNode = document.querySelector(`.cell-${this.num}`)
    console.log(this.num)
    console.log(cellNode)
    if (!cellNode) {
      const boardDiv = document.querySelector('.board')
      boardDiv.innerHTML += (`
      <div class='cell cell-${this.num}'>${this.value}</div>
      `)
    } else {
      cellNode.classList = `cell cell-${newCell}`
      cellNode.innerHTML = this.value
      this.num = newCell
    }
  }

  eraseFromDom() {
    document
      .querySelector(`.cell-${this.num}`)
      .remove()
  }

  compareNeighborTile(comparisonTile) {
    const { row, col } = this
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

  left() {
    let possible = [null, 1, 5, 9, 13]
    console.log(possible[this.row])
    this.draw(possible[this.row])
  }
  right() {
    const numberOfTilesToMove = (this.row * 4)
    this.draw(numberOfTilesToMove)
  }
  up() {
    const desiredLoc = this.col
    this.draw(desiredLoc)
  }
  down() {
    const desiredLoc = (3 * 4) + this.col
    this.draw(desiredLoc)
  }
}
