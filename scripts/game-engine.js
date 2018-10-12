class GameEngine {
  constructor(gameboard) {
    this.gameboard = gameboard
  }

  detectMove(event) {
    const board = this.gameboard
    const { key } = event
    let prevBoard = []
    // TODO: Find out why Arrow updownleftright isn't working
    switch (key) {
      case ('w'):
        return board.slide('up')
      case ('a'):
        return board.slide('left')
      case ('s'):
        return board.slide('down')
      case ('d'):
        return board.slide('right')
    }

    console.log(prevBoard)
  }

  startGame() {
    this
      .gameboard
      .generateTile()

    document
      .body
      .addEventListener('keypress', (e) => this.detectMove(e))
  }
}
