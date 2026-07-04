 // "use strict";
let mGame;
let mConfig;                // current config
let lcSet;                  // level JSON
let goSet;                  // theme sprites
let mFirstSelected;         // firs selected mahjong tile on game board

// window loads event
window.onload = function() {
    // phaser game configuration object
    var gameConfig = {    
        type: Phaser.WEBGL,                             // render type
        transparent: true,                              // without background 
        scene: [ MahjongMap, MahjongGame, ],             // scenes used by the game   
        audio: 
	   {
			                            // disableWebAudio: true
       },
       scale: {
        width: 1080,                    // game width, in pixels 1850
        height: 1920,                   // game height, in pixels 1077
        mode:  Phaser.Scale.FIT,   // SHOW_ALL, RESIZE, FIT, autoCenter: Phaser.Scale.CENTER_BOTH   Phaser.Scale.FIT  Phaser.Scale.ScaleModes.FIT
      }
    };
   
    mGame = new Phaser.Game(gameConfig);                    // game constructor
    window.focus();                                         // pure javascript to give focus to the page/frame 
                                                            // scale  resize();  window.addEventListener("resize", resize, false); - not used
}

// MahjongGame scene
class MahjongGame extends Phaser.Scene{ 
  
    // constructor
    constructor(){
        super("MahjongGame"); // scene key 
    }

    loadSceneConfig() {
        mConfig = mahjongConfig;
        goSet = (ThemeHolder.getThemeName() === 'simple') ? simpleThemeConfig : classicThemeConfig; // default
    }

    // method to be executed when the scene preloads
    preload(){
        var levelsCount = 100;
        if(LevelHolder.currentLevel < 0) LevelHolder.currentLevel = 0;
        if(LevelHolder.currentLevel > (levelsCount -1)) LevelHolder.currentLevel = levelsCount - 1; // count - 1

         // create preloader
         var progressBar = this.add.graphics();
         var progressBox = this.add.graphics();
         progressBar.depth = 20;
         progressBox.depth = 19;
         this.load.on('progress', function (value) {
            progressBox.clear();
            progressBox.fillStyle(0x222222, 1);
            progressBox.fillRect((mGame.config.width / 2) - 10 - 160, (mGame.config.height / 2) - 10, 320, 50);
            // progressBox.fillRect((window.innerWidth / 2) - 10 - 160, (window.innerHeight / 2) - 10, 320, 50);
            // console.log(value);
            progressBar.clear();
            progressBar.fillStyle(0xFFEA31, 1);
            progressBar.fillRect((mGame.config.width / 2) -160, (mGame.config.height / 2), 300 * value, 30);
            // progressBar.fillRect((window.innerWidth / 2) - 160, (window.innerHeight / 2), 300 * value, 30);
         });
                     
         this.load.on('fileprogress', function (file) {
             //console.log('fileprogress: '+ file.src);
         });
 
         this.load.on('complete', function () {
             //console.log('complete');
             progressBar.destroy();
             progressBox.destroy();
         });

        this.updateEvent = new MKEvent();
        this.loadSceneConfig();

        // 0) load json
        this.cache.json.remove("lcSetJSON");
        var levelString = 'js/levels/level_' + (LevelHolder.currentLevel + 1) + '.json';
//        log(levelString); //
        this.load.pack('lcSetJSON', levelString);

        // 1) loading png images, sprite sheets
        mConfig.sprites.forEach((s)=>{
            if(s.fileName != null) {
            if(this.textures.exists(s.name))  this.textures.remove(s.name);                        
            this.load.image(s.name, "png/" + s.fileName);
            }
        });   // load png textures from png folder

        // theme sprites
        goSet.simpleSprites.forEach((fName)=>{
            if(fName != null) {
                if(this.textures.exists(fName)) this.textures.remove(fName);                             
                this.load.image(fName, goSet.folder + fName);
            }   
        });

        goSet.groups.forEach((group)=>{
            if(group != null) {
                group.collection.forEach((fName)=>{
                    if(this.textures.exists(fName)) this.textures.remove(fName); 
                    this.load.image(fName, goSet.folder + group.folder + fName);
                });   
            }   
        });

        this.load.spritesheet("hint_anim", "png/HintSheet.webp", { frameWidth: 220, frameHeight: 260});
        this.load.spritesheet("select_anim", "png/SelectSheet.webp", { frameWidth: 179, frameHeight: 222});

        // 2) loading sounds
        this.load.audio('button_click', ['audio/button.mp3']); 
        this.load.audio('select_tile', ['audio/110618_SelectTile.mp3']); 
        this.load.audio('collect_clip', ['audio/774962_JoinTiles.mp3']); 
        this.load.audio('fail_clip', ['audio/LevelFail.mp3']); 
        this.load.audio('win_clip', ['audio/LevelWin.mp3']);
       // this.load.audio('lose_clip', ['audio/lose.mp3']);
        this.load.audio('background_clip', ['audio/565196_LoopMelody.mp3']);

        // 3) loading bitmap fonts
        mConfig.fonts.forEach((f)=>{this.load.bitmapFont(f.fontName, f.filePNG, f.fileXML);});
        sendEventDevice("levelStartInGame",LevelHolder.currentLevel + 1) 
    }

