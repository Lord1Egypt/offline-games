class LevelEnd extends Phaser.GameObjects.Container{

    constructor(scene){
        super(scene);

        this.width =  this.scene.game.config.width;
        this.height = this.scene.game.config.height;

        this.starPool = this.scene.add.group({
            classType: Star,
            runChildUpdate: false
        });
        
        this.animatingRewardStars = [];
    }



    start(){
        if(!this.overlay){
            this.overlay = new Phaser.GameObjects.Graphics(this.scene);
            this.overlay.fillStyle(0x000000, 1);
            this.overlay.fillRect(0, 0, this.width, this.height);
            this.add(this.overlay);
        }

        this.overlay.alpha = 0;
        this.onResize();
        SoundController.playSfx(this.scene, "level_end");
        
        this.scene.tweens.add({
            targets         : this.overlay,
            alpha           : 0.8,
            duration        : 100,
            callbackScope   : this,
            onComplete      : this.setRibbon
        });
    }



    onResize(){
        let flippedVal = 1 / this.scale;
        this.overlay.scaleX = (this.scene.scale.gameSize.width  / this.width  * this.overlay.scaleX) * flippedVal;
        this.overlay.scaleY = (this.scene.scale.gameSize.height / this.height * this.overlay.scaleY) * flippedVal;

        this.overlay.x = -(this.width  * this.overlay.scaleX - this.width)  * 0.5;
        this.overlay.y = -(this.height * this.overlay.scaleY - this.height) * 0.5;

        if(this.progressbar) this.progressbar.positionMask();

        if(this.rewardCoinsArr){
            for(let i = 0; i < this.rewardCoinsArr.length; i++){
                let coin = this.rewardCoinsArr[i];
                this.positionCoin(coin);
            }
        }

    }



    setRibbon(){
        if(!this.ribbon){
            this.ribbon = new Ribbon(this.scene);
            this.ribbon.x = this.width * 0.5;
            this.ribbon.y = this.height * 0.33;
            this.add(this.ribbon);
        }else{
            this.ribbon.scale = this.ribbon.alpha = 1;
        }
        
        this.ribbon.start(this.setComboRewardView, this);
    }



    setComboRewardView(){
        if(!this.box){
            this.box = new Phaser.GameObjects.Container(this.scene);

            this.box_body = new Phaser.GameObjects.Image(this.scene, 0, 0, "sheet1", "box_body");
            this.box_lid = new Phaser.GameObjects.Image(this.scene, 0, 0, "sheet1", "box_lid");

            this.box_body.x = -1;
            
            this.box.width = this.box_lid.width;
            this.box.height = this.box_body.height + this.box_lid.height * 0.5;

            this.box.add(this.box_body);
            this.box.add(this.box_lid);
            this.box.scale = this.box.alpha = 0;
            this.box.x = this.width * 0.5;
            this.box.y = this.height * 0.63;
            this.add(this.box);

            this.progressbar = new Progressbar(this.scene);
            this.progressbar.x = this.width * 0.5;
            this.progressbar.y = this.box.y + this.box.height * 0.4;
            this.add(this.progressbar);
            this.progressbar.init();
            this.progressbar.scale = this.progressbar.alpha = 0;
            
            this.targetStar = new Phaser.GameObjects.Image(this.scene, 0, 0, "sheet1", "star");
            this.targetStar.scale = this.targetStar.alpha = 0;
            this.targetStar.x = this.progressbar.x - 40;
            this.targetStar.y = this.progressbar.y + this.progressbar.height * 0.8;
            this.add(this.targetStar);
    
            this.status = new Phaser.GameObjects.Text(this.scene,
                0, 
                0,
                "",
                {fontFamily: FONT, color: '#ffffff', align: 'left'}
            );

            this.status.setOrigin(0, 0.5);
            this.status.x =  this.targetStar.x + this.targetStar.width * 0.33;
            this.status.y = this.targetStar.y;
            this.status.setFontSize(this.targetStar.height * 0.45);
            this.status.scale = this.status.alpha = 0;
            this.add(this.status);
        }else{
            this.box.setVisible(true);
            this.box.setActive(true);
        }

        this.box_lid.y = -this.box_body.height * 0.5 - 10;

        this.progressbar.setValue(GameData.getAccumulatedComboCount() / wordPressParams.num_combo_required_for_coin_reward);
        this.progressbar.particulate();
        this.status.setText(GameData.getAccumulatedComboCount() + "/" + wordPressParams.num_combo_required_for_coin_reward);
 

        this.scene.tweens.add({
            targets     : [this.progressbar, this.status],
            scale       : 1,
            alpha       : 1,
            duration    : 300,
            ease        : 'Back.easeOut'
        });

        this.scene.tweens.add({
            targets     : this.box,
            scale       : 0.5,
            alpha       : 1,
            duration    : 300,
            ease        : 'Back.easeOut'
        });

        this.targetStarScale = 0.5;

        this.scene.tweens.add({
            targets         : this.targetStar,
            scale           : this.targetStarScale,
            alpha           : 1,
            duration        : 300,
            ease            : 'Back.easeOut',
            completeDelay   : 300,
            callbackScope   : this,
            onComplete      : this.animateComboReward_1
            
        });
    }



    onNextClick(){
        newLevelWillStart(this.scene);
    }




    loadNextScene(){
        this.scene.input.enabled = false;
        SoundController.playSfx(this.scene, "click");

        let content = [this.ribbon, this.btn_next];
        if(this.btn_dict) content.push(this.btn_dict);
        
        this.scene.tweens.add({
            targets     : content,
            scale       : 0,
            alpha       : 0,
            duration    : 300,
            ease        : "Back.easeIn",

        });

        this.scene.tweens.add({
            targets     : [this.progressbar, this.status, this.box, this.targetStar],
            scale       : 0,
            alpha       : 0,
            duration    : 300,
            ease        : 'Back.easeIn',
            delay       : 100
        });

        for(let i = 0; i < this.animatingRewardStars.length; i++){
            let star = this.animatingRewardStars[i];
            star.stopSparkle();
            star.setVisible(false);
            star.setActive(false);
            this.remove(star);
        }

        let items = [this.scene.gameHud.topbar, this.scene.gameHud.btnBack, this.scene.gameHud.btnConfig, this.scene.gameHud.coinMeter];
        if(this.scene.gameHud.fullScreen && this.scene.gameHud.fullScreen.visible) items.push(this.scene.gameHud.fullScreen);
        if(this.scene.gameHud.fullScreenOff && this.scene.gameHud.fullScreenOff.visible) items.push(this.scene.gameHud.fullScreenOff);

        this.scene.tweens.add({
            targets     : items,
            alpha       : 0,
            duration    : 300
        });

        this.scene.tweens.add({
            targets         : this.overlay,
            alpha           : 0,
            duration        : 200,
            delay           : 500,
            ease            : "Sine.easeOut",
            callbackScope   : this,
            onComplete: function(){
                if(this.btn_next.label.text == Language.strings["back"]){
                    this.scene.gameHud.gotoIntroScene();
                }else{
                    this.setVisible(false);
                    this.setActive(false);
                    this.ribbon.stopAnimations();
                    this.scene.gameController.createLevel();
                }
                
            }
        });
    }



    animateComboReward_1(){
        if(this.scene.comboController.tempComboReward == 0){
            this.showNext();
            return;
        }
        
        let speed = this.getStarAnimSpeed(this.scene.comboController.tempComboReward);
        this.animatingRewardStars.length = 0;

        let topbar = this.scene.gameHud.topbar;
        let starX = this.width * 0.5;
        let starY = this.overlay.y + topbar.height * topbar.scaleY * 0.5;
        
        for(let i = 0; i < this.scene.comboController.tempComboReward; i++){
            let star = this.starPool.get();
            star.setVisible(true);
            star.setActive(true);
            star.scale = 0.5;
            
            star.setPosition(starX, starY);
            this.addAt(star, 100);
            this.animatingRewardStars.push(star);

            this.scene.tweens.add({
                targets         : star,
                x               : this.targetStar.x,
                y               : this.targetStar.y,
                duration        : speed,
                ease            : "Sine.easeIn",
                delay           : i * 100,
                callbackScope   : this,
                onStart         : function(){star.startSparkle(this);},
                onComplete      : function(){
                    star.stopSparkle();
                    star.setVisible(false);
                    star.setActive(false);
                    this.remove(star);
                    this.animateTargetStar();
                    this.scene.gameHud.setComboEarned(this.scene.comboController.tempComboReward - i - 1);
                    if(i == this.scene.comboController.tempComboReward - 1) {
                        this.animatingRewardStars.length = 0;
                        this.animateComboReward_2();
                    }
                    SoundController.playSfx(this.scene, "star");
                }
            });
        }


        speed *= this.scene.comboController.tempComboReward;

        this.scene.gameHud.animateSemiCircle(0, function(){});
        this.scene.gameHud.setSolvedComboCount(0, 0);
        GameData.saveSolvedComboCount(0);
    }




    animateTargetStar(){
        let timeline = this.scene.tweens.createTimeline();

        timeline.add({
            targets: this.targetStar,
            scale: this.targetStarScale * 1.1,
            duration: 40,
            ease: "Sine.easeOut"
        });

        timeline.add({
            targets: this.targetStar,
            scale: this.targetStarScale,
            duration: 30,
            ease: "Sine.easeIn"
        });

        timeline.play();
    }




    getStarAnimSpeed(count){
        if(count <= 10) return 600;
        if(count <= 30) return 500;
        if(count <= 50) return 400;
        if(count <= 75) return 300;
        if(count < 100) return 200;

        if(count >= 100) return 100;
        console.warn("no value specified for combo count ", count);
        return 500;
    }



    animateComboReward_2(){
        let targetValue = Math.min(GameData.getAccumulatedComboCount() + this.scene.comboController.tempComboReward, wordPressParams.num_combo_required_for_coin_reward);

        this.scene.tweens.addCounter({
            from            : GameData.getAccumulatedComboCount(),
            to              : targetValue,
            duration        : 50 * this.scene.comboController.tempComboReward,
            callbackScope   : this,
            onUpdate        : function (tween, progress) {
                let newText = Math.floor(progress.value) + "/" + wordPressParams.num_combo_required_for_coin_reward;
                if(this.status.text != newText) this.status.setText(newText);

                let percent = (progress.value / wordPressParams.num_combo_required_for_coin_reward);
                this.progressbar.setValue(Math.min(percent, 1));
            },
            onComplete      : function(){            
                if(targetValue >= wordPressParams.num_combo_required_for_coin_reward){
                    GameData.saveAccumulatedComboCount(0);
                    this.animateBox_1();
                }else{
                    GameData.saveAccumulatedComboCount(targetValue);
                    this.showNext();
                }
            }
        });
    }




    showNext(){
        if(!this.btn_next){
            this.btn_next = new SpriteTextButton(this.scene, 0, 0, "sheet1", "btn_gen_up", "btn_gen_down", Language.strings["next_level"]);
            
            this.btn_next.x = this.progressbar.x;
            
            this.btn_next.scale = this.btn_next.alpha = 0;
            this.btn_next.setCallback(this.onNextClick, this);
            this.add(this.btn_next);

            if(Language.getCode() == "en" && wordPressParams.wordnik_api_key.trim().length > 0){
                this.btn_dict = new SpriteButton(this.scene, 0, 0, "sheet1", "btn_dictionary_up", "btn_dictionary_down");
                this.add(this.btn_dict);
                this.btn_dict.x = this.width * 0.5;
                this.btn_dict.y = this.height * 0.92;
                this.btn_dict.setCallback(this.scene.gameHud.openDictionaryDialog, this.scene.gameHud);
                this.btn_dict.scale = this.btn_dict.alpha = 0;

                this.btn_next.y = this.height * 0.8;
            }else{
                this.btn_next.y = this.height * 0.85;
            }
        }

        this.checkEndOfAllLevels();

        let content = [];
        content.push(this.btn_next);
        if(this.btn_dict) content.push(this.btn_dict);

        this.scene.tweens.add({
            targets         : content,
            scale           : 1,
            alpha           : 1,
            duration        : 300,
            ease            : 'Sine.easeOut',
            callbackScope   : this,
            onComplete      : function(){
                this.scene.gameController.scene.input.enabled = true;
            }
        });
    }




    checkEndOfAllLevels(){
        if(GameData.level.index >= Language.locale.levelCount) this.btn_next.setLabelText(Language.strings["back"]);
    }




    animateBox_1(){
        this.scene.tweens.add({
            targets         : [this.progressbar, this.status, this.targetStar, this.ribbon],
            alpha           : 0,
            duration        : 300,
            ease            : "Sine.easeOut",
            callbackScope   : this,
            onComplete      : this.animateBox_2
        });
    }



    animateBox_2(){
        this.scene.tweens.add({
            targets     : this.box,
            y           : this.box.y - 100,
            duration    : 1000,
            ease        : "Sine.easeOut"
        });

        let counter = 0;
        let flag = true;

        let tweenObject = { val: 0 }
        this.scene.tweens.add({
            targets         : tweenObject,
            val             : 1,
            duration        : 1000,
            callbackScope   : this,
            onUpdate        : function(tween, target){
                if(counter % 2 == 0){
                    this.box.scale += flag ? 0.04 : -0.03;
                    flag = !flag;
                }
               counter++;

            },
            onComplete      : this.animateBox_3
        });
    }




    animateBox_3(){
        SoundController.playSfx(this.scene, "gift");
        this.scene.tweens.add({
            targets     : this.box_lid,
            y           : -this.height,
            duration    : 200,
            ease        : "Ease.SineIn",
            callbackScope:this,
            onComplete:this.animateBox_4
        });

        this.scene.tweens.add({
            targets         : this.box,
            y               : this.box.y + 100,
            duration        : 300,
            ease            : "Bounce.easeOut",
        });

        let timeline = this.scene.tweens.createTimeline();

        timeline.add({
            targets     : this.box_body,
            scale       : 1.3,
            duration    : 50,
        });

        timeline.add({
            targets     : this.box_body,
            scale       : 1,
            duration    : 50,
        });

        timeline.play();
    }



    animateBox_4(){
        if(!this.box_light){
            this.box_light = new Phaser.GameObjects.Image(this.scene, 0, 0, "sheet1", "box_light");
            this.box_light.y =  this.box_body.y - (this.box_body.height + this.box_light.height) * 0.5 
            this.box.add(this.box_light);
        }else{
            this.box_light.setVisible(true);
            this.box_light.setActive(true);
        }

        this.box_light.alpha = 0;

        this.scene.tweens.add({
            targets         : this.box_light,
            alpha           : 1,
            duration        : 200,
            ease            : "Sine.easeIn",
            callbackScope   : this,
            onComplete      : this.animateBox_5()
        });
    }



    resetCoin(coin){
        coin.alpha  = 0;
        this.positionCoin(coin)
    }

    positionCoin(coin){
        coin.scale  = this.scene.gameScale * 0.7;
        coin.x      = this.scene.scale.gameSize.width * 0.5;
        coin.y      = this.scene.scale.gameSize.height * 0.5;
    }



    animateBox_5(){
        if(!this.rewardCoinsArr) {
            this.rewardCoinsArr = [];

            for(let i = 0; i < 10; i++){
                let coin = new Phaser.GameObjects.Image(this.scene, 0, 0, "sheet1", "coin");
                this.resetCoin(coin);
                this.scene.add.existing(coin);
                coin.setDepth(this.scene.gameHud.coinMeter.depth + 10);
                this.rewardCoinsArr.push(coin);
            }
        }else{
            for(let i = 0; i < 10; i++){
                let coin = this.rewardCoinsArr[i];
                this.resetCoin(coin);
                coin.setVisible(true);
                coin.setActive(true);   
            }
        }
        
        if(!this.plus){
            this.plus = new Phaser.GameObjects.Text(this.scene,
                this.box.x, 
                this.box.y + this.box.height * 0.5,
                "+" + wordPressParams.num_coins_awarded_for_combo,
                {fontFamily: FONT, fontSize: 40, color: '#ffffff', align: 'center'}
            ).setOrigin(0.5, 0.0);

            this.add(this.plus);

            this.tap = new Phaser.GameObjects.Text(this.scene,
                this.box.x, 
                this.height * 0.75,
                Language.strings["tap_to_collect"],
                {fontFamily: FONT, fontSize: 50, color: '#ffffff', align: 'center'}
            ).setOrigin(0.5, 0.0);

            this.add(this.tap);
        }else{
            this.plus.setVisible(true);
            this.plus.setActive(true);
            this.tap.setVisible(true);
            this.tap.setActive(true);
        }

        this.tap.alpha = 0;
        this.plus.alpha = 0;

        this.scene.tweens.add({
            targets         : [this.plus, this.tap],
            alpha           : 1,
            duration        : 300,
            ease            : "Sine.easeOut",
            
        });

        let timeline = this.scene.tweens.createTimeline();

        timeline.add({
            targets         : this.rewardCoinsArr,
            alpha           : 1,
            y               : this.rewardCoinsArr[0].y - 100,
            duration        : 500,
            ease            : "Sine.easeOut"
        });

        timeline.add({
            targets         : this.rewardCoinsArr,
            y               : this.rewardCoinsArr[0].y - 50,
            scale           : this.scene.gameScale,
            duration        : 500,
            ease            : "Sine.easeOut",
            callbackScope   : this,
            onComplete      : this.animateBox_6
        });

        timeline.play();
    }



    animateBox_6(){
        this.scene.gameController.scene.input.enabled = true;
        this.scene.input.on("pointerup", this.tapToCollect, this);

        if(!this.roundParticles){
            let shape1 = new Phaser.Geom.Rectangle(-this.box_body.width * 0.5 + 30, -this.box_body.height * 0.5, this.box_body.width * 0.7, this.box_body.height * 0.5);

            this.roundParticles = this.scene.add.particles('sheet1');
            this.box.addAt(this.roundParticles, 0);
    
            this.roundedStaremitter = this.roundParticles.createEmitter({
                frame       : "star_white",
                alpha       : { start: 1, end: 0 },
                lifespan    : { start: 2000, end: 3000, steps: 250 },
                scale       : { min: 0.3, max: 1 },
                speedY      : { min: -75, max: -150 },
                blendMode   : 'SCREEN',
                quantity    : 1,
                frequency   : 500,
                emitZone    : { type: 'random', source: shape1, quantity:10}
            });

        }else{
            this.roundedStaremitter.setVisible(true);
            this.roundedStaremitter.start();
        }
    }




    tapToCollect(){
        this.scene.gameController.scene.input.enabled = false;
        this.scene.input.off("pointerup", this.tapToCollect, this);
        
        this.scene.tweens.add({
            targets         : this.tap,
            alpha           : 0,
            duration        : 300,
            callbackScope   : this,
            onComplete      : function(){
                this.tap.setVisible(false);
                this.tap.setActive(false);
            } 
        });
   
        this.coinStartPoint = new Phaser.Math.Vector2(this.rewardCoinsArr[0].x, this.rewardCoinsArr[0].y);
       
        let global = this.scene.gameHud.coinMeter.coin.getWorldTransformMatrix();
        this.coinEndPoint = new Phaser.Math.Vector2(global.tx, global.ty - this.scene.gameHud.coinMeter.coin.displayHeight * 0.05);

        
        let targetScale =  (this.scene.gameHud.coinMeter.coin.width * 0.8) / this.rewardCoinsArr[0].width * this.rewardCoinsArr[0].scale;
        
        let counter = 0;

        for(let i = this.rewardCoinsArr.length - 1; i >= 0; i--){
            let coin = this.rewardCoinsArr[i];
            
            coin.controlPoint1 = new Phaser.Math.Vector2();
            coin.controlPoint2 = new Phaser.Math.Vector2();

            coin.controlPoint1.x = this.coinStartPoint.x - (Math.random() * this.width * 0.5);
            coin.controlPoint1.y = this.coinStartPoint.y + (Math.random() * this.width * 0.5);

            coin.controlPoint2.x = this.coinStartPoint.x + (this.coinEndPoint.x - this.coinStartPoint.x) * 0.5;
            coin.controlPoint2.y = this.coinStartPoint.y + (this.coinEndPoint.y - this.coinStartPoint.y) * 0.5;
 
            coin.bezierCurve  = new Phaser.Curves.CubicBezier(this.coinStartPoint, coin.controlPoint1, coin.controlPoint2, this.coinEndPoint);

            let tweenObject = {val: 0}
            this.scene.tweens.add({
                targets         : tweenObject,
                val             : 1,
                duration        : Phaser.Math.Between(900, 1200),
                ease            : "Sine.easeIn",
                callbackScope   : this,
                onUpdate        : function(tween, target){
                    let position = coin.bezierCurve.getPoint(target.val);
                    coin.setPosition(position.x, position.y);
                    coin.setScale(Phaser.Math.Linear(coin.scale, targetScale, target.val));
                },
                onComplete      : function(tween){
                    if(counter == 0) this.scene.gameHud.coinMeter.particulate();
                    else if(counter == this.rewardCoinsArr.length - 1) this.animateBox_7();
                    counter++;
                }
            });
        }
        SoundController.playSfx(this.scene, "coins_given");
    }



    animateBox_7(){
        this.scene.gameHud.coinMeter.stopParticles();

        for(let i = 0; i < this.rewardCoinsArr.length; i++){
            let coin = this.rewardCoinsArr[i];
            coin.setVisible(false);
            coin.setActive(false);
        }

        let targetValue = this.scene.hintController.getRemainingCoins() + wordPressParams.num_coins_awarded_for_combo;

        this.scene.tweens.addCounter({
            from            : this.scene.hintController.getRemainingCoins(),
            to              : targetValue,
            duration        : 1000,
            callbackScope   : this,
            onUpdate        : function (tween, progress) {
                let newCount = Math.floor(progress.value);
                if(newCount != this.scene.gameHud.coinMeter.count){
                    this.scene.gameHud.coinMeter.setCount(newCount);
                }
            },
            onComplete      : function(){
                this.scene.hintController.setCoinCount(targetValue);
                this.animateBox_8();
                earnedLevelMileStoneReward(this.scene, wordPressParams.num_coins_awarded_for_combo, this.scene.hintController.getRemainingCoins());
            }
        });
    }



    animateBox_8(){
        this.roundedStaremitter.stop();
        this.roundedStaremitter.setVisible(false);

        this.scene.tweens.add({
            targets: [this.box, this.plus],
            alpha: 0,
            duration: 300,
            ease: "Sine.easeOut",
            callbackScope: this,
            onComplete: function(){
                this.box.setVisible(false);
                this.box.setActive(false);
                this.box_light.setVisible(false);
                this.box_light.setActive(false);
                this.plus.setVisible(false);
                this.plus.setActive(false);
            }
        });

        this.showNext();
    }

}


