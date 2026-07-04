class TutorialController{

    constructor(scene){
        this.scene = scene;
    }




    checkNextTutorial(levelIndex){
        if(this.scene.introHud && this.scene.introHud.start){//Intro play button tutorial

            this.scene.introHud.start.tutorialArrowPos = function(){
                return {x: 0.5, y: 0.35}
            }

            this.scene.introHud.start.getTextY = function(){
                return 0.2;
            }
            
            this.showTutorial(
                Constants.TUTORIAL_PLAY_BUTTON, 
                this.scene.introHud.start,
                Language.strings["play_tutorial"],
                90
            );
            return;
        }

        let step = GameData.getTutorialStep();
        if(step == Constants.TUTORIAL_FINGER_HINT) return;

        if(step == Constants.TUTORIAL_PLAY_BUTTON && levelIndex == Constants.TUTORIAL_DIAL_LEVEL){
            this.scene.dial.tutorialArrowPos = function(){
                return {x: 0.5, y: 0.56}
            }

            this.scene.dial.getTextY = function(){
                return 0.4;
            }
    
            let words = GameData.level.boardModel.getAllWords(true);
            let allWords = "";
            let delim = "";
            for(let i = 0; i < words.length; i++){
                if(i == words.length - 1) delim = " " + Language.strings["and"] + " ";
                allWords += delim;
                allWords += words[i].answer;
                if(delim == "") delim = ", ";
            }
    
            this.showTutorial(
                Constants.TUTORIAL_DIAL, 
                this.scene.dial,
                Phaser.Utils.String.Format(Language.strings["dial_tutorial"], [allWords]),
                90,
                true
            );
        }else if(step == Constants.TUTORIAL_DIAL && levelIndex == Constants.TUTORIAL_SHUFFLE_LEVEL){

            this.scene.gameHud.btnShuffle.tutorialArrowPos = function(){
                return {x: 0.5, y: (this.scene.dial.y - this.scene.dial.height * this.scene.dial.scale * 0.45) / this.scene.scale.gameSize.height}
            }

            this.scene.gameHud.btnShuffle.getTextY = function(){
                return 0.53;
            }

            this.showTutorial(
                Constants.TUTORIAL_SHUFFLE, 
                this.scene.gameHud.btnShuffle,
                Language.strings["shuffle_tutorial"],
                90
            );
        }else if(step == Constants.TUTORIAL_SHUFFLE && levelIndex  == Constants.TUTORIAL_SINGLE_RANDOM_LEVEL){

            this.scene.gameHud.btnSingleHint.tutorialArrowPos = function(){
                return {
                    x: (this.scene.scale.gameSize.width - this.scene.gameHud.btnSingleHint.displayWidth * 2.2)/ this.scene.scale.gameSize.width, 
                    y: (this.scene.gameHud.btnSingleHint.y + this.scene.gameHud.btnSingleHint.displayHeight * 0.5) / this.scene.scale.gameSize.height
                }
            }

            this.scene.gameHud.btnSingleHint.getTextY = function(){
                return 0.55;
            }

            this.showTutorial(
                Constants.TUTORIAL_SINGLE_RANDOM_HINT, 
                this.scene.gameHud.btnSingleHint,
                Phaser.Utils.String.Format(Language.strings["single_hint_tutorial"], [wordPressParams.single_random_reveal_cost]),
                0
            );
        }else if(step == Constants.TUTORIAL_SINGLE_RANDOM_HINT && levelIndex == Constants.TUTORIAL_MULTI_RANDOM_LEVEL){
            
            this.scene.gameHud.btnMultipleHint.tutorialArrowPos = function(){
                return {
                    x: (this.scene.gameHud.btnMultipleHint.x - this.scene.gameHud.btnMultipleHint.displayWidth * 1.6) / this.scene.scale.gameSize.width, 
                    y: (this.scene.gameHud.btnMultipleHint.y - this.scene.gameHud.btnMultipleHint.displayHeight * 1.6) / this.scene.scale.gameSize.height
                }
            }

            this.scene.gameHud.btnMultipleHint.getTextY = function(){
                return 0.6;
            }

            this.showTutorial(
                Constants.TUTORIAL_MULTI_RANDOM, 
                this.scene.gameHud.btnMultipleHint,
                Phaser.Utils.String.Format(Language.strings["multi_hint_tutorial"], [wordPressParams.multi_random_reveal_cost]),
                45
            );
        }else if(step == Constants.TUTORIAL_MULTI_RANDOM && levelIndex == Constants.TUTORIAL_FINGER_LEVEL){
            
            this.scene.gameHud.btnFingerHint.tutorialArrowPos = function(){
                return {
                    x: (this.scene.gameHud.btnFingerHint.x + this.scene.gameHud.btnMultipleHint.displayWidth * 1.6) / this.scene.scale.gameSize.width, 
                    y: (this.scene.gameHud.btnFingerHint.y + this.scene.gameHud.btnMultipleHint.displayHeight * 1.6) / this.scene.scale.gameSize.height
                }
            }

            this.scene.gameHud.btnFingerHint.getTextY = function(){
                return 0.55;
            }
    
            this.showTutorial(
                Constants.TUTORIAL_FINGER_HINT, 
                this.scene.gameHud.btnFingerHint,
                Phaser.Utils.String.Format(Language.strings["finger_hint_tutorial"], [wordPressParams.finger_reveal_cost]),
                -135
            );
        }
    }



    showTutorial(step, gameObject, str, arrowAngle, isDial){
        if(isDial) this.tutorial = new DialTutorial(this.scene);
        else this.tutorial = new Tutorial(this.scene);

        this.tutorial.setHideCallback(this.destroyTutorial, this);

        if(this.scene.gameHud && this.scene.gameHud.pdom) this.scene.gameHud.pdom.alpha = 0.2;

        this.scene.add.existing(this.tutorial);
        this.tutorial.step = step;
        this.tutorial.setDepth(isDial ? 150 : 300);
        this.tutorial.setGameObject(gameObject)
        this.tutorial.setText(str);
        this.tutorial.setTextPosition();
        this.tutorial.indicateGameObject(arrowAngle);
        this.tutorial.show();
    }



    showExtraWordsTutorial(){

        this.scene.gameHud.extraWordsButton.tutorialArrowPos = function(){
            return {
                x: (this.scene.gameHud.extraWordsButton.x + this.scene.gameHud.btnMultipleHint.displayWidth * 1.05) / this.scene.scale.gameSize.width, 
                y: (this.scene.gameHud.extraWordsButton.y - this.scene.gameHud.btnMultipleHint.displayHeight * 1.05) / this.scene.scale.gameSize.height
            }
        }

        this.scene.gameHud.extraWordsButton.getTextY = function(){
            return 0.6;
        }

        this.showTutorial(
            Constants.TUTORIAL_NONE, 
            this.scene.gameHud.extraWordsButton,
            Phaser.Utils.String.Format(Language.strings["extra_words_tutorial"], [wordPressParams.num_bonus_words_to_find_for_reward]),
            135
        );
    }




    destroyTutorial(){
        if(this.scene.gameHud && this.scene.gameHud.pdom) this.scene.gameHud.pdom.alpha = 1;
        if(this.tutorial) this.tutorial = null;
    }

}