class ComboController{

    constructor(scene){
        this.scene = scene;

        this.tempComboReward = 0;
        this.solvedComboCount = 0;
        this.step = 1;
        this.dialEffectRunning = false;
        this.particleSpeed = 2000;
    }


    newLevel(){
        this.solvedComboCount = 0;
        if(this.feedback) this.feedback.reset();
    }


    animateDialEffect(){
        this.scene.createDialAnimationEffect();

        this.particulateDial();
        if(this.dialEffectRunning) return;
        this.dialEffectRunning = true;
   
        this.scene.dialEffect1.scaleX = this.scene.gameScale;
        this.scene.dialEffect1.scaleY = this.scene.gameScale - 0.07;
        this.scene.dialEffect1.alpha  = 0; 
        this.scene.dialEffect1.setVisible(true);
        this.scene.dialEffect1.setActive(true);
        this.scene.dialEffect2.scaleX = this.scene.gameScale - 0.07;
        this.scene.dialEffect2.scaleY = this.scene.gameScale;
        this.scene.dialEffect2.setVisible(true);
        this.scene.dialEffect2.setActive(true);

        this.scene.tweens.add({
            targets         : [this.scene.dialEffect1, this.scene.dialEffect2],
            alpha           : 1,
            duration        : 300,
            callbackScope   : this,
            onComplete      : function(){
                this.animateDialEffect_1();
                this.animateDialEffect_2();
            }
        });
    }



    animateDialEffect_1(){
        if(this.scene.dialEffect1.scaleTween) this.scene.dialEffect1.scaleTween.stop();
        this.scene.dialEffect1.scaleX = this.scene.gameScale;
        this.scene.dialEffect1.scaleY = this.scene.gameScale - 0.07;
        this.scene.dialEffect1.scaleTween = this.scene.tweens.add({
            targets: this.scene.dialEffect1,
            scaleX: this.scene.gameScale - 0.07,
            scaleY: this.scene.gameScale,
            duration: Phaser.Math.Between(1500, 2000),
            ease: "Sine.easeInOut",
            yoyo: true,
            repeat: -1
        });
        
        if(this.scene.dialEffect1.angleTween) this.scene.dialEffect1.angleTween.stop();
        this.scene.dialEffect1.angle = 0;
        this.scene.dialEffect1.angleTween = this.scene.tweens.add({
            targets     : this.scene.dialEffect1,
            angle       : "-=360",
            duration    : Phaser.Math.Between(10000, 12000),
            repeat      : -1
        });

    }


    
    animateDialEffect_2(){
        if(this.scene.dialEffect2.scaleTween) this.scene.dialEffect2.scaleTween.stop();
        this.scene.dialEffect2.scaleX = this.scene.gameScale - 0.07;
        this.scene.dialEffect2.scaleY = this.scene.gameScale;
        this.scene.dialEffect2.scaleTween = this.scene.tweens.add({
            targets: this.scene.dialEffect2,
            scaleX: this.scene.gameScale,
            scaleY: this.scene.gameScale - 0.07,
            duration: Phaser.Math.Between(1500, 2000),
            ease: "Sine.easeInOut",
            yoyo: true,
            repeat: -1
        });

        if(this.scene.dialEffect2.angleTween) this.scene.dialEffect2.angleTween.stop();
        this.scene.dialEffect2.angle = 0;
        this.scene.dialEffect2.angleTween = this.scene.tweens.add({
            targets     : this.scene.dialEffect2,
            angle       : "+=360",
            duration    : Phaser.Math.Between(10000, 12000),
            repeat      : -1
        });
    }




    particulateDial(){
        if(!this.particles){
            this.particles = this.scene.add.particles('sheet1');
            this.particles.setDepth(this.scene.dial.depth - 4);
            
            this.emitter = this.particles.createEmitter({
                delay: Math.random() * 800,
                scale: { start: this.scene.gameScale * 0.7, end: this.scene.gameScale * 0.3},
                blendMode: 'ADD'
            });

            this.positionEmitter(this.emitter);
        }

        let emitter = this.emitter;
        
        if(!emitter.visible){
            emitter.active = true;
            emitter.setVisible(true);
            emitter.start();
        }

        emitter.onParticleDeath(function () {
            this.positionEmitter(emitter);
        }, this);
        
        if(this.step == 1){
            emitter.setFrequency(500);
            emitter.setFrame("flare_blue");
            emitter.setLifespan(this.particleSpeed);
        }else if(this.step == 2){
            emitter.setFrequency(400);
            emitter.setLifespan(this.particleSpeed * 0.75);
        }else if(this.step == 3){
            emitter.setFrequency(300);
            emitter.setLifespan(this.particleSpeed * 0.60);
        }else if(this.step == 4){
            emitter.setFrequency(200);
            emitter.setLifespan(this.particleSpeed * 0.5);
        }else if(this.step == 5){
            emitter.setFrequency(150);
            emitter.setLifespan(this.particleSpeed * 0.4285);
        }else if(this.step == 6){
            emitter.setFrequency(100);
            emitter.setLifespan(this.particleSpeed * 0.375);
        }else if(this.step == 7){
            emitter.setFrequency(50);
        }else if(this.step == 8){
            emitter.setFrequency(35);
        }else if(this.step == 9){
            emitter.setFrequency(30);
        }else if(this.step == 10){
            emitter.setFrequency(25);
        }else if(this.step == 11){
            emitter.setFrequency(20);
        }else if(this.step == 12){
            emitter.setFrequency(15);
        }else if(this.step == 13){
            emitter.setFrequency(10);
        }

        if(this.step >= 2) emitter.setFrame(["flare_blue", "flare_green", "flare_red"]);
        else if(this.step >= 4) emitter.setFrame(["flare_blue", "flare_green", "flare_red", "flare_white"]);
        
        this.setEmitterSpeed();
        this.step++;
    }


