const tic_tac_toe = {
  board: ['','','','','','','','',''],
  container_element: null,
  gameover: false,
  symbols: {
    options: ['X','O'],
    turn_index: 0,
    change: function(){
      this.turn_index = (this.turn_index == 0) ? 1 : 0
    }
  },
  winning_sequences: [
    ['0','1','2'],
    ['3','4','5'],
    ['6','7','8'],
    ['0','3','6'],
    ['1','4','7'],
    ['2','5','8'],
    ['0','4','8'],
    ['2','4','6']
  ],

  start: function(){
    this.disable_button()
    this.board.fill('')
    this.draw()
    this.gameover = false
  },

  init: function(container){
    this.container_element = container
  },

  disable_button: function(){
    let button = document.getElementById('btn')
    button.disabled = true
    button.style.background = "#7c7a79"
  },

  enable_button: function(){
    let button = document.getElementById('btn')
    button.disabled = false
    button.textContent = "Restart"
    button.style.background = "#ff7f50"
  },

  draw: function(){
    let content = ''

    for(i in this.board)
      content += `<div onclick="tic_tac_toe.make_play(${i})" id="${i}"> ${this.board[i]}</div>`
    this.container_element.innerHTML = content
  },

  make_play: function(position) {
    if(this.gameover){
      return false
    } else if(this.board[position] == ''){
      this.board[position] = this.symbols.options[this.symbols.turn_index]
      this.draw()
      this.winning_sequences_check()
      this.symbols.change()
    } 
    else {
      return false
    }
  },

  winning_sequences_check: function(){
    let symbol = this.symbols.options[this.symbols.turn_index]

    for(i in this.winning_sequences){
      if(this.board[this.winning_sequences[i][0]] == symbol && 
         this.board[this.winning_sequences[i][1]] == symbol && 
         this.board[this.winning_sequences[i][2]] == symbol)
          this.game_is_over(i)
    }
  },

  game_is_over: function(winning_sequence_index){
    this.gameover = true

    let winning_sequence = this.winning_sequences[winning_sequence_index]

    for(i in winning_sequence){ 
      let symbol = document.getElementById(winning_sequence[i])
      symbol.style.color = "#00FF28 "
    }

    this.enable_button()
  }
}