////////////////////////////
class Star extends Phaser.GameObjects.Image{

    constructor(scene){
        super(scene, 0, 0, "sheet1", "star");
    }



    startSparkle(container){
        if(!this.particles){
            this.particles = this.scene.add.particles('sheet1');
            container.add(this.particles);

            this.emitter = this.particles.createEmitter({
                frame: 'star_small',
                speed: 50,
                quantity: 1,
                frequency: 50
            });
        
            this.emitter.startFollow(this);
        }else{
            this.emitter.setVisible(true);
            this.emitter.start();
        }
        
    }



    stopSparkle(){
        if(this.emitter) {
            this.emitter.stop();
            this.emitter.setVisible(false);
        }
    }

}



class Ribbon extends Phaser.GameObjects.Container{

    constructor(scene){
        super(scene);
    }



    start(completeCallback, callbackContext){
  
        this.completeCallback = completeCallback;
        this.callbackContext = callbackContext;

        if(!this.rays_1){
            this.rays_1 = new Phaser.GameObjects.Image(this.scene, 0, 0, "sheet1", "ribbon_rays");
            this.rays_1.rotation = Phaser.Math.Between(0, 360);
            this.add(this.rays_1);
    
            
            this.width = this.rays_1.width;
            this.height = this.width;
    
            this.rays_2 = new Phaser.GameObjects.Image(this.scene, 0, 0, "sheet1", "ribbon_rays");
            this.rays_2.rotation = Phaser.Math.Between(0, 360);
            this.add(this.rays_2);
    
    
            this.rays_3 = new Phaser.GameObjects.Image(this.scene, 0, 0, "sheet1", "ribbon_rays");
            this.rays_3.rotation = Phaser.Math.Between(0, 360);
            this.add(this.rays_3);
    
            this.setLeaves();
    
            this.rainbow = new Phaser.GameObjects.Image(this.scene, 0, 0, "sheet1", "rainbow"); 
            this.rainbow.setOrigin(0.5, 1);
            this.rainbow.y = this.rainbow.height * 0.08;
            this.add(this.rainbow);
    
            
            this.ribbon_red = new Phaser.GameObjects.Image(this.scene, 0, 0, "sheet1", "ribbon_red");
            this.ribbon_red.y = this.ribbon_red.height * this.ribbon_red.scaleY * 0.5 ;
            this.add(this.ribbon_red);
    
            
            this.well_done = new Phaser.GameObjects.Image(this.scene, 0, 0, "well_done_" + Language.getCode());
            this.well_done.y = this.ribbon_red.y - 30;
            this.well_done.scale = 0;
            this.add(this.well_done);
    
            this.setStars();
        }

        this.reset();
        
        this.appear_1();
    }




