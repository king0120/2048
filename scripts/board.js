class Board {
  constructor() {
    this.board = new Tiles()
  }

  // Create a new tile in an empty space
  generateTile() {
    const availableTiles = [1,2,3,4,5,8,9,12,13,14,15,16]
    const randomTileIndex = Math.floor(Math.random() * availableTiles.length)

    const randomTile = availableTiles[randomTileIndex]
    // Check if random Tile alreay exists
    if (!this.board.findTile(randomTile)) {
      this.board.insertTile(new Tile(randomTile, 2))
    } else {
      return this.generateTile()
    }
    // TODO: Infinite loop if board is filled
  }

  slide(direction) {
    switch (direction) {
      case('right'):
        {
          this.board.onEachTile((cell) => {
              if (cell.canMove(direction)) {
                let desired = cell.row * 4
                let current = cell.num
                while (current !== desired){
                  current += 1
                  let neighbor = this.board.findTile(current)
                  if (neighbor){
                    if (!cell.compareNeighborTile(neighbor, this.board)){
                      cell.right()
                    }
                  }
                }
                
              }
            })
          setTimeout(() => this.generateTile(), 300)
          break
        }
      case('left'):
        {
          this.board.onEachTile((cell) => {
            if (cell.canMove(direction)) {
              cell.left()
            }
          })
          setTimeout(() => this.generateTile(), 300)
          break
        }
      case('up'):
        {
          this.board.onEachTile((cell) => {
            if (cell.canMove(direction)) {
              cell.up()
            }
          })
          setTimeout(() => this.generateTile(), 300)
          break
        }
      case('down'):
        {
          this.board.onEachTile((cell) => {
            if (cell.canMove(direction)) {
              cell.down()
            }
          })
          setTimeout(() => this.generateTile(), 300)
          break
        }
    }
  }

}
