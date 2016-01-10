var game = new Phaser.Game(640, 480);

var Dodger = function() {
  this.player = null,
  this.enemies = null,
  this.gameOver = false;
};

Dodger.prototype = {
  preload : function() {
    
  },
  
  create : function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    // Texture Rectangle to Rectangle Sprite
    var texture = rectTexture('player', 'green', 16, 16, false);
    // Create and center sprite
    this.player = game.add.sprite(game.width  / 2 - texture.width / 2,
                                  game.height / 2 - texture.height / 2,
                                  texture);

    game.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;

    // Callback cannot find Dodger within its function scope thus
    // Dodger properties need to be temporarily attached to create's this.
    var player = this.player;
    game.input.addMoveCallback(function(pointer, x, y, down) {
      player.x = x - player.width / 2;
      player.y = y - player.height / 2;
    });

    this.spawnTime = 2000;
    this.elapsedTime = 0;

    this.enemies = game.add.group();
    this.enemies.enableBody = true;
    this.spawnEnemy();

  },
  
  update : function() {
    game.physics.arcade.overlap(this.player, this.enemies, this.gameOverState,
                                null, this);
    if (!this.gameOver) {
      if (this.elapsedTime + game.time.elapsedMS < this.spawnTime)
        this.elapsedTime += game.time.elapsedMS;
      else {
        this.elapsedTime = 0;
        this.spawnEnemy();
      }
    }
  },

  spawnEnemy : function () {
    var texture = rectTexture('enemy', 'red', 32, 32, true);
    var enemy = this.enemies.create(game.rnd.integerInRange(0, game.width-1),
                                    -texture.height, texture);
    enemy.checkWorldBounds = true;
    enemy.body.gravity.y = 50;
    enemy.events.onOutOfBounds.add(function(enemy) {
      enemy.destroy();
      console.log("Destroyed...");
      this.spawnEnemy();
    }, this);
  },

  gameOverState : function () {
    console.log("overlaps...");
    game.add.text(16, 16, 'Game Over', { fontSize: '32px', fill: '#FFF' });
    this.gameOver = true;
    this.enemies.destroy();
  }
};

function rectTexture(key, color, w, h, fill) {
  var texture = new Phaser.BitmapData(game, key, w, h);
  if (fill) {
    texture.context.fillStyle = color;
    texture.context.fillRect(0, 0, w, h);
  }
  else {
    texture.context.lineWidth = 2;
    texture.context.strokeStyle = color;
    texture.context.rect(0, 0, w, h);
    texture.context.stroke();
  }

  return texture;
}

game.state.add('Game', Dodger, true);
