class Tableau_start extends Tableau {

    preload() { 

        this.load.image('fond', 'assets/starting_screenV6.png');
        this.load.audio('go', 'son/go.wav');
        this.load.audio('woosh', 'son/woosh.wav');
        this.load.image('start', 'assets/start_button.png');
        this.load.audio('siffle', 'son/siffle.wav');
    }


    create() {

        super.create();

        this.touchePressed = false;

        this.add.image(448,224,'fond');

        let la = this;

        this.boutonstart = this.add.image(430,160, 'start');
        this.boutonstart.setInteractive();
        this.boutonstart.on( 'pointerover', function(){

            la.boutonstart.setAlpha(0.2);
            la.sound.play('siffle',{volume : 1});


        })
        this.boutonstart.on( 'pointerout', function(){

            la.boutonstart.setAlpha(0.9);


        })
        this.boutonstart.on('pointerdown', function () {


            Tableau.current.cameras.main.fadeOut(1000, 0, 0, 0)
            Tableau.current.sound.play('go', {volume: 1});
            Tableau.current.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {

                Tableau.suivant();
                ui.playok = true;

            })
        })


        // ---- *** ---- VERS SUIVANT  ---- *** ----

        this.input.keyboard.on('keydown-ENTER', function ()
        {
            if (!this.touchePressed)
            {
                this.touchePressed = true;
                this.sound.play('go',{volume : 1});
                this.cameras.main.fadeOut(1000, 0, 0, 0)
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) =>
                {
                    Tableau.suivant();
                    ui.playok = true;


                })
            }

        }, this);

        // ---- *** ---- VERS SUIVANT FIN ---- *** ----


        // ---- *** ---- VERS REGLAGES ---- *** ----

        this.input.keyboard.on('keydown-R', function () //'keydown-SPACE', function ()
        {
            if (!this.touchePressed)
            {
                this.touchePressed = true;
                this.sound.play('woosh',{volume : 1});
                this.cameras.main.fadeOut(1000, 0, 0, 0)
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) =>
                {

                    this.game.scene.start(settings);
                    this.scene.start("settings");

                })
            }

        }, this);

        // ---- *** ---- VERS REGLAGES FIN ---- *** ----

        // ---- *** ---- VERS QUITTER  ---- *** ----

        this.input.keyboard.on('keydown-Q', function () //'keydown-SPACE', function ()
        {
            if (!this.touchePressed)
            {
                this.touchePressed = true;
                this.sound.play('woosh',{volume : 1});
                this.cameras.main.fadeOut(1000, 0, 0, 0)
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) =>
                {
                    this.game.scene.start(Tableau_v);
                    this.scene.start("test_v");


                })
            }

        }, this);

        // ---- *** ---- VERS QUITTER  ---- *** ----

    }

}