    reset(){
        this.rays_1.scale = 0;
        this.rays_2.scale = 0;
        this.rays_3.scale = 0;
        this.rainbow.scale = 0;
        this.ribbon_red.scale = 0;
        this.well_done.scale = 0;
        this.leaf_1.setVisible(false);
        this.leaf_2.setVisible(false);
        this.star_1.setScale(0);
        this.star_2.setScale(0);
        this.star_3.setScale(0);
    }




    stopAnimations(){
        if(this.rays_1){
            if(this.rays_1.tween1) this.rays_1.tween1.stop();
        }

        if(this.rays_2){
            if(this.rays_2.tween1) this.rays_2.tween1.stop();
            if(this.rays_2.tween2) this.rays_2.tween2.stop();
        }

        if(this.rays_3){
            if(this.rays_3.tween1) this.rays_3.tween1.stop();
            if(this.rays_3.tween2) this.rays_3.tween2.stop();
        }


        if(this.emitter) {
            this.emitter.active = false;
            this.emitter.setVisible(false);
        }

        if(this.sparkleEmitter){
            this.sparkleEmitter.active = false;
            this.sparkleEmitter.setVisible(false);
        }

        if(this.well_done && this.well_done.tween) this.well_done.tween.stop();
        if(this.rainbow && this.rainbow.tween) this.rainbow.tween.stop();
        if(this.ribbon_red && this.ribbon_red.tween) this.ribbon_red.tween.stop();
        if(this.star_1 && this.star_1.tween) this.star_1.tween.stop();
        if(this.star_2 && this.star_2.tween) this.star_2.tween.stop();
        if(this.star_3 && this.star_3.tween) this.star_3.tween.stop();
        if(this.leaf_2 && this.leaf_2.tween) this.leaf_2.tween.stop(); 
        if(this.leaf_1 && this.leaf_1.tween) this.leaf_1.tween.stop();
    }



