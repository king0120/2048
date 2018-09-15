class GameEngine {
  constructor(gameboard){
    this.gameboard = gameboard
  }

  draw() {
    const boardDiv = document.querySelector('.board');
    boardDiv.innerHTML = ''
    this.gameboard.board.map(row => {
      row.map(cell => {
        boardDiv.innerHTML += (`
          <div class='cell'>${cell.value}</div>
        `)
      })
    })
  }

  detectMove({key}){
    const board = this.gameboard
    switch(key){
      case 'w':
        board.slide('up')
        break;
      case 'a':
        board.slide('left')
        break;
      case 's':
        board.slide('down')
        break;
      case 'd':
        board.slide('right')    
        break;
    }

    this.draw()
  }

  startGame(){
    this.gameboard.generateTile()
    this.draw()

    document.body.addEventListener('keypress', (e) => this.detectMove(e))
  }
}