function preload() {
  game.load.image('lazur', 'assets/pics/thorn_lazur.png');
  game.load.spritesheet(
    'mummy',
    'assets/sprites/metalslug_mummy37x45.png',
    37,
    45,
    18
  );
}

var back;
var mummy;
// var anim;
// var loopText;
var cursors;
var jumpButton;

function create() {
  back = game.add.image(0, -400, 'lazur');
  back.scale.set(2);
  back.smoothed = false;

  mummy = game.add.sprite(100, 200, 'mummy');
  mummy.scale.set(4);
  mummy.smoothed = false;

  game.physics.arcade.enable(mummy);

  mummy.body.collideWorldBounds = true;
  mummy.body.gravity.y = 500;

  cursors = game.input.keyboard.createCursorKeys();
  jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


  // anim = mummy.animations.add('walk');

  // anim.onStart.add(animationStarted, this);
  // anim.onLoop.add(animationLooped, this);
  // anim.onComplete.add(animationStopped, this);

  // anim.play(10, true);
}

// function animationStarted(sprite, animation) {
//   game.add.text(32, 32, 'Animation started', { fill: 'white' });
// }

// function animationLooped(sprite, animation) {
//   if (animation.loopCount === 1) {
//     loopText = game.add.text(32, 64, 'Animation looped', { fill: 'white' });
//   } else {
//     loopText.text = 'Animation looped x2';
//     animation.loop = false;
//   }
// }

// function animationStopped(sprite, animation) {
//   game.add.text(32, 64 + 32, 'Animation stopped', { fill: 'white' });
// }
function update () {
    if (cursors.left.isDown)
    {
        mummy.body.velocity.x = -150;
    }
    else if (cursors.right.isDown)
    {
        mummy.body.velocity.x = 150;
    }

    if (jumpButton.isDown && (mummy.body.onFloor() || mummy.body.touching.down))
    {
        mummy.body.velocity.y = -400;
    }
}
// function update() {
//   if (anim.isPlaying) {
//     back.x -= 1;
//   }
// }

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser', {
  preload: preload,
  create: create,
  update: update
});
