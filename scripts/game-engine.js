class GameEngine {
  constructor(gameboard){
    this.gameboard = gameboard
  }

  draw() {
    const boardDiv = document.querySelector('.board');
    boardDiv.innerHTML = ''
    let tileNumber = 0
    this.gameboard.board.map((cell, index)  => {
        tileNumber += 1
        if (cell.value > 0){
          boardDiv.innerHTML += (`
            <div class='cell cell-${cell.num}'>${cell.value}</div>
          `)
        }
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