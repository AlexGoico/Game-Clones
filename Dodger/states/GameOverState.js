var Dodger = Dodger || {};

Dodger.GameOverState = function() {
};

Dodger.GameOverState.prototype = {
  init: function(score) {
    this.score = score;
  },

  create: function() {
    var gameOver = this.add.text(16, 16, 'Game Over',
                                 { fontSize: '32px', fill: '#FFF' });
    var scoreText = this.add.text(16, 16, 'Dodged: ' + this.score,
                                  { fontSize: '16px', fill: '#FFF' });
    scoreText.x = gameHCenter(scoreText);

    var totalHeight = gameOver.height + gameOver.height / 2 +
                      scoreText.height;
    gameOver.x = gameHCenter(gameOver);
    gameOver.y = gameVCenter(gameOver) - totalHeight / 2;
    scoreText.y = game.height / 2 + gameOver.height - totalHeight / 2;
  }
};