    setEmitterSpeed(){
        let mult = 10;
        if(this.step == 1) mult = 75;
        else if(this.step == 2) mult = 100;
        else if(this.step == 3) mult = 125;
        else if(this.step == 4) mult = 150;
        else if(this.step == 5) mult = 175;
        else if(this.step == 6) mult = 200;
        
        mult = ((Math.random() * mult) + mult) * (window.innerWidth > window.innerHeight ? 0.5 : 1);
        this.emitter.setSpeed(mult);
    }




    positionEmitter(emitter){
        let radius = this.scene.dial.width * this.scene.dial.scale * 0.5 - 20;
        let radians = Math.random() * (Math.PI * 2);
        let angle = Phaser.Math.RadToDeg(radians);
        emitter.setPosition(this.scene.dial.x + radius * Math.cos(radians), this.scene.dial.y + radius * Math.sin(radians));
        emitter.setEmitterAngle(angle);
        this.setEmitterSpeed();

        let start = this.scene.gameScale * 0.7;
        let end = this.scene.gameScale * 0.3;
        if(emitter.scaleX) {
            emitter.scaleX.start = start;
            emitter.scaleX.end = end;
        }
        if(emitter.scaleY) {
            emitter.scaleY.start = start;
            emitter.scaleY.end = end;
        }
    }



    stop(){
        this.step = 1;
        this.particulateDial();
        if(this.emitter){
            this.emitter.stop();
            this.emitter.active = false;
            this.emitter.setVisible(false);
        }

        if(this.scene.dialEffect1 && this.scene.dialEffect1.visible){
            this.scene.tweens.add({
                targets         : [this.scene.dialEffect1, this.scene.dialEffect2],
                alpha           : 0,
                duration        : 300,
                callbackScope   : this,
                onComplete      : function(){
                    this.scene.dialEffect1.scaleTween.stop();
                    this.scene.dialEffect1.angleTween.stop();
                    this.scene.dialEffect1.setVisible(false);
                    this.scene.dialEffect1.setActive(false);
    
                    this.scene.dialEffect2.scaleTween.stop();
                    this.scene.dialEffect2.angleTween.stop();
                    this.scene.dialEffect2.setVisible(false);
                    this.scene.dialEffect2.setActive(false);
                }
            });
        }
    }




    resetCombo(callback){
        this.stop();
        GameData.level.comboCount = 0;
        GameData.saveComboCount(0);
        this.dialEffectRunning = false;
        this.lastColor = 0;
        this.step = 1;
        if(callback) callback.call(this.scene.gameController);        
    }



    resumeCombo(){
        let comboCount = GameData.getComboCount();

        if(comboCount > 0) {
            GameData.level.comboCount = comboCount;
            comboCount--;
            if(comboCount > 0) {
                this.step = comboCount;
                this.animateDialEffect();
            }
        }

        this.scene.gameController.setComboAnimatedWordCount(GameData.getSolvedWords());
        this.tempComboReward = GameData.getComboReward();
    }



    getComboShakeAmount(comboCount){
        switch (comboCount){
            case 2: return 0.007;
            case 3: return 0.0075;
            case 4: return 0.008;
            case 5: return 0.0085;
            case 6: return 0.009;
            default: return 0.0095;
        }
    }



    showComboFeedback(){
        if(!this.feedback){
            this.feedback = new Feedback(this.scene);
            this.scene.add.existing(this.feedback);
            this.feedback.setDepth(this.scene.preview.depth + 1);
        }else{
            this.feedback.setVisible(true);
            this.feedback.setActive(true);
        }

        this.feedback.show();
    }