    // method to be executed once the scene has been created
    create(){   
        var jsCache = this.cache.json;          // pack json is stored in json cache
        lcSet  = jsCache.get('lcSetJSON');      // console.log(lcSet);
        mFirstSelected = null;
        this.buttons = [];

        // 0) events
        this.changePossibleMatchesEvent = new MKEvent();
        this.changeFreeHiglightModeEvent = new MKEvent();
        this.beforeCollectEvent = new MKEvent();
        this.collectEvent = new MKEvent();
        this.failedMatchEvent = new MKEvent();
        this.endCollectAnimationEvent = new MKEvent();
        this.shuffleGridBeginEvent = new MKEvent();
        this.shuffleGridEndEvent = new MKEvent();
        this.undoEndEvent = new MKEvent();
        this.winEvent = new MKEvent();
        this.noMatchesEvent = new MKEvent();
        this.changeScoreEvent = new MKEvent();
        this.changeHintsCountEvent = new MKEvent();
        this.changeShufflesCountEvent = new MKEvent();

        // 1) main properties
        this.gameWidth = mGame.config.width;    // mGame.config.width;         // this.sys.game.canvas.width; 
        this.gameHeight = mGame.config.height;   // mGame.config.height;       // this.sys.game.canvas.height;   
        this.centerX = (this.gameWidth / 2) + mConfig.localOffsetX; 
        this.centerY = (this.gameHeight / 2) + mConfig.localOffsetY; 
        this.cTime = 0;

        // 2) create graphic
        mConfig.createGraphic(this);
        this.hintAnim = this.anims.create({            // create hint animation for tiles 
                        key: 'hint',
                        frames: this.anims.generateFrameNumbers('hint_anim'),
                        frameRate: 12,
                        repeat: -1
                        });
        this.selectAnim = this.anims.create({            // create select animation for tiles 
                        key: 'select',
                        frames: this.anims.generateFrameNumbers('select_anim'),
                        frameRate: 12,
                        repeat: -1
                        });        

        // 3) main objects and properties
        this.editMode = false;
        this.matchGrid = new MatchGrid(this, lcSet, 0, 0, gridConfig, 1, this.editMode);
        this.soundController = new SoundController(this);
        this.guiController = new GuiController(this);
        this.hintPair = null;
        this.pairNumber = 0;
        this.isHihglightFreeMode = false;
        this.undoStates = [];
        //3a) create game field
        this.matchGrid.setObjectsData(-1);
        this.matchGrid.setTofrontAll(false);
        this.matchGrid.setMahjongSprites();
        this.possibleMatches = null;

        // 5) add sounds 
        this.button_click = this.sound.add('button_click');
        this.select_tile_clip = this.sound.add('select_tile');
        this.collect_clip = this.sound.add('collect_clip');
        this.fail_clip = this.sound.add('fail_clip');
        this.win_clip = this.sound.add('win_clip');
        this.background_clip = this.sound.add('background_clip');

        // 6) holders and game controls
        ScoreHolder.changeScoreEvent = this.changeScoreEvent;
        ScoreHolder.averageScore = ScoreController.getMaxLevelScore(this.matchGrid.getTiles().length / 2); // Needed to calculate the percentage of level completion.
        HintsHolder.changeCountEvent = this.changeHintsCountEvent;
        ShufflesHolder.changeCountEvent = this.changeShufflesCountEvent;
        mConfig.createControls(this);
    
        // 8) coroutines
        this.collectCorout = null;

        // 9) play background music
        this.soundController.playMusic('background_clip');

        // 10)    
        if(mConfig.lastCreate) mConfig.lastCreate(this); 
        
        // 11) set event handlers
        this.undoEndEvent.add(() => {
            this.updatePossibleMatches();
            if (!this.checkExistingHint()) this.removeHint();
            if (this.isHihglightFreeMode) this.highlihtFree(true);
        });
        this.shuffleGridEndEvent.add(() => {
            this.updatePossibleMatches();
            this.cleanUndoStates();
            this.noMatchesEvent.events.forEach((eW)=>{if (eW != null && eW.action != null) eW.action.call(eW.context);});
        
        });
        this.beforeCollectEvent.add((c1, c2, m1, m2) => {
            if (this.hintPair != null && this.hintPair.contaiAny(m1, m2)) this.removeHint(); // remove hint
            this.saveUndoBeforeMatch(c1, c2, m1, m2);
        }, this);
        this.collectEvent.add((s1, s2) => {
             ScoreHolder.add(ScoreController.getMatchScore());
            if (this.matchGrid.getTiles().length === 0) { this.winEvent.events.forEach((eW)=>{if (eW != null && eW.action != null) eW.action.call(eW.context);}); return; }   // check win 
            this.updatePossibleMatches();
            if (this.possibleMatches.getCount() == 0) this.noMatchesEvent.events.forEach((eW)=>{if (eW != null && eW.action != null) eW.action.call(eW.context);});
            if (this.isHihglightFreeMode) this.highlihtFree(true);
            ScoreController.collectMatcEventHandler();
        }, this);
        this.noMatchesEvent.add(() => {
            this.guiController.showPopUp(mConfig.createNoMatchesPUHandler).setDepth(30000);          // show no matches popup
            this.soundController.playClip('fail_clip', false);
        });
        this.winEvent.add(() => {
            this.guiController.showPopUp(mConfig.createWinPUHandler).setDepth(30000);                // show win message
            LevelHolder.passLevel();                                                                // pass level
            this.soundController.playClip('win_clip', false);
            sendEventDevice("levelCompleteInGame",LevelHolder.currentLevel+1)
        });
        this.changeFreeHiglightModeEvent.add((highlight) => {
            this.highlihtFree(highlight);
        }, this);
        this.failedMatchEvent.add(()=>{
            ScoreController.reset();
        });
        this.changeShufflesCountEvent.add(()=>{
            mConfig.refreshGUI(this);
        });
        this.changeHintsCountEvent.add(()=>{
            mConfig.refreshGUI(this);
        });
        this.loadHighlightMode();
        this.updatePossibleMatches();

        // 12) init holders
        ScoreController.reset();
        ScoreHolder.setCount(0);
        ShufflesHolder.load();
        HintsHolder.load();
        ShufflesHolder.addCount(1);             // add shuffles
        HintsHolder.addCount(1);                // add hints

        // 12a) debug
        // this.fpsText = this.add.bitmapText(this.centerX, this.centerY - 400, 'gameFont_2', 'fps: ', 40, 1).setOrigin(0.5);
        // this.fpsText.depth = 20;
/*
        this.input.on('pointerdown',function(pointer){
            var pointX = pointer.x; var pointY = pointer.y;
            var pointX = mGame.input.mousePointer.worldX;
            var pointY = mGame.input.mousePointer.worldY;
            console.log('posX:' + (pointX - (mGame.config.width / 2))+ "; posY: " + (pointY - (mGame.config.height / 2)));      
        });
*/
        // 11a) tests
        /*       
        var wMess = this.guiController.showMessageYNC('Congratulation!', 'Your Win: 20 Coins!', this, 
        ()=>{this. guiController.closePopUp(wMess);}, ()=>{this. guiController.closePopUp(wMess);},()=>{this. guiController.closePopUp(wMess);},);
        wMess.setDepth(30000);
        */
        // var wMess = this.guiController.showMessage('Congratulation!', 'Your Win: 20 Coins!', this, ()=>{this. guiController.closePopUp(wMess);},).setDepth(30000);
        // var winPU = this.guiController.showPopUp(mConfig.createWinPUHandler).setDepth(30000);
        // var noMatchesPU = this.guiController.showPopUp(mConfig.createNoMatchesPUHandler).setDepth(30000);
    }

