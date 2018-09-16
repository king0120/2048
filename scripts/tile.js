class Tiles {
  constructor(){
    const tiles = []
    tiles.length = 16
    this.tiles = tiles
  }

  insertTile(tile){
    return this.tiles.push(tile)
  }

  findTile(num){
    return this.tiles.find(tile => tile && tile.num === num)
  }
}

class Tile {
  constructor (num, value = 0) {
    this.num = num
    this.value = value
    console.log(this)
    console.log(num)
    this.draw(num)
  }

  getValue() {
    return this.value
  }

  get row(){
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

  get col(){
    if ([1,5,9,13].indexOf(this.num) > -1) {
      return 1
    } else if ([2,6,10,14].indexOf(this.num) > -1) {
      return 2
    } else if ([3,7,11,15].indexOf(this.num) > -1) {
      return 3
    } else if ([4,8,12,16].indexOf(this.num) > -1) {
      return 4
    }
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
    if (!cellNode) {
      console.log('node doesnt exist')
      const boardDiv = document.querySelector('.board');
      boardDiv.innerHTML += (`
      <div class='cell cell-${this.num}'>${this.value}</div>
      `)
    } else {
      console.log('node exists')
      cellNode.classList.add(`cell-${newCell}`)
      cellNode.classList.remove(`cell-${this.num}`)
      
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
