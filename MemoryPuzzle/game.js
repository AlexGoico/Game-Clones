var game = new Phaser.Game(640, 480);

var MemPuz = function() {
  this.tiles = 15;
  this.tileSize = 20;
  this.spacing = 2;

};

MemPuz.prototype = {
  preload : function() {
    
  },
  
  create : function() {
    this.stage.backgroundColor = 0x0000FF;
  },
  
  update : function() {
    
  },

  drawCovers : function() {
    for (
  }
};

game.state.add('GameStartState', MemPuz, true);