    update(time, delta) // https://newdocs.phaser.io/docs/3.52.0/focus/Phaser.Scene-update
    {   
        this.cTime = time;
        simpleTweener.update(delta);
        this.updateEvent.events.forEach((eW)=>{ if (eW != null && eW.action != null) eW.action.call(eW.context, time, delta); });

        if (this.fpsText) this.fpsText.text = 'fps: ' + Math.round(mGame.loop.actualFps);    // for debugging puposes only, can be disabled
    }

    updatePossibleMatches()
    {
        this.possibleMatches = new PossibleMatches(this.matchGrid.getFreeToMatchTiles());
        this.changePossibleMatchesEvent.events.forEach((eW)=>{if (eW != null && eW.action != null) eW.action.call(eW.context, this.possibleMatches.getCount());}); 
        this.pairNumber = 0;
    }

    getPossibleMatchesCount()
    {
        return (this.possibleMatches != null) ? this.possibleMatches.getCount() : 0;
    }

    collectMatch(mahjongTile_1,mahjongTile_2)
    {
        this.collectCorout = new Coroutiner(this, this.collectMatchC(mahjongTile_1,mahjongTile_2));
        this.collectCorout.start();       
    }

    *collectMatchC(mahjongTile_1,mahjongTile_2)
    {
//        console.log('start collect match');
        this.setControlActivity(false, false);
        var gridCell_1 = mahjongTile_1.parentCell;
        var gridCell_2 = mahjongTile_2.parentCell;

        this.beforeCollectEvent.events.forEach((eW)=>{if (eW != null && eW.action != null) eW.action.call(eW.context, gridCell_1, gridCell_2, mahjongTile_1, mahjongTile_2);});
        var textureKey_1 = mahjongTile_1.textureKey;
        var textureKey_2 = mahjongTile_2.textureKey;

        gridCell_1.unLinkObject(mahjongTile_1.layer);
        gridCell_2.unLinkObject(mahjongTile_2.layer);

        yield* this.collectAnimationC(mahjongTile_1, mahjongTile_2);
        this.endCollectAnimationEvent.events.forEach((eW)=>{if (eW != null && eW.action != null) eW.action.call(eW.context);}); 
        mahjongTile_1.destroy();
        mahjongTile_2.destroy();
        // delete  mahjongTile_1
        // delete mahjongTile_2;
 
        yield null;
        this.collectEvent.events.forEach((eW)=>{if (eW != null && eW.action != null) eW.action.call(eW.context, textureKey_1, textureKey_2);}); 
        this.setControlActivity(true, true);
//        console.log('end collect match');
    }