    appear_1(){
        this.setParticles();

        let a = this.scene.tweens.add({
            targets: [this.rays_1, this.rays_2, this.rays_3],
            scale: 1,
            duration: 300,
            ease: 'Sine.easeOut',
            callbackScope: this,
            onComplete:function(){
                this.animateRay_1(this.rays_2);
                this.animateRay_1(this.rays_3);
            }
        });

        this.rays_1.tween1 = a;
        this.rays_2.tween1 = a;
        this.rays_3.tween1 = a;

        let b = this.scene.tweens.add({
            targets: [this.ribbon_red, this.rainbow],
            scale: 1.1,
            duration: 300,
            ease: 'Sine.easeOut',
            callbackScope: this,
            onComplete: function(){
                let c = this.scene.tweens.add({targets:[this.ribbon_red, this.rainbow], scale:1, duration:100});
                this.ribbon_red.tween = c;
                this.rainbow.tween = c;
                this.appear_2();
            }
        });

       this.ribbon_red.tween = b;
       this.rainbow.tween = b;
    }




    appear_2(){
        this.well_done.tween = this.scene.tweens.add({
            targets         : this.well_done,
            scale           : 1.1,
            duration        : 100,
            callbackScope   : this,
            onComplete      : function(){
                this.well_done.tween = this.scene.tweens.add({targets:this.well_done, scale:1, duration:50});
            }
        });

        this.leaf_1.setVisible(true);
        this.leaf_1.tween = this.scene.tweens.add({
            targets         : this.leaf_1,
            x               : 90 + 5,
            y               : 35 - 5,
            duration        : 300,
            ease            : 'Sine.easeOut',
            callbackScope   : this,
            onComplete      : function() {
                this.leaf_1.tween = this.scene.tweens.add({targets:this.leaf_1, x:90, y:35, duration:100, ease: 'Sine.easeIn'});
            }
        });

        this.leaf_2.setVisible(true);
        this.leaf_2.tween = this.scene.tweens.add({
            targets: this.leaf_2,
            x               : -90 - 5,
            y               :  35 - 5,
            duration        : 300,
            ease            : 'Sine.easeOut',
            callbackScope   : this,
            onComplete      : function() {
                this.leaf_2.tween = this.scene.tweens.add({targets:this.leaf_2, x:-90, y:35, duration:100, ease: 'Sine.easeIn'});
            }
        });

        let both = this.scene.tweens.add({
            targets     : [this.star_2, this.star_3],
            scale       : .7,
            duration    : 300,
            ease        : 'Back.easeOut'
        });

        this.star_2.tween = both;
        this.star_3.tween = both;

        this.star_1.tween = this.scene.tweens.add({
            targets         : this.star_1,
            scale           : 0.9,
            duration        : 300,
            ease            : 'Back.easeOut',
            callbackScope   : this,
            onComplete      : function() {
                this.animateRedRibbon();
                this.animateRainbow();
                this.animateText();
                this.setSparkles();
                this.animateLeaves();
                this.animateStars();
            }
        });

        this.completeCallback.call(this.callbackContext);
    }



