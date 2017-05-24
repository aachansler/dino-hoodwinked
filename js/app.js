var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('leaf', 'assets/leaf.png');
    game.load.spritesheet('dino', 'assets/fullDino.png', 80, 62);
		game.load.image('rock', 'assets/rock.png');
		game.load.image('comet', 'assets/comet.png');

}

var player;
var platforms;
var cursors;
var leaves;
var score = 0;
var scoreText;
var rock;
var gameOverWinText;
var gameOverLoseText;
var style;
var comet;

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'sky');

    platforms = game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;


    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(500, 200, 'ground');
    ledge.body.immovable = true;

    player = game.add.sprite(32, game.world.height - 150, 'dino');
    player.animations.add('left', [0]);
    player.animations.add('right', [2]);
    player.animations.add('stop', [1]);
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    rock = game.add.sprite(0, 192, 'rock');
    game.physics.arcade.enable(rock);
    rock.scale.setTo(.5);
    rock.visible = false;

    leaves = game.add.group();
    leaves.enableBody = true;

    for (var i = 0; i < 12; i++)
    {
        var leaf = leaves.create(i * 70, 0, 'leaf');
        leaf.body.gravity.y = 200;
        leaf.body.bounce.y = 0.7 + Math.random() * 0.1;
    }

    scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#ffffff' });

    cursors = game.input.keyboard.createCursorKeys();

    game.time.events.repeat(Phaser.Timer.SECOND * 2, 100, createComet, this);


    var style = { font: 'bold 32px Arial', fill: '#ffffff', align: 'center', boundsAlignH: 'center', boundsAlignV: 'middle', backgroundColor: 'rgba(0,255,0,0.25)' };

    text = game.add.text(150, 150, '- Dino Hoodwinked -\nSave Little Dino! Avoid the comets \nand collect leaves to survive. \nOnce you have enough leaves, \nhide under the rock for safety. \nClick to start!', style);

    gameOverWinText = game.add.text(150, 150, '- YOU WIN! - \n Great job saving Little Dino \nfor now. Dinosaurs go extinct \nanyway though, so... yeah... \n Click to play again!', style);
    gameOverWinText.visible = false;

    gameOverLoseText = game.add.text(220, 150, '- YOU LOSE - \n LITTLE DINO IS DEAD \n Click to play again!', style);
    gameOverLoseText.visible = false;

    text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    gameOverLoseText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    gameOverWinText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

    game.input.onDown.addOnce(removeText, this);

}


function update() {
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(leaves, platforms);
    game.physics.arcade.overlap(rock, player, gameOverWin);
    game.physics.arcade.overlap(player, leaves, collectLeaf, null, this);
    game.physics.arcade.overlap(player, comet, cometHitsPlayer, null, this);

    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;
        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;
        player.animations.play('right');
    }
    else
    {
        player.animations.play('stop');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }

}


function removeText() {
	text.destroy();
}

function collectLeaf(player, leaf) {
  leaf.kill();
  score += 10;
  scoreText.text = 'Score: ' + score;

  if(score >= 100) {
      rock.visible = true;
    }
}

function createComet() {
  var randomX = game.world.randomX;
  comet = game.add.sprite(randomX, 0, 'comet');
  game.physics.arcade.enable(comet);
  comet.enableBody = true;
  comet.body.gravity.y = 500;
  comet.body.velocity.x = 200;

  if(randomX >= 400) {
    comet.body.velocity.x = -200;
  }
}

function cometHitsPlayer(player, comet) {
  player.kill();
  gameOverLoseText.visible = true;
  setupClickToRestart();
}


function gameOverWin(rock, player) {
  gameOverWinText.visible = true;
  setupClickToRestart();
}

function setupClickToRestart() {
  game.input.onDown.addOnce(function() {
    game.state.start(game.state.current);
  }, this);
  score = 0;
}
