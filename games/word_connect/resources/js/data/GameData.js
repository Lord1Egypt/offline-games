class GameData{

    static KEY_WORDS_CACHE                  = "KEY_WORDS_CACHE";
    static KEY_VULGAR_CACHE                 = "KEY_VULGAR_CACHE";
    static KEY_STRINGS                      = "KEY_STRINGS";
    static KEY_LEVEL_CACHE                  = "KEY_LEVEL_CACHE";
    static KEY_SAVED_SOLVED_WORDS           = "KEY_SAVED_SOLVED_WORDS";
    static KEY_TILE_STATE                   = "KEY_TILE_STATE";
    static KEY_LAST_INCOMPLETE_LEVEL        = "KEY_LAST_INCOMPLETE_LEVEL";
    static KEY_ACCUMULATED_COMBO_COUNT      = "KEY_ACCUMULATED_COMBO_COUNT";
    static KEY_COMBO_COUNT                  = "KEY_COMBO_COUNT";
    static KEY_COMBO_REWARD                 = "KEY_COMBO_REWARD";
    static KEY_SOLVED_COMBO_COUNT           = "KEY_SOLVED_COMBO_COUNT";
    static KEY_EXTRA_WORDS                  = "KEY_EXTRA_WORDS";
    static KEY_EXTRA_WORD_COUNT             = "KEY_EXTRA_WORD_COUNT";
    static KEY_TUTORIAL_STEP                = "KEY_TUTORIAL_STEP";  
    static KEY_BONUS_WORDS_TUTORIAL_SHOWN   = "KEY_BONUS_WORDS_TUTORIAL_SHOWN";
    static KEY_TUTORIAL_SKIPPED             = "KEY_TUTORIAL_SKIPPED";
    static KEY_LAST_WHEEL_SPIN_TIME         = "KEY_LAST_WHEEL_SPIN_TIME";
    static KEY_SOUND_FX_ON                  = "KEY_SOUND_FX_ON";
    static KEY_SOUND_MUSIC_ON               = "KEY_SOUND_MUSIC_ON";
    static level                            = null;
    static wordMap;



    static readWords(scene, callback){
        if(scene.cache.text.has(GameData.KEY_WORDS_CACHE)){
            GameData.parseWords(scene);
        }else{
            let fileName = wordPressParams.resourcePath + "resources/assets/data/" + Language.getCode() + "/words.txt";
        
            scene.load.text(GameData.KEY_WORDS_CACHE, fileName);
            scene.load.once('complete', function(){
                GameData.parseWords(scene, callback);    
            });
            scene.load.start();
        }    
    }



    static parseWords(scene, callback){
        if(GameData.wordMap == null) GameData.wordMap = new Phaser.Structs.Map();
        else GameData.wordMap.clear();

        let words = scene.cache.text.get(GameData.KEY_WORDS_CACHE);
        let split = words.split(":");

        for(let i = 0; i < split.length; i += 2){
            GameData.wordMap.set(split[i], split[i + 1]);
        }
        if(callback) callback.apply(scene);
    }



    static readVulgarWords(scene, callback){
        if(scene.cache.text.has(GameData.KEY_VULGAR_CACHE)){
            GameData.parseVulgarWords(scene);
        }else{
            let fileName = wordPressParams.resourcePath + "resources/assets/data/" + Language.getCode() + "/vulgar.txt";
        
            scene.load.text(GameData.KEY_VULGAR_CACHE, fileName);
            scene.load.once('complete', function(){
                GameData.parseVulgarWords(scene, callback);
            });
            scene.load.start();
        }
    }



    static parseVulgarWords(scene, callback){
        let words = scene.cache.text.get(GameData.KEY_VULGAR_CACHE);
        GameData.vulgarWords = new Phaser.Structs.Set(words.split(","));
        if(callback) callback.apply(scene);
    }



    static readStringsFile(scene, callback){
        if(scene.cache.json.has(GameData.KEY_STRINGS)){
            GameData.parseStringsFile(scene);
        }else{
            let fileName = wordPressParams.resourcePath + "assets/data/" + Language.getCode() + "/strings.json"
            scene.load.json(GameData.KEY_STRINGS, fileName);
            scene.load.once('complete', function(){
                GameData.parseStringsFile(scene, callback);
            });
            scene.load.start();
        }
    }



    static parseStringsFile(scene, callback){
        Language.strings = scene.cache.json.get(GameData.KEY_STRINGS);
        if(scene.cache.json.has(GameData.KEY_STRINGS)) scene.cache.json.remove(GameData.KEY_STRINGS);
        if(callback) callback.apply(scene);
    }



    static isVulgarWord(word){
        return GameData.vulgarWords.contains(word);
    }



    static findFirstIncompleteLevel(){
        let key = GameData.getLocaleAwareKey(GameData.KEY_LAST_INCOMPLETE_LEVEL);
        return JSON.parse(localStorage.getItem(key)) || 0;
    }



    static updateFirstIncompleteLevelIndex(index){
        let key = GameData.getLocaleAwareKey(GameData.KEY_LAST_INCOMPLETE_LEVEL);
        localStorage.setItem(key, JSON.stringify(index));
    }



    static getLevelByIndex(index, scene, gameController, callback){
        if(GameData.level == null) GameData.level = new Level();
        else GameData.level.reset();

        GameData.level.index = index;
        
        let fileName = wordPressParams.resourcePath + "resources/assets/data/" + Language.getCode() + "/levels/" + index;

        scene.load.json(GameData.KEY_LEVEL_CACHE, fileName);
        scene.load.once('complete', function(){
            GameData.parseLevelData(scene.cache.json.get(GameData.KEY_LEVEL_CACHE), gameController, callback);
            scene.cache.json.remove(GameData.KEY_LEVEL_CACHE);
        });
        scene.load.start(); 
    }



    static parseLevelData(data, gameController, callback){
        let o       = data["o"];
        let split   = o.split(",");

        GameData.level.boardModel.width  = parseInt(split[0]);
        GameData.level.boardModel.height = parseInt(split[1]);

        let solvedWords = GameData.getSolvedWords();

        GameData.jsonToWords(GameData.level.boardModel.acrossWords, data["a"], Word.ACROSS, solvedWords);
        GameData.jsonToWords(GameData.level.boardModel.downWords,   data["d"], Word.DOWN,   solvedWords);   

        GameData.level.letters = split[2].split("");
        Dial.shuffleArr(GameData.level.letters);
        
        callback.call(gameController);   
    }



    static getSolvedWords(){
        let key = GameData.getLocaleAwareKey(GameData.KEY_SAVED_SOLVED_WORDS);
        let arr = GameData.readJsonArrayFromLocalStorage(key);
        let set = new Phaser.Structs.Set();

        for(let i = 0; i < arr.length; i++) set.set(arr[i]);
        return set;
    }



    static jsonToWords(target, words, direction, solvedWords){
        if(wordPressParams.console_log) console.log("---- WORDS FOR LEVEL " + (GameData.level.index + 1) + " (" + direction + ") ----");
        for(let i = 0; i < words.length; i++){
            let word = new Word();
            let split = words[i].split(",");
            
            word.id         = parseInt(split[0]);
            word.answer     = GameData.wordMap.get(word.id);
            word.x          = parseInt(split[1]);
            word.y          = parseInt(GameData.level.boardModel.height - split[2] - 1);
            word.isSolved   = solvedWords.contains(word.id);
            word.direction  = direction;
            target.push(word);
            if(wordPressParams.console_log) console.log(word.answer);
        }
    }



    static readTileStates(){
        let key     = GameData.getLocaleAwareKey(GameData.KEY_TILE_STATE);
        let object  = GameData.readJsonMapFromLocalStorage(key);
        let map     = new Phaser.Structs.Map();

        for(let a in object) map.set(a, object[a]);
        return map;
    }



    static getLocaleAwareKey(key){
        return key + "_" + Language.getCode();
    }



    static saveComboCount(count){
        let key = GameData.getLocaleAwareKey(GameData.KEY_COMBO_COUNT);
        localStorage.setItem(key, JSON.stringify(count));
    }



    static getComboCount(){
        let key = GameData.getLocaleAwareKey(GameData.KEY_COMBO_COUNT);
        return JSON.parse(localStorage.getItem(key)) || 0;
    }



    static saveComboReward(count){
        let key = GameData.getLocaleAwareKey(GameData.KEY_COMBO_REWARD);
        localStorage.setItem(key, JSON.stringify(count));
    }



    static getComboReward(){
        let key = GameData.getLocaleAwareKey(GameData.KEY_COMBO_REWARD);
        return JSON.parse(localStorage.getItem(key)) || 0;
    }



    static getAccumulatedComboCount(){
        let key = GameData.getLocaleAwareKey(GameData.KEY_ACCUMULATED_COMBO_COUNT);
        return JSON.parse(localStorage.getItem(key)) || 0;
    }



    static saveAccumulatedComboCount(count){
        let key = GameData.getLocaleAwareKey(GameData.KEY_ACCUMULATED_COMBO_COUNT);
        localStorage.setItem(key, JSON.stringify(count));
    }


    static saveSolvedComboCount(count){
        let key = GameData.getLocaleAwareKey(GameData.KEY_SOLVED_COMBO_COUNT);
        localStorage.setItem(key, JSON.stringify(count));
    }



    static getSolvedComboCount(){
        let key = GameData.getLocaleAwareKey(GameData.KEY_SOLVED_COMBO_COUNT);
        return JSON.parse(localStorage.getItem(key)) || 0;
    }



    static saveSolvedWord(id){
        let key = GameData.getLocaleAwareKey(GameData.KEY_SAVED_SOLVED_WORDS);
        let arr = GameData.readJsonArrayFromLocalStorage(key);
        arr.push(id);
        localStorage.setItem(key, JSON.stringify(arr));
    }



    static clearSavedSolvedWordsJson(){
        let key = GameData.getLocaleAwareKey(GameData.KEY_SAVED_SOLVED_WORDS);
        localStorage.setItem(key, "[]");
    }



    static saveTileState(x, y, type){
        let key     = GameData.getLocaleAwareKey(GameData.KEY_TILE_STATE);
        let object  = GameData.readJsonMapFromLocalStorage(key);
        let k       = (x << 8) | y;
        object[k]   = type;
        localStorage.setItem(key, JSON.stringify(object));
    }



    static clearTileStates(){
        let key = GameData.getLocaleAwareKey(GameData.KEY_TILE_STATE);
        localStorage.setItem(key, "{}");
    }



    static readJsonArrayFromLocalStorage(key){
        let json = localStorage.getItem(key) || "[]";
        return JSON.parse(json);
    }



    static readJsonMapFromLocalStorage(key){
        let json = localStorage.getItem(key) || "{}";
        return JSON.parse(json);
    }



    static insertWordToExtraJson(word){
        let a = 0, b = 0;
        let wordId = GameData.isExtraWord(word);
        
        if(wordId > 0){
            a = 1;
            let exists = GameData.doesWordExistInExtraJson(wordId);
            if(!exists){
                b = 1;
                GameData.addWordToExtraJson(wordId);
            }else{
                b = 0;
            }
        }

        return (a << 8) | b;
    }



    static addWordToExtraJson(wordId){
        let key = GameData.getLocaleAwareKey(GameData.KEY_EXTRA_WORDS);
        let arr = GameData.readJsonArrayFromLocalStorage(key);
        arr.push(Number(wordId));
        localStorage.setItem(key, JSON.stringify(arr));
    }



    static getExtraWords(){
        let key = GameData.getLocaleAwareKey(GameData.KEY_EXTRA_WORDS);
        return GameData.readJsonArrayFromLocalStorage(key);
    }



    static isExtraWord(word){
        let keys = GameData.wordMap.keys();

        for(let i = 0; i < keys.length; i++){
            let value = GameData.wordMap.get(keys[i])
            if(word == value) return keys[i];
        }

        return 0;
    }



    static doesWordExistInExtraJson(wordId){
        let key = GameData.getLocaleAwareKey(GameData.KEY_EXTRA_WORDS);
        let arr = GameData.readJsonArrayFromLocalStorage(key);

        for(let i = 0; i < arr.length; i++){
            if(wordId == arr[i]) return true;
        }

        return false;
    }



    static incrementFoundBonusWordCount(){
        let count = GameData.getExtraWordsCount();
        count++;

        let key = GameData.getLocaleAwareKey(GameData.KEY_EXTRA_WORD_COUNT);
        localStorage.setItem(key, JSON.stringify(count));
    }



    static getExtraWordsCount(){
        let key = GameData.getLocaleAwareKey(GameData.KEY_EXTRA_WORD_COUNT);
        return JSON.parse(localStorage.getItem(key)) || 0;
    }



    static resetExtraWordsCount(){
        let key = GameData.getLocaleAwareKey(GameData.KEY_EXTRA_WORD_COUNT);
        localStorage.setItem(key, "0");
    }



    static clearExtraWords(){
        let key = GameData.getLocaleAwareKey(GameData.KEY_EXTRA_WORDS);
        localStorage.removeItem(key);
    }



    static getTutorialStep(){
        return JSON.parse(localStorage.getItem(GameData.KEY_TUTORIAL_STEP)) || 0;
    }



    static setTutorialStep(step){
        localStorage.setItem(GameData.KEY_TUTORIAL_STEP, JSON.stringify(step));
    }



    static isExtraWordsTutorialDisplayed(){
        return localStorage.getItem(GameData.KEY_BONUS_WORDS_TUTORIAL_SHOWN) === "true";
    }



    static setExtraWordsTutorialDisplayed(){
        localStorage.setItem(GameData.KEY_BONUS_WORDS_TUTORIAL_SHOWN, "true");
    }



    static setTutorialSkipped(){
        localStorage.setItem(GameData.KEY_TUTORIAL_SKIPPED, "true");
    }



    static isTutorialSkipped(){
        return localStorage.getItem(GameData.KEY_TUTORIAL_SKIPPED) === "true";
    }



    static getLastSpinTime(){
        return JSON.parse(localStorage.getItem(GameData.KEY_LAST_WHEEL_SPIN_TIME)) || 0;
    }



    static saveLastSpinTime(){
        localStorage.setItem(GameData.KEY_LAST_WHEEL_SPIN_TIME, JSON.stringify(new Date().getTime()));
    }



    static isFxSoundOn(){
        if (localStorage.getItem(GameData.KEY_SOUND_FX_ON) === null) return true;
        return localStorage.getItem(GameData.KEY_SOUND_FX_ON) === "true";
    }



    static setFxSoundOn(on){
        localStorage.setItem(GameData.KEY_SOUND_FX_ON, on ? "true" : "false");
    }



    static isMusicSoundOn(){
        if (localStorage.getItem(GameData.KEY_SOUND_MUSIC_ON) === null) return true;
        return localStorage.getItem(GameData.KEY_SOUND_MUSIC_ON) === "true";
    }


    
    static setMusicSoundOn(on){
        localStorage.setItem(GameData.KEY_SOUND_MUSIC_ON, on ? "true" : "false");
    }
}