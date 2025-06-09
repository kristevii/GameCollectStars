var scenePlay = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function () {
        Phaser.Scene.call(this, { key: "scenePlay" });
    },

    init() {
        this.score = 0;
        this.isWalking = false;
    },

    preload() {
        this.load.image('sky', 'assets/bg_playy.png');
        this.load.image('ground', 'assets/platform2.png');
        this.load.image('star', 'assets/star1.png');
        this.load.audio('snd_jump', 'assets/audio/lompat.mp3');
        this.load.audio('snd_touch', 'assets/audio/touch.mp3');
        this.load.audio('snd_walk', 'assets/audio/jalan.mp3');
        this.load.audio('music_play', 'assets/audio/musicplay.mp3');
        this.load.spritesheet('dude', 'assets/dude.png', {
            frameWidth: 44.8,
            frameHeight: 93
        });
    },

    create() {
        X_POSITION = {
            'LEFT': 0,
            'CENTER': this.sys.game.config.width / 2,
            'RIGHT': this.sys.game.config.width,
        };

        this.add.image(400, 300, 'sky').setScale(1);

        this.platforms = this.physics.add.staticGroup();
        const platformScale = 0.5;
        this.platforms.create(350, 568, 'ground').setScale(platformScale).refreshBody();
        this.platforms.create(550, 400, 'ground').setScale(platformScale).refreshBody();
        this.platforms.create(80, 250, 'ground').setScale(platformScale).refreshBody();
        this.platforms.create(750, 220, 'ground').setScale(platformScale).refreshBody();

        this.player = this.physics.add.sprite(100, 450, 'dude');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.stars.children.iterate((child) => {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            child.setScale(0.08);
        });

        this.scoreText = this.add.text(16, 16, 'Score : 0', {
            fontFamily: 'Verdana, Arial',
            fontSize: '32px',
            fill: '#000'
        });

        this.sndJump = this.sound.add('snd_jump');
        this.sndTouch = this.sound.add('snd_touch');
        this.sndWalk = this.sound.add('snd_walk');
        this.musicPlay = this.sound.add('music_play', { loop: true });
        this.musicPlay.setVolume(0.2);
        this.musicPlay.play();

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

        this.cursors = this.input.keyboard.createCursorKeys();
    },

    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
            if (!this.isWalking) {
                this.sndWalk.play({ loop: true });
                this.isWalking = true;
            }
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
            if (!this.isWalking) {
                this.sndWalk.play({ loop: true });
                this.isWalking = true;
            }
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
            if (this.isWalking) {
                this.sndWalk.stop();
                this.isWalking = false;
            }
        }

        if (this.cursors.up.isDown && this.player.body.blocked.down) {
            this.player.setVelocityY(-330);
            this.sndJump.play();
        }
    },

    collectStar(player, star) {
        star.disableBody(true, true);
        this.sndTouch.play();
        this.score += 1;
        this.scoreText.setText('Score: ' + this.score);

        // Tambahkan logika jika skor mencapai 24
        if (this.score >= 24) {
            this.sound.stopAll();
            this.musicPlay.stop(); // stop musik
            this.scene.start('sceneWinner');
            return;
        }

        if (this.stars.countActive(true) === 0) {
            this.stars.children.iterate((child) => {
                child.enableBody(true, child.x, 0, true, true);
            });
        }
    }
});