    *collectAnimationC(mahjongTile_1, mahjongTile_2)
    {
        yield null;
        var leftTile = (mahjongTile_1.getPositionL().x < mahjongTile_2.getPositionL().x) ? mahjongTile_1 : mahjongTile_2;
        var rightTile = (leftTile === mahjongTile_1) ? mahjongTile_2 : mahjongTile_1;

        // get box collider bounds
        var bounds_1 = leftTile.getBoundsL();
        var size = bounds_1.width * this.matchGrid.scale; // scaled size
        var size05 = size * 0.5;
        var size15 = size * 1.5;
        var size025 = size * 0.25;

        // calc anim points
        var wPos_10 = leftTile.getPositionL();
        var wPos_11 = rightTile.getPositionL();
        var wPos_center = MkMath.sum_V2(wPos_10, wPos_11);
        wPos_center.multiply(new Phaser.Math.Vector2(0.5, 0.5));

        if(Math.abs(wPos_center.x - this.centerX) > 1.5 * size)
        {
            wPos_center = new Phaser.Math.Vector2(wPos_center.x > this.centerX ? this.centerX + size * 1.5 : this.centerX - size * 1.5, wPos_center.y); // offset to center
        }

        var wPos_20 = MkMath.subtract_V2(wPos_center, new Phaser.Math.Vector2(size, 0));
        var wPos_21 = MkMath.sum_V2(wPos_center, new Phaser.Math.Vector2(size, 0));

        var wPos_30 = MkMath.subtract_V2(wPos_20,new Phaser.Math.Vector2(size15, 0));
        var wPos_31 = MkMath.sum_V2(wPos_21, new Phaser.Math.Vector2(size15, 0));

        var wPos_40 = MkMath.subtract_V2(wPos_center,new Phaser.Math.Vector2(size05 + size025, 0));
        var wPos_41 = MkMath.sum_V2(wPos_center, new Phaser.Math.Vector2(size05 - size025, 0));
        /*
        console.log("wPos_center:"); console.log(wPos_center);
        console.log('pos10,11:'); console.log(wPos_10); console.log(wPos_11);
        console.log('pos20,21:'); console.log( wPos_20); console.log( wPos_21);
        console.log('pos30,31:'); console.log( wPos_30); console.log( wPos_31);
        console.log('pos40,41:'); console.log(wPos_40); console.log(wPos_41);
        */
        // play animation movements

        // 1) move to points 20, 21 - avoid
        var moveComplete = false;

        // 2) move to points 30, 31 
        var speed = 1500;
        var _time = MkMath.subtract_V2(wPos_30,wPos_10).length() / speed;
        if (_time < 0.2) _time = 0.2;
        if (_time > 0.4) _time = 0.4;
        moveComplete = false;
        // console.log(_time * 1000);

        var sT1 =  new SimpleTweenVector2(this, wPos_10, wPos_30, _time * 1000,                                            
            (p, dp) =>{ leftTile.setPositionL(p); },   
            ()=> { });
        var sT2 =  new SimpleTweenVector2(this, wPos_11, wPos_31, _time * 1000,                                            
                (p, dp) =>{rightTile.setPositionL(p); },   
                ()=> { moveComplete = true;});
        while(!moveComplete)
        {
            yield null;
        }

        // 3) move to points 40, 41 
        _time = MkMath.subtract_V2(wPos_40, wPos_30).length() / (speed * 1.4);
        moveComplete = false;
        var sT3 =  new SimpleTweenVector2(this, wPos_30, wPos_40, _time * 1000,                                            
            (p, dp) =>{ leftTile.setPositionL(p); },   
            ()=> { });
        var sT4 =  new SimpleTweenVector2(this, wPos_31, wPos_41, _time * 1000,                                            
            (p, dp) =>{ rightTile.setPositionL(p); },   
            ()=> { moveComplete = true;});
            
        while(!moveComplete)  { yield null;  }
        this.soundController.playClip('collect_clip', false);
        this.createScoreFlyer(ScoreController.getMatchScore(), wPos_center.x, wPos_center.y);

        yield* this.wait_ms(100);
    }

