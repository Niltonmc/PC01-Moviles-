Preload = function(game){}
// prototype, propiedad de javascript como una extensión
// se sobreescribe prototype, sirve para crear más funcionalidades
Preload.prototype = {
    preload:function(){

		// escala la pantalla, SHOW_ALL: de acuerdo a la resolución calcula el ancho y alto para escalar proporcional
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		// trata de centrar horizontalmente
		this.scale.pageAlignHorizontally = true;
		// trata de centrar verticalmente
		this.scale.pageAlignVertically = true;

		this.load.image("background","assets/background.png");
		this.load.image("title","assets/title.png");
		this.load.image("gameover","assets/gameover.png");
		this.load.image("floor","assets/floor.png");
		this.load.image("pauseButton","assets/button-pause.png");
		this.load.image("scoreBG","assets/score-bg.png");

		this.load.spritesheet("candy","assets/candy.png", 82, 98, 5);
		this.load.spritesheet("player","assets/monster-idle.png", 103, 131, 13);
		this.load.spritesheet("startButton","assets/button-start.png", 401, 143, 3);
	},

    create:function(){
        console.log("Carga terminada");
        this.state.start("Menu");
    }
}