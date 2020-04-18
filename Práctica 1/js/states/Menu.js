Menu = function(game){}
// prototype, propiedad de javascript como una extensión
// se sobreescribe prototype, sirve para crear más funcionalidades
Menu.prototype = {
    preload:function(){
        console.log("Carga Menu");
        this.background = this.add.sprite(0,0,"background")

        this.title = this.add.sprite(0,0,"title")
        this.title.anchor.setTo(0.5,0.5)
        this.title.y = this.game.world.centerY - 200
        this.title.x = this.game.world.centerX

        this.startButton = this.game.add.sprite(0,0,"startButton",0);
        this.startButton.anchor.setTo(0.5,0.5)
        this.startButton.y = this.game.world.centerY + 80
        this.startButton.x = this.game.world.centerX
        this.startButton.inputEnabled = true
        this.startButton.events.onInputDown.add(this.Play, this)
	},
    
    Play:function(){
        console.log("Carga terminada");
        this.state.start("Game");
    }
}