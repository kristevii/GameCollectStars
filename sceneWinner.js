var sceneWinner = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function () {
        Phaser.Scene.call(this, { key: 'sceneWinner' });
    },
    preload: function () {
        this.load.setBaseURL('assets/');
        this.load.image('bg', 'bggg.png');
        this.load.image('background', 'background.png');
        this.load.image('btn_replay', 'btn_replay.png');
        this.load.image('btn_keluar', 'btn_keluar.png');
        this.load.image('winLogo', 'win.png');
        this.load.audio('snd_touch', 'audio/touch.mp3');
        this.load.audio('music_win', 'audio/win.mp3');
    },
    create: function () {
        this.add.image(800 / 2, 600 / 2, 'bg').setScale(1);
        this.add.image(800 / 2, 600 / 2, 'background').setScale(1);

        this.winLogo = this.add.image(800 / 2, 580, 'winLogo').setDepth(10).setScale(1);
        this.winLogo.y -= 384;

        // Win music
        var music_win = this.sound.add('music_win');
        music_win.play();

        //button keluar
        var btnKeluar = this.add.image(800/2 - 70, 600/2 + 100, 'btn_keluar').setDepth(10).setScale(0.19).setInteractive();
        btnKeluar.on('pointerdown', function () {
            btnKeluar.setTint(0xaaaaaa);
        });
        btnKeluar.on('pointerup', () => {
            btnKeluar.clearTint();
            this.sound.play('snd_touch');
            music_win.stop();
            this.scene.start('sceneMenu');
        });
        btnKeluar.on('pointerout', function () {
            btnKeluar.clearTint();
        });
        
        // button replay
        var btnRePlay = this.add.image(800 / 2 + 70, 600 /2 + 100, 'btn_replay').setDepth(10).setScale(0.19).setInteractive();
        btnRePlay.on('pointerdown', function () {
            btnRePlay.setTint(0xaaaaaa);
        });
        btnRePlay.on('pointerup', () => {
            btnRePlay.clearTint();
            this.sound.play('snd_touch');
            music_win.stop();
            this.scene.start('scenePlay');
        });
        btnRePlay.on('pointerout', function () {
            btnRePlay.clearTint();
        });
    }
});
