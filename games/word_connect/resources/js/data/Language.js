class Language{

    static KEY_SELECTED_LANGUAGE = "KEY_SELECTED_LANGUAGE";

    static strings = null;

    static getCode(){
         return localStorage.getItem(Language.KEY_SELECTED_LANGUAGE);
//        return "ru"
    }



    static setNewLanguage(code){
        Language.code = code;
        localStorage.setItem(Language.KEY_SELECTED_LANGUAGE, code);   
        Language.locale = Language.findLocaleInAvailableLanguages(code);
    }



    static loadFiles(scene){
        GameData.readWords(scene);
        GameData.readVulgarWords(scene);
        GameData.readStringsFile(scene);
    }



    static findLocaleInAvailableLanguages(candidate){
        for(let i = 0; i < AVAILABLE_LANGUAGES.length; i++){
            if(AVAILABLE_LANGUAGES[i].code == candidate) return AVAILABLE_LANGUAGES[i];
        }
        return null;
    }

}