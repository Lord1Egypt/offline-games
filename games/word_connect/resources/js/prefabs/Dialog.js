class Dialog extends Phaser.GameObjects.Container{

    constructor(scene, w, h){
        super(scene);
        this.modal = this.scene.make.graphics();
        
        this.add(this.modal);

        this.createContentBox(w, h);
        this.setInteractive(new Phaser.Geom.Circle(0, 0, 3000), Phaser.Geom.Circle.Contains);
    }




    updateSize(){
        this.modal.clear();
        this.modal.fillStyle(0x000000);
        this.modal.fillRect(0, 0, this.scene.scale.gameSize.width, this.scene.scale.gameSize.height);
        this.modal.alpha = 0.7;
        this.setSize(this.scene.scale.gameSize.width, this.scene.scale.gameSize.height);
        this.content.setScale(this.scene.gameScale);
        this.content.x = this.displayWidth * 0.5;
        this.content.y = this.displayHeight * 0.5;
    }



    createContentBox(w, h){
        this.content = new Phaser.GameObjects.Container(this.scene);
        this.add(this.content);

        let bg = this.scene.add.rexNinePatch(0, 0, w, h, "sheet1", "dialog_bg", [30, 13, 33], [100, 15, 53], {
            stretchMode: 0,
            getFrameNameCallback: undefined
        });

        this.content.add(bg);
        this.content.width = w;
        this.content.height = h;
    }



    setTitleLabel(text){
        this.title = new Phaser.GameObjects.Text(this.scene,
            0.5, 
            -this.content.height * 0.5 + 45,
            text,
            {fontFamily: FONT, fontSize: 40, color: '#ffffff', align: 'center', fontStyle: "bold" }
        ).setShadow(3, 3, "#bb740d", 5, false, true).setOrigin(0.5, 0.5);

        let maxWidth = this.content.width * 0.65;
        if(this.title.width > maxWidth) this.title.scale = maxWidth / this.title.width;

        this.content.add(this.title);
    }



    setCloseButton(){
        this.btnClose = new SpriteButton(
            this.scene, 
            this.content.width * 0.5 - 20, 
            -this.content.height * 0.5 + 17, 
            "sheet1", "dialog_close_up", "dialog_close_down"
        ).setOrigin(1, 0);

        this.btnClose.setCallback(this.hide, this);
        this.content.add(this.btnClose);
    }



    show(){
        this.scene.input.enabled = false;
        if(this.scene.dial) this.scene.dial.setEnabled(false);
        this.updateSize();
        this.content.setScale(0);
        this.setVisible(true);
        this.setActive(true);
        this.openAnim();
    }




    openAnim(){
        this.scene.tweens.add({
            targets         : this.content,
            scale           : this.scene.gameScale,
            duration        : 500,
            ease            : "Back.easeOut",
            callbackScope   : this,
            onComplete      : function(){
                this.scene.input.enabled = true;
                this.onShowComplete();
            }
        });

        if(this.scene.gameHud && this.scene.gameHud.pdom){
            this.scene.tweens.add({
                targets: this.scene.gameHud.pdom,
                alpha: 0.2,
                duration: 100,
                ease: "Back.easeOut"
            });
        }
    }



    onShowComplete(){
    }



    hide(){
        this.scene.input.enabled = false;
        SoundController.playSfx(this.scene, "click");

        this.scene.tweens.add({
            targets         : this.content,
            scale           : 0,
            duration        : 500,
            ease            : "Back.easeIn",
            callbackScope   : this,
            onComplete      : function(){
                this.setVisible(false);
                this.setActive(false);
                this.onHideComplete();
            }
        });

        if(this.scene.gameHud && this.scene.gameHud.pdom){
            this.scene.tweens.add({
                targets: this.scene.gameHud.pdom,
                alpha: 1,
                duration: 500,
                ease: "Back.easeIn"
            });
        }
    }
    


    onHideComplete(){
        this.scene.input.enabled = true;
        if(this.scene.dial) this.scene.dial.setEnabled(true);
        if(this.hideCallback) this.hideCallback.apply(this.hideCallbackContext);
    }




    setHideCallback(callback, context){
        this.hideCallback = callback;
        this.hideCallbackContext = context;
    }


}