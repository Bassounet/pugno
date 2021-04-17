class Level_1 extends Tableau {

    preload() {
        super.preload();

        this.load.image('blood', 'assets/blood.png');
        this.load.image('tourelleV2', 'assets/tourelleV2.png');
        this.load.image('drone', 'assets/drone.png');
        this.load.image('sol', 'assets/platformes_sol.png');
        this.load.image('mechant', 'assets/mechant.png');
        this.load.image('plat', 'assets/platform_.png');
        this.load.image('tono', 'assets/tono.png');
        this.load.image('mine', 'assets/mine.png');
        this.load.image('gun', 'assets/Pnonante.png');
        this.load.image('bullet', 'assets/bullet.png');

        // ------pour TILED-------------
        
        this.load.image('sprite', 'ref/sprite.png');

        this.load.tilemapTiledJSON('map', 'TILED/end/Level1_5.json');

        // -----et puis aussi-------------

        this.load.image('back', 'assets/images/background.png');
        //atlas de texture généré avec https://free-tex-packer.com/app/
        //on y trouve notre étoiles et une tête de mort
        // this.load.atlas('particles', 'assets/images/particles.png', 'assets/images/particles.json');
    }

    



    create() {

        super.create();

        var input;
        input = this.input;


        //for mouse position
        // input = this.input;



        //--------chargement de la tile map & configuration de la scène-----------------------

        //notre map
        this.map = this.make.tilemap({ key: 'map' });

        //nos images qui vont avec la map

        this.tileset = this.map.addTilesetImage('sprite_sheet', 'sprite');

        //on agrandit le champ de la caméra du coup

        let largeurDuTableau = this.map.widthInPixels;
        let hauteurDuTableau = this.map.heightInPixels;
        this.physics.world.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.cameras.main.startFollow(this.player, true, 1, 1);



        //---- ajoute les plateformes simples ----------------------------

        // this.platform = this.map.createLayer('platforms', this.tileset, 0, 0);
        this.floor = this.map.createLayer('floor', this.tileset, 0, 0);
        this.background = this.map.createLayer('back', this.tileset, 0, 0);

        // this.platform.setDepth(9);
        this.floor.setDepth(9);
        this.player.setDepth(10);
        
        // this.platform.setBodySize(50,50);
        
        // this.platform_h = this.map.createLayer('mechant', this.tileset, 0, 0);
        // this.platform_t = this.map.createLayer('platform_test', this.tileset, 0, 0);
        // this.hole = this.map.createLayer('hole', this.tileset, 0, 0);

        this.floor.setCollisionByExclusion(-1, true);
        // this.platform.setCollisionByExclusion(-1, true);
        this.floor.setCollisionByProperty({collides : true});
        this.physics.add.collider(this.player, this.floor);



        // ----------- ***** ----------- ON CREE NOS MONSTRES ---------*****---------


        // let ici = this;
        //
        //
        // // let helicoContainer = this.add.container();
        //
        // // ici.helicoObjects = ici.map.getObjectLayer('drone')['objects'];
        //
        // // ici.helicoObjects.forEach(monsterObject => {
        // //     // ici.create(this,monsterObject.x,monsterObject.y,monsterObject.y)
        // //     let helico=new Helicopter(this,monsterObject.x,monsterObject.y);
        // //     helicoContainer.add(helico);
        // //     this.physics.add.collider(helico, this.platform); // pas besoin de collide avec les platformes c un helico
        //
        // // });
        //
        // let mechantContainer = this.add.container();
        //
        // ici.mechantObjects = ici.map.getObjectLayer('mechant')['objects'];
        //
        // ici.mechantObjects.forEach(monsterObject => {
        //     let mechant=new mechant1(this,monsterObject.x,monsterObject.y);
        //     mechantContainer.add(mechant);
        //     this.physics.add.collider(mechant, this.platform);
        //     // this.physics.add.collider(mechant1, this.bullet);
        // });
        //
        //
        // let tourelleContainer = this.add.container();
        //
        // ici.tourelleObjects = ici.map.getObjectLayer('tourelles')['objects'];
        //
        // ici.tourelleObjects.forEach(monsterObject => {
        //     let tourelle=new Tourelle(this,monsterObject.x,monsterObject.y-100);
        //     tourelleContainer.add(tourelle);
        //     this.physics.add.collider(tourelle, this.platform);
        //
        // });
        //
        // let droneContainer = this.add.container();
        //
        // ici.droneObjects = ici.map.getObjectLayer('drone')['objects'];
        //
        // ici.droneObjects.forEach(monsterObject => {
        //     let drone=new Drone(this,monsterObject.x,monsterObject.y);
        //     droneContainer.add(drone);
        //     this.physics.add.collider(drone, this.platform);
        //
        // });

        // let mineContainer = this.add.container();
        //
        // ici.mineObjects = ici.map.getObjectLayer('mine')['objects'];
        //
        // ici.mineObjects.forEach(monsterObject => {
        //     let mine=new mine(this,monsterObject.x,monsterObject.y);
        //     mineContainer.add(mine);
        //     this.physics.add.collider(mine, this.platform);
        //
        // });

        // let tonoContainer = this.add.container();
        //
        // ici.tonoObjects = ici.map.getObjectLayer('tono')['objects'];
        //
        // ici.tonoObjects.forEach(monsterObject => {
        //     let tono = new Tono(this,monsterObject.x,monsterObject.y);
        //     tonoContainer.add(tono);
        //     this.physics.add.collider(tono, this.platform);
        //
        // });


        //----------débug---------------------

        //pour débugger les collisions sur chaque layer
        let debug = this.add.graphics().setAlpha(this.game.config.physics.arcade.debug ? 0.75 : 0);
        if (this.game.config.physics.arcade.debug === false) {
            debug.visible = true;
        }
        //débug solides en vers
        this.floor.renderDebug(debug, {
            tileColor: null, // Couleur des tiles qui ne collident pas
            collidingTileColor: new Phaser.Display.Color(0, 255, 0, 255), //Couleur des tiles qui collident
            faceColor: null // Color of colliding face edges
        });
        //---------- parallax ciel (rien de nouveau) -------------

        //on change de ciel, on fait une tileSprite ce qui permet d'avoir une image qui se répète
        // this.back = this.add.tileSprite(
        //     0,
        //     0,
        //     this.sys.canvas.width,
        //     this.sys.canvas.height,
        //     'MAP_2D'
        // );
        // this.map2 = this.add.tileSprite(
        //     0,
        //     0,
        //     this.sys.canvas.width,
        //     this.sys.canvas.height,
        //     'MAP_2D'
        // );
        // this.back.setOrigin(0, 0);
        // this.map2.setOrigin(0, 0);
        // this.back.setScrollFactor(0);//fait en sorte que le ciel ne suive pas la caméra
        // this.map2.setScrollFactor(0);//fait en sorte que le ciel ne suive pas la caméra
        // this.map2.blendMode = Phaser.BlendModes.ADD;

        //----------collisions---------------------

        //quoi collide avec quoi?
        this.physics.add.collider(this.player, this.platform);
        


        // this.physics.add.collider(this.stars, this.solides);
        // //si le joueur touche une étoile dans le groupe...
        // this.physics.add.overlap(this.player, this.stars, this.found_piece, null, this);
        // //quand on touche la lave, on meurt
        // this.physics.add.collider(this.player, this.lave, this.playerDie, null, this);

        //--------- Z order -----------------------



        

        //on définit les z à la fin
        // let z = 1000; //niveau Z qui a chaque fois est décrémenté.
        // debug.setDepth(z--);
        // this.blood.setDepth(z--);
        // monstersContainer.setDepth(z--);
        // this.stars.setDepth(z--);
        // starsFxContainer.setDepth(z--);
        // this.devant.setDepth(z--);
        // this.solides.setDepth(z--);
        // this.laveFxContainer.setDepth(z--);
        // this.lave.setDepth(z--);
        // this.player.setDepth(z--);
        // this.derriere.setDepth(z--);
        // this.sky2.setDepth(z--);
        // this.sky.setDepth(z--);

        

    

    // moveParallax() {
    //     //le ciel se déplace moins vite que la caméra pour donner un effet paralax
    //     this.sky.tilePositionX = this.cameras.main.scrollX * 0.6;
    //     this.sky.tilePositionY = this.cameras.main.scrollY * 0.6;
    //     this.sky2.tilePositionX = this.cameras.main.scrollX * 0.7 + 100;
    //     this.sky2.tilePositionY = this.cameras.main.scrollY * 0.7 + 100;
    // }
    // for mouse click
    

    
    
    let posx_arme = this.player.x
    let posy_arme = this.player.y

    this.mouse=this.input.mousePointer;

    this.pnonante = this.physics.add.sprite(posy_arme,posx_arme,'gun'); //.setAllowGravity(false);
    this.pnonante.body.setAllowGravity(false);
    
    // this.cannon.allowGravity=false;

    // let posx_arme = this.player.x + 150 
    //     let posy_arme = this.player.y - 100

    
    }
    


    update() {
        super.update();
        // this.moveParallax();

        //optimisation
        //teste si la caméra a bougé
        let actualPosition = JSON.stringify(this.cameras.main.worldView);
        if (!this.previousPosition || this.previousPosition !== actualPosition) {

            this.previousPosition = actualPosition;
            // this.optimizeDisplay();

            
        }

        // if(this.mouse.isDown){
        //
        //     this.player.shoot();
        //     console.log("hello");
        // }


        // let input=this.input;

        // if(this.mouse.isDown){
        //     //for fire again
        //     this.bullet=this.physics.add.sprite(this.player.x + 32 , this.player.y ,'bullet'); // genesis : from
        //
        //     // console.log("hello");
        //     //move to mouse position
        //     this.physics.moveTo(this.bullet,this.bullet.x + 10 ,this.bullet.y -3 ,600); // destination bullet ... à régler
        //     // this.physics.moveTo(this.bullet,this.input.x ,this.input.y ,2000); // destination bullet ... à régler
        //
        //     this.bullet.setCollideWorldBounds(true) // on paramètre les rebonds
        //     this.bullet.setBounce(0.19);
        //
        //     this.bullet.allowGravity=true;
        //     // this.bullet.setRotation(1);
        //
        // }
        //
        //
        // if(this.mouse.isDown){
        //
        //     console.log(this.input.x);
        //     console.log(this.input.y);
        //
        //
        // }


        
    
       


        
    
    }
}