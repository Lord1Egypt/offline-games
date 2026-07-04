class Wheel extends Phaser.GameObjects.Container{

    constructor(scene, spinFinished, context){
        super(scene);

        this.spinFinished = spinFinished;
        this.context = context;

        this.background = new Phaser.GameObjects.Container(scene);

        this.wheel = new Phaser.GameObjects.Image(scene, 0, 0, "sheet1", "lucky_wheel");
        this.background.add(this.wheel);
        this.background.setSize(this.wheel.width, this.wheel.height);
        this.setSize(this.background.width, this.background.height);
        this.add(this.background);
        this.time = 0;
        this.createSlices();
        this.setupArrow();

        this.particles = this.scene.add.particles('sheet1');
        this.addAt(this.particles, 0);

        this.particles.createEmitter({
            frame: "star_small",
            x: this.background.x,
            y: this.background.y,
            speed: 200,
            lifespan: 8000,
            blendMode: 'ADD'
        });
    }



    setupArrow(){
        this.arrow = new Phaser.GameObjects.Image(this.scene, 0, 0, "sheet1", "wheel_arrow");
        this.arrow.setOrigin(0.5, 0.3);
        this.arrow.y = -this.height * 0.5 - 30;
        this.add(this.arrow);
    }

       

    createSlices(){
        this.randomWeights = [];
        this.sectorAngles = [];
        this.leds = [WHEEL_SLICES.length];

        for(let i = 0; i < WHEEL_SLICES.length; i++){
            this.populateSlice(i, WHEEL_SLICES[i]);
            for(let j = 0; j < WHEEL_SLICES[i].probability; j++){
                this.randomWeights.push(i);
            }
        }
    }



    populateSlice(index, slice){
        let angle = this.getAngleByIndex(index);
        this.sectorAngles.push(90 + parseInt(angle));

        let radians = Phaser.Math.DegToRad(angle);
        let cos = Math.cos(radians);
        let sin = Math.sin(radians);

        let label = new Phaser.GameObjects.Text(this.scene,
            cos * 170, 
            sin * 170,
            slice.text,
            {fontFamily: FONT, fontSize: 24, color: (index % 2 == 0) ? '#777777' : '#ffffff', align: 'center', fontStyle: "bold" }
        ).setOrigin(0.5);
        label.angle = 90 + angle;    
        this.background.add(label);

        let icon = new Phaser.GameObjects.Image(this.scene, cos * 115, sin * 115, "sheet1", "wheel_coin_ic").setScale(0.4);
        icon.angle = angle;
        this.background.add(icon);

        angle -= 22.5;
        radians = Phaser.Math.DegToRad(angle);

        let led = new Phaser.GameObjects.Image(this.scene, Math.cos(radians) * 235, Math.sin(radians) * 235, "sheet1", "flare_green").setScale(0.8);
        led.visible = index % 2 == 0;
        this.leds[index] = led;
        this.background.add(led);
    }



    getAngleByIndex(index){
        return index / WHEEL_SLICES.length * 360.0;
    }




    spin(){
        this.spin1();
    }




    spin1(){
        this.scene.tweens.add({
            targets         : this.background,
            angle           : "+=25",
            duration        : 300,
            callbackScope   : this,
            onComplete      : this.spin2
        });
    }



    spin2(){
        let fullCircles = 5;
        let rnd = Phaser.Math.Between(0, this.randomWeights.length - 1);
        rnd = this.randomWeights[rnd];

        let randomFinalAngle = this.sectorAngles[rnd];
        let _finalAngle = (fullCircles * 360 + randomFinalAngle);
        this.selectedReward = WHEEL_SLICES[rnd];

        let duration = Phaser.Math.Between(3000, 6000) + 1000;

        this.scene.tweens.add({
            targets       : this.background,
            angle         : -_finalAngle,
            duration      : duration,
            ease          : "Cubic.easeOut",
            callbackScope : this,
            onComplete    : function(){
                this.particles.visible = false;
                this.spinFinished.apply(this.context);
            }
        });
    }



    update(time, delta){
        let totalSlices = WHEEL_SLICES.length;
        if(this.leds.length == totalSlices){
            this.time += delta;
            if(this.time >= 500){
                this.time = 0;
                for(let i = 0; i < this.leds.length; i++){
                    this.leds[i].visible = !this.leds[i].visible;
                }
            }
        }

        let sliceAngle = Math.round(360 / totalSlices);

        if(this.arrow.angle > -2.5 && Math.abs(this.background.angle - sliceAngle * 2.5) % sliceAngle <= 5) this.doTween();
    }




    doTween(){
        SoundController.stopSfx(this.scene);
        SoundController.playSfx(this.scene, "wheel");
        this.arrow.timeline = this.scene.tweens.createTimeline();

        this.arrow.timeline.add({
            targets: this.arrow,
            angle: 30,
            duration: 50,
        });

        this.arrow. timeline.add({
            targets: this.arrow,
            angle: 0,
            duration: 25,
        });
     
        this.arrow.timeline.play();   
    }
}