    setParticles(){
        if(!this.shape1){
            this.shape1 = new Phaser.Geom.Rectangle(-this.width * 0.5, -this.height * 0.5, this.width, this.height);
            this.particles = this.scene.add.particles('sheet1');
            this.add(this.particles);
    
            this.emitter = this.particles.createEmitter({
                frame       : ["flare_blue", "flare_green", "flare_yellow"],
                lifespan    : 1000,
                alpha       : { start: 1, end: 0 },
                speedY      : { min: -20, max: -80 },
                scale       : 0.3,
                blendMode   : 'ADD',
                quantity    : 1,
                frequency   : 100,
                emitZone    : { type: 'random', source: this.shape1, quantity:10}
            });
        }else{
            this.emitter.active = true;
            this.emitter.setVisible(true);
        }
    }



    setLeaves(){
        if(!this.leaf_1){
            this.leaf_1 = new Phaser.GameObjects.Image(this.scene, 0, 0, "sheet1", "grass").setOrigin(0, 1);
            this.leaf_1.x = 90 - 70;
            this.leaf_1.y = 35 + 70;
            this.add(this.leaf_1);
    
            this.leaf_2 = new Phaser.GameObjects.Image(this.scene, 0, 0, "sheet1", "grass").setOrigin(0, 1);
            this.leaf_2.scaleX = -1;
            this.leaf_2.x = -90 + 70;
            this.leaf_2.y =  35 + 70;
            this.add(this.leaf_2);
        }
    }



