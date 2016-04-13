var GamePlayState = function() {
  this.tiles = [];
  this.noOfPairs = 10;
  
  this.tileSize = 20;

  // 24 pair combinations
  this.colors = {
    red:     "#FF0000",
    blue:    "#0000FF",
    green:   "#00FF00",
    yellow:  "#FFFF00",
    magneta: "#FF00FF"
  };
  this.shapes = ["rect", "circ", "trgl", "diam"];
};

GamePlayState.prototype = {
  create : function() {
    // Testing...
    this.board = this.createBoard();
    this.rect = this.add.sprite(50, 50, 
                                rectTexture('rect', this.colors.blue, 32, 32));
    this.circ = this.add.sprite(100, 50,
                                circleTexture('circ', this.colors.red, 16));
    this.trgl = this.add.sprite(50, 100,
                                triangleTexture('trgl', this.colors.magneta, 32))
    this.diam = this.add.sprite(100, 100,
                                diamondTexture('diam', this.colors.green, 32))
  },
  
  update : function() {
    
  },

  createBoard: function() {
    var retBrd = [];
    for (var color in this.colors) {
      if (this.colors.hasOwnProperty(color)) {
        var c = {};
        c[color] = this.colors[color];
        this.shapes.forEach(function(shape) {
          retBrd.push([c, shape]);
        }, this);
      }
    }
    
    return retBrd;
  }
};