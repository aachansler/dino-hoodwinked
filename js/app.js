var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('leaf', 'assets/leaf.png');
    game.load.image('dino', 'assets/dino.png');
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
var gameOverText;
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

    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    cursors = game.input.keyboard.createCursorKeys();

    game.time.events.repeat(Phaser.Timer.SECOND * 2, 100, createComet, this);

    var style = { font: 'bold 32px Arial', fill: '#ffffff', align: 'center', boundsAlignH: 'center', boundsAlignV: 'middle' };

    text = game.add.text(150, 150, '- Dino Hoodwinked -\nSave Little Dino! Avoid the comets \nand collect leaves to survive. \nOnce you have enough leaves, \nhide under the rock for safety. \nClick to start!', style);

    gameOverText = game.add.text(150, 150, '- YOU WIN! - \n Great job saving Little Dino \nfor now. Dinosaurs go extinct \nanyway though, so... yeah...', style);
    gameOverText.visible = false;

    game.input.onDown.addOnce(removeText, this);

}


function update() {
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(leaves, platforms);
    game.physics.arcade.overlap(rock, player, gameOver);
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
        player.animations.stop();
        player.frame = 4;
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
  var comet = game.add.sprite(game.world.randomX, 0, 'comet');
  game.physics.arcade.enable(comet);
  comet.enableBody = true;
  comet.body.gravity.y = 500;
}

function cometHitsPlayer(player, comet) {
  console.log('hi');
}


function gameOver (rock, player) {
  gameOverText.visible = true;

}
