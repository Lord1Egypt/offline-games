class BgStar extends Phaser.GameObjects.Image{

    constructor(scene){
        super(scene, 0, 0, "sheet1", "star_white");
    }


    animate(){
        this.scene.tweens.add({
            targets: this,
            alpha: 0.6,
            duration: 2000,
            delay: Math.random() * 3000,
            ease: "Sine.easeIn",
            yoyo: true,
            repeat: -1,
            callbackScope: this,
            onRepeat: function(){
                this.x = Math.random() * this.scene.scale.gameSize.width;
                this.y = Math.random() * this.scene.scale.gameSize.height;
                this.scale = Phaser.Math.FloatBetween(0.3, 1) * this.scene.gameScale;
                this.angle = Math.random() * 360;
            }
        });
    }

}