    failedMatch()
    {
        this.failedMatchEvent.events.forEach((eW)=>{if (eW != null && eW.action != null) eW.action.call(eW.context);}); 
    }

    shuffleGrid()
    {
        if(ShufflesHolder.count <= 0) {
            var time = 2000;
            var wm = this.guiController.showPopUp(mConfig.createSmallMessagePUHandler).setDepth(30000);
                wm.messageText.text = 'No shuffles available.';
                this.timeoutMessH = setTimeout(()=>{this.guiController.closePopUp(wm); if(this.timeoutMessH) clearTimeout(this.timeoutMessH);}, time);
            return;
        }
        ShufflesHolder.addCount(-1);
        if (!this.matchGrid.canShuffle())
         {
            this.shuffleGridBeginEvent.events.forEach((eW)=>{if (eW != null && eW.action != null) eW.action.call(eW.context);});
            this.matchGrid.hardShuffle();
            this.matchGrid.setTofrontAll(false);
            this.hintPair = null;
            this.possibleMatches = null;
            if (this.isHihglightFreeMode) {
                this.highlihtFree(true);
            }
            this.shuffleGridEndEvent.events.forEach((eW)=>{if (eW != null && eW.action != null) eW.action.call(eW.context);});
            return;
        }

        // standart shuffle action
        this.setControlActivity(false, false);
        this.shuffleGridBeginEvent.events.forEach((eW)=>{if (eW != null && eW.action != null) eW.action.call(eW.context);});
        var pT0 = new ParallelActions();
        var pT1 = new ParallelActions();
        this.hintPair = null;
        this.possibleMatches = null;

        var tweenSeq = new SequencedActions();
        var mahjongTiles = this.matchGrid.getTiles();

        mahjongTiles.forEach((mT) => { pT0.add((callBack) => { mT.mixJump(new Phaser.Math.Vector2(this.centerX, this.centerY), callBack); }); });

        mahjongTiles.forEach((mT) => { pT1.add((callBack) => { mT.reversMixJump(callBack); }); });

        tweenSeq.add((callBack) => { pT0.start(callBack); });

        tweenSeq.add((callBack) => {
            this.matchGrid.shuffleGridSprites();
            pT1.start(() => {
                this.setControlActivity(true, true);
                this.shuffleGridEndEvent.events.forEach((eW)=>{if (eW != null && eW.action != null) eW.action.call(eW.context);});
                callBack();
            });
        });

        tweenSeq.start();
    }

    setControlActivity(activityGrid, activityMenu)
    {
        if (this.buttons != null) this.buttons.forEach((b)=>{if (b) b.interactable = activityMenu;});
        this.matchGrid.interactable = activityGrid;
    }

    createScoreFlyer(score, wPosX, wPosY){
        var time = 1000;
        var fl = this.guiController.showPopUp(mConfig.createFlyerPUHandler).setDepth(21000);
        fl.scoreText.text = score;
        fl.wCont.setPosition(wPosX, wPosY); 
        var sT1 =  new SimpleTweenVector2(this, new Phaser.Math.Vector2(wPosX, wPosY - 30),  new Phaser.Math.Vector2(wPosX, wPosY - 80), time,                                            
            (p, dp) =>{ fl.wCont.setPosition(p.x, p.y); },   
            ()=> { this. guiController.closePopUp(fl);});
    }

    tileSelectHandler(){
        this.soundController.playClip('select_tile_clip', false);
    }

    // go to map
    exitGame(){
        this.soundController.stopAll();
        this.scene.start('MahjongMap');
    }
    // reload current scene
    reloadGame(){
        this.soundController.stopAll();
        this.scene.start('MahjongGame');
    }

// ---------------- highlight mode --------------
    // higlight free tiles
    highlihtFree(highlight)
    {
//        console.log('highlight free: ' + highlight);
        var freeTiles = this.matchGrid.getFreeToMatchTiles();
        var allTiles = this.matchGrid.getTiles();

        if (highlight)
        {
            allTiles.forEach((item)=>{item.setFreeHiglightColor(freeTiles.includes(item) ? true : false);});
        }
        else
        {
            allTiles.forEach((item)=>{item.setFreeHiglightColor(true);});
        }
    }

