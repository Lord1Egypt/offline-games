let logEvents = true;

function willStartRunningApp() {
    if(logEvents) console.log("Event [willStartRunningApp]");
}



function languageSetTo(lang) {
    if(logEvents) console.log("Event [languageSetTo]", arguments);
}



function sceneCreated(scene){
    if(logEvents) console.log("Event [sceneCreated]", arguments);
}



function earnedDailyReward(scene, coinAmount, totalCoins) {
    if(logEvents) console.log("Event [earnedDailyReward]", arguments);
}



function earnedBonusWordsReward(scene, coinAmount, totalCoins) {
    if(logEvents) console.log("Event [earnedBonusWordsReward]", arguments);
}



function earnedLevelMileStoneReward(scene, coinAmount, totalCoins) {
    if(logEvents) console.log("Event [earnedLevelMileStoneReward]", arguments);
}



function levelStarted(scene, levelIndex, coinCount) {
    if(logEvents) {
	    console.log("Event [levelStarted]", arguments[1]+1);
 	     Android.levelStartInGame(parseInt(arguments[1])+1);
	    }
}


function levelFinished(scene, levelIndex, coinCount, comboCount) {
    if(logEvents) console.log("Event [levelFinished]", levelIndex);
 	     Android.levelCompleteInGame(levelIndex);
}


/**
 * This function runs when the Next button is hit at the end of a level, just before a new level is loaded.
 * You can display an ad here and then run the videoAdComplete function below. 
 * The videoAdComplete function will load the subsequent level after the ad is finished. Therefore, you
 * should call the videoAdComplete function when is ad ends or the its close button is clicked.
 * Currently, the newLevelWillStart function directly starts the new level. If you plan to show ad,
 * then you should uncomment the 'scene.levelEnd.loadNextScene();' line, as it will be called by the
 * videoAdComplete.
 */
function newLevelWillStart(scene){
    if(logEvents) console.log("Event [newLevelWillStart]", arguments);
//     alert(parseInt(arguments[1])+1);
//scene.levelEnd.loadNextScene().
    scene.levelEnd.loadNextScene();
}


/*
* This function may serve as a callback to your video ad, when it ends.
* Assuming that you may want to reward the user with some coins, it
* adds 20 coins to user's account. After adding the coins it plays a
* sound effect to let the user know about it. 
* It is currently unused, you should read your ad provider's
* documentation and use it accordingly.
*/
function videoAdComplete(scene){
    if(scene.hintController){
        let count = 20;
        let targetValue = scene.hintController.getRemainingCoins() + count;
        scene.hintController.setCoinCount(targetValue);
        if(scene.introHud) scene.introHud.coinMeter.setCount(targetValue);
        if(scene.gameHud) scene.gameHud.coinMeter.setCount(targetValue);
        SoundController.playSfx(scene, "add_coins");
        scene.levelEnd.loadNextScene();
    }
}