    blastSmoke(){
        if(!this.smoke) {
            this.smoke = new Phaser.GameObjects.Image(this.scene, this.scene.dial.x, this.scene.dial.y, "sheet1", "smoke").setScale(0.7);
            this.scene.add.existing(this.smoke);
        }

        this.smoke.setPosition(this.scene.dial.x, this.scene.dial.y);
        this.smoke.scale = 0.5;
        this.smoke.angle = Math.random() * 360;
        this.smoke.alpha = 0.7;
        this.smoke.setActive(true);
        this.smoke.setVisible(true);

        this.scene.tweens.add({
            targets: this.smoke,
            scale: 1.0,
            duration: 350,
            ease: "Cubic.easeOut"
        });

        this.scene.tweens.add({
            targets: this.smoke,
            alpha: 0,
            y: this.smoke.y - 200,
            duration: 900,
            delay: 200,
            callbackScope: this,
            onComplete: function(){
                this.smoke.setActive(false);
                this.smoke.setVisible(false);
            }
        });
    }



    shakeCamera(){
        if(!this.cameraShaker) this.cameraShaker = new Shaker();
        this.cameraShaker.startShaking(GameData.level.comboCount + this.getComboShakeAmount(GameData.level.comboCount) * this.scene.scale.gameSize.width);
    }

}




class Shaker{

    constructor(){
        this.currentPosition = new Phaser.Math.Vector2(0, 0);
    }
    

    init(shakeRadius){
        this.originalX = 0;
        this.originalY = 0;
        this.originalShakeRadius = shakeRadius;
        this.offsetX = 0;
        this.offsetY = 0;
        this.currentPosition.x = 0;
        this.currentPosition.y = 0;
        this.reset();
    }


    reset(){
        this.shakeRadius = this.originalShakeRadius;
        this.isShaking = false;
        this.seedRandomAngle();
        this.currentPosition.x = this.originalX;
        this.currentPosition.y = this.originalY;
    }


    seedRandomAngle(){
        this.randomAngle = Math.random() * 6.283185;
    }


    startShaking(shakeRadius){
        this.init(shakeRadius);
        this.isShaking = true;
    }


    getNewShakePosition(){
        this.computeCameraOffset();
        this.computeCurrentPosition();
        this.diminishShake();
        return this.currentPosition;
    }


    computeCameraOffset(){
        this.offsetX =  Math.cos(this.randomAngle) * this.shakeRadius;
        this.offsetY =  Math.sin(this.randomAngle) * this.shakeRadius;
    }


    computeCurrentPosition(){
        this.currentPosition.x = this.originalX + this.offsetX;
        this.currentPosition.y = this.originalY + this.offsetY;
    }


    diminishShake(){
        if(this.shakeRadius < 2.0){
            this.reset();
            return;
        }

        this.isShaking = true;
        this.shakeRadius *= .9;
        this.randomAngle = Math.random() * 360 + 1;
    }
}


class Feedback extends Phaser.GameObjects.Container{

    constructor(scene){
        super(scene);

        this.leftPatch = 73;
        this.rightPatch = 72;

        this.bg = scene.add.rexNinePatch(0, 0, 277, 121, "sheet1", "feedback_ribbon", [this.leftPatch, 62, this.rightPatch], [89], {
            stretchMode: 0,
            getFrameNameCallback: undefined
        });

        this.add(this.bg);
        this.height = this.bg.height;
        
        this.feedbackTxt = this.scene.add.text(
            0, 
            -25, 
            "", 
            { fontFamily: FONT, fontSize: 44, color:"#fff", fontStyle: "bold" }
        ).setShadow(4, 4, "#8d4168", 2, true, true);
        this.feedbackTxt.setOrigin(0.5);
        this.add(this.feedbackTxt);

        this.feedbackList = Language.strings["feedbacks"].split(",");
        this.reset();
    }


    reset(){
        this.fbIndex = 0;
        Dial.shuffleArr(this.feedbackList);
    }


    getFeedbackText(){
        let temp = this.feedbackList[this.fbIndex];
        this.fbIndex++;
        this.fbIndex %= this.feedbackList.length;
        return temp;
    }


    show(){
        this.feedbackTxt.setText(this.getFeedbackText());
        this.width = this.leftPatch + this.feedbackTxt.width  + this.rightPatch;
        this.bg.resize(this.width, this.bg.height);
        this.feedbackTxt.x = 0;
        this.scale = 0;
        this.x = this.scene.scale.gameSize.width * 0.5;
        this.y = this.scene.preview.y;

        let timeline = this.scene.tweens.createTimeline();

        timeline.add({
            targets: this,
            scale: this.scene.gameScale,
            duration: 500,
            ease: "Back.easeOut",
        });

        timeline.add({
            targets         : this,
            alpha           : 0,
            duration        : 150,
            delay           : 400,
            callbackScope   : this,
            onComplete      : function(){
                this.setVisible(false);
                this.setActive(false);
                this.alpha = 1;
            }
        });

        timeline.play();
    }
}