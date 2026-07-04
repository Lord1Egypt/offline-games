class IntroScene extends BaseScene{

    constructor(){
        super("IntroScene", false);
    }



    create(){
        super.create();

        SoundController.sfx_unmuted = GameData.isFxSoundOn();
        
        if(wordPressParams.bg_music_enabled){
            SoundController.music = this.sound.add("music", {loop: true, volume: wordPressParams.bg_music_volume});
            if(GameData.isMusicSoundOn()) SoundController.music.play();
        }
        
        this.input.enabled = false;
        this.animateStars(15);

        this.hintController = new HintController(this.scene);        
        this.introHud = new IntroHud(this);

        hideLoadingAnimation();
        
        sceneCreated(this);
    }




    appearFinished(){
        if(GameData.getTutorialStep() == Constants.TUTORIAL_NONE){
            this.tutorialController = new TutorialController(this);
            this.tutorialController.checkNextTutorial();
        }else{
            if(wordPressParams.enable_daily_reward && this.timeForDailyReward()){
                this.wheelDialog = new WheelDialog(this);
                this.add.existing(this.wheelDialog);
                this.wheelDialog.setDepth(30);
                this.wheelDialog.setHideCallback(function() {
                    this.wheelDialog.destroy();
                    this.wheelDialog = null;
                }, this);
            }
            
        }
        this.input.enabled = true;
    }




    timeForDailyReward(){
        let lastSpinTime = GameData.getLastSpinTime();

        if(lastSpinTime == 0){
            return true;
        }else{
            const millisInADay = 86400000;
            let elapsed = new Date().getTime() - lastSpinTime;
            if(elapsed > millisInADay) return true;
        }

        return false;
    }




    update(time, delta){
        super.update();
        if(this && this.wheelDialog) this.wheelDialog.update(time, delta);
    }



    scaleAndPositionUI(){
        super.scaleAndPositionUI();
        if(this.introHud) {
            this.introHud.positionElements();
            this.introHud.positionTScore();
        }
        if(this.tutorialController && this.tutorialController.tutorial) this.tutorialController.tutorial.layout();
        if(this.wheelDialog) this.wheelDialog.updateSize();
    }

}