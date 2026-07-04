class SpriteButton extends Phaser.GameObjects.Sprite{
    
    constructor(scene, x, y, sheetKey, upKey, downKey) {
        super(scene, x, y, sheetKey, upKey);
        this.downKey = downKey;
        this.upKey = upKey;
        this.setInteractive({useHandCursor: wordPressParams.use_hand_cursor_for_buttons});
        this.setStates();
        this.enabled = true;
    }



    setCallback(callback, callbackContext){
        this.callback = callback;
        this.callbackContext = callbackContext
    }


    setStates(){
        this.on('pointerup', this.onRelease, this).on('pointerdown', this.onPress, this).on('pointerout', this.releaseAction, this);
    }


    onPress(){
        if(this.enabled && this.downKey != null) this.setFrame(this.downKey);
    }


    onRelease(){
        if(!this.enabled) return;
        this.releaseAction();
        if(this.callback) this.callback.call(this.callbackContext);
    }





    releaseAction(){
        if(this.enabled && this.downKey != null){
            this.setFrame(this.upKey);
        }
    }

}



class SpriteTextButton extends Phaser.GameObjects.Container{

    constructor(scene, x, y, sheetKey, upKey, downKey, text){
        super(scene);

        this.spriteButton = new SpriteButton(scene, x, y, sheetKey, upKey, downKey);
        this.setSize(this.spriteButton.width, this.spriteButton.height);
        this.add(this.spriteButton);

        this.label = new Phaser.GameObjects.Text(this.scene,
            0, 
            -5,
            " ",
            {fontFamily: FONT, fontSize: 44, color: '#ffffff', align: 'center', fontStyle: "bold"}
        ).setShadow(3, 3, "#2f6e32", 2, true, true).setOrigin(0.5);

        this.setLabelText(text);

        this.add(this.label);
    }




    setLabelText(text){
        this.label.setText(text);
        let maxNextWidth = this.spriteButton.width * 0.8;
        if(this.label.width > maxNextWidth) this.label.setScale(maxNextWidth / this.label.width);
    }



    setCallback(callback, callbackContext){
        this.spriteButton.setCallback(callback, callbackContext);
    }

}
