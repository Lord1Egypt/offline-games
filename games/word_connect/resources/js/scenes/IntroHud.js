class IntroHud extends CommonHud{

    constructor(scene){
        super(scene);

        this.setMenuButton();
        this.setFullScreenButton();
        this.setCoinMeter();

        this.logo = new Phaser.GameObjects.Image(scene, 0, 0, "logo_" + Language.getCode());
        scene.add.existing(this.logo);
        
        this.start = new SpriteTextButton(scene, 0, 0, "sheet1", "btn_start_up", "btn_start_down", " ");
        this.start.label.x -= 5;        
        this.start.setCallback(function(){
            this.scene.input.enabled = false;
            let mobile = window.mobileAndTabletCheck();
            let full = (mobile && wordPressParams.auto_full_screen_mobile) || (!mobile && wordPressParams.auto_full_screen_desktop);
            if(wordPressParams.enable_full_screen_button && full && !this.scene.scale.isFullscreen) {
                this.playTapped = true;
                this.goFullScreen();
            }else{
                SoundController.playSfx(this.scene, "click");
                this.nextScene();
            } 
        }, this);

        scene.add.existing(this.start);

        this.positionElements();
        this.appear();

        scene.events.on('wake', this.appear, this);
        //this.setScore();

        
    }




    populateStartButton(){
        let nextLevel = GameData.findFirstIncompleteLevel() + 1;
        this.start.setLabelText(nextLevel);
        let maxWidth = this.start.width * 0.4;
        if(this.start.label.width > maxWidth) this.start.label.scale = maxWidth / this.start.label.width;
    }




    positionElements(){
        let scale           = this.scene.gameScale;
        let marginLeft      = this.getMarginLeft();
        let gameSize        = this.scene.scale.gameSize;

        this.btnConfig.scale = scale;
        this.btnConfig.x = marginLeft + this.btnConfig.displayWidth * 0.5 + this.getTopLeftButtonsMargin();
        this.btnConfig.y = this.getButtonY();

        if(this.fullScreen){
            this.fullScreen.scale = scale;
            this.fullScreen.x = this.btnConfig.x + this.btnConfig.displayWidth * this.buttonsSpacing;
            this.fullScreen.y = this.btnConfig.y;
            this.positionFullscreenOff();
        }

        if(this.coinMeter){
            this.coinMeter.scale = scale;
            this.positionCoinMeter();
        }

        this.logo.scale = scale;
        this.logo.x = gameSize.width * 0.5; 
        this.logo.y = gameSize.height * 0.3;
        
        this.start.scale = scale;
        this.start.x = this.logo.x;
        this.start.y = gameSize.height * 0.55;
      
        if(this.menuDialog) this.menuDialog.updateSize();
    }



    appear(){
        this.populateStartButton();
        let dst = 100;

        this.btnConfig.alpha = this.coinMeter.alpha = 0;
        if(this.fullScreen){
            this.fullScreen.alpha = 0;
            this.fullScreen.y -= dst;
        }
        this.btnConfig.y -= dst;
        
        this.coinMeter.y -= dst;

        if(this.fullScreen && this.scene.sys.game.device.fullscreen.available){
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

        let targets = [this.btnConfig, this.coinMeter];

        if(this.fullScreen) targets.push(this.fullScreen);

        if(this.fullScreen && this.fullScreenOff){
            this.positionFullscreenOff();
            targets.push(this.fullScreenOff);
        }

        this.scene.tweens.add({
            targets: targets,
            y: "+=" + dst,
            alpha:1,
            duration:400,
            ease:"Back.easeOut"
        });

        this.logo.alpha = 0;
        this.logo.y += dst;
        this.scene.tweens.add({
            targets: this.logo,
            y: this.logo.y - dst,
            alpha: 1,
            duration: 400,
            ease: "Back.easeOut",
            delay: 100
        });

        this.start.alpha = 0;
        this.start.y += dst;
        this.scene.tweens.add({
            targets: this.start,
            y: this.start.y - dst,
            alpha: 1,
            duration: 400,
            ease: "Back.easeOut",
            delay: 200,
            callbackScope   : this,
            onComplete: this.pulsateStartButton
        });
    }



    pulsateStartButton(){
        if(parseInt(this.start.label.text) > Language.locale.levelCount){
            this.start.alpha = 0.5;
            this.start.spriteButton.enabled = false;

            this.finished = new Phaser.GameObjects.Text(this.scene,
                0, 
                0,
                Language.strings["end_of_game"],
                {fontFamily: FONT, fontSize: 30, color: '#fff', align: 'center', fontStyle: "bold", wordWrap: {width: this.scene.scale.gameSize.width * 0.85}}
            ).setShadow(1, 1, "#471327", 1, false, true).setScale(this.scene.gameScale).setOrigin(0.5).setAlpha(0);
            this.scene.add.existing(this.finished);

            this.positionGameFinishedLabel();

            this.scene.tweens.add({
                targets: this.finished,
                alpha: 1,
                duration: 200,
                callbackScope:this,
                onComplete: function(){
                    this.scene.appearFinished.apply(this.scene);
                }
            });

            return;
        }

        this.scene.appearFinished.apply(this.scene);
    }



    adjustFullScreenButtons(){
        super.adjustFullScreenButtons();
        
        if(this.playTapped) {
            let obj = {value: 0}
            this.tempTween = this.scene.tweens.add({
                targets: obj,
                value: 1,
                duration: 3000,
                callbackScope:this,
                onUpdate: function(){
                    if(this.scene.scale.height >= Math.floor(this.scene.scale.displaySize.height)){
                        this.playTapped = false;
                        this.tempTween.stop();
                        this.scene.time.delayedCall(600, this.nextScene, [], this);
                    }
                }
            });
        }
        
    }



    handleOrientationChange(orientation){
        super.handleOrientationChange(orientation);

        this.scene.time.delayedCall(3000, function(){
            if(this.scene.tutorialController && this.scene.tutorialController.tutorial) this.scene.tutorialController.tutorial.layout();
        }, [], this.scene.introHud);
    }



    positionGameFinishedLabel(){
        this.finished.scale = this.scene.gameScale;
        this.finished.x = this.scene.scale.gameSize.width * 0.5;
        this.finished.y = this.start.y + this.start.displayHeight * 0.7;
    }



    nextScene(){
        if(this.scene.tutorialController && 
            this.scene.tutorialController.tutorial && 
            this.scene.tutorialController.tutorial.step == Constants.TUTORIAL_PLAY_BUTTON){
                this.scene.tutorialController.tutorial.hide();
        }
        
        
        if(IntroScene.switchedLanguage){
            this.scene.scene.start("GameScene");
        } else{
            this.scene.scene.switch("GameScene");
        }
    }
    
}