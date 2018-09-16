class Board {
  constructor(){
    this.board = new Tiles()
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

    if (!this.board.findTile(randomTile)){
      console.log(`Insert at ${randomTile}`)
      this.board.insertTile(new Tile(randomTile, 2))
    } else {
      return this.generateTile()
    }
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
    console.log(direction)
    if (!this.isMovePossible(direction)) {
      console.log("Cannot slide in this direction.")
      return
    }

    let rerun = false
    
    const move= () => this.onEachTile((tile) => {
      if (tile && tile.getValue() > 0){
        if (tile.canMove(direction)) {
          
          // console.log(`Row: ${tile.row}, Col: ${tile.col}, Num: ${tile.num}`)
          const {row, col} = tile
          if (direction === 'up') {
            console.log(tile.row)
            console.log(tile.col)
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