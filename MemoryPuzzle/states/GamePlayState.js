GamePlayState = function() {
  Phaser.State.call(this);
};

GamePlayState.prototype = Object.create(Phaser.State.prototype);
GamePlayState.prototype.constructor = GamePlayState;

GamePlayState.prototype.init = function() {
  this.texturePlugin = this.game.plugins.add(Phaser.Plugin.PrimitiveTextures);
  
  this.margins = {
    x: 60,
    y: 60
  };

  this.tileMargins = {
    x: 20,
    y: 20
  };

  this.boardDim = {
    width: this.game.width - this.margins.x,
    height: this.game.height - this.margins.y
  };

  // Board of four rows
  this.noOfPairs = 10;
  this.totalTiles = this.noOfPairs * 2;
  this.rows = 5;
  this.columns = this.totalTiles / this.rows;
  // Assumes that rows and columns > 0
  this.totalTileMargins = {
    rows: (this.rows - 1) * this.tileMargins.x,
    columns: (this.columns - 1) * this.tileMargins.y
  };

  // Assumes board dimensions > tileMargins
  this.tileSize = {
    width: (this.boardDim.width - this.totalTileMargins.rows) / this.rows,
    height: (this.boardDim.height - this.totalTileMargins.columns) / this.columns
  };
};

GamePlayState.prototype.create = function() {
  // 20 pair combinations
  var colors = {
    red:     "#FF0000",
    blue:    "#0000FF",
    green:   "#00FF00",
    yellow:  "#FFFF00",
    magneta: "#FF00FF"
  };
  var shapes = ["rect", "circ", "trgl", "diam"];

  var board = this.getRandomBoard(colors, shapes);

  this.createTile(colors.red, shapes[0], this.margins, this.tileSize);
  this.margins.x += this.tileMargins.x + this.tileSize.width;
  this.createTile(colors.red, shapes[0], this.margins, this.tileSize);
};

GamePlayState.prototype.update = function() {
  
};

GamePlayState.prototype.getRandomBoard = function(colors, shapes) {
  var temp = this.createBoard(colors, shapes.slice(0, 2));

  // Duplicate and shuffle tiles
  temp = temp.concat(temp);
  Phaser.ArrayUtils.shuffle(temp);

  // Partition the array as a 2d grid
  var board = partition(temp, this.columns);

  return board;
};

GamePlayState.prototype.createBoard = function(colors, shapes) {
  var retBrd = [];
  
  for (var color in colors) {
    if (colors.hasOwnProperty(color)) {
      shapes.forEach(function(shape) {
        retBrd.push({
          color: color,                  // stores key
          colorCode: colors[color],      // stores value (color hex)
          shape: shape                   // stores shape string
        });
      }, this);
    }
  }
  
  return retBrd;
};

GamePlayState.prototype.createTile = function(color, shape, pos, dim) {
  var texture;
  switch (shape) {
  case "rect":
    texture = this.texturePlugin.rectTexture("", color, dim.width, dim.height);
    break;
  case "circ":
    texture = this.texturePlugin.circleTexture("", color, dim.r);
    break;
  case "trgl":
    texture = this.texturePlugin.triangleTexture("", color, dim.r);
    break;
  case "diam":
    texture = this.texturePlugin.diamondTexture("", color, dim.r);
    break;
  }
  console.log(texture);

  return this.add.sprite(pos.x, pos.y, texture);
};

function partition(arr, n) {
  var dup = arr.slice(0),
      ret   = [];

  while (dup.length)
    ret.push(dup.splice(0, n));

  return ret;
};

/*
  var y = this.margins.height;
  for (var i = 0; i < this.rows; i++) {
  var x = this.margins.width;
  for (var j = 0; j < this.columns; j++) {
  if (this.
  this.createTile(this.board[i][j].colorCode,
  this.board[i][j].shape,
  {x: x, y: y},
  {w: Math.round(this.tileSize.x * .9),
  h: Math.round(this.tileSize.y * .9)});
  x += this.tileMargins.x;
  }
  y += this.tileMargins.y;
  }
*/
