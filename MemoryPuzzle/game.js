var game = new Phaser.Game(640, 480);

game.state.add('GamePlayState', new GamePlayState());
game.state.start('GamePlayState', true, false);
