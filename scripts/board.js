class Board {
  constructor(){
    this.board = [
      [new Tile(0, 0), new Tile(0, 1), new Tile(0, 2), new Tile(0, 3)],
      [new Tile(1, 0), new Tile(1, 1), new Tile(1, 2), new Tile(1, 3)],
      [new Tile(2, 0), new Tile(2, 1), new Tile(2, 2), new Tile(2, 3)],
      [new Tile(3, 0), new Tile(3, 1), new Tile(3, 2), new Tile(3, 3)],
    ]
  }

  onEachTile(callback){
    for (let row = 0; row < this.board.length; row++){
      for(let col = 0; col < this.board[row].length; col++){
          callback(this.board[row][col], row, col)
      }
    }
  }

  generateTile(){
    const row = Math.floor(Math.random() * 4)
    const col = Math.floor(Math.random() * 4)
    if (this.board[row][col].getValue() === 0){
      console.log(`Insert at ${col}, ${row}`)
      this.board[row][col].setValue(2)
    } else {
      return this.generateTile()
    }
     
    // this.printBoard()
  }

  printBoard(){
    console.log(this.board[0])
    console.log(this.board[1])
    console.log(this.board[2])
    console.log(this.board[3])
  }

  isMovePossible(direction){
    let canMoveCount = 0
    this.onEachTile(tile => {
      if (tile.value > 0 && tile.canMove(direction)) {
        canMoveCount += 1
      }
    })
    return canMoveCount > 0
  }

  slide(direction){
    if (!this.isMovePossible(direction)) {
      console.log("Cannot slide in this direction.")
      return
    }

    let rerun = false
    
    const move= () => this.onEachTile((tile) => {
      if (tile.getValue() > 0){
        if (tile.canMove(direction)) {
          const {row, col} = tile
          if (direction === 'up') {
            if (tile.compareNeighborTile(this.board[row - 1][col])){
              tile.row -= 1
              this.board[row - 1].splice(col, 1, tile)
              this.board[row].splice(col, 1, new Tile(row, col))
              rerun = true
            }
          } else if (direction === 'down') {
            if (tile.compareNeighborTile(this.board[row + 1][col])){
              tile.row += 1
              this.board[row + 1].splice(col, 1, tile)
              this.board[row].splice(col, 1, new Tile(row, col))
              rerun = true
            }
          } else if (direction === 'left') {
            if (tile.compareNeighborTile(this.board[row][col - 1])){
              tile.col -= 1
              this.board[row].splice(col - 1, 1, tile)
              this.board[row].splice(col, 1, new Tile(row, col))
              rerun = true
            } 
          }else if (direction === 'right') {
            if (tile.compareNeighborTile(this.board[row][col + 1])){
              tile.col += 1
              this.board[row].splice(col + 1, 1, tile)
              this.board[row].splice(col, 1, new Tile(row, col))
              rerun = true
            }
          }        
        }
      }
    })

    do {
      rerun = false
      move()
    } while (rerun)

    this.generateTile()
  }
}