    animateLeaves(){
        this.leaf_1.tween = this.scene.tweens.add({
            targets     : this.leaf_1,
            angle       : "+=3",
            duration    : 800,
            yoyo        : true,
            repeat      : -1
        });

        this.leaf_2.tween = this.scene.tweens.add({
            targets     : this.leaf_2,
            angle       : "-=3",
            duration    : 800,
            yoyo        : true,
            repeat      : -1
        });
    }
    




    setStars(){
        if(!this.star_1){
            let radius = this.rainbow.height;

            this.star_1 = new Phaser.GameObjects.Image(this.scene, 0, 0, "sheet1", "star");
            this.star_1.angle = -55;
            let radians = Phaser.Math.DegToRad(this.star_1.angle)
            this.star_1.x = Math.cos(radians) * radius;
            this.star_1.y = Math.sin(radians) * radius;
            this.add(this.star_1);
    
            this.star_2 = new Phaser.GameObjects.Image(this.scene, 0, 0, "sheet1", "star").setScale(0.7);
            this.star_2.angle = -140;
            radians = Phaser.Math.DegToRad(this.star_2.angle);
            this.star_2.x = Math.cos(radians) * (radius + 27);
            this.star_2.y = Math.sin(radians) * (radius + 27);
            this.add(this.star_2);
    
            this.star_3 = new Phaser.GameObjects.Image(this.scene, 0, 0, "sheet1", "star").setScale(0.7);
            this.star_3.angle = -25;
            radians = Phaser.Math.DegToRad(this.star_3.angle);
            radius += 27;
            this.star_3.x = Math.cos(radians) * radius;
            this.star_3.y = Math.sin(radians) * radius;
            this.add(this.star_3);
        }
        
    }



