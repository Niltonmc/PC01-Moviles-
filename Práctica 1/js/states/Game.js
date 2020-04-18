Game = function(game){}

Game.prototype = {
    create:function(){
        console.log("Carga Nivel");

        //HABILITA LAS FÍSICAS
        this.physics.startSystem(Phaser.Physics.ARCADE);

        //LA FÍSICA ESTÁ EN PIXELES
        this.physics.arcade.gravity.y = 500;

        this.background = this.add.sprite(0,0,"background")

        this.floor = this.add.sprite(0,0,"floor");
        this.floor.y = this.game.height - this.floor.height;
        this.physics.arcade.enable(this.floor);
        this.floor.body.collideWorldBounds = false;
        this.floor.body.allowGravity = false;
        this.floor.body.immovable = true;
        this.floor.body.setSize(this.floor.sprite.width, this.floor.sprite.height,this.floor.sprite.width, this.floor.sprite.height);

        this.scoreBG = this.add.sprite(0,0,"scoreBG");

        this.player = this.game.add.sprite(0,0,"player");
        this.player.anchor.setTo(0.5);
        this.player.x = this.game.world.centerX;
        this.player.y = this.game.world.centerY;
        this.player.animations.add("idle", [0,1,2,3,4,5,6,7,8,9,10,11,12], 10, true);
        this.physics.arcade.enable(this.player);
        //el orden es importante
        this.player.body.collideWorldBounds = true;

        this.keys = this.input.keyboard.createCursorKeys();

        this.elapsedTime = 0;
        this.candyTime = 4 * 1000;

        this.candies = this.game.add.group()
        this.candies.enableBody = true
        this.candies.enableBody = true;
         //setAll por dentro hace un foreach, entre comillas la propiedad
        this.candies.setAll("body.allowGravity",true);
        this.candies.setAll("body.immovable",false);
        this.typeOfCandy = this.game.rnd.integerInRange(0, 5)

        this.score = 0
        this.life = 5
    },
    
    pressButton:function(sprite){
        switch(sprite.direction){
            case "left":
                this.playerActions.left = true;
            break;
            case "right":
                this.playerActions.right = true;
            break;
        }
	},
	releaseButton:function(sprite){
        switch(sprite.direction){
            case "left":
                this.playerActions.left = false;
            break;
            case "right":
                this.playerActions.right = false;
            break;
        }
    },

    update:function(){
        this.player.animations.play("idle");
        this.physics.arcade.overlap(this.player,this.candies, null,this.SetScore, this);

        this.physics.arcade.collide(this.player,this.floor);

        this.candies.forEachAlive(function(element){
            if(element.y >= 850){
                element.kill();
                this.life  = this.life - 1
                console.log(this.life);
                if(this.life <= 0){
                    this.SetGameOver();
                }
            }
        },this);

        this.elapsedTime += this.time.elapsed;
        if(this.elapsedTime >= this.candyTime){
            this.elapsedTime = 0;
            this.CreateCandy();
        }


        this.player.body.velocity.x = 0;
        if((this.keys.left.isDown)){
            this.player.body.velocity.x = -300;
            this.player.scale.setTo(-1,1);
        }else if((this.keys.right.isDown)){
            this.player.body.velocity.x = +300;
            this.player.scale.setTo(1,1);
        }
    },

    CreateCandy:function(){
        let candy = this.candies.getFirstDead();
        //si no hay muertos crea un elemento y se añade al grupo
        if(!candy){
            let candyPosX = this.game.rnd.integerInRange(50, 600)
            this.typeOfCandy = this.game.rnd.integerInRange(0, 5)
            candy = this.game.add.sprite(candyPosX, -1000,"candy",this.typeOfCandy)
            candy.typeCandy = this.typeOfCandy
            this.candies.add(candy);
        }else{
            console.log("revive");
            //si hay un muerto se vuelve a activar
            //sin posicion agarra por defecto el 0,0
            let candyPosX = this.game.rnd.integerInRange(50, 600)
            candy.reset(candyPosX,-1000); 
        }
        candy.body.collideWorldBounds = true;
            //cuanto rebote en x y y
            candy.body.bounce.setTo(1,0);
    },

    SetScore:function(sprite1,sprite2){
        sprite2.kill();
        if((sprite2.typeCandy == 1 || sprite2.typeCandy == 3) && this.score%2 == 0){
            this.score = this.score * 2
        }else if((sprite2.typeCandy == 1 || sprite2.typeCandy == 3) && this.score%2 != 0){
        this.score = this.score + 5
        }else if(sprite2.typeCandy == 2){
            this.score = this.score + 10
        }else if(sprite2.typeCandy == 4){
                this.score = this.score + 50
        }
        console.log(this.score);
    },

    SetGameOver:function(){
        console.log("Game Over");
        this.state.start("GameOver");
    }

}