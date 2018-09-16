class GameEngine {
  constructor(gameboard) {
    this.gameboard = gameboard
  }

  detectMove(event) {
    const board = this.gameboard
    const {key} = event
    let prevBoard = []
    // TODO: Find out why Arrow updownleftright isn't working
    switch (key) {
      case('w'):
        board.slide('up')
        break
      case('a'):
        board.slide('left')
        break
      case('s'):
        board.slide('down')
        break
      case('d'):
        board.slide('right')
        break
    }

    console.log(prevBoard)
  }

  startGame() {
    this.gameboard.generateTile()

    document
      .body
      .addEventListener('keypress', (e) => this.detectMove(e))
  }
}