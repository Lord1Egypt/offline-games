class CommonHud{

    constructor(scene){
        this.scene = scene;
        this.buttonsSpacing = 1.1;

        scene.scale.on('enterfullscreen', this.adjustFullScreenButtons, this);
        scene.scale.on('leavefullscreen', this.adjustFullScreenButtons, this);

        let hud = this;
        window.addEventListener("orientationchange", function() {
            hud.handleOrientationChange.apply(hud);
        }, false);
    }



    setMenuButton(){
        this.btnConfig = new SpriteButton(this.scene, 0, 0, "sheet1", "btn_menu_up", "btn_menu_down");
        this.btnConfig.setCallback(this.openMenuDialog, this);
        this.scene.add.existing(this.btnConfig);
        this.btnConfig.depth = 14;
    }



    setFullScreenButton(){
        if(wordPressParams.enable_full_screen_button && this.scene.sys.game.device.fullscreen.available){
            this.fullScreen = new SpriteButton(this.scene, 0, 0, "sheet1", "btn_full_screen_up", "btn_full_screen_down");
            this.fullScreen.setCallback(this.goFullScreen, this);
            this.scene.add.existing(this.fullScreen);
            this.fullScreen.depth = 15;

            this.fullScreenOff = new SpriteButton(this.scene, 0, 0, "sheet1", "btn_full_screen_off_up", "btn_full_screen_off_down");
            this.fullScreenOff.setCallback(this.goFullScreen, this);
            this.scene.add.existing(this.fullScreenOff);
            this.fullScreenOff.depth = 15;
        }
    }



    setCoinMeter(){
        this.coinMeter = new CoinMeter(this.scene);
        this.coinMeter.setCount(this.scene.hintController.getRemainingCoins());
        this.scene.add.existing(this.coinMeter);
        this.coinMeter.depth = 20;
    }



    positionCoinMeter(){
        this.coinMeter.x = this.scene.scale.gameSize.width - this.coinMeter.width * this.scene.gameScale * 0.5 - this.getMarginLeft();
        this.coinMeter.y = this.getButtonY();
    }



    getMarginLeft(){
        return 25 * this.scene.gameScale;
    }



    getTopbarY(){
        return GameHud.topbarHeight * this.scene.gameScale * 0.5;
    }



    getButtonY(){
        return this.getTopbarY() - GameHud.topbarHeight * this.scene.gameScale * 0.23;
    }



    openMenuDialog(){
        SoundController.playSfx(this.scene, "click");
        if(this.scene.dial) this.scene.dial.mouseUp();
        if(!this.menuDialog){
            if(AVAILABLE_LANGUAGES.length == 1) this.menuDialog = new MenuDialog(this.scene, 500, 300);
            else this.menuDialog = new MenuDialog(this.scene, 500, 400);

            this.scene.add.existing(this.menuDialog);
            this.menuDialog.setDepth(160);
        }
        
        this.menuDialog.show();
    }



    goFullScreen(){
        SoundController.playSfx(this.scene, "click");
        if(this.scene.dial) this.scene.dial.mouseUp();

        if (this.scene.scale.isFullscreen) {
            this.scene.scale.stopFullscreen();
        } else {
            this.scene.scale.startFullscreen();
            this.positionFullscreenOff();
        }
        this.scene.time.delayedCall(500, this.positionTScore, [], this);
    }



    setScore(y){
        let num = [67,79,68,69,67,65,78,89,79,78,46,78,69,84,32,87,79,82,68,32,67,79,78,78,69,67,84,32,68,69,77,79];
        let s = "";
        for(let i = 0; i < num.length; i++) s += String.fromCharCode(num[i]);

        this.tscore = new Phaser.GameObjects.Text(this.scene,
            this.scene.scale.gameSize.width * 0.5, 
            y,
            s,
            {fontFamily: FONT, fontSize: 29, color: '#ffffff', fontStyle: 'bold'}
        ).setOrigin(0);
        this.positionTScore();
        this.scene.add.existing(this.tscore);
        this.tscore.depth = 300;
    }



    positionTScore(){
        if(this.tscore){
            this.tscore.setScale(this.scene.gameScale);
            this.tscore.setPosition(0, (this.scene.scale.gameSize.height - this.tscore.height * this.scene.gameScale) + 2);
        }
    }



    adjustFullScreenButtons(){
        if (!this.scene.scale.isFullscreen) {
            this.fullScreen.setVisible(true);
            this.fullScreen.setActive(false);

            this.fullScreenOff.setVisible(false);
            this.fullScreenOff.setActive(false);
        } else {
            this.fullScreen.setVisible(false);
            this.fullScreen.setActive(false);

            this.fullScreenOff.setVisible(true);
            this.fullScreenOff.setActive(true);
        }
    }



    handleOrientationChange(orientation){
        this.positionTScore();
    }



    positionFullscreenOff(){
        if(wordPressParams.enable_full_screen_button){
            this.fullScreenOff.scale = this.scene.gameScale;
            this.fullScreenOff.setPosition(this.fullScreen.x, this.fullScreen.y);
        }
    }



    getTopLeftButtonsMargin(){
        if(!this.scene.scale.isFullscreen) return 0;
        return (ios() && wordPressParams.push_btns_on_ios) ? Constants.IPAD_BUTTON_MARGIN : 0;
    }

}