    setHiglightFreeMode(highlight)
    {
//        console.log('set highlight free: ' + highlight);
        localStorage.setItem('free_highlight', highlight ? 1 : 0); 
        this.isHihglightFreeMode = highlight;
        this.changeFreeHiglightModeEvent.events.forEach((eW)=>{if (eW != null && eW.action != null) eW.action.call(eW.context, highlight);}); 
    }

    loadHighlightMode()
    {
        if(localStorage.hasOwnProperty('free_highlight')) {
            var boolVal = (parseInt(localStorage.getItem('free_highlight'))===1);
            this.setHiglightFreeMode(boolVal);
        }
        else this.setHiglightFreeMode(this.isHihglightFreeMode);        
    }
// ------------end highlight mode --------------

// ---------------- hints ----------------------
    trySelectHintMatch(selectCallBack)
    {
//        console.log('trySelectHintMatch');
        if (this.possibleMatches == null) 
        {
            this.updatePossibleMatches();
        }
        this.removeHint();

        if (this.possibleMatches.getCount() > this.pairNumber)
        {
            this.hintPair = this.possibleMatches.getMatchPair(this.pairNumber);
            this.hintPair.mahjongTile_1.highlightHint(true);
            this.hintPair.mahjongTile_2.highlightHint(true);
            // paarNumber++;
            selectCallBack(true);
        }
        else
        {
            this.pairNumber = 0;
            selectCallBack(false);
        }
    }

    isAlreadyHint()
    {
        return this.hintPair != null && this.hintPair.mahjongTile_1 != null && this.hintPair.mahjongTile_2 != null;
    }

    removeHint()
    {
        if (this.hintPair != null)
        {
            if (this.hintPair.mahjongTile_1 !=null ) this.hintPair.mahjongTile_1.highlightHint(false);
            if (this.hintPair.mahjongTile_2 !=null ) this.hintPair.mahjongTile_2.highlightHint(false);
        }
        this.hintPair = null;
    }

    checkExistingHint()
    {
        if (this.hintPair == null || this.hintPair.mahjongTile_1 == null || this.hintPair.mahjongTile_2 == null) return false;
        if (this.possibleMatches.containMatchPair(this.hintPair)) return true;
        return false;
    }

    select_Hint()
	{
        var hints = HintsHolder.count;
        var time = 2000;
        if (this.isAlreadyHint()){         // the hint is already there
           	var wcm = this.guiController.showPopUp(mConfig.createSmallMessagePUHandler).setDepth(30000);
            wcm.messageText.text = 'Matching tiles are already \n selected';
            this.timeoutMess = setTimeout(()=>{this. guiController.closePopUp(wcm); if(this.timeoutMess) clearTimeout(this.timeoutMess);}, time);
			return;
        }
        if (hints > 0){
			this.trySelectHintMatch((good)=>  { if (good) HintsHolder.addCount(-1); });
			this.applyHintEvent?.Invoke();
			}
        else{
                var wcm = this.guiController.showPopUp(mConfig.createSmallMessagePUHandler).setDepth(30000);
                wcm.messageText.text = 'No hints available.';
                this.timeoutMess = setTimeout(()=>{this. guiController.closePopUp(wcm); if(this.timeoutMess) clearTimeout(this.timeoutMess);}, time);
            }
	}
// -------------end hints ----------------------

//-------------------- undo ---------------------
    saveUndoBeforeMatch(gridCell_1 , gridCell_2, mahjongTile_1, mahjongTile_2) {
        var cells = [];
        cells.push(gridCell_1, gridCell_2);
        var ds = new UndoState(ScoreHolder.score, cells);
        this.undoStates.push(ds);
        mConfig.refreshGUI(this);
    }

    restoreUndoState() {
        if (this.editMode === true) return;
        if (this.undoStates.length == 0) return;
        var ds = this.undoStates[this.undoStates.length - 1];
        ds.restore(this.matchGrid, tileConfig);
        Phaser.Utils.Array.RemoveAt(this.undoStates, this.undoStates.length - 1);
        this.undoEndEvent.events.forEach((eW)=>{if (eW != null && eW.action != null) eW.action.call();}); 
        mConfig.refreshGUI(this);
    }

    cleanUndoStates() {
        this.undoStates = [];
        mConfig.refreshGUI(this);
    }
//-------------------- end undo ---------------------

//-------------------- debug ---------------------
    autoPlay() {
        if(this.playFlag === true) {this.stopFlag = true; return;}  // stop coroutine
        this.autoPlayCorout = new Coroutiner(this, this.autoPlayC());
        this.autoPlayCorout.start();   
    }

