var GamePlayState = function() {
  this.tiles = [];
  this.noOfPairs = 15;

  this.colors = {
    red:     0xFF0000,
    blue:    0x0000FF,
    green:   0x00FF00,
    yellow:  0xFFFF00,
    magneta: 0xFF00FF
  };
  this.shapes = ["rect", "circ", "trgl", "diam"];
};

GamePlayState.prototype = {
  create : function() {
    this.board = createTiles(noOfTiles);
  },
  
  update : function() {
    
  },

  createTiles: function(pairs) {
    
  }
};
