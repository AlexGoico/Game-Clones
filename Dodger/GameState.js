var Dodger = Dodger || {};

Dodger.GameState = function() {
  this.player = null,
  this.enemies = null,

  this.spawnTime = 2000,
  this.elapsedTime = 0,

  this.score = 0,
  this.scoreText = null;
};

Dodger.GameState.prototype = {
  create : function() {
    this.scoreText = game.add.text(16, 16, 'Dodged: 0',
                                   { fontSize: '16px', fill: '#FFF' });
    this.scoreText.x = gameHCenter(this.scoreText);

    this.physics.startSystem(Phaser.Physics.ARCADE);
    
    var texture = rectTexture('player', 'green', 16, 16, false);
    this.player = this.add.sprite(gameHCenter(texture),
                                  gameVCenter(texture), texture);

    this.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;

    this.input.addMoveCallback(function(pointer, x, y, down) {
      this.player.x = x - this.player.width / 2;
      this.player.y = y - this.player.height / 2;
    }, this);

    this.reverseKey = this.input.keyboard.addKey(Phaser.Keyboard.R);

    this.enemies = game.add.group();
    this.enemies.enableBody = true;

    // Todo: Reverse Mechanic
    this.reverseKey.onDown.add(function() {
      this.enemies.forEach(function(enemy) {
        enemy.body.velocity.y = ~enemy.body.velocity.y;
      });
    }, this);

    this.spawnEnemy();
  },
  
  update : function() {
    if (this.physics.arcade.overlap(this.player, this.enemies)) {
      this.enemies.destroy();
      game.state.start('GameOverState', true, false, this.score);

    }

    if (this.elapsedTime + game.time.elapsedMS < this.spawnTime)
      this.elapsedTime += game.time.elapsedMS;
    else {
      this.elapsedTime = 0;
      this.spawnEnemy();
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
    enemy.body.velocity.y = this.rnd.integerInRange(200, 500);
    enemy.events.onOutOfBounds.add(this.enemyDeath, this);
  },

  enemyDeath : function (enemy) {
    enemy.destroy();
    this.score++;
    this.scoreText.text = 'Dodged: ' + this.score;
    this.spawnEnemy();
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
