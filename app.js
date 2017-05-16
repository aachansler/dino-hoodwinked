function preload() {
  game.stage.backgroundColor = '#85b5e1';
  game.load.spritesheet('sideDino', 'assets/sprites/side_dino.png');
  game.load.spritesheet('frontDino', 'assets/sprites/front_dino.png');
  game.load.spritesheet('platforms', 'assets/sprites/platforms.png');
  game.load.spritesheet('leaf', 'assets/sprites/leaf.png');
  game.load.spritesheet('rock', 'assets/sprites/rock.png');
  }

var back;
var sideDino;
var frontDino;
var facing = 'left';
var score = 0;
var cursors;
var jumpButton;
var platforms;
var leaf;
var rock;
var scoreText;

function create() {
  back = game.add.image(0, 0, 'background');
  back.scale.set(.75);
  back.smoothed = false;

  sideDino = game.add.sprite(20, 20, 'sideDino');
  sideDino.scale.set(.30);
  sideDino.smoothed = false;

  platforms = game.add.physicsGroup();

  platforms.create(0, 150, 'platforms');
  platforms.create(500, 200, 'platforms');
  platforms.create(600, 100, 'platforms');
  platforms.create(100, 450, 'platforms');
  platforms.create(600, 650, 'platforms');
  platforms.create(400, 550, 'platforms');
  platforms.create(700, 350, 'platforms');
  platforms.create(-100, 650, 'platforms');
  platforms.scale.set(1);
  platforms.setAll('body.immovable', true);

  leaf = game.add.sprite(150, 120, 'leaf');
  leaf.scale.set(.25);
  leaf = game.add.sprite(600, 150, 'leaf');
  leaf.scale.set(.25);
  leaf = game.add.sprite(700, 70, 'leaf');
  leaf.scale.set(.25);
  leaf = game.add.sprite(200, 700, 'leaf');
  leaf.scale.set(.25);
  leaf = game.add.sprite(500, 450, 'leaf');
  leaf.scale.set(.25);
  leaf = game.add.sprite(650, 350, 'leaf');
  leaf.scale.set(.25);
  leaf = game.add.sprite(50, 500, 'leaf');
  leaf.scale.set(.25);


  rock = game.add.sprite(20, 593, 'rock');
  rock.scale.set(.50);

  scoreString = 'Score : ';
  scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#fff' });

  sideDino.animations.add('left', [0, 1, 2, 3], 10, true);
  sideDino.animations.add('turn', [4], 20, true);
  sideDino.animations.add('right', [5, 6, 7, 8], 10, true);


  game.physics.arcade.enable(sideDino);

  sideDino.body.collideWorldBounds = true;
  sideDino.body.gravity.y = 500;
  sideDino.body.bounce.y = 0.2;

  cursors = game.input.keyboard.createCursorKeys();
  jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function update () {
  game.physics.arcade.collide(sideDino, platforms);

  if (cursors.left.isDown) {
    sideDino.body.velocity.x = -150;
  }
  else if (cursors.right.isDown) {
    sideDino.body.velocity.x = 150;
  } else {
    sideDino.body.velocity.x = 0;
  }

  if (jumpButton.isDown && (sideDino.body.onFloor() || sideDino.body.touching.down)) {
    sideDino.body.velocity.y = -350;
  }
}

function collisionHandler(sideDino, leaf) {
  leaf.kill();
  sideDino.kill();
  score += 20;
  console.log(score);
  scoreText.text = 'score: ' + score;
}

var game = new Phaser.Game(800, 700, Phaser.AUTO, 'phaser', {
  preload: preload,
  create: create,
  update: update,
  collisionHandler: collisionHandler
});
