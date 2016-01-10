var game = new Phaser.Game(640, 480);

var Dodger = function() {
  this.player = null,
  this.enemies = null,

  this.gameOver = false,

  this.spawnTime = 2000,
  this.elapsedTime = 0,

  this.score = 0,
  this.scoreText = null;
};

Dodger.prototype = {
  create : function() {
    this.scoreText = game.add.text(16, 16, 'Score: 0',
                                   { fontSize: '16px', fill: '#FFF' });
    this.scoreText.x = gameHCenter(this.scoreText);

    this.physics.startSystem(Phaser.Physics.ARCADE);
    
    // Texture Rectangle to Rectangle Sprite
    var texture = rectTexture('player', 'green', 16, 16, false);
    // Create and center sprite
    this.player = this.add.sprite(gameHCenter(texture),
                                  gameVCenter(texture), texture);

    this.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;

    // Callback cannot find Dodger within its function scope thus
    // Dodger properties need to be temporarily attached to create's this.
    var player = this.player;
    this.input.addMoveCallback(function(pointer, x, y, down) {
      player.x = x - player.width / 2;
      player.y = y - player.height / 2;
    });

    this.enemies = game.add.group();
    this.enemies.enableBody = true;
    this.spawnEnemy();
  },
  
  update : function() {
    this.physics.arcade.overlap(this.player, this.enemies, this.gameOverState,
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
    var sizes = [8, 16, 32, 64];
    var x = game.rnd.pick(sizes);
    var y = game.rnd.pick(sizes);
    var texture = rectTexture('enemy', 'red', x, y, true);
    var enemy =
          this.enemies.create(this.rnd.integerInRange(0, this.game.width-1),
                              -texture.height, texture);
    enemy.checkWorldBounds = true;
    enemy.body.gravity.y = this.rnd.integerInRange(50, 200);
    enemy.events.onOutOfBounds.add(this.enemyDeath, this);
  },

  enemyDeath : function (enemy) {
    enemy.destroy();
    this.score += 10;
    this.scoreText.text = 'Score: ' + this.score;
    this.spawnEnemy();
  },

  gameOverState : function () {
    var gameOver = this.add.text(16, 16, 'Game Over',
                                 { fontSize: '32px', fill: '#FFF' });
    var totalHeight = gameOver.height + gameOver.height / 2 +
                      this.scoreText.height;
    gameOver.x = gameHCenter(gameOver);
    gameOver.y = gameVCenter(gameOver) - totalHeight / 2;
    this.scoreText.y = game.height / 2 + gameOver.height - totalHeight / 2;

    
    this.gameOver = true;
    this.enemies.destroy();
  }
};

function gameHCenter(obj) {
  return game.width / 2 - obj.width / 2;
}

function gameVCenter(obj) {
  return game.height / 2 - obj.height / 2;
}

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
