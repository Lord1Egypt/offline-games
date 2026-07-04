//If you are NOT using Wordpress, do your settings below.
//They are named as 'wordPressParams', because they are
//automatically set by Wordpress admin panel if you are using it.
//If you are using another CMS or none of them, just do your settings below:

if(typeof wordPressParams == "undefined"){
    wordPressParams = {
        //Don't change this
        resourcePath: "",

        //This is a handy feature when you're debugging the game. Make it false in production.
        console_log: true,

        //Settings for coins and reveals.

        //Coins
        single_random_reveal_cost: 100,

        //Coins
        multi_random_reveal_cost: 300,

        //Coins
        finger_reveal_cost: 200,

        //Total combos for milestone reward
        num_combo_required_for_coin_reward: 300,

        //Coin reward
        num_coins_awarded_for_combo: 25,

        //Words that are not in the board
        num_bonus_words_to_find_for_reward: 50,

        //Coin reward
        num_coins_awarded_for_bonus_words: 25,

        //Number of coins at the very beginning
        default_coin_count: 5000,

        //Turn on/off daily reward
        enable_daily_reward: true,

        //Mouse cursor when hovering the buttons
        use_hand_cursor_for_buttons: true,
        
        //Music on/off
        bg_music_enabled: true,

        //Background volume level between 0-1
        bg_music_volume: 0.1,

        //For English dictionary, visit: https://developer.wordnik.com/
        wordnik_api_key: '',

        //2-letter language code in lower case (eg. 'en', 'es', 'gr', 'pt') or 'auto' according to browser language
        default_language: 'auto',

        //The line color between letters
        dial_line_color: '#e63941',

        //Color of the HTML Canvas component where the game is rendered
        canvas_color: '#fa85b1',

        //Show full screen button or not
        enable_full_screen_button: false,

        //If selected, the game goes full screen on mobile when the play button is tapped
        auto_full_screen_mobile: true,

        //If selected, the game goes full screen on desktop when the play button is tapped
        auto_full_screen_desktop: false,

        //On IOS full screen, Safari puts a close button on the top-left of the screen that hides some buttons, this setting adds some margin to make them visible again
        push_btns_on_ios: true
    };
}else{
    //Don't change anything in this block of code
    wordPressParams.console_log = wordPressParams.console_log === '1';
    wordPressParams.single_random_reveal_cost = parseInt(wordPressParams.single_random_reveal_cost);
    wordPressParams.multi_random_reveal_cost = parseInt(wordPressParams.multi_random_reveal_cost);
    wordPressParams.finger_reveal_cost = parseInt(wordPressParams.finger_reveal_cost);
    wordPressParams.num_combo_required_for_coin_reward = parseInt(wordPressParams.num_combo_required_for_coin_reward);
    wordPressParams.num_coins_awarded_for_combo = parseInt(wordPressParams.num_coins_awarded_for_combo);
    wordPressParams.num_bonus_words_to_find_for_reward = parseInt(wordPressParams.num_bonus_words_to_find_for_reward);
    wordPressParams.num_coins_awarded_for_bonus_words = parseInt(wordPressParams.num_coins_awarded_for_bonus_words);
    wordPressParams.default_coin_count = parseInt(wordPressParams.default_coin_count);
    wordPressParams.use_hand_cursor_for_buttons = wordPressParams.use_hand_cursor_for_buttons === '1';
    wordPressParams.bg_music_enabled = wordPressParams.bg_music_enabled === '1';
    wordPressParams.bg_music_volume = parseFloat(wordPressParams.bg_music_volume) / 100.0;
    wordPressParams.auto_full_screen_mobile = wordPressParams.auto_full_screen_mobile === '1';
    wordPressParams.auto_full_screen_desktop = wordPressParams.auto_full_screen_desktop === '1';
    wordPressParams.push_btns_on_ios = wordPressParams.push_btns_on_ios === '1';
} 


/*
* You can remove the languages you don't want. If you delete any of them
* you should also delete the corresponding files/folders in assets/data and assets/textures.
* If you add a new language don't forget to enter its level count below.
*/
let AVAILABLE_LANGUAGES = [
    {label: "English",   code: "en", hasDictionary: true,  levelCount: 10034},
    {label: "Türkçe",    code: "tr", hasDictionary: false, levelCount: 10032},
    {label: "Español",   code: "es", hasDictionary: false, levelCount: 10003},
    {label: "Deutsch",   code: "de", hasDictionary: false, levelCount: 10007},
    {label: "Português", code: "pt", hasDictionary: false, levelCount: 10053},
    {label: "Français",  code: "fr", hasDictionary: false, levelCount: 10034},
    {label: "Italiano",  code: "it", hasDictionary: false, levelCount: 10007},
    {label: "Язык",      code: "ru", hasDictionary: false, levelCount: 10008}
];




/*
* Daily reward configuration, i.e. the lucky wheel.
* As its name suggests, the probabability field adjusts the chance
* of that item to hit. Make sure that the total number of
* probability is exactly 100.
*/
let WHEEL_SLICES = [
    {text:"15", quantity: 15, probability: 17},
    {text:"50", quantity: 50, probability: 16},
    {text:"25", quantity: 25, probability: 16},
    {text:"500", quantity: 500, probability: 1},
    {text:"75", quantity: 75, probability: 16},
    {text:"35", quantity: 35, probability: 17},
    {text:"100", quantity: 100, probability: 16},
    {text:"750", quantity: 750, probability: 1}
];




/*
* Number of letters to reveal when the user hits the multiple random hint
* button. The more the grid size, the more letters are revealed.
*/
function getNumberOfTilesToRevealForMultiRandomHint(levelIndex){
    if(levelIndex < 100) return 3;
    else if(levelIndex < 200) return 4;
    else if(levelIndex < 300) return 5;
    else if(levelIndex < 500) return 6;
    else return 7;
}


/**
* You shouldn't change the default font family. The game was first made
* with a google font but that made the game run too slow on
* mobile devices. This settings is here for that reason.
*/
let FONT = "Arial";