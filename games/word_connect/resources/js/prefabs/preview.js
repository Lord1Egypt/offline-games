class Preview extends Phaser.GameObjects.Container{

    static previewTilePool;
    
    constructor(scene, x, y){
        super(scene, x, y);

        this.tiles         = [];
        this.y_positions   = null;
        this.previewHeight = 45;
        this.shaking = false;

        this.setSize(0, this.previewHeight);        
        this.setmask();
    }



    setmask(){
        this.maskShape = this.scene.make.graphics();
        this.updateMask();
    }



    updateMask(){
        this.maskShape.fillStyle(0xff0000);
        let scale = this.scene.gameScale;
        this.maskShape.fillRect(0, 0, 600 * scale, this.height * scale);
        this.mask = new Phaser.Display.Masks.GeometryMask(this.scene, this.maskShape);
    }




    static initTilePool(scene){
        Preview.previewTilePool = scene.add.group({
            classType: PreviewTile,
            runChildUpdate: false
        });
    }



    static newTile(c, scene){
        if(!Preview.previewTilePool) Preview.initTilePool(scene);
        let pt  = Preview.previewTilePool.get();
        pt.setVisible(true)
        pt.setActive(true);
        if(pt.alpha < 1) pt.alpha = 1;
        pt.setText(c);
        return pt;
    }

    

    addLetter(c){
        if(this.dirty) {
            for(let i = 0; i < this.tiles.length; i++){
                if(this.tiles[i].tween) this.tiles[i].tween.stop();
                this.tiles[i].setVisible(false);
                this.tiles[i].setActive(false);
                this.remove(this.tiles[i])
            }

            this.reset();
        }
        
        let pt = Preview.newTile(c, this.scene);
        pt.setScale((this.previewHeight) / pt.height);

        if(this.tiles.length > 0 && !this.dirty){
            let last = this.tiles[this.tiles.length - 1];
            pt.x = last.x + last.width * last.scale;
        }else{
            pt.x = 0;
        }

        this.tiles.push(pt);
        this.positionMask();

        pt.y = -pt.height * 0.5;        
        if(!pt.parentContainer) this.add(pt);
        
        let time = 250;

        pt.tween = this.scene.tweens.add({
            targets     : pt,
            y           : this.height * 0.5,
            ease        : "Quart.easeOut",
            duration    : time,
        });

        if(this.tiles.length > 1){
            this.centerTween = this.scene.tweens.add({
                targets     : this,
                x           : this.calculateXPosition(),
                ease        : "Quart.easeOut",
                duration    : time,
            });
        }
    }



    stabilizePosition(){
        for(let i = 0; i < this.tiles.length; i++){
            if(this.tiles[i].tween){
                this.tiles[i].tween.stop();
                this.tiles[i].y = this.height * 0.5;
            }
        }
    }




    calculateXPosition(){
        let halfTileWidth = this.tiles[0].width * this.tiles[0].scale * this.scene.gameScale * 0.5;
        let dst = (this.tiles.length * 0.5) * (this.tiles[0].width* this.tiles[0].scale * this.scene.gameScale);
        return ((this.scene.scale.gameSize.width * 0.5 - dst) + halfTileWidth);
    }




    positionMask(){
        if(this.tiles.length > 0){
            let global = this.getWorldTransformMatrix();
            if(this.tiles.length == 1){
                this.maskShape.x = global.tx - this.tiles[0].width * this.tiles[0].scale * this.scene.gameScale * 0.5;
                this.maskShape.y = global.ty;
            }else{
                this.maskShape.x = global.tx- this.tiles[0].width * this.tiles[0].scale * global.scaleX;
            }
        }
    }



    
    removeLetter(){
        if(this.tiles.length > 0){
            let last = this.tiles.pop();
            last.setActive(false);

            let time = 250;

            this.scene.tweens.add({
                targets         : last,
                y               : -this.height * 0.5 - last.height * 0.5,
                ease            : "Quart.easeOut",
                duration        : time,
                callbackScope   : this,
                onComplete      : function() {
                    this.remove(last)
                }
            });

            if(this.tiles.length > 0){
                this.scene.tweens.add({
                    targets     : this,
                    x           : this.calculateXPosition(),
                    ease        : "Quart.easeOut",
                    duration    : time,
                });
            } 
        }
    }




    reset(){
        if(this.shakeTimeline) this.shakeTimeline.stop();
        if(this.centerTween) this.centerTween.stop();

        this.tiles.length = 0;
        this.scene.positionPreview();
        
        this.dirty = false;
    }




    fadeOut(){
        let preview = this;

        for(let i = 0; i < this.tiles.length; i++){
            this.tiles[i].setActive(false);

            this.scene.tweens.add({
                targets  : this.tiles[i],
                alpha    : 0,
                duration : 100,
                onComplete: function(){
                    if(i == preview.tiles.length - 1){
                        preview.reset();
                        
                        for(let i = 0; i < preview.tiles.length; i++){
                            preview.tiles[i].setVisible(false);
                            preview.remove(preview.tiles[i])
                        }
                        preview.dirty = false;
                    }
                }
            });
        }
    }




    shakeout(){
        this.dirty = true;
   
        let timeline = this.scene.tweens.createTimeline();
        let amount = 50;
        let x = this.x;

        timeline.add({
            targets     : this,
            x           : x - amount * 0.5,
            duration    : 100
        });

        timeline.add({
            targets     : this,
            x           : x + amount * 0.5,
            duration    : 100
        });

        timeline.add({
            targets     : this,
            x           : x - amount * 0.33,
            duration    : 70
        });

        timeline.add({
            targets     : this,
            x           : x + amount * 0.33,
            duration    : 70
        });

        timeline.add({
            targets     : this,
            x           : x - amount * 0.25,
            duration    : 40
        });

        timeline.add({
            targets     : this,
            x           : x + amount * 0.25,
            duration    : 40
        });

        timeline.add({
            targets         : this,
            x               : x,
            duration        : 20,
            callbackScope   : this,
            onComplete: function(){
                this.shaking = false;
                this.fadeOut();
            }
        });

        this.shaking = true;

        this.shakeTimeline = timeline;
        timeline.play();
    }




    update(){
        if(this.shaking) this.positionMask();
    }




    clearContent(){
        for(let i = 0; i < this.tiles.length; i++){
            this.tiles[i].setActive(false);
            tiles[i].parentContainer.remove(this.tiles[i]);
            this.tiles[i].setVisible(false);
        }
        this.reset();
    }


}



