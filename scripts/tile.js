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
    return this.tiles.find(tile => tile && tile.num === num)
  }

  remove(tileToRemove) {

    let newTiles = this.tiles.filter(tile => {
      console.log(this.tiles)
      console.log(tileToRemove)
      return tile.num !== tileToRemove.num
    })
    console.log(newTiles.length)
    console.log(this.tiles.length)

    this.tiles = newTiles
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
    document.querySelector(`.cell-${this.num}`).remove()
  }

  compareNeighborTile(comparisonTile, board) {
    if (comparisonTile.value !== this.value) {
      return false
    } else if (comparisonTile.value === this.value) {
      this.value = comparisonTile.value * 2
      board.remove(comparisonTile)
      return true
    }
  }

  setValue(val) {
    this.value += val
  }

  left() {
    let possible = [null, 1, 5, 9, 13]
    this.draw(possible[this.row])
  }
  right() {
    if (this.num % 4 !== 0){
      this.num+=1
    }
    this.draw(this.num)
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