    *autoPlayC(){
        this.setControlActivity(false, false);
        var possibleMatches = new PossibleMatches(this.matchGrid.getFreeToMatchTiles());
        yield* this.wait_ms(1000); 
        this.stopFlag = false;
        this.playFlag = true;
    while (possibleMatches.getCount() > 0){
        var freePaar = possibleMatches.getMatchPair(0);
        freePaar.mahjongTile_1.highlightHint(true);
        freePaar.mahjongTile_2.highlightHint(true);
        yield* this.wait_ms(500); 
        this.fastCollectMatch(freePaar.mahjongTile_1, freePaar.mahjongTile_2);
        yield* this.wait_ms(100);
        possibleMatches = new PossibleMatches(this.matchGrid.getFreeToMatchTiles());
        if (this.stopFlag === true) {
            this.stopFlag = false;
            this.playFlag = false;
            break;
        }
    }
    this.playFlag = false;
    this.setControlActivity(true, true);
    }

    // used for auto play
    fastCollectMatch(mahjongTile_1, mahjongTile_2)
    {
        var gridCell_1 = mahjongTile_1.parentCell;
        var gridCell_2 = mahjongTile_2.parentCell;

        this.beforeCollectEvent.events.forEach((eW)=>{if (eW != null && eW.action != null) eW.action.call(eW.context, gridCell_1, gridCell_2, mahjongTile_1, mahjongTile_2);});
        var textureKey_1 = mahjongTile_1.textureKey;
        var textureKey_2 = mahjongTile_2.textureKey;

        gridCell_1.removeObject(mahjongTile_1.layer, false);
        gridCell_2.removeObject(mahjongTile_2.layer, false);

        this.collectEvent.events.forEach((eW)=>{if (eW != null && eW.action != null) eW.action.call(eW.context, textureKey_1, textureKey_2);}); 
    }
//-----------------end debug ---------------------

//-------------------- utils ---------------------
    // add sprite relative to scene center
    addSpriteLocPos(name, posX, posY)
    {
        return  this.add.sprite(this.centerX + posX, this.centerY + posY, name);
    } 

    // add container relative to scene center
    addContainerLocPos(posX, posY)
    {
        return  this.add.container(this.centerX + posX, this.centerY + posY);
    }

    // add container relative to container
    addContainerToContainerLocPos(parentContainer, posX, posY)
    {
        var container = this.add.container(posX,posY);
        parentContainer.add(container);
        return  container;
    }

    // add container relative to scene center
    addSpriteToContainerLocPos(name, sContainer, posX, posY)
    {
        var sprite = this.add.sprite(posX, posY, name);
        sContainer.add(sprite);
        return  sprite;
    }
    // delete all player data from  browser local storage
    resetGame(){
        this.soundController.stopAll();
        localStorage.clear();
        this.scene.start('MahjongGame');
    }

    // wait miliseconds coroutine yield* this.wait_ms(10000);
    *wait_ms(ms) 
    {
        var timeTarget = this.cTime + ms;
        while (timeTarget > this.cTime)
        {
            yield (timeTarget - this.cTime);
        }
    }
//-----------------end utils ---------------------       
}

// MahjongMap scene
class MahjongMap extends Phaser.Scene{
  
    // constructor
    constructor(){
        super("MahjongMap"); // scene key 
    }

    loadSceneConfig()
    {
        mConfig = mapConfig;
    }

    // method to be executed when the scene preloads
    preload(){
         // create map preloader
         var progressBar = this.add.graphics();
         var progressBox = this.add.graphics();
         progressBar.depth = 20;
         progressBox.depth = 19;
        
         this.load.on('progress', function (value) {
            progressBox.clear();
            progressBox.fillStyle(0x222222, 1);
            progressBox.fillRect((mGame.config.width / 2) - 10 - 160, (mGame.config.height / 2) - 10, 320, 50);

            progressBar.clear();
            progressBar.fillStyle(0xFFEA31, 1);
            progressBar.fillRect((mGame.config.width / 2) -160, (mGame.config.height / 2), 300 * value, 30);
         });
                     
         this.load.on('fileprogress', function (file) {
             //console.log('fileprogress: '+ file.src);
         });
 
         this.load.on('complete', function () {
             //console.log('complete');
             progressBar.destroy();
             progressBox.destroy();
         });

        this.updateEvent = new MKEvent();
        this.loadSceneConfig();

        // 1) loading map png images, sprite sheets
        mConfig.sprites.forEach((s)=>{
            if(s.fileName != null) {
            if(this.textures.exists(s.name))  this.textures.remove(s.name);                                  // uncomment for game with multiple slot scenes
            this.load.image(s.name, "png/" + s.fileName);
            }
        });   // load png textures from png folder

        // 2) loading map  sounds
        this.load.audio('button_click', ['audio/button.mp3']); 
        this.load.audio('background_clip', ['audio/565196_LoopMelody.mp3']);

        // 3) loading bitmap fonts
        mConfig.fonts.forEach((f)=>{this.load.bitmapFont(f.fontName, f.filePNG, f.fileXML);});
    }

