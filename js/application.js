var Board = function(side_length) {
  this.turnCount = 0
  this.square = new Array(side_length)
  for (var x = 0; x < side_length; x++){
    this.square[x] = new Array(side_length)
    for (var y = 0; y < side_length; y++)
      this.square[x][y] = null
  }
};


Board.prototype.square_is = function(row, col, X_or_O) {
  this.square[row][col] = X_or_O
  this.turnCount++
};


//admittedly there are problems with this.  Cannot detect rightmost 2 column winners.  I would like to improve 
//but noticed the flaw too late and did not have time.  
Board.prototype.winner = function() {
  for (var x = 0; x < this.square.length-2; x++)
    for (var y = 0; y < this.square.length-2; y++){
      if(this.square[x][y] == this.square[x+1][y] && this.square[x][y] == this.square[x+2][y])
        return this.square[x][y]
      if(this.square[x][y] == this.square[x][y+1] && this.square[x][y] == this.square[x][y+2])
        return this.square[x][y]
    }
};


//namespacing the Game, binds DOM elements to the underlying JS board model 
var Game = {
  board: null,
  
  //initializes board, creates the DOM board, and applies event listeners to squares after they are created
  //is invoked when user clicks create board and inputs side length.

  startGame: function(side_length){
    this.board = new Board(side_length)
    this.createBoard(side_length)
    this.clickedSquare()
  },
  
  //dynamically creating the board in the DOM
  createBoard: function(side_length){
    this.clearBoard()
    for (var x = 0; x < side_length; x++){
      $('.gameboard').append('<br>')
      for (var y = 0; y < side_length; y++)
        $('.gameboard').append('<div class="square" data-row='+x+' data-col='+y+'></div>')
    }
      
  },

  clearBoard: function() {
    $('.gameboard').html('')
  },


//would like to break this down more but didn't have time.  Game logic on a clicked square
//checks for winner each time if greater than 3 x's have been played
  clickedSquare: function() {  
    var that = this
    $('.square').on('click', function(){
      var row = $(this).attr('data-row')
      var col = $(this).attr('data-col')
      var X_or_O = that.get_X_or_O()
      console.log(X_or_O)
      that.board.square_is(row,col,X_or_O)
      $(this).html(X_or_O)
      if (that.board.turnCount > 4)  //account for off by one
        that.checkWinner()
    })
  },

  get_X_or_O: function(){  //switches every turn between x and o's
    if (this.board.turnCount % 2 == 0)
      return "X"
    else
      return "O"
  },

  checkWinner: function(){  //if there is a winner it will send an alert
    if (this.board.winner()) {
      alert('Winner!! -> ' + this.board.winner());
    }
  }
}

$(function(){  //game is initialized by users actions in creating board
  $(".createBoard").on('click',function(event){
    console.log("creating the board")
    var side_length = $("#side_length").val();
    console.log(side_length)
    Game.startGame(side_length)

  })
})