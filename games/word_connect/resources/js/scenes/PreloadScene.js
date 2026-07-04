
class PreloadScene extends Phaser.Scene{

    constructor(){
        super({key: "PreloadScene", active: true});   
    }


    init(){
        let scene = this;
        window.onbeforeunload = function () {
            try{
                if (scene.scale.isFullscreen) scene.scale.stopFullscreen();
            }catch(err){
            }
        };
    }




    preload(){
        this.checkLanguage();

        let path = wordPressParams.resourcePath;

        this.load.image("well_done_" + Language.getCode(), path + "resources/assets/textures/well_done.png");
        this.load.image("logo_" + Language.getCode(), path + "resources/assets/textures/logo.png");
        // this.load.image("well_done_" + Language.getCode(), path + "resources/assets/textures/" + Language.getCode() + "resources/assets/textures/well_done.png");
        // this.load.image("logo_" + Language.getCode(), path + "resources/assets/textures/" + Language.getCode() + "resources/assets/textures/logo.png");
        
        this.load.image("background", path + "resources/assets/textures/background.jpg");

        this.load.plugin('rexninepatchplugin', path + 'resources/js/rexninepatchplugin.min.js', true);
        this.load.plugin('rexcircularprogressplugin', path + 'resources/js/rexcircularprogressplugin.min.js', true);
        
        this.load.multiatlas("sheet1", path + "resources/assets/textures/sheet1.json", path + "resources/assets/textures");
        
        this.load.audioSprite('sfx', path + 'resources/assets/audio/gameaudio.json', [path + 'resources/assets/audio/gameaudio.ogg']);
        this.load.audio('music', [path + 'resources/assets/audio/music.ogg']);
        
        this.load.json(GameData.KEY_STRINGS, path + "resources/assets/data/" + Language.getCode() + "resources/assets/data/es/strings.json");
        this.load.text(GameData.KEY_WORDS_CACHE, path + "resources/assets/data/" + Language.getCode() + "resources/assets/data/es/words.txt")
        this.load.text(GameData.KEY_VULGAR_CACHE, path + "resources/assets/data/" + Language.getCode() + "resources/assets/data/es/vulgar.txt");
    }



    create(){
        Language.loadFiles(this);
        this.scene.start("IntroScene");
        sceneCreated(this);
    }




    checkLanguage(){
        let locale = Language.getCode();

        if(!locale){
            if(wordPressParams.default_language && wordPressParams.default_language != "auto"){
                Language.setNewLanguage(wordPressParams.default_language);    
            }else{//if auto
                var browserLocale = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
                if(browserLocale){
                    if(browserLocale.trim().length == 5){
                        let parts = browserLocale.trim().split("-");
                        let code = parts[0].trim();
                        if(Language.findLocaleInAvailableLanguages(code)){
                            Language.setNewLanguage(code);
                        }else{
                            Language.setNewLanguage(AVAILABLE_LANGUAGES[0].code);        
                        }  
                    }
                }else{
                    Language.setNewLanguage(AVAILABLE_LANGUAGES[0].code);
                }   
            }
        }else{
            Language.setNewLanguage(locale);
        }

        languageSetTo(Language.getCode());
    }

}


