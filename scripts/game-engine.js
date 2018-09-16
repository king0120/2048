class GameEngine {
  constructor(gameboard) {
    this.gameboard = gameboard
  }

  createBoard() {
    console.log(this.gameboard)
    const boardDiv = document.querySelector('.board');
    this.gameboard.board.map((cell, index) => {
        let cellNode = document.querySelector(`.cell-${cell.num}`)
        if (!cellNode) {
          boardDiv.innerHTML += (`
          <div class='cell cell-${cell.num} ${cell.value
            ? null
            : 'hidden'}'>${cell.value}</div>
        `)
        }
      })
  }

  detectMove(event) {
    const board = this.gameboard
    const {key} = event
    let prevBoard = []
    // TODO: Find out why Arrow updownleftright isn't working
    switch (key) {
      case('w' || 'ArrowUp'):
        board.slide('up')
      case('a' || 'ArrowLeft'):
        board.slide('left')
      case('s' || 'ArrowDown'):
        board.slide('down')
      case('d' || 'ArrowRight'):
        board.slide('right')
    }

    console.log(prevBoard)
  }

  startGame() {
    this.gameboard.generateTile()
    this.createBoard()

    document
      .body
      .addEventListener('keypress', (e) => this.detectMove(e))
  }
}