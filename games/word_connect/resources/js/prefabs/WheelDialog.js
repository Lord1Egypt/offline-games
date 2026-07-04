class WheelDialog extends Dialog{

    constructor(scene){
        super(scene);

        this.spin = new SpriteTextButton(this.scene, 0, 0, "sheet1", "btn_gen_up", "btn_gen_down", Language.strings["spin"]);
        this.spin.setCallback(this.spinWheel, this);
        this.updateSize();
        this.add(this.spin);
    }



    createContentBox(){
        this.content = new Wheel(this.scene, this.spinFinished, this);
        this.content.setScale(this.scene.gameScale);
        this.add(this.content);
    }




    scaleAndPositionSpinButton(){
        if(this.spin){
            this.spin.setScale(this.scene.gameScale);
            this.spin.setPosition(this.width * 0.5, this.height * 0.8);
        }
    }



    updateSize(){
        super.updateSize();
        this.scaleAndPositionSpinButton();
        this.positionRewardBg();
        this.positionCoins();
        this.positionQuantityLabel();
        this.positionTap();
        this.positionDismiss();
    }




    spinWheel(){
        this.spin.enabled = false;
        SoundController.playSfx(this.scene, "click");
        GameData.saveLastSpinTime();

        let mobile = window.mobileAndTabletCheck();
        let full = (mobile && wordPressParams.auto_full_screen_mobile) || (!mobile && wordPressParams.auto_full_screen_desktop);
        if(wordPressParams.enable_full_screen_button && full && !this.scene.scale.isFullscreen) this.scene.introHud.goFullScreen();
        
        this.scene.tweens.add({
            targets       : this.spin,
            alpha         : 0,
            duration      : 300,
            ease          : "Sine.easeIn",
            callbackScope : this,
            onComplete    : function(){
                this.spin.setVisible(false);
                this.spin.setActive(false);
            }
        });

        this.content.spin();        
    }




    update(time, delta){
        if(this.content) this.content.update(time, delta);
    }

    


    spinFinished(){
        this.rewardBg = new Phaser.GameObjects.Image(this.scene, 0, 0, "sheet1", "reward_amount").setOrigin(0.5).setScale(0);
        this.positionRewardBg();
        this.add(this.rewardBg);

        this.rewardCoinsArr = [];

        for(let i = 0; i < 5; i++){
            let icon = new Phaser.GameObjects.Image(this.scene, 0, 0, "sheet1", "wheel_coin_ic").setScale(0).setOrigin(0.5);
            icon.visible = i < 1;
            if(i == 0) icon.setScale(0);
            else icon.setScale(this.scene.gameScale);
            this.scene.add.existing(icon);
            icon.setDepth(100);
            this.rewardCoinsArr.push(icon);
        }
        
        this.positionCoins();

        this.quantityLabel = new Phaser.GameObjects.Text(this.scene,
            0, 
            0,
            this.content.selectedReward.quantity,
            {fontFamily: FONT, fontSize: 36, color: '#4d4d4d', align: 'center'}
        ).setOrigin(0.5).setScale(this.scene.gameScale);
        this.positionQuantityLabel();
        
        if(this.quantityLabel.displayWidth > this.rewardBg.width * this.scene.gameScale * 0.7) this.quantityLabel.setScale((this.rewardBg.width * this.scene.gameScale * 0.7) / this.quantityLabel.width);
        let quantityScale = this.quantityLabel.scale;
        this.quantityLabel.setScale(0);
        this.add(this.quantityLabel);
        
        this.tap = new Phaser.GameObjects.Text(this.scene,
            0, 
            0,
            Language.strings["tap_to_collect"],
            {fontFamily: FONT, fontSize: 38, color: '#ffffff', align: 'center'}
        ).setOrigin(0.5).setScale(this.scene.gameScale);
        this.positionTap();
        
        let tapScale = this.tap.scale;
        this.tap.scale = 0;
        this.add(this.tap);

        let disappearTime = 300;
        this.scene.tweens.add({
            targets     : this.content,
            alpha       : 0,
            duration    : disappearTime
        });

        this.scene.tweens.add({
            targets     : this.tap,
            scale       : tapScale,
            duration    : 500,
            ease        : "Back.easeOut",
            delay       : disappearTime
        });
        
        this.scene.tweens.add({
            targets     : this.rewardCoinsArr[0],
            scale       : this.scene.gameScale,
            duration    : 500,
            ease        : "Back.easeOut",
            delay       : disappearTime + 100
        });
        
        this.scene.tweens.add({
            targets     : this.rewardBg,
            scale       : this.scene.gameScale,
            duration    : 500,
            ease        : "Back.easeOut",
            delay       : disappearTime + 200
        });
        
        this.scene.tweens.add({
            targets         : this.quantityLabel,
            scale           : quantityScale,
            duration        : 500,
            ease            : "Back.easeOut",
            delay           : disappearTime + 200,
            callbackScope   : this,
            onComplete      : this.particulate
        });
        SoundController.playSfx(this.scene, "daily_reward");
    }



    positionRewardBg(){
        if(this.rewardBg){
            this.rewardBg.x = this.content.x;
            this.rewardBg.y = this.displayHeight * 0.5;  
            if(this.rewardBg.scale > 0) this.rewardBg.scale = this.scene.gameScale; 
        }
    }



    positionCoins(){
        if(!this.rewardCoinsArr) return;
        for(let i = 0; i < 5; i++){
            let icon = this.rewardCoinsArr[i];
            icon.x = this.scene.scale.gameSize.width * 0.5;
            icon.y = this.scene.scale.gameSize.height * 0.25;
            if(icon.scale > 0) icon .scale = this.scene.gameScale;
        }
    }


    positionQuantityLabel(){
        if(this.quantityLabel){
            this.quantityLabel.x = this.rewardBg.x;
            this.quantityLabel.y = this.rewardBg.y;
            if(this.quantityLabel.scale > 0) this.quantityLabel.scale = this.scene.gameScale;
        }
    }


    positionTap(){
        if(this.tap){
            this.tap.x = this.rewardBg.x;
            this.tap.y = this.displayHeight * 0.07;
            if(this.tap.displayWidth > this.displayWidth * 0.8) this.tap.setScale((this.displayWidth * 0.8) / this.tap.width);
            if(this.tap.scale > 0) this.tap.scale = this.scene.gameScale;
        }
    }



    particulate(){
        this.scene.input.enabled = true;
        this.on('pointerup', this.onTap, this)

        var particles = this.scene.add.particles('sheet1');
        this.addAt(particles, 1);
    
        this.emitter = particles.createEmitter({
            frame: [ 'flare_yellow', 'flare_green', 'flare_blue', 'flare_red' ],
            x: this.rewardCoinsArr[0].x,
            y: this.rewardCoinsArr[0].y,
            scale: 0.7 * this.scene.gameScale,
            speed: window.innerHeight > window.innerWidth ? 500 : 200,
            lifespan: 5000,
            blendMode: 'ADD'
        });        

        this.emitter.onParticleDeath(function (particle) {
            this.emitter.setScale(0.7 * this.scene.gameScale);
            this.emitter.setSpeed(window.innerHeight > window.innerWidth ? 500 : 200);
            this.emitter.setPosition(this.rewardCoinsArr[0].x, this.rewardCoinsArr[0].y);
        }, this);
    }



    onTap(){
        this.scene.input.enabled = false;
        this.emitter.stop();

        if(this.dismiss){
            this.close();
            return;
        }

        this.scene.tweens.add({
            targets     : this.tap,
            scale       : 0,
            duration    : 500,
            ease        : "Back.easeIn"
        });

        this.scene.tweens.add({
            targets         : this.quantityLabel,
            scale           : 0,
            duration        : 500,
            ease            : "Back.easeIn",
            delay           : 100
        });

        this.scene.tweens.add({
            targets       : this.rewardBg,
            scale         : 0,
            duration      : 500,
            ease          : "Back.easeIn",
            delay         : 100,
            callbackScope : this,
            onComplete    : this.animateReward_1
        });
    }




    animateReward_1(){
        this.scene.introHud.coinMeter.setDepth(this.depth + 1);

        let coinStartPoint = new Phaser.Math.Vector2(this.rewardCoinsArr[0].x, this.rewardCoinsArr[0].y);
        let global = this.scene.introHud.coinMeter.coin.getWorldTransformMatrix();
        let coinEndPoint = new Phaser.Math.Vector2(global.tx, global.ty - this.scene.introHud.coinMeter.coin.displayHeight * 0.05);

        let counter = 0;
        let targetScale = (this.scene.introHud.coinMeter.coin.width * 0.8) / this.rewardCoinsArr[0].width * this.rewardCoinsArr[0].scale;

        for(let i = this.rewardCoinsArr.length - 1; i >= 0; i--){
            let coin = this.rewardCoinsArr[i];
            
            let controlPoint1 = new Phaser.Math.Vector2();
            let controlPoint2 = new Phaser.Math.Vector2();

            controlPoint1.x = coinStartPoint.x - (Math.random() * this.width * 0.5);
            controlPoint1.y = coinStartPoint.y + (Math.random() * this.width * 0.5);

            controlPoint2.x = coinStartPoint.x + (coinEndPoint.x - coinStartPoint.x) * 0.5;
            controlPoint2.y = coinStartPoint.y + (coinEndPoint.y - coinStartPoint.y) * 0.5;
 
            let bezierCurve  = new Phaser.Curves.CubicBezier(coinStartPoint, controlPoint1, controlPoint2, coinEndPoint);

            coin.visible = true;
            let tweenObject = { val: 0 }
            this.scene.tweens.add({
                targets         : tweenObject,
                val             : 1,
                duration        : Phaser.Math.Between(900, 1500),
                ease            : "Sine.easeIn",
                callbackScope   : this,
                onUpdate        : function(tween, target){
                    let position = bezierCurve.getPoint(target.val);
                    coin.setPosition(position.x, position.y);
                    coin.setScale(Phaser.Math.Linear(coin.scale, targetScale, target.val));
                },
                onComplete      : function(){
                    if(i == 0) this.animateReward_2();
                    if(counter == 0) this.scene.introHud.coinMeter.particulate();
                    else if(counter == this.rewardCoinsArr.length - 1) this.scene.introHud.coinMeter.stopParticles();
                    counter++;
                }
            });

            SoundController.playSfx(this.scene, "coins_given");
        }
    }



    animateReward_2(){
        for(let i = 0; i < this.rewardCoinsArr.length; i++){
            let coin = this.rewardCoinsArr[i];
            coin.setVisible(false);
            coin.setActive(false);
            coin.destroy();
        }

        let targetValue = this.scene.hintController.getRemainingCoins() + this.content.selectedReward.quantity;

        this.scene.tweens.addCounter({
            from            : this.scene.hintController.getRemainingCoins(),
            to              : targetValue,
            duration        : 1000,
            callbackScope   : this,
            onUpdate        : function (tween, progress) {
                let newCount = Math.floor(progress.value);
                if(newCount != this.scene.introHud.coinMeter.count){
                    this.scene.introHud.coinMeter.setCount(newCount);
                }
            },
            onComplete      : function(){
                this.scene.hintController.setCoinCount(targetValue);
                earnedDailyReward(this.scene, this.content.selectedReward.quantity, targetValue);
                this.animateReward_3();
            }
        });
    }



    animateReward_3(){ 
        this.setDepth(this.scene.introHud.coinMeter.depth + 1);

        this.dismiss = new Phaser.GameObjects.Text(this.scene,
            0, 
            0,
            Language.strings["tap_to_dismiss"],
            {fontFamily: FONT, fontSize: 38, color: '#ffffff', align: 'center'}
        ).setOrigin(0.5).setScale(this.scene.gameScale).setAlpha(0);

        this.positionDismiss();
        this.add(this.dismiss);

        this.scene.tweens.add({
            targets         : this.dismiss,
            alpha           : 1,
            time            : 100,
            ease            : "Sine.easeIn",
            callbackScope   : this,
            onComplete      : function(){
                this.scene.input.enabled = true;
            }
        });
    }




    positionDismiss(){
        if(this.dismiss){
            this.dismiss.x = this.displayWidth * 0.5;
            this.dismiss.y = this.displayHeight * 0.5;
            if(this.dismiss.scale > 0) this.dismiss.scale = this.scene.gameScale;
        }
    }



    close(){
        this.scene.tweens.add({
            targets         : this,
            alpha           : 0,
            duration        : 300,
            callbackScope   : this,
            onComplete      : function(){
                this.scene.input.enabled = true;
                if(this.hideCallback) this.hideCallback.apply(this.hideCallbackContext);
            }
        });
    }

}