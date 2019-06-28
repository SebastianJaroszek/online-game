class GameScene extends Phaser.Scene {

    player: Phaser.Physics.Arcade.Sprite;
    coin: Phaser.Physics.Arcade.Sprite;

    score: number;

    scoreText: Phaser.GameObjects.Text;

    arrow: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor() {
        super({
            key: 'GameScene'
        });
    }

    preload(): void {
        this.load.image('player', 'assets/player.png');
        this.load.image('coin', 'assets/coin.png');
    }

    create(): void {
        this.player = this.physics.add.sprite(100, 100, 'player');
        this.coin = this.physics.add.sprite(300, 200, 'coin');

        this.player.setCollideWorldBounds(true);

        this.score = 0;
        let style = {font: '20px Arial', fill: '#fff'};
        this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style);

        this.arrow = this.input.keyboard.createCursorKeys();

    }

    update(timestep: number, delta: number): void {

        this.physics.overlap(this.player, this.coin, this.hit.bind(this));

        if (this.arrow.right.isDown) {
            this.player.x += 3;
        } else if (this.arrow.left.isDown) {
            this.player.x -= 3;
        }

        if (this.arrow.up.isDown) {
            this.player.y -= 3;
        } else if (this.arrow.down.isDown) {
            this.player.y += 3;
        }
    }

    private hit() {
        this.coin.x = Phaser.Math.Between(100, 600);
        this.coin.y = Phaser.Math.Between(100, 400);

        this.score += 1;
        this.scoreText.setText('score: ' + this.score);

        this.tweens.add({
            targets: this.player,
            duration: 200,
            scaleX: 2,
            scaleY: 2,
            yoyo: true
        });
    }
}

export default GameScene;
