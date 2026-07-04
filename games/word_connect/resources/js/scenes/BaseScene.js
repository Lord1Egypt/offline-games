class BaseScene extends Phaser.Scene{

    constructor(key, active){
        super({key: key, active: active});
    }



    create(){
        const width = this.scale.gameSize.width;
        const height = this.scale.gameSize.height;

        this.background = this.add.image(0, 0, "background");
        this.background.setDepth(0);

        this.parent = new Phaser.Structs.Size(width, height);
        this.resizeGame();
        this.scale.on('resize', this.resize, this);

        let scene = this;
        window.onbeforeunload = function () {
            try{
                if (scene.scale.isFullscreen) scene.scale.stopFullscreen();
            }catch(err){
            }
        };
    }




    animateStars(count){
        for(let i = 0; i < count; i++){
            let star = new BgStar(this);
            star.alpha = 0;
            star.scale = Phaser.Math.FloatBetween(0.5, 1.5) * this.gameScale;
            star.angle = Math.random() * 360;
            star.x = Math.random() * this.scale.gameSize.width;
            star.y = Math.random() * this.scale.gameSize.height;
            this.add.existing(star);
            star.animate();
        }
    }



    resizeGame(){
        let targetRatio = this.parent.height / this.parent.width;
        let sourceRatio = this.game.config.height / this.game.config.width;
        this.gameScale =  targetRatio > sourceRatio ? this.parent.width / this.game.config.width : this.parent.height / this.game.config.height;

        this.positionAndScaleBackground();
        this.scaleAndPositionUI();
        this.scale.dirty = true;
    }



    positionAndScaleBackground(){
        let sourceWidth = this.background.width;
        let sourceHeight = this.background.height;
        let targetWidth = this.scale.gameSize.width;
        let targetHeight = this.scale.gameSize.height;
        
        let targetRatio = targetHeight / targetWidth;
        let sourceRatio = sourceHeight / sourceWidth;
        let scale = targetRatio < sourceRatio ? targetWidth / sourceWidth : targetHeight / sourceHeight;
        this.background.setScale(scale);

        this.background.x = targetWidth * 0.5;
        this.background.y = targetHeight * 0.5;
    }



    scaleAndPositionUI(){
        if(this.tooltip) this.positionTooltip();
    }




    resize(gameSize, baseSize, displaySize, resolution){
        this.parent.setSize(gameSize.width, gameSize.height);
        this.resizeGame();
    }




    showTooltip(align, gameObject, text){
        if(!this.tooltip){
            this.tooltip = new Tooltip(this);
            this.tooltip.alpha = 0;
            this.add.existing(this.tooltip);
            this.tooltip.depth = 200;
        }else{
            this.tooltip.setVisible(true);
            this.tooltip.setActive(true);
        }

        this.tooltip.align = align;
        this.tooltip.gameObject = gameObject;
        this.positionTooltip();

        this.tooltip.setText(text);
        this.tooltip.show();
        SoundController.playSfx(this, "tooltip");
    }



    positionTooltip(){
        this.tooltip.scale = this.gameScale;
        let margin = 10;

        let button = this.tooltip.gameObject;

        let x = button.x - button.width * button.scale * button.originX;
        let y = button.y - button.height * button.scale * button.originY;

        if(this.tooltip.align == Tooltip.ALIGN_RIGHT) {
            this.tooltip.x = x - this.tooltip.displayWidth - margin * this.gameScale;
        }else{
            this.tooltip.x = x + button.displayWidth + margin * this.gameScale;
        }

        this.tooltip.y = y + button.displayHeight * 0.5;   
    }




    languageChanged(){
        this.tweens.add({
            targets       : this.cameras.main,
            alpha         : 0,
            duration      : 300,
            ease          : "Cubic.EaseIn",
            callbackScope : this,
            onComplete    : this.destroyGame
        });
    }




    destroyGame(){
        try {
            this.game.events.on('destroy', function () {
                document.location.href = document.location.href;
            });

            this.game.destroy(true);
            
        } catch(err) {
            console.log(err.message);
        }
    }



}