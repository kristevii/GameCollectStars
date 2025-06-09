var sceneMenu = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function () {
        Phaser.Scene.call(this, { key: "sceneMenu" });
    },

    init() {},

    preload() {
        this.load.image('bg_start', 'assets/background.png');
        this.load.image('bg', 'assets/bggg.png');
        this.load.image('btn_play', 'assets/btn_play.png');
        this.load.image('title_game', 'assets/judul.png');
        this.load.audio('snd_touch', 'assets/audio/touch.mp3');
    },

    create() {
        this.add.image(400, 300, 'bg');
        this.add.image(400, 300, 'bg_start');

        this.titleGame = this.add.image(400, 200, 'title_game').setDepth(10).setScale(1);
        this.titleGame.y -= 384;

        var btnPlay = this.add.image(400, 600 / 2 + 105, 'btn_play').setDepth(5).setScale(0.20).setInteractive();

        this.tweens.add({
            targets: btnPlay, 
            ease: 'Back',
            duration: 750,
            delay: 250,
            scaleX: 0.25,
            scaleY: 0.25
        });
        this.tweens.add({
            targets: this.titleGame,
            ease: 'Bounce.easeOut',
            duration: 750,
            delay: 250,
            y: 190,
        });
        this.tweens.add({
            targets: this.titleGame,
            ease: 'Elastic',
            duration: 750,
            delay: 1000,
            scaleX: 1,
            scaleY: 1
        });

        btnPlay.on('pointerover', () => {
            btnPlay.setTint(0xaaaaaa);
        });
        btnPlay.on('pointerout', () => {
            btnPlay.setTint(0xffffff);
        });
        btnPlay.on('pointerdown', () => {
            btnPlay.setTint(0x616161);
        });
        btnPlay.on('pointerup', () => {
            btnPlay.setTint(0xffffff);
            this.sound.play('snd_touch');
            this.scene.start('scenePlay');
        });
    },

    update() {}
});
