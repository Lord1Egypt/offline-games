class HintController{

    static SINGLE_RANDOM_REVEAL     = "SINGLE_RANDOM_REVEAL";
    static MULTIPLE_RANDOM_REVEAL   = "MULTIPLE_RANDOM_REVEAL";
    static FINGER_REVEAL            = "FINGER_REVEAL";
    static KEY_COIN_COUNT           = "KEY_COIN_COUNT";


    constructor(scene){
        this.scene = scene;
    }



    hideHintTutorial(kind){
        if( this.scene.tutorialController && 
            this.scene.tutorialController.tutorial && 
            this.scene.tutorialController.tutorial.step == kind){
                this.scene.tutorialController.tutorial.hide();
               
        }
    }



    onSingleHintClick(){
        this.scene.dial.mouseUp();
        if(GameData.level.index < Constants.TUTORIAL_SINGLE_RANDOM_LEVEL) {
            this.scene.showTooltip(Tooltip.ALIGN_RIGHT, this.scene.gameHud.btnSingleHint, Phaser.Utils.String.Format(Language.strings["hint_locked"], [Constants.TUTORIAL_SINGLE_RANDOM_LEVEL + 1]));
        }else{
            this.hideHintTutorial(Constants.TUTORIAL_SINGLE_RANDOM_HINT);
            this.revealLetter(HintController.SINGLE_RANDOM_REVEAL);
        }
    }





    onMultipleHintClick(){
        this.scene.dial.mouseUp();
        if(GameData.level.index < Constants.TUTORIAL_MULTI_RANDOM_LEVEL) {
            this.scene.showTooltip(Tooltip.ALIGN_RIGHT, this.scene.gameHud.btnMultipleHint, Phaser.Utils.String.Format(Language.strings["hint_locked"], [Constants.TUTORIAL_MULTI_RANDOM_LEVEL + 1]));
        }else{
            this.hideHintTutorial(Constants.TUTORIAL_MULTI_RANDOM);
            this.revealLetter(HintController.MULTIPLE_RANDOM_REVEAL);
        }
    }




    onFingerHintClick(){
        this.scene.dial.mouseUp();
        if(GameData.level.index < Constants.TUTORIAL_FINGER_LEVEL) {
            this.scene.showTooltip(Tooltip.ALIGN_LEFT, this.scene.gameHud.btnFingerHint, Phaser.Utils.String.Format(Language.strings["hint_locked"], [Constants.TUTORIAL_FINGER_LEVEL + 1]));
        }else{
            this.hideHintTutorial(Constants.TUTORIAL_FINGER_HINT);
            this.revealLetter(HintController.FINGER_REVEAL);
        }
    }




    revealLetter(type){
        this.scene.input.enabled = false;

        let remainingCoins = this.getRemainingCoins();
        
        if(type == HintController.SINGLE_RANDOM_REVEAL){
            if(this.scene.board.getSingleRandomBoardTile() == null){
                this.scene.input.enabled = true;
                return;
            }
            
            if(remainingCoins >= wordPressParams.single_random_reveal_cost){
                let resultingCoins = remainingCoins - wordPressParams.single_random_reveal_cost;
                this.setCoinCount(resultingCoins);
                this.scene.gameHud.coinMeter.setCount(resultingCoins);

                let boardTilesToAnimate = this.scene.board.revealSingleRandomHint();
                if(boardTilesToAnimate.length > 0){
                    SoundController.playSfx(this.scene, "hint");
                    this.animateHint(boardTilesToAnimate, this.scene.gameHud.btnSingleHint);
                }else{
                    this.scene.input.enabled = true;
                }
            }else{
                this.scene.showToast(Language.strings["no_coins_left"]);
                this.scene.input.enabled = true;
            } 
        }else if(type == HintController.MULTIPLE_RANDOM_REVEAL){
            let boardTilesToAnimate = this.scene.board.selectMultipleCellsForHint(getNumberOfTilesToRevealForMultiRandomHint(GameData.level.index));
            if(boardTilesToAnimate.length == 0){
                this.scene.input.enabled = true;
                return;
            }

            if(remainingCoins >= wordPressParams.multi_random_reveal_cost){
                let resultingCoins = remainingCoins - wordPressParams.multi_random_reveal_cost;
                this.setCoinCount(resultingCoins);
                this.scene.gameHud.coinMeter.setCount(resultingCoins);
                SoundController.playSfx(this.scene, "hint");
                this.animateHint(boardTilesToAnimate, this.scene.gameHud.btnMultipleHint);
            }else{
                this.scene.showToast(Language.strings["no_coins_left"]);
                this.scene.input.enabled = true;
            } 
        }else if(type == HintController.FINGER_REVEAL){
            if(remainingCoins >= wordPressParams.finger_reveal_cost){
                this.scene.dial.setEnabled(false);
                this.scene.board.fingerHintSelectionModeActive = true;
                if(!this.scene.boardOverlay){
                    this.scene.boardOverlay = new BoardOverlay(this.scene);
                    this.scene.add.existing(this.scene.boardOverlay);
                }else{
                    this.scene.boardOverlay.setActive(true);
                    this.scene.boardOverlay.setVisible(true);
                }
                
                this.scene.boardOverlay.setDepth(160)
                this.scene.board.setDepth(170);
                this.scene.gameHud.levelNumLabel.setDepth(171);
                this.scene.boardOverlay.show();  
            }else{
                this.scene.showToast(Language.strings["no_coins_left"]);
                this.scene.input.enabled = true;
            } 
        }
    }




    closeBoardOverlayAndAnimateHint(callback){
        let remainingCoins = this.getRemainingCoins();
        let resultingCoins = remainingCoins - wordPressParams.finger_reveal_cost;
        this.setCoinCount(resultingCoins);
        this.scene.gameHud.coinMeter.setCount(resultingCoins);
        this.scene.boardOverlay.hide(callback);
        
    }




    animateHint(boardTiles, button){
        let x = button.x - button.width * button.scale * button.originX;
        let y = button.y - button.height * button.scale * button.originY;

        let startPoint      = new Phaser.Math.Vector2(x + button.width * button.scale * 0.5, y + button.height * button.scale * 0.5);
        let controlPoint1   = new Phaser.Math.Vector2(startPoint.x, startPoint.y);
        let controlPoint2   = new Phaser.Math.Vector2(this.scene.scale.gameSize.width * 0.5, button.y);



        for(let i = 0; i < boardTiles.length; i++){
            let boardTile = boardTiles[i];
            boardTile.cellData.state = Constants.TILE_STATE_REVEALED;
            GameData.saveTileState(boardTile.cellData.x, boardTile.cellData.y, Constants.TILE_STATE_REVEALED);

            let global          = boardTile.getWorldTransformMatrix();
            let endPoint        = new Phaser.Math.Vector2(global.tx, global.ty);
            let bezierCurve     = new Phaser.Curves.CubicBezier(startPoint, controlPoint1, controlPoint2, endPoint);
            let particles = this.scene.add.particles('sheet1');
            particles.depth = 160;
            
            let flare = particles.createEmitter({
                frame       : 'flare_red',
                x           : button.x - button.width * 0.5,
                y           : button.y + button.height * 0.5,
                lifespan    : 300,
                speedY      : { start: 0, end: 100, steps: 4 },
                speedX      : { min: -20, max: 20, steps: 4 },
                quantity    : 3,
                scale       : { start: 0.6, end: 0.1 },
                blendMode   : 'ADD'
            });

            let tweenObject = { val: 0 }

            this.scene.tweens.add({
                targets         : tweenObject,
                val             : 1,
                duration        : 700,
                ease            : "Sine.easeIn",
                callbackScope   : this,
                onUpdate        : function(tween, target){
                    let position = bezierCurve.getPoint(target.val);
                    flare.setPosition(position.x, position.y);
                },
                onComplete      : function(){
                    flare.active = false;
                    flare.killAll();
                    flare.remove();
                    this.explodeHint(boardTile, endPoint.x, endPoint.y, i == boardTiles.length - 1, boardTiles)
                }
            });
        }
    }



    explodeHint(boardTile, x, y, doCallback, boardTiles){

        var emitter = this.scene.add.particles('sheet1').createEmitter({
            frame       : 'flare_red',
            x           : x,
            y           : y,
            speed       : { min: -800, max: 800 },
            angle       : { min: 0, max: 360 },
            scale       : { start: 0.6, end: 0.1 },
            blendMode   : 'ADD',
            quantity    : 50,
            lifespan    : 300,
            gravityY    : 800
        });

        emitter.onParticleDeath(function() {
            emitter.active = false;
            emitter.killAll();
            emitter.remove();
        }, this);

        emitter.explode();
        
        boardTile.revealLetter();
        boardTile.revealAnim(doCallback ? this.revealLetterFinished : null, boardTiles);
    }





    revealLetterFinished(boardTiles){
        this.scene.gameController.findAndCompleteInCompleteBoardTilesAfterGivingHint(boardTiles);
        this.scene.input.enabled = true;
    }
    




    getRemainingCoins(){
        return parseInt(localStorage.getItem(HintController.KEY_COIN_COUNT) || wordPressParams.default_coin_count);
    }



    setCoinCount(count){
        localStorage.setItem(HintController.KEY_COIN_COUNT, count);
    }

}