class PreviewTile extends Phaser.GameObjects.Container{
    
    constructor(scene){
        super(scene);

        this.bg = scene.add.image(0, 0, "sheet1", "preview_tile");
        this.add(this.bg);
        this.setSize(this.bg.width, this.bg.height);

        this.text = new Phaser.GameObjects.Text(this.scene,
            0, 
            0,
            "",
            {fontFamily: FONT, fontSize: 50, color: '#000', align: 'center', fontStyle: "bold"}
        ).setOrigin(0.5, 0.55);

        this.add(this.text);
        this.bg.setTint(0xf0f0f0);

        this.setInteractive();
        this.on("pointerup",   this.onMouseUp,   this);
    }




    onMouseUp(){
        if(this.scene.board.fingerHintSelectionModeActive){
            this.indicateLetterWasSolvedBefore();
        }else{
            if(Language.locale.hasDictionary && wordPressParams.wordnik_api_key.trim().length > 0) this.showMeaning(this.boardTile.cellData);
        }
    }


    indicateLetterWasSolvedBefore(){
        if(this.indicateTweenRunning) return;

        this.indicateTweenRunning = true;
        let timeline = this.scene.tweens.createTimeline();

        timeline.add({
            targets     : this,
            angle       : "-=10",
            duration    : 100
        });

        timeline.add({
            targets     : this,
            angle       : "+=20",
            duration    : 200
        });

        timeline.add({
            targets     : this,
            angle       : "-=20",
            duration    : 200
        });

        timeline.add({
            targets     : this,
            angle       : "+=20",
            duration    : 200
        });

        timeline.add({
            targets         : this,
            angle           : "-=10",
            duration        : 100,
            callbackScope   : this,
            onComplete: function(){
                this.angle = 0;
                this.indicateTweenRunning = false;
            }
        });

        timeline.play();
    }


    showMeaning(cellModel){
        let downWord = cellModel.downWord;

        if(downWord != null && downWord.isSolved){
            this.scene.gameHud.openDictionaryDialog([downWord]);
            return;
        }

        let acrossWord = cellModel.acrossWord;
        if(acrossWord != null && acrossWord.isSolved){
            this.scene.gameHud.openDictionaryDialog([acrossWord]);
            return;
        }
    }



    setText(c){
        this.text.setText(c);
    }



    explodeParticles(){
        let pm = this.scene.previewTileParticleManagerPool.get();
        pm.scale = 1 / this.scale;
        pm.setActive(true);
        this.scene.add.existing(pm);
        
        pm.setVisible(true);
        this.addAt(pm, 0);
        pm.explode();
    }

}



class PreviewTileParticleManager extends Phaser.GameObjects.Particles.ParticleEmitterManager{

    static count = 10;

    constructor(scene){
        super(scene, "sheet1");

        this.circle = new Phaser.Geom.Circle(0, 0, 150);

        this.emitter = this.createEmitter({
            frame       : 'correct_star',
            x           : 0,
            y           : 0,
            speed: { min: 200, max: 300 },
            //speed: 200,
            angle: { min: 0, max: 360 },
            scale: { start: 1.2, end: 0.1 },
            alpha: {start: 1, end: 0.5},
            lifespan: 800,
            deathZone: { type: 'onLeave', source: this.circle },
         
        });

        this.emitter.onParticleDeath(function() {
            if(this.emitter.getAliveParticleCount() == 0){
                this.setActive(false);
                this.parentContainer.remove(this);
                this.setVisible(false);
                
            }
        }, this);

        this.emitter.reserve(PreviewTileParticleManager.count);
    }



    explode(){
        this.emitter.explode(PreviewTileParticleManager.count);
    }
}


