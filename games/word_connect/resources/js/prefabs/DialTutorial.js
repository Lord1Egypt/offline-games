class DialTutorial extends Tutorial{

    constructor(scene){
        super(scene);
    }



    setGameObject(gameObject){
        super.setGameObject(gameObject);
        this.originalShuffleDepth = this.scene.gameHud.btnShuffle.depth;
    }


    show(){
        super.show();
        this.scene.gameHud.btnShuffle.setDepth(this.scene.dial.depth + 3);
    }



    disableSomeUI(){

    }


    pause(destroy){
        this.scene.tweens.add({
            targets : this,
            alpha   : 0,
            duration: 200
        });

        if(destroy) this.hide();
    }



    resume(){
        this.scene.tweens.add({
            targets : this,
            alpha   : 1,
            duration: 200
        });
    }



    hide(){
        super.hide();
        this.scene.gameHud.btnShuffle.setDepth(this.originalShuffleDepth);
    }

}