class BoardOverlay extends Phaser.GameObjects.Container{

    constructor(scene){
        super(scene);

        this.alpha = 0;
        this.modal = this.scene.make.graphics();
        this.modal.alpha = 0.7;
        this.add(this.modal);

        this.btnClose = new SpriteButton(this.scene, 0, 0, "sheet1", "close_up", "close_down")//.setOrigin(1, 0);
        this.btnClose.setCallback(this.hide, this);
        this.add(this.btnClose);
        this.setInteractive(new Phaser.Geom.Circle(0, 0, 3000), Phaser.Geom.Circle.Contains);
    }



    positionClose(){
        this.btnClose.scale = this.scene.gameScale;
        this.btnClose.x =  this.width - this.btnClose.displayWidth;
        this.btnClose.y =  this.btnClose.displayHeight;
    }


    updateSize(){
        this.modal.clear();
        this.modal.fillStyle(0x000000);
        this.modal.fillRect(0, 0, this.scene.scale.gameSize.width, this.scene.scale.gameSize.height);
        this.setSize(this.scene.scale.gameSize.width, this.scene.scale.gameSize.height);
        if(this.btnClose) this.positionClose();
    }


    show(){
        this.updateSize();
        this.scene.tweens.add({
            targets         : this,
            alpha           : 1,
            duration        : 200,
            callbackScope   : this,
            onComplete      : function(){
                this.scene.input.enabled = true;
                this.scene.showToast(Language.strings["select_tile"]);
            }
        });



        this.scene.tweens.add({
            targets: this.scene.gameHud.pdom,
            alpha: 0.2,
            duration: 200,
            ease: "Back.easeOut"
        });
    }