    animateStars(){
        let both = this.scene.tweens.add({
            targets       : [this.star_2, this.star_3],
            scale         : "-=0.1",
            duration      : 500,
            yoyo          : true,
            repeat        : -1
        });

        this.star_2.tween = this.star_3.tween = both;

        this.star_1.tween = this.scene.tweens.add({
            targets       : this.star_1,
            scale         : 1,
            duration      : 500,
            yoyo          : true,
            repeat        : -1
        });
    }



    setSparkles(){
        if(!this.sparkleEmitter){
            let shape1 = new Phaser.Geom.Circle(0, 0, 150);
        
            let particles = this.scene.add.particles('sheet1');
            this.add(particles);
    
            this.sparkleEmitter = particles.createEmitter({
                frame       : 'sparkle',
                lifespan    : 1000,
                quantity    : 1,
                frequency   : 300,
                alpha       : { start: 1, end: 0 },
                blendMode   : 'ADD',
                emitZone    : { type: 'random', source: shape1, yoyo: true }
            });
        }else{
            this.sparkleEmitter.active = true;
            this.sparkleEmitter.setVisible(true);
        }   
    }



                 
    animateRay_1(ray){
        ray.tween1 = this.scene.tweens.add({
            targets       : ray,
            alpha         : 0.0,
            duration      : Phaser.Math.Between(700, 1500),
            callbackScope : this
        });

        ray.tween1.setCallback('onComplete', this.animateRay_2, [ray], this);
    }





    animateRay_2(ray){
        ray.angle = Phaser.Math.Between(0, 360);

        ray.tween2 = this.scene.tweens.add({
            targets       : ray,
            alpha         : 1.0,
            duration      : Phaser.Math.Between(700, 1500),
            callbackScope : this
        });
        
        ray.tween2.setCallback('onComplete', this.animateRay_1, [ray], this);
    }




    animateRedRibbon(){
        this.ribbon_red.tween = this.scene.tweens.add({
            targets  : this.ribbon_red,
            scaleX   : 0.98,
            duration : 1000,
            ease     : 'Sine.easeInOut',
            yoyo     : true,
            repeat   : -1
        });
    }


    animateRainbow(){
        this.rainbow.tween = this.scene.tweens.add({
            targets  : this.rainbow,
            scaleY   : 1.04,
            duration : 1000,
            ease     : 'Sine.easeInOut',
            yoyo     : true,
            repeat   : -1
        });
    }


    
    animateText(){
        this.well_done.tween = this.scene.tweens.add({
            targets  : this.well_done,
            scale    : 0.99,
            duration : 1000,
            ease     : 'Sine.easeInOut',
            yoyo     : true,
            repeat   : -1,
            delay    : 1000
        });
    }

}




