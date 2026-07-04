class SoundController{

    static sfx_unmuted;
    static music;

    static playSfx(scene, file){
        if(SoundController.sfx_unmuted) scene.sound.playAudioSprite('sfx', file);
    }


    static stopSfx(scene){
        if(SoundController.sfx_unmuted) scene.sound.stopByKey('sfx');
    }

}