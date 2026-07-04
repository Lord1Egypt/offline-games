class Tutorial extends Phaser.GameObjects.Container{

    constructor(scene){
        super(scene);

        this.setSize(this.scene.scale.gameSize.width, this.scene.scale.gameSize.height);

        this.g = new Phaser.GameObjects.Graphics(scene);//left        
        this.add(this.g);

        this.setInteractive(new Phaser.Geom.Circle(0, 0, 3000), Phaser.Geom.Circle.Contains);

        this.skip = this.scene.add.text(0, 0, Language.strings["tutorial_skip"], {fontFamily: FONT, fontSize: 24, color: '#ffffff', align: 'right'});
        this.skip.setOrigin(1, 1);
        this.skip.setInteractive({useHandCursor: wordPressParams.use_hand_cursor_for_buttons});
        this.add(this.skip);

        this.skip.on('pointerdown', () => { this.skip.setColor("#cccccc") });
        this.skip.on('pointerup',   () => { this.skip.setColor("#ffffff"); this.skipTutorial(); });
        this.skip.on('pointerout',  () => { this.skip.setColor("#ffffff") });

        this.alpha = 0;
    }



    show(){
        this.layout();
        this.gameObject.setDepth(this.depth + 1);
        this.disableSomeUI();

        this.scene.tweens.add({
            targets  : this,
            alpha    : 1,
            duration : 300
        });
    }


    disableSomeUI(){
        if(this.scene.dial) this.scene.dial.setEnabled(false);
    }



    enableSomeUI(){
        if(this.scene.dial) this.scene.dial.setEnabled(true);
    }




    layout(){
        this.setSize(this.scene.scale.gameSize.width, this.scene.scale.gameSize.height);
        this.g.clear();
        this.g.fillStyle(0x000000, 0.7);
        this.g.fillRect(0, 0, this.scene.scale.gameSize.width, this.scene.scale.gameSize.height);
        
        this.skip.setScale(this.scene.gameScale);
        this.skip.x = this.width - 50;
        this.skip.y = this.scene.textures.get("sheet1").get("top_bar").height * this.scene.gameScale;

        if(this.desc) this.desc.scale = this.scene.gameScale;
        if(this.textbg) this.textbg.scale = this.scene.gameScale;

        if(this.textbg){
            this.setTextPosition(this.textPercY);
        }

        if(this.arrow){
            this.arrowTween.stop();
            let arrowPos = this.gameObject.tutorialArrowPos();
            this.arrow.x = this.scene.scale.gameSize.width * arrowPos.x;
            this.arrow.y = this.scene.scale.gameSize.height * arrowPos.y;
            this.startIndication();
        }
    }



    skipTutorial(){
        GameData.setTutorialSkipped();
        this.hide();
    }



    setGameObject(gameObject){
        this.gameObject = gameObject;
        this.gameObjectDepth = this.gameObject.depth;
    }




    setText(str){
        this.desc = new Phaser.GameObjects.Text(this.scene, 0, 0, str, {fontFamily: FONT, fontSize: 30, fontStyle:"bold", color: '#ffffff', align: 'center', wordWrap: {width:500}});
        this.desc.setOrigin(0);
        this.desc.setPadding(20);
        this.desc.setShadow(2, 2, "#a90728", 2, true, true)
        this.desc.scale = this.scene.gameScale;
        this.add(this.desc);

        this.textbg = this.scene.add.rexNinePatch(0, 0, this.desc.width, this.desc.height, "sheet1", "tutorial_text_bg", [15, 15, 15], [15, 15, 15], {
            stretchMode: 0,
            getFrameNameCallback: undefined
        });
        this.textbg.setOrigin(0);
        this.textbg.scale = this.scene.gameScale;
        this.addAt(this.textbg, this.desc.depth - 1);
    }



    setTextPosition(){
        this.textbg.x = (this.width - this.desc.width * this.desc.scale) * 0.5;
        this.textbg.y = this.scene.scale.gameSize.height * this.gameObject.getTextY();
        this.desc.x = this.textbg.x + (this.textbg.width - this.desc.width) * 0.5;
        this.desc.y = this.textbg.y + (this.textbg.height - this.desc.height) * 0.5;
    }




    indicateGameObject(angle){
        this.arrowAngle = angle;
        let arrowPos = this.gameObject.tutorialArrowPos();
        this.arrow = new Phaser.GameObjects.Image(this.scene, this.scene.scale.gameSize.width * arrowPos.x, this.scene.scale.gameSize.height * arrowPos.y, "sheet1", "arrow");
        this.arrow.setOrigin(0.5);
        this.arrow.angle = angle;
        this.add(this.arrow);
        this.startIndication();
    }




    startIndication(){
        if(this.arrowTween) this.arrowTween.stop();
        this.arrow.scale = this.scene.gameScale;
        let radians = Phaser.Math.DegToRad(this.arrowAngle);
        let dst = this.scene.scale.gameSize.height * 0.03;

        this.arrowTween = this.scene.tweens.add({
            targets     : this.arrow,
            x           : "+=" + (Math.cos(radians) * dst),
            y           : "+=" + (Math.sin(radians) * dst),
            duration    : 500,
            ease        : "Sine.easeOut",
            yoyo        : true,
            repeat      : -1
        });
    }




    setHideCallback(callback, context){
        this.hideCallback = callback;
        this.hideCallbackContext = context;
    }



    hide(){
        if(this.step > 0) GameData.setTutorialStep(this.step);
        if(!this.scene) return;

        this.scene.tweens.add({
            targets       : this,
            alpha         : 0,
            duration      : 100,
            callbackScope : this,
            onComplete    : function(){
                this.setVisible(false);
                this.setActive(false);
                this.destroy();
                this.hideCallback.apply(this.hideCallbackContext);
            }
        });
        
        this.gameObject.setDepth(this.gameObjectDepth);
        this.enableSomeUI();
    }



}