    hide(callback){
        this.scene.input.enabled = false;
        if(this.scene.toast) this.scene.toast.remove();
        this.scene.board.fingerHintSelectionModeActive = false;

        let timeline = this.scene.tweens.createTimeline();

        timeline.add({
            targets         : this,
            alpha           : 0,
            duration        : 300,
            callbackScope   : this,
            onComplete      : function(){
                this.setActive(false);
                this.setVisible(false);
                this.scene.input.enabled = true;
                this.scene.dial.setEnabled(true);
                this.scene.board.setDepth(100);
                this.scene.gameHud.levelNumLabel.setDepth(101);
                if(callback) callback.apply(this);
            }
        });

        timeline.play();


        this.scene.tweens.add({
            targets: this.scene.gameHud.pdom,
            alpha: 1,
            duration: 300
        });

        
    }

}




class Toast extends Phaser.GameObjects.Container{

    constructor(scene){
        super(scene);

        this.modal = this.scene.make.graphics();
        this.modal.alpha = 0.7;
        this.add(this.modal);
        
        this.text = new Phaser.GameObjects.Text(this.scene,
            0, 
            0,
            "",
            {fontFamily: FONT, fontSize: 38, color: '#fece57', align: 'center', wordWrap: { width: this.scene.scale.gameSize.width, useAdvancedWrap: false }}
        );
        
        this.text.setOrigin(0.5, 0.5);
        this.text.scale = this.scene.gameScale;
        this.add(this.text);

    }


    updateSize(){
        this.setSize(this.scene.scale.gameSize.width, this.text.height + (window.mobileAndTabletCheck() ? 0 : 20));
        this.modal.clear();
        this.modal.fillStyle(0x000000);
        this.modal.beginPath();
        this.modal.fillRect(0, 0, this.scene.scale.gameSize.width, this.height);
        this.modal.closePath();
        this.modal.alpha = 0.9;
        
        this.text.x = this.width * 0.5;
        this.text.y = this.height * 0.5;
    }



    show(text){
        //if(this.alpha > 0) this.remove();
        this.text.setText(text);
        this.updateSize();
        
        
        this.timeline = this.scene.tweens.createTimeline();

        this.timeline.add({
            targets: this,
            alpha: 1,
            duration: 300
        });


        this.timeline.add({
            targets: this,
            alpha: 0,
            duration: 500,
            delay: 2000,
            callbackScope: this,
            onComplete: function(){
                this.setActive(false);
                this.setVisible(false);
            }
        });

        this.timeline.play();
    }




    remove(){
        if(this.timeline) this.timeline.stop();
        this.alpha = 0;
        this.setActive(false);
        this.setVisible(false);
    }

}