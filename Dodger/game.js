var Dodger = Dodger || {};

var game = new Phaser.Game(640, 480);
game.state.add("GameState", new Dodger.GameState());
game.state.add("GameOverState", new Dodger.GameOverState());
game.state.start("GameState", true, false);
