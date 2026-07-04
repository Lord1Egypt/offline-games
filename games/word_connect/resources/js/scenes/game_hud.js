class GameHud extends CommonHud{

    static topbarHeight = 170;

    constructor(scene){
        super(scene);     
        
        this.topbar = this.scene.add.container();
        this.topbar.setDepth(10);

        let barbg = this.scene.add.rexNinePatch(0, 0, scene.scale.gameSize.width * 10, GameHud.topbarHeight, "sheet1", "top_bar", [10, 12, 253, 10, 12], [16, 18, 91], {
            stretchMode: 0,
            getFrameNameCallback: undefined
        });
        
        this.topbar.add(barbg);
        this.topbar.setSize(barbg.width, barbg.height);
        this.progressValue = 0;        

        this.pb_track = new Phaser.GameObjects.Image(this.scene, 0, 0, "sheet1", "semi_circle_pb_track");
        this.pb_track.setOrigin(0.5, 0);
        this.pb_track.x = 0;
        this.pb_track.y = this.topbar.height * 0.5 - this.pb_track.height - 25;
        this.topbar.add(this.pb_track);

        let pcanvasStyle = "width: " + this.pb_track.width + "px; height: " + this.pb_track.height + "px;";

        this.pdom = new Phaser.GameObjects.DOMElement(this.scene, this.pb_track.x, this.pb_track.y, "canvas", pcanvasStyle);
        this.pdom.setOrigin(0.5, 0);
        this.topbar.add(this.pdom);
        this.pcanvas = this.pdom.node;
        
        this.scene.game.canvas.style.cursor = "";
        this.pbarImage = document.getElementById("word_connect_game_pbar");
               
        this.comboLabel = new Phaser.GameObjects.Text(this.scene,
            0, 
            this.pb_track.y - 45,
            "",
            {fontFamily: FONT, fontSize: 24, color: '#dbeef3', fontStyle: 'bold', align: 'center'}
        ).setShadow(1, 1, "#333333", 2, false, true);

        this.comboLabel.setOrigin(0.5, 0);
        this.topbar.add(this.comboLabel);
        this.comboLabel.depth = 11;

        this.maxCombo = new Phaser.GameObjects.Text(this.scene,
            0, 
            this.pb_track.y,
            "",
            {fontFamily: FONT, fontSize: 18, color: '#dbeef3', fontStyle: 'bold', align: 'center'}
        ).setShadow(1, 1, "#333333", 2, false, true);
        
        this.maxCombo.setOrigin(0.5, 0);
        this.topbar.add(this.maxCombo);
        this.maxCombo.depth = 12;

        this.setCoinMeter();

        this.levelNumLabel = new Phaser.GameObjects.Text(this.scene,
            0, 
            0,
            "",
            {fontFamily: FONT, fontSize: 28, color: '#ffffff', fontStyle: 'bold', align: 'center'}
        ).setOrigin(0.5).setAngle(-3);
        this.scene.add.existing(this.levelNumLabel);
        this.levelNumLabel.depth = 101;

        this.btnBack = new SpriteButton(this.scene, 0, 0, "sheet1", "btn_back_up", "btn_back_down");
        this.btnBack.setCallback(this.gotoIntroScene, this);
        this.scene.add.existing(this.btnBack);
        this.btnBack.depth = 13;

        this.setMenuButton();
        this.setFullScreenButton();
        //this.setScore();
        
        this.extraWordsButton = new ExtraWordsButton(this.scene);
        this.extraWordsButton.button.setCallback(this.openExtraWordsDialog, this);
        this.scene.add.existing(this.extraWordsButton);
        this.extraWordsButton.depth = 75;

        this.btnShuffle = new SpriteButton(this.scene, 0, 0, "sheet1", "shuffle", "shuffle").setOrigin(0.5);
        this.btnShuffle.setCallback(this.scene.dial.shuffle, this.scene.dial);
        this.scene.add.existing(this.btnShuffle);
        this.btnShuffle.depth = 151;
        
        this.btnSingleHint = new SpriteButton(this.scene, 0, 0, "sheet1", "hint_empty_up", "hint_empty_down").setOrigin(1, 0);
        this.btnSingleHint.setCallback(this.scene.hintController.onSingleHintClick, this.scene.hintController);
        this.scene.add.existing(this.btnSingleHint);
        this.btnSingleHint.depth = 76;

        this.btnMultipleHint = new SpriteButton(this.scene, 0, 0, "sheet1", "multiple_hint_up", "multiple_hint_down").setOrigin(1, 1);
        this.btnMultipleHint.setCallback(this.scene.hintController.onMultipleHintClick, this.scene.hintController);
        this.scene.add.existing(this.btnMultipleHint);
        this.btnMultipleHint.depth = 77;

        this.btnFingerHint = new SpriteButton(this.scene, 0, 0, "sheet1", "finger_hint_up", "finger_hint_down").setOrigin(0, 0);
        this.btnFingerHint.setCallback(this.scene.hintController.onFingerHintClick, this.scene.hintController);
        this.scene.add.existing(this.btnFingerHint);
        this.btnFingerHint.depth = 78;

        this.positionHud();
    
        scene.events.on('wake', this.appear, this);
    }





    renderImage(ctx, image, x, y, width, height, angle, scaleX, scaleY){
        const centerX = width * 0.5;
        const centerY = height;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.scale(scaleX, scaleY);
        ctx.drawImage(image, -centerX, -centerY, width, height);
        ctx.restore();
    }




    setLevelNum(num){
        this.levelNumLabel.setText(Phaser.Utils.String.Format(Language.strings["level_num"], [num]));
        let maxWidth = 150;
        if(this.levelNumLabel.width > maxWidth) this.levelNumLabel.setScale(maxWidth / this.levelNumLabel.width);
    }



    positionHud(){
        let scale           = this.scene.gameScale;
        let marginLeft      = this.getMarginLeft();
        let gameSize        = this.scene.scale.gameSize;
        let halfDial        = this.scene.dial.height * scale * 0.5;

        this.topbar.scale = scale;
        this.topbar.setPosition(gameSize.width * 0.5, this.getTopbarY());

        this.levelNumLabel.scale = scale;
        let board = this.scene.board;
        this.levelNumLabel.x = board.x - board.displayWidth * 0.26;
        this.levelNumLabel.y = board.y - board.displayHeight * 0.455;

        this.btnBack.scale = scale;
        this.btnBack.x = marginLeft + this.btnBack.displayWidth * 0.5 + this.getTopLeftButtonsMargin();
        this.btnBack.y = this.getButtonY();

        this.btnConfig.scale = scale;
        this.btnConfig.x = this.btnBack.x + this.btnBack.displayWidth * this.buttonsSpacing;
        this.btnConfig.y = this.btnBack.y;

        if(this.fullScreen){
            this.fullScreen.scale = scale;
            this.fullScreen.x = this.btnConfig.x + this.btnConfig.displayWidth * this.buttonsSpacing;
            this.fullScreen.y = this.btnConfig.y;
        }

        this.positionFullscreenOff();
        
        this.coinMeter.scale = scale;
        this.positionCoinMeter();
        
        this.btnShuffle.scale = scale;
        this.btnShuffle.setPosition(this.scene.dial.x, this.scene.dial.y);

        this.btnSingleHint.scale = scale;
        this.btnSingleHint.x = gameSize.width - marginLeft;
        this.btnSingleHint.y = this.scene.dial.y - halfDial;
        
        this.btnMultipleHint.scale = scale;
        this.btnMultipleHint.x = this.btnSingleHint.x;
        this.btnMultipleHint.y = this.scene.dial.y + halfDial;

        this.btnFingerHint.scale = scale;
        this.btnFingerHint.x = marginLeft;
        this.btnFingerHint.y = this.scene.dial.y - halfDial;

        this.extraWordsButton.scale = scale;
        let half = this.extraWordsButton.displayWidth * 0.5;
        this.extraWordsButton.x = marginLeft + half;
        this.extraWordsButton.y = this.btnMultipleHint.y - half;

        this.positionLocks();

        if(this.menuDialog) this.menuDialog.updateSize();
        if(this.extraWordsDialog) this.extraWordsDialog.updateSize();
        if(this.dictDialog) this.dictDialog.updateSize();

        
    }



    appear(){
        let dst = 100;
        this.topbar.alpha = this.btnBack.alpha = this.btnConfig.alpha = this.coinMeter.alpha = 0;
        if(this.fullScreen){
            this.fullScreen.alpha = 0;
            this.fullScreen.y -= dst;
        }
        this.topbar.y -= dst;
        this.btnBack.y -= dst;
        this.btnConfig.y -= dst;
        this.coinMeter.y -= dst;

        if(wordPressParams.enable_full_screen_button && this.scene.sys.game.device.fullscreen.available){
            if (this.scene.scale.isFullscreen) {
                if(!this.fullScreenOff) {
                    this.createFullScreenOffButton();
                    this.positionFullscreenOff();
                }
                this.fullScreenOff.setVisible(true);
                this.fullScreen.setVisible(false);
            }else{
                if(this.fullScreenOff) this.fullScreenOff.setVisible(false);
                this.fullScreen.setVisible(true);
            }
        }

        let targets = [this.topbar, this.btnBack, this.btnConfig, this.coinMeter];

        if(this.fullScreen) targets.push(this.fullScreen);

        if(wordPressParams.enable_full_screen_button && this.fullScreenOff){
            this.positionFullscreenOff();
            targets.push(this.fullScreenOff);
        }

        this.scene.tweens.add({
            targets  : targets,
            y        : "+=" + dst,
            alpha    : 1,
            duration : 400,
            ease     :"Back.easeOut"
        });

        this.scene.board.alpha = 0;
        this.scene.board.y += dst;

        this.levelNumLabel.alpha = 0;
        this.levelNumLabel.y += dst;

        this.scene.tweens.add({
            targets  : [this.scene.board, this.levelNumLabel],
            y        : "-=" + dst,
            alpha    : 1,
            duration : 400,
            ease     : "Back.easeOut",
            delay    : 100
        });

        this.btnShuffle.alpha = this.scene.dial.alpha = this.btnFingerHint.alpha = this.extraWordsButton.alpha = this.btnSingleHint.alpha = this.btnMultipleHint.alpha = 0;
        if(this.btnSingleHint.lock) this.btnSingleHint.lock.alpha = 0;
        if(this.btnMultipleHint.lock) this.btnMultipleHint.lock.alpha = 0;
        if(this.btnFingerHint.lock) this.btnFingerHint.lock.alpha = 0;

        this.btnShuffle.y += dst;
        this.scene.dial.y += dst;
        this.btnFingerHint.y += dst;
        this.extraWordsButton.y += dst;
        this.btnSingleHint.y += dst;
        this.btnMultipleHint.y += dst;
        if(this.btnSingleHint.lock) this.btnSingleHint.lock.y += dst;
        if(this.btnMultipleHint.lock) this.btnMultipleHint.lock.y += dst;
        if(this.btnFingerHint.lock) this.btnFingerHint.lock.y += dst;

        let arr = [this.btnShuffle, this.scene.dial, this.btnFingerHint, this.extraWordsButton, this.btnSingleHint, this.btnMultipleHint];
        if(this.btnSingleHint.lock) arr.push(this.btnSingleHint.lock);
        if(this.btnMultipleHint.lock) arr.push(this.btnMultipleHint.lock);
        if(this.btnFingerHint.lock) arr.push(this.btnFingerHint.lock);

        if(this.scene.dialEffect1){
            this.scene.dialEffect1.y += dst;
            this.scene.dialEffect2.y += dst;
            this.scene.dialEffect1.alpha = this.scene.dialEffect2.alpha = 0;
            arr.push(this.scene.dialEffect1);
            arr.push(this.scene.dialEffect2);
        }

        this.scene.tweens.add({
            targets  : arr,
            y        : "-=" + dst,
            alpha    : 1,
            duration : 400,
            ease     : "Back.easeOut",
            delay    : 200,
            callbackScope   : this.scene,
            onComplete: this.scene.appearFinished
        });
    }
    



    lockOrUnlockHintButtons(){

        let index = GameData.level.index;

        if(index < Constants.TUTORIAL_SINGLE_RANDOM_LEVEL){
            if(!this.btnSingleHint.lock){
                this.btnSingleHint.lock = this.scene.add.image(0, 0, "sheet1", "padlock");
                this.btnSingleHint.lock.depth = 80;
            }
        }else{
            if(this.btnSingleHint.lock) {
                this.btnSingleHint.lock.destroy();
                this.btnSingleHint.lock = null;
            }
        }

        if(index < Constants.TUTORIAL_MULTI_RANDOM_LEVEL){
            if(!this.btnMultipleHint.lock){
                this.btnMultipleHint.lock = this.scene.add.image(0, 0, "sheet1", "padlock");
                this.btnMultipleHint.lock.depth = 81;
            }
        }else{
            if(this.btnMultipleHint.lock) {
                this.btnMultipleHint.lock.destroy();
                this.btnMultipleHint.lock = null;
            }
        }

        if(index < Constants.TUTORIAL_FINGER_LEVEL){
            if(!this.btnFingerHint.lock){
                this.btnFingerHint.lock = this.scene.add.image(0, 0, "sheet1", "padlock");
                this.btnFingerHint.lock.depth = 82;
            }   
        }else{
            if(this.btnFingerHint.lock) {
                this.btnFingerHint.lock.destroy();
                this.btnFingerHint.lock = null;
            }
        }

        this.positionLocks();
    }



    positionLocks(){
        if(this.btnSingleHint.lock){
            this.btnSingleHint.lock.scale = this.scene.gameScale;
            this.btnSingleHint.lock.x = this.btnSingleHint.x - this.btnSingleHint.displayWidth + this.btnSingleHint.lock.displayWidth * 0.5;
            this.btnSingleHint.lock.y = this.btnSingleHint.y + this.btnSingleHint.displayHeight - this.btnSingleHint.lock.displayHeight * 0.5;
        }
        if(this.btnMultipleHint.lock){
            this.btnMultipleHint.lock.scale = this.scene.gameScale;
            this.btnMultipleHint.lock.x = this.btnMultipleHint.x - this.btnMultipleHint.displayWidth + this.btnMultipleHint.lock.displayWidth * 0.5;
            this.btnMultipleHint.lock.y = this.btnMultipleHint.y - this.btnMultipleHint.lock.displayHeight * 0.5;
        }
        if(this.btnFingerHint.lock){
            this.btnFingerHint.lock.scale = this.scene.gameScale;
            this.btnFingerHint.lock.x = this.btnFingerHint.x + this.btnFingerHint.displayWidth - this.btnFingerHint.lock.displayHeight * 0.5;
            this.btnFingerHint.lock.y = this.btnFingerHint.y + this.btnFingerHint.displayHeight - this.btnFingerHint.lock.displayHeight * 0.5;
        }
    }



    setComboEarned(n){
        this.comboLabel.setText(Phaser.Utils.String.Format(Language.strings["combo_display"], [n]));
    }



    setSolvedComboCount(solved, total){
        this.maxCombo.setText(solved + "/" + total);
    }




    animateSemiCircle(value, callback){
        let object  = {value : this.progressValue};
        let ctx     = this.pcanvas.getContext('2d');

        this.scene.tweens.add({
            targets: object,
            value: value,
            duration: 1000,
            onUpdateScope: this,
            onUpdate:function(t, o){
                this.drawProgress(o.value * -Math.PI, ctx);
            },
            onCompleteScope: this.scene.gameController,
            onComplete      : callback
        })

        this.progressValue = value;
    }




    setSemiCircleValue(value){
        this.progressValue = value;
        this.drawProgress(value * -Math.PI, this.pcanvas.getContext('2d'));

    }
    



    drawProgress(value, ctx){
        this.renderImage(ctx, this.pbarImage, this.pcanvas.width/2, 0,  this.pcanvas.width, this.pcanvas.height, 0, 1, -1);
        ctx.globalCompositeOperation = 'source-in';
        this.renderImage(ctx, this.pbarImage, this.pcanvas.width/2, 0,  this.pcanvas.width, this.pcanvas.height, value, 1, 1);
        ctx.globalCompositeOperation = "source-over";
    }




    openExtraWordsDialog(){  
        SoundController.playSfx(this.scene, "click");
        this.scene.dial.mouseUp();
        if( this.scene.tutorialController && 
            this.scene.tutorialController.tutorial && 
            this.scene.tutorialController.tutorial.step == Constants.TUTORIAL_NONE){
                this.scene.tutorialController.tutorial.hide();
        }

        if(!this.extraWordsDialog){
            this.extraWordsDialog = new ExtraWordsDialog(this.scene, 530, 650);
            this.scene.add.existing(this.extraWordsDialog);
        }

        this.extraWordsDialog.show();
        this.extraWordsDialog.setDepth(160);
    }




    openDictionaryDialog(words){
        SoundController.playSfx(this.scene, "click");
        if(!this.dictDialog){
            this.dictDialog = new DictionaryDialog(this.scene, 530, 650);
            this.scene.add.existing(this.dictDialog);
        }
        
        if(!words && this.scene.levelEnd) this.dictDialog.setDepth(this.scene.levelEnd.depth + 1);
        this.dictDialog.show(words);
        this.dictDialog.setDepth(160);
    }




    gotoIntroScene(){
        SoundController.playSfx(this.scene, "click");
        this.scene.dial.mouseUp();
        this.scene.scene.switch("IntroScene");
    }
    

}