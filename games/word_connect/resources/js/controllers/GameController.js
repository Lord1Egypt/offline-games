class GameController{

    constructor(scene){
        this.scene                  = scene;
        this.lastGivenAnswerLength  = 0;
        this.animatedWords          = new Phaser.Structs.Set();
        this.queue                  = new Phaser.Structs.List();
        this.queueRunning           = false;
        this.finalWordAnimRunning   = false;
        this.stopAnimatingFinalWord = false;
        this.finalWord              = null;

        this.boardTilePool = this.scene.add.group({
            classType: BoardTile,
            runChildUpdate: false
        });
    }




    setComboAnimatedWordCount(ids){
        let entries = ids.entries;
        this.animatedWords.clear();
        for(let i = 0; i < entries.length; i++){
            let word      = new Word();
            word.id       = entries[i];
            word.isSolved = true;
            this.animatedWords.set(word);
        }
    }




    createLevel(){
        this.queueRunning = false;
        this.animatedWords.clear();
        this.queue.removeAll();
        this.finalWordAnimRunning = false;
        this.scene.comboController.newLevel();
        let nextLevel = GameData.findFirstIncompleteLevel();
        GameData.getLevelByIndex(nextLevel, this.scene, this, this.onLevelReady);
    }



    onLevelReady(){
        this.scene.createLevelContent();
        this.scene.input.enabled = true;
    }




    selectingLetters(answer){
        if(this.lastGivenAnswerLength == 0 || answer.length > this.lastGivenAnswerLength){
            this.scene.preview.addLetter(answer.split("")[answer.length - 1]);
        }else{
            this.scene.preview.removeLetter();
        }
        this.lastGivenAnswerLength = answer.length;
    }




    selectingLettersFinished(text){
        this.scene.preview.dirty = true;
        let foundWord = this.evaluateAnswer(text);
        
        if(foundWord != null){
            if(foundWord.isSolved) this.indicateWasSolvedBefore(foundWord);
            else this.answeredCorrect(foundWord);
        }else{
            this.answeredWrong(text);
        }

        this.lastGivenAnswerLength = 0;
    }



    evaluateAnswer(answer){
        if(answer.length != this.scene.preview.tiles.length) return null;
        let words = GameData.level.boardModel.getAllWords(true);

        for(let i = 0; i < words.length; i++){
            if(words[i].answer == answer) return words[i];
        }

        return null;
    }




    indicateWasSolvedBefore(word){
        SoundController.playSfx(this.scene, "duplicate_word");
        let boardTilesToAnimate     = this.scene.board.findWordBoardTiles(word);
        let boardTileWidth          = boardTilesToAnimate[0].width * boardTilesToAnimate[0].scale; 
        let dir                     = word.direction;
        let x, y;

        if(dir == Word.ACROSS){
            x = boardTileWidth * 0.1;
            y = 0;
        }else{
            x = 0;
            y = boardTileWidth * 0.1;
        }

        for(let i = 0; i < boardTilesToAnimate.length; i++){
            let previewTile = boardTilesToAnimate[i].cellData.previewTile;

            if(previewTile){
                let timeline = this.scene.tweens.createTimeline();

                let xx = previewTile.x;
                let yy = previewTile.y; 

                timeline.add({
                    targets     : previewTile,
                    x           : previewTile.x + x,
                    y           : previewTile.y + y,    
                    duration    : 50
                });
    
                timeline.add({
                    targets     : previewTile,
                    x           : previewTile.x - (x * 2),
                    y           : previewTile.y - (y * 2),
                    duration    : 100
                });
    
                timeline.add({
                    targets     : previewTile,
                    x           : previewTile.x + (x * 2),
                    y           : previewTile.y + (y * 2),
                    duration    : 100
                });
    
                timeline.add({
                    targets      : previewTile,
                    x            : xx,
                    y            : yy,    
                    duration     : 50
                });
    
                timeline.play();
            }
            
            
        }

        this.scene.preview.fadeOut();
        this.scene.dial.clearSelection();
    }





    answeredWrong(answer){
        if(answer.length > 1) {
            if(answer.length < Constants.MIN_LETTERS){
                this.scene.preview.fadeOut();
                this.scene.dial.clearSelection();        
                return;
            }

            if (!this.isExtraWord(answer)) {
                this.wrongAnswer();
            }
        }else{
            this.scene.preview.fadeOut();
        }

        this.scene.dial.clearSelection();
    }




    isExtraWord(answer){
        if(answer.length > 1 && answer.length < Constants.MIN_LETTERS) return false;

        if(GameData.isVulgarWord(answer)){
            this.scene.showToast(Language.strings["not_bonus_word"]);
            SoundController.playSfx(this.scene, "wrong_word");
            this.scene.preview.fadeOut();
            return true;
        }

        let result = GameData.insertWordToExtraJson(answer);
        let a = (result >> 8) & 0xFF;
        let b = result & 0xFF;

        if(a == 1){
            if(b == 1){
                GameData.incrementFoundBonusWordCount();
                this.animateNewExtraWord();
                this.scene.preview.reset();
            }else{
                let button = this.scene.gameHud.extraWordsButton;
                if(button.animating) return true;
                button.shakeout();
                this.scene.preview.fadeOut();
            }

            return true;
        }

        return false
    }




    wrongAnswer(){
        SoundController.playSfx(this.scene, "wrong_word");
        this.scene.preview.shakeout();
        let error = new Word();
        error.error = true;
        this.queue.addAt(error, 0);

        if(!this.queueRunning && this.queue.length == 1 && this.queue.last.error) {
            this.queueRunning = true;
            this.processQueue();
        }   
    }



    answeredCorrect(foundWord){
        SoundController.playSfx(this.scene, "correct_word");
        if(this.animatedWords.size == 0) this.animatedWords.set(foundWord);
        this.saveDataBeforeLetterAnimation(foundWord);
        this.checkIfLevelEnded();

        this.animateCorrectAnswer(foundWord)
        this.scene.dial.clearSelection();
        this.scene.preview.reset();
        this.stopAnimatingFinalWord = true;
        this.pauseDialTutorial();
    }



    isDialTutorialThere(){
        if( this.scene.tutorialController && 
            this.scene.tutorialController.tutorial && 
            this.scene.tutorialController.tutorial.constructor.name == "DialTutorial"){
                return true;
        }
        return false;
    }



    pauseDialTutorial(){
        if(this.isDialTutorialThere()) this.scene.tutorialController.tutorial.pause(GameData.level.isSolved);
    }



    resumeDialTutorial(){
        if(this.isDialTutorialThere() && !GameData.level.isSolved) this.scene.tutorialController.tutorial.resume();
    }



    saveDataBeforeLetterAnimation(foundWord){
        foundWord.isSolved = true;
        GameData.saveSolvedWord(foundWord.id);
        this.markWordCellsAsSolved(foundWord);
    }




    markWordCellsAsSolved(word){
        let boardTiles = this.scene.board.findWordBoardTiles(word);

        for(let i = 0; i < boardTiles.length; i++){
            let boardTile = boardTiles[i];
            boardTile.cellData.state = Constants.TILE_STATE_SOLVED;
            GameData.saveTileState(boardTile.cellData.x, boardTile.cellData.y, Constants.TILE_STATE_SOLVED);

            if(word.direction == Word.ACROSS) boardTile.cellData.acrossWord.isSolved = true;
            else boardTile.cellData.downWord.isSolved = true;
        }
    }



    checkIfLevelEnded(){
        GameData.level.isSolved = this.scene.board.isBoardSolved(false);
    
        if(GameData.level.isSolved){
            this.scene.input.enabled = false;
            this.saveLevelEndData();
        }
    }




    saveLevelEndData(){
        GameData.updateFirstIncompleteLevelIndex(++GameData.level.index);
        this.clearLevelRelatedData();
    }




    clearLevelRelatedData(){
        GameData.clearTileStates();
        GameData.clearSavedSolvedWordsJson();
        GameData.clearExtraWords();
        GameData.saveComboCount(0);
        GameData.saveComboReward(0);
    }




    animateNewExtraWord(){
        SoundController.playSfx(this.scene, "bonus_word");
        this.scene.gameHud.extraWordsButton.setValue(GameData.getExtraWordsCount() / wordPressParams.num_bonus_words_to_find_for_reward);

        let count = this.scene.preview.tiles.length;
        this.scene.preview.stabilizePosition();

        for(let i = 0; i < count; i++){
            let source = this.scene.preview.tiles[i];
            let global = source.getWorldTransformMatrix();
            this.scene.add.existing(source)
            source.setDepth(this.scene.board.depth + 5);
            source.setPosition(global.tx, global.ty);

            let startPoint      = new Phaser.Math.Vector2(source.x, source.y);
            let endPoint        = new Phaser.Math.Vector2(this.scene.gameHud.extraWordsButton.x, this.scene.gameHud.extraWordsButton.y);
            let controlPoint1   = new Phaser.Math.Vector2(endPoint.x + (startPoint.x - endPoint.x) * 0.5, startPoint.y);
            let controlPoint2   = new Phaser.Math.Vector2(endPoint.x, endPoint.y - (endPoint.y - startPoint.y) * 0.5);
            let bezierCurve     = new Phaser.Curves.CubicBezier(startPoint, controlPoint1, controlPoint2, endPoint);

            let duration = 250;
            let delay    = i * 100;

            let tweenObject = {val: 0}

            this.scene.tweens.add({
                targets         : tweenObject,
                val             : 1,
                duration        : duration,
                delay           : delay,
                ease            : "Sine.easeInOut",
                callbackScope   : this,
                onUpdate        : function(tween, target){
                    let position = bezierCurve.getPoint(target.val);
                    source.setPosition(position.x, position.y);
                    source.setScale(Math.max(0.2, 1 - target.val))
                },
                onComplete      : function(){
                    source.parentContainer.remove(source);
                    source.setActive(false);
                    source.setVisible(false);
                    source.setScale(1);
                    this.scene.gameHud.extraWordsButton.growAndShrink(i == count - 1 ? this.checkNumberOfExtraWords : null, this);
                }
            });

        }
    }





    checkNumberOfExtraWords(){
        if(!GameData.isTutorialSkipped() && !GameData.isExtraWordsTutorialDisplayed() && !this.scene.tutorialController.tutorial){
            GameData.setExtraWordsTutorialDisplayed();
            this.scene.tutorialController.showExtraWordsTutorial();
            return;
        }
        this.scene.gameHud.extraWordsButton.setScale(this.scene.gameHud.btnMultipleHint.scale);
        if(GameData.getExtraWordsCount() < wordPressParams.num_bonus_words_to_find_for_reward) return;

        this.scene.input.enabled = false;
        GameData.resetExtraWordsCount();

        this.scene.gameHud.extraWordsButton.animateMileStone();
    }



    

    animateCorrectAnswer(foundWord){
        let boardTilesToAnimate = this.scene.board.findWordBoardTiles(foundWord);
        this.markAdjacentWordsAsCompletedAfterCorrectAnswer(boardTilesToAnimate, foundWord);
        this.queue.addAt(foundWord, 0);

        let count = this.scene.preview.tiles.length;

        this.scene.preview.stabilizePosition();     
        
        for(let i = 0; i < count; i++){
            let source = this.scene.preview.tiles[i];
            
            let global = source.getWorldTransformMatrix();
            let local  = this.scene.board.getLocalPoint(global.tx, global.ty);
            this.scene.board.add(source);
            source.setPosition(local.x, local.y);

                       
            let duration = 500;
            let delay = i * 100 + 10;

            this.scene.tweens.add({
                targets: source,
                x         : boardTilesToAnimate[i].x,
                y         : boardTilesToAnimate[i].y,  
                ease      : "Cubic.easeInOut",
                delay     : delay,
                duration  : duration,
                callbackScope   : this,
                onComplete: function(){
                    source.explodeParticles();
                    this.scene.board.removePreviewTile(boardTilesToAnimate[i]);

                    boardTilesToAnimate[i].cellData.previewTile = source;
                    source.boardTile = boardTilesToAnimate[i];
                    boardTilesToAnimate[i].setVisible(false);
                    
                    if(i == count - 1){
                        if(!this.queueRunning && this.queue.length > 0){
                            this.queueRunning = true;
                            this.processQueue();
                            this.resumeDialTutorial();
                        }
                    }
                }
            });

            let timeline = this.scene.tweens.createTimeline();

            let sourceScale = source.scale;
            let sourceLarge =  (boardTilesToAnimate[i].height * 2) / source.height;

            let tweenObject = { val: sourceScale }

            timeline.add({
                targets         : tweenObject,
                val             : sourceLarge,
                delay           : delay,
                duration        : duration * 0.3,
                callbackScope   : this,
                onUpdate:function(tween){
                    source.setScale(tween.getValue());
                }
            });

            timeline.add({
                targets         : tweenObject,
                val             : boardTilesToAnimate[i].scale,
                duration        : duration * 0.7,
                callbackScope   : this,
                onUpdate:function(tween){
                    source.setScale(tween.getValue());
                }
            });

            timeline.play();       
        }
    }




    processQueue(){
        if(this.queue.length > 0){
            this.processNextItemInQueue(this.queue.last);
        }
    }




    processNextItemInQueue(next){
        if(next.error){
            this.scene.comboController.resetCombo(this.queueAnimationFinished);
        }else{
            GameData.level.comboCount++;
            GameData.saveComboCount(GameData.level.comboCount);

            if(GameData.level.comboCount > 1){
                let n = GameData.level.comboCount - 1;
                
                this.scene.comboShaderAnim(this.queueAnimationFinished, n);
                this.scene.comboController.showComboFeedback();
                this.scene.comboController.animateDialEffect();
                this.scene.comboController.blastSmoke();
                this.scene.comboController.shakeCamera();
                this.scene.comboController.blastSmoke();
            }else{
                this.scene.time.delayedCall(500, this.queueAnimationFinished, [], this);
            }
        }
    }




    queueAnimationFinished(){
        let word = null;

        if(this.queue.length > 0) {
            word = this.queue.removeAt(this.queue.length - 1);
            if(!word.error){
                this.animatedWords.set(word);
            }
        }

        let allAnimated = this.animatedWords.size == GameData.level.getWordCount();
        if(this.queue.length == 0) this.queueRunning = false;
        
        if(GameData.level.isSolved && allAnimated){
            this.stopAnimatingFinalWord = true;

            GameData.saveComboCount(0);
            GameData.saveComboReward(0);

            this.scene.destroyLevel();
        }else{
            this.finalWordAnimationChecker();
            if(this.queue.length > 0) this.processQueue();
        }

    }



    markAdjacentWordsAsCompletedAfterCorrectAnswer(boardTiles, solvedWord){
        for(let i = 0; i < boardTiles.length; i++){
            this.checkIfAdjacentWordAutomaticallySolved(boardTiles[i], solvedWord);
        }
    }




    checkIfAdjacentWordAutomaticallySolved(boardTile, solvedWord){
        let across = boardTile.cellData.acrossWord;
        let down   = boardTile.cellData.downWord;
        
        if(across != null && !across.isSolved && across.id != solvedWord.id) this.checkAdjacentWordSolved(across);
        if(down   != null && !down.isSolved && down.id != solvedWord.id) this.checkAdjacentWordSolved(down);
    }




    checkAdjacentWordSolved(word){
        let boardTilesToAnimate = this.scene.board.findWordBoardTiles(word);

        for(let i = 0; i < boardTilesToAnimate.length; i++){
            let boardTile = boardTilesToAnimate[i];
            if(boardTile.cellData.state == Constants.TILE_STATE_DEFAULT) return;
        }

        word.isSolved = true;
        this.animatedWords.set(word);
        
        for(let i = 0; i < boardTilesToAnimate.length; i++) boardTilesToAnimate[i].cellData.state = Constants.TILE_STATE_SOLVED;

        this.scene.time.delayedCall(750, this.revealWithDelay, [boardTilesToAnimate], this);
    }





    findAndCompleteInCompleteBoardTilesAfterGivingHint(boardTiles){
        let revealedBoardTiles = [];

        let count = 0;
        for(let i = 0; i < boardTiles.length; i++){
            count += this.findAndCompleteInCompleteWordsOfBoardTile(boardTiles[i], revealedBoardTiles);
        }
        
        this.revealWithDelay(revealedBoardTiles);
        this.checkIfLevelEnded();

        if(count > 0){
            this.scene.time.delayedCall(1000, this.queueAnimationFinished, [], this);
        }
    }




    findAndCompleteInCompleteWordsOfBoardTile(boardTile, boardTiles){
        let across = boardTile.cellData.acrossWord;
        let down   = boardTile.cellData.downWord;

        let count = 0;

        if(across != null && !across.isSolved){
            count += this.completeWord(across, boardTiles);
        }

        if(down != null && !down.isSolved){
            count += this.completeWord(down, boardTiles);
        }
        
        return count;
    }




    completeWord(word, list){
        let boardTilesToAnimate = this.scene.board.findWordBoardTiles(word);
        let count = 0;

        for(let i = 0; i < boardTilesToAnimate.length; i++){
            let boardTile = boardTilesToAnimate[i];
            if(boardTile.cellData.state == Constants.TILE_STATE_REVEALED || boardTile.cellData.state == Constants.TILE_STATE_SOLVED) count++;
        }

        if(count != boardTilesToAnimate.length) return 0;
        
        word.isSolved = true;
        this.markWordCellsAsSolved(word);
        this.animatedWords.set(word);
        GameData.saveSolvedWord(word.id);

        for(let i = 0; i < boardTilesToAnimate.length; i++){
            list.push(boardTilesToAnimate[i]);
        }

        return 1;
    }




    revealWithDelay(list){
        for(let i = 0; i < list.length; i++){
            let boardTile = list[i];
            this.scene.board.removePreviewTile(boardTile);//
            let pt = Preview.newTile(boardTile.cellData.letter, this.scene);
            pt.alpha = 0;
            pt.setScale((boardTile.height * boardTile.scale) / pt.height);
            pt.setPosition(boardTile.x, boardTile.y);
            this.scene.board.add(pt);
            boardTile.cellData.previewTile = pt;
            
            this.scene.tweens.add({
                targets: pt,
                alpha: 1,
                duration: 150,
                onComplete: function(){
                    boardTile.setVisible(false);
                }
            });
        }
    }




    finalWordAnimationChecker(){
        if(this.finalWordAnimRunning) return;

        let words = GameData.level.boardModel.getAllWords(false);
        
        if(words.length == 1){
            this.stopAnimatingFinalWord = false;
            this.finalWord = words[0];
            this.finalWordAnimRunning = true;
            this.initFinalWordAnimation();
        }
    }




    initFinalWordAnimation(){
        if(this.stopAnimatingFinalWord) return;

        let boardTilesToAnimate = this.scene.board.findWordBoardTiles(this.finalWord);
   
        for(let i = 0; i < boardTilesToAnimate.length; i++){
            let tile = boardTilesToAnimate[i];
            if(tile.cellData.previewTile != null) {
                tile = tile.cellData.previewTile;
            }

            let timeline = this.scene.tweens.createTimeline();
            let scale = tile.originalScale ? tile.originalScale : tile.scale;

            if(tile.originalScale) tile.setScale(tile.originalScale);

            timeline.add({
                targets: tile,
                scale: scale * 1.1,
                duration: 200,
                delay: 100 * i
            });
    
            timeline.add({
                targets: tile,
                scale: scale,
                duration: 100,
                onComplete:function(){
                    tile.setScale(scale);
                }
            });

            if(i == boardTilesToAnimate.length - 1) timeline.setCallback('onComplete', function(){
                if(tile.originalScale) tile.setScale(scale);
                this.scene.time.delayedCall(700, this.initFinalWordAnimation, [], this);
            }, [], this);

            timeline.play();
        }
    }


}