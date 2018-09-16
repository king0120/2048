class Board {
  constructor(){
    const tiles = []
    let count = 0
    tiles.length = 16
    this.board = tiles
  }

  onEachTile(callback){
    for (let cell = 0; cell < this.board.length; cell++){
        callback(this.board[cell])
    }
  }

  generateTile(){
    const availableTiles = [1,2,3,4,5,8,9,12,13,14,15,16]
    const randomTileIndex = Math.floor(Math.random() * availableTiles.length)

    const randomTile = availableTiles[randomTileIndex]

    if (!this.board[randomTile - 1]){
      console.log(`Insert at ${randomTile}`)
      this.board.splice(randomTile - 1, 1, new Tile(1, 1, randomTile, 2))
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
      if (tile && tile.value > 0 && tile.canMove(direction)) {
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
      if (tile && tile.getValue() > 0){
        if (tile.canMove(direction)) {
          console.log(`Row: ${tile.row}, Col: ${tile.col}, Num: ${tile.num}`)
          const {row, col} = tile
          if (direction === 'up') {
            
          } else if (direction === 'down') {
            
          } else if (direction === 'left') {
            
          }else if (direction === 'right') {
            const rightAmountToMove = (tile.row * 4) - tile.num
            const newNum = tile.num + rightAmountToMove
            tile.draw(newNum)
            tile.num = newNum
            console.log(rightAmountToMove)
          }        
        }
      }
    })

    move()
    // do {
    //   rerun = false
    //   move()
    // } while (rerun)

    this.generateTile()
  }
}