    // method to be executed once the scene has been created
    create(){   
        this.buttons = [];

        // 1) main properties
        this.gameWidth = mGame.config.width;         
        this.gameHeight = mGame.config.height;        
        this.centerX = (this.gameWidth / 2) + mConfig.localOffsetX; 
        this.centerY = (this.gameHeight / 2) + mConfig.localOffsetY;
        this.cTime = 0;

        // 3) create map graphic
        mConfig.createGraphic(this);

        // 4) main objects, properties
        this.soundController = new SoundController(this);
        this.guiController = new GuiController(this);
        this.isHihglightFreeMode = false;

        // 5) add sounds 
        this.button_click = this.sound.add('button_click');
        this.background_clip = this.sound.add('background_clip');

        // 6) controls
        mConfig.createControls(this);
   
        // 7) play background music
        this.soundController.playMusic('background_clip');

        // 10)
        if(mConfig.lastCreate) mConfig.lastCreate(this);
        this.loadHighlightMode();
        ShufflesHolder.load();
        HintsHolder.load();

        // 11) tests
        // var wMess = this.guiController.showMessage('Congratulation!', 'Your Win: ' + '20' + ' Coins!', this, ()=>{this. guiController.closePopUp(wMess);},);
        // var aboutPU = this.guiController.showPopUp(mConfig.createAboutPUHandler);
        // var settingsPU = this.guiController.showPopUp(mConfig.createSettingsPUHandler);
        // var themePU = this.guiController.showPopUp(mConfig.createThemePUHandler);
    }

    update(time, delta)
    {   
        this.cTime = time;
        simpleTweener.update(delta);
        this.updateEvent.events.forEach((eW)=>{ if (eW != null && eW.action != null) eW.action.call(eW.context, time, delta); });
    }

    // add sprite relative to scene center
    addSpriteLocPos(name, posX, posY)
    {
        return  this.add.sprite(this.centerX + posX, this.centerY + posY, name);
    } 

    gotoGame(){
        this.soundController.stopAll();
        this.scene.start('MahjongGame');
    }

    // higlight free sprites mode
    setHiglightFreeMode(highlight)
    {
//        console.log('set highlight free: ' + highlight);
        localStorage.setItem('free_highlight', highlight ? 1 : 0); 
        this.isHihglightFreeMode = highlight;
    }

    loadHighlightMode()
    {
        if(localStorage.hasOwnProperty('free_highlight')) {
            var boolVal = (parseInt(localStorage.getItem('free_highlight'))===1);
            this.setHiglightFreeMode(boolVal);
        }
        else this.setHiglightFreeMode(this.isHihglightFreeMode);        
    }

    // delete all player data from  browser local storage
    resetGame(){
        this.soundController.stopAll();
        localStorage.clear();
        this.scene.start('MahjongMap');
    }
}

// ---helper functions--- 
function getTime() {
    //make a new date object
    let d = new Date();

    //return the number of milliseconds since 1 January 1970 00:00:00.
    return d.getTime();
}

// delete all player data from  browser local storage
function fullResetGame(){
    localStorage.clear();
    location.reload();
}

/*
 render depth
 pop ups 30 000
 score flyer 21 000
 tiles <=20 000
*/

function sendEventDevice (typeVar,valueVar){
	const ua = navigator.userAgent || navigator.vendor || window.opera;

	if (/android/i.test(ua)) {
		sendEventAndroid(typeVar,valueVar);
	}
  
	if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
		sendEventIOS(typeVar,valueVar);
	}
	// Ни Android и ни iOS
//	console.log('unknown android or ios');
//	console.log(ua);
}

function sendEventIOS(typeVar,valueVar){
	console.log(typeVar+ " : " + valueVar)
    try {
        var messageBody = {type: typeVar, value: valueVar}
        window.webkit.messageHandlers.ports.postMessage(messageBody);
    } catch (err) {
        console.log(err);
    }
}

function sendEventAndroid(typeVar, valueVar) {
	if (window.Android && typeof window.Android[typeVar] === 'function') {
	  window.Android[typeVar](String(valueVar));
	} else {
	  console.warn(`Android bridge method ${typeVar} not available`);
	}
  }
