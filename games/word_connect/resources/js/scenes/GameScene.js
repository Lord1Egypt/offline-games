class GameScene extends BaseScene{

    constructor(){
        super("GameScene", false);
    }



    create(){
        super.create();
        this.input.enabled = false;
        this.animateStars(5);
        this.startGame();

        this.previewTileParticleManagerPool = this.add.group({
            classType: PreviewTileParticleManager,
            runChildUpdate: false
        });

        sceneCreated(this);
    }



    startGame(){
        this.hintController = new HintController(this);
        this.gameController = new GameController(this);
        this.comboController = new ComboController(this);
        this.gameController.createLevel();
    }




    createLevelContent(){
        this.createBoard();
        this.createPreview();
        this.createDial();
        this.position();
        
        if(!this.gameHud) this.gameHud = new GameHud(this);
        
        this.board.setVisible(true);
        this.dial.setVisible(true);
        this.preview.setVisible(true);

        this.gameHud.setComboEarned(Math.max(0, GameData.getComboReward()));
        let wordCountMinusOne = GameData.level.getWordCount() - 1;

        this.comboController.solvedComboCount = GameData.getSolvedComboCount();
        this.gameHud.setSolvedComboCount(Math.max(0, this.comboController.solvedComboCount), wordCountMinusOne);
        
        if(this.comboController.solvedComboCount > 0) this.gameHud.setSemiCircleValue(this.comboController.solvedComboCount / wordCountMinusOne);
        
        this.gameHud.lockOrUnlockHintButtons();
        this.gameHud.setLevelNum(GameData.level.index + 1);
        this.gameHud.appear();
        this.gameHud.btnBack.enabled = true;
        this.gameHud.btnConfig.enabled = true;
        if(this.gameHud.fullScreen) this.gameHud.fullScreen.enabled = true;
        this.gameHud.btnBack.alpha = 1;
     
        levelStarted(this, GameData.level.index, this.hintController.getRemainingCoins());
    }




    appearFinished(){
        if(!GameData.isTutorialSkipped()){    
            this.tutorialController = new TutorialController(this);
            this.tutorialController.checkNextTutorial(GameData.level.index);
            this.input.enabled = true;
        }

        this.comboController.resumeCombo();
        this.gameController.finalWordAnimationChecker();
    }



    createPreview(){
        if(!this.preview){
            this.preview = new Preview(this);
            this.gameController.preview = this.preview;
            this.add.existing(this.preview);
            this.preview.setDepth(150);
        }
    }



    createBoard(){
        if(!this.board){
            this.board = new Board(this);
            this.add.existing(this.board);
            this.board.setDepth(100);
        }
        this.board.layout();
    }



    createDial(){
        if(!this.dial){
            this.dial = new Dial(this);
            this.dial.gameController = this.gameController;
            this.add.existing(this.dial);
            this.dial.setDepth(151);
        }
        this.dial.setLetters(GameData.level.letters);
    }



    resize(gameSize, baseSize, displaySize, resolution){
        super.resize(gameSize, baseSize, displaySize, resolution);
        if(this.board && this.dial && this.preview) this.position();
    }



    position(){
        let notchEnd = GameHud.topbarHeight * this.gameScale;

        this.board.scale = this.dial.scale = this.preview.scale = this.gameScale;

        let totalHeight = this.scale.gameSize.height - notchEnd;
        let availableHeight = totalHeight - this.board.height * this.board.scale - this.dial.height * this.dial.scale;
        let space = availableHeight / 3;

        let levelBgHeight = 10;
        this.board.x = this.scale.gameSize.width * 0.5;
        this.board.y = notchEnd + this.board.height * this.board.scale * 0.5 + space - levelBgHeight;
        
        this.positionPreview();
       
        this.dial.x = this.board.x;
        this.dial.y = this.board.y + this.board.height * this.board.scale * 0.5 + space + this.dial.height * this.dial.scale * 0.5;
    
        if(this.dialEffect1) this.positionDialEffectRings();
        if(this.gameHud) {
            this.gameHud.positionHud();
            this.gameHud.positionTScore();
        }
        if(this.levelEnd) {
            this.positionLevelEnd();
            this.levelEnd.onResize();
        }

        if(this.tutorialController && this.tutorialController.tutorial) this.tutorialController.tutorial.layout();
        if(this.boardOverlay) this.boardOverlay.updateSize();
        
    }



    positionPreview(){  
        this.preview.x = this.board.x;
        this.preview.y = this.board.y + this.board.height * this.board.scale * 0.5 - this.preview.height * this.preview.scale - 30 * this.gameScale;
        this.preview.updateMask();
    }




    update(time, delta){
        super.update();

        if(this.preview) this.preview.update();
        
        if(this.comboController.cameraShaker && this.comboController.cameraShaker.isShaking){
            let shake = this.comboController.cameraShaker.getNewShakePosition();
            this.cameras.main.setPosition(shake.x, shake.y);
        }

        if(this.gameHud){
            if(this.gameHud.dictDialog && this.gameHud.dictDialog.visible) this.gameHud.dictDialog.update();
            if(this.gameHud.extraWordsDialog && this.gameHud.extraWordsDialog.visible) this.gameHud.extraWordsDialog.update();
        } 
    }




    createDialAnimationEffect(){
        if(!this.dialEffect1){
            this.dialEffect1 = new Phaser.GameObjects.Image(this, 0, 0, "sheet1", "dial_effect");
            this.dialEffect1.alpha  = 0; 
            this.add.existing(this.dialEffect1);
            this.dialEffect1.setDepth(this.dial.depth - 2);
            this.dialEffect2 = new Phaser.GameObjects.Image(this, 0, 0, "sheet1", "dial_effect");
            this.dialEffect2.alpha  = 0;
            this.add.existing(this.dialEffect2);
            this.dialEffect2.setDepth(this.dial.depth - 1);
           
            this.positionDialEffectRings();
        }
    }




    positionDialEffectRings(){
        if(this.comboController.dialEffectRunning){
            this.comboController.animateDialEffect_1();
            this.comboController.animateDialEffect_2();
        }
        this.dialEffect1.setPosition(this.dial.x, this.dial.y);
        this.dialEffect2.setPosition(this.dial.x, this.dial.y);
    }



    comboShaderAnim(callback, rewardToIncrement){
        this.comboController.tempComboReward += rewardToIncrement;
        GameData.saveComboReward(this.comboController.tempComboReward);
        this.gameHud.setComboEarned(this.comboController.tempComboReward);
        this.gameHud.setSolvedComboCount(++this.comboController.solvedComboCount, GameData.level.getWordCount() - 1);
        this.gameHud.animateSemiCircle(this.comboController.solvedComboCount / (GameData.level.getWordCount() - 1), callback);
        GameData.saveSolvedComboCount(this.comboController.solvedComboCount);
    }



    destroyLevel(){
        this.comboController.stop();
        this.gameHud.btnBack.enabled = false;
        this.gameHud.btnBack.alpha = 0.5;

        let targets = [this.board, this.dial, this.gameHud.extraWordsButton, this.gameHud.btnShuffle, this.gameHud.btnSingleHint] ;
        targets.push(this.gameHud.btnMultipleHint);
        targets.push(this.gameHud.btnFingerHint);
        targets.push(this.gameHud.levelNumLabel);
        if(this.gameHud.btnSingleHint.lock) targets.push(this.gameHud.btnSingleHint.lock);
        if(this.gameHud.btnMultipleHint.lock) targets.push(this.gameHud.btnMultipleHint.lock);
        if(this.gameHud.btnFingerHint.lock) targets.push(this.gameHud.btnFingerHint.lock);

        levelFinished(this, GameData.level.index, this.hintController.getRemainingCoins(), GameData.level.comboCount - 1);

        this.tweens.add({
            targets         : targets,
            alpha           : 0,
            duration        : 300,
            callbackScope   : this,
            onComplete      : this.openLevelEnd
        });
    }



    openLevelEnd(){
        DictionaryDialog.allWords = GameData.level.boardModel.getAllWords(true);

        this.board.clearContent();
        this.dial.clearContent();
        this.preview.clearContent();

        this.board.setVisible(false);
        this.dial.setVisible(false);
        this.preview.setVisible(false);

        this.comboController.resetCombo();

        if(this.levelEnd == null){
            this.levelEnd = new LevelEnd(this);
            this.add.existing(this.levelEnd);
            this.levelEnd.setDepth(1);
        }else{
            this.levelEnd.setActive(true);
            this.levelEnd.setVisible(true);
        }
  
        this.positionLevelEnd();
        this.levelEnd.start();
    }





    positionLevelEnd(){
        this.levelEnd.scale = this.gameScale;
        this.levelEnd.x = (this.scale.gameSize.width - this.levelEnd.width * this.levelEnd.scaleX) * 0.5;
        this.levelEnd.y = (this.scale.gameSize.height - this.levelEnd.height * this.levelEnd.scaleY) * 0.5;
    }




    showToast(str){
        if(!this.toast){
            this.toast = new Toast(this);
            this.add.existing(this.toast);
            this.toast.setDepth(300);
            this.toast.alpha = 0;
        }
        this.toast.remove();
        this.toast.x = 0;
        this.toast.y = this.scale.gameSize.height * 0.5;
        
        this.toast.setActive(true);
        this.toast.setVisible(true);
        this.toast.show(str);
    }
}