class Dial extends Phaser.GameObjects.Container{

    constructor(scene){
        super(scene);

        let bg = this.scene.add.sprite(0, 0, "sheet1", "dial");
        this.add(bg);

        this.setSize(bg.width, bg.height);
        this.setInteractive();
        this.setEnabled(true);
        
        this.lineContainer = this.scene.add.container(0, 0);
        this.add(this.lineContainer);

        this.dialButtonPool = this.scene.add.group({
            classType: DialButton,
            maxSize: 8,
            runChildUpdate: false
        });

        wordPressParams.dial_line_color = Phaser.Display.Color.HexStringToColor(wordPressParams.dial_line_color);
        wordPressParams.dial_line_color = (wordPressParams.dial_line_color.red << 16) | (wordPressParams.dial_line_color.green << 8) | wordPressParams.dial_line_color.blue;

        this.dialButtons = [];
        this.revolutions = [];
        this.buttonPosition = new Phaser.Math.Vector2(0, 0);
        this.selectedButtons = [];
        this.dragging = false;
        this.gameController = null;        
    }



    setEnabled(enabled){
        if(enabled) {
            this.scene.input.on("pointerdown", this.mouseDown, this);
            this.scene.input.on("pointermove", this.mouseMove, this);
            this.scene.input.on("pointerup",   this.mouseUp,   this);
        }else{
            this.scene.input.off("pointerdown", this.mouseDown, this);
            this.scene.input.off("pointermove", this.mouseMove, this);
            this.scene.input.off("pointerup",   this.mouseUp,   this);
        } 
    }




    setLetters(letters){
        this.letters = letters;

        this.calculateOffsetAngleToMakeSymmetric();
        let buttonScale = this.calculateDialButtonScale(letters.length);
        
        for(let i = 0; i < letters.length; i++){
            let dialButton  = this.dialButtonPool.get();
            dialButton.setActive(true);
            dialButton.setVisible(true);
            dialButton.setData(i, letters[i], this.rotationStartAngle);
            dialButton.setScale(buttonScale);
            this.add(dialButton);

            this.dialButtons.push(dialButton);

            this.calculateDialLetterPosition();
            dialButton.x = this.buttonPosition.x;
            dialButton.y = this.buttonPosition.y;
        }
    }




    calculateDialLetterPosition(){
        let radius = this.calculateRadius();
        this.buttonPosition.x = radius * Math.cos(Phaser.Math.DegToRad(this.rotationStartAngle));
        this.buttonPosition.y = radius * Math.sin(Phaser.Math.DegToRad(this.rotationStartAngle));
        this.rotationStartAngle += this.rotationIncrement;
    }




    calculateRadius(){
        const margin = 5;
        return this.width * 0.5 - (this.dialButtons[0].width * this.dialButtons[0].scaleX * 0.5) - margin;
    }




    calculateOffsetAngleToMakeSymmetric(){
        switch(this.letters.length){
            case 3:
                this.rotationStartAngle = -30.0;
                break;
            case 4:
                this.rotationStartAngle = 90.0;
                break;
            case 5:
                this.rotationStartAngle = -55.0;
                break;
            case 6:
                this.rotationStartAngle = -30.0;
                break;
            case 7:
                this.rotationStartAngle = -65.0;
                break;
            case 8:
                this.rotationStartAngle = -90.0;
                break;
            case 9:
                this.rotationStartAngle = -70.0;
            case 10:
                this.rotationStartAngle = -90.0;
        }

        this.rotationIncrement = -1.0 / this.letters.length * 360.0;
    }





    calculateDialButtonScale(total){
        switch (total){
            case 3:
                return 1.0;
            case 4:
                return 0.8;
            case 5:
                return 0.75;
            case 6:
                return 0.7;
            case 7:
                return 0.65;
            case 8:
                return 0.6;
            default:
                return 1.0;
        }
    }


    

    mouseDown(pointer){        
        let local = this.getLocalPoint(pointer.x, pointer.y);
        
        for(let i = 0; i < this.dialButtons.length; i++){
            if(this.isTouchInBounds(this.dialButtons[i], local.x, local.y)) this.addDialButtonToSelection(this.dialButtons[i]);
        }
        this.dragging = true;
    }




    isTouchInBounds(dialButton, x, y){
        let radius = dialButton.width * dialButton.scaleX * 0.5;
        let centerX = dialButton.x;
        let centerY = dialButton.y;
        let diffX = x - centerX;
        let diffY = y - centerY;

        return radius >= Math.sqrt(diffX * diffX + diffY * diffY);
    }




    addDialButtonToSelection(dialButton){
        if(dialButton.isSelected()) return;

        dialButton.setSelected(true);
        this.selectedButtons.push(dialButton);
        this.gameController.selectingLetters(this.selectedButtonsToString());
        SoundController.playSfx(this.scene, "select_" + this.selectedButtons.length);
    }




    mouseMove(pointer){
        if(!pointer.isDown) return;
        let local = this.getLocalPoint(pointer.x, pointer.y);

        if(this.dragging){
            for(let i = 0; i < this.dialButtons.length; i++){
                if(this.isTouchInBounds(this.dialButtons[i], local.x, local.y)) this.dialButtonHovered(this.dialButtons[i])
            }
            this.drawConnections(local.x, local.y);
        }
    }




    dialButtonHovered(dialButton){
        if(!dialButton.isLineSnapped){
            this.addDialButtonToSelection(dialButton);
        }else{
            if(this.selectedButtons.length >= 2){
                if(dialButton.id == this.selectedButtons[this.selectedButtons.length - 2].id){
                    this.selectedButtons[this.selectedButtons.length - 1].removeLine();
                    this.selectedButtons[this.selectedButtons.length - 2].isLineSnapped = false;
                    this.selectedButtons[this.selectedButtons.length - 1].setSelected(false);
                    this.selectedButtons.pop();
                    this.gameController.selectingLetters(this.selectedButtonsToString());
                }
            }
        }
    }




    drawConnections(x, y){
        for(let i = 0; i < this.selectedButtons.length; i++){
            let dialButton = this.selectedButtons[i];
            
            if(dialButton.line == null || !dialButton.line.visible){
                this.createLineForDialButton(dialButton);
                dialButton.line.visible = true;

                if(i > 0 && !this.selectedButtons[i - 1].isLineSnapped){
                    this.selectedButtons[i - 1].isLineSnapped = true;
                    let x1 = dialButton.x;
                    let y1 = dialButton.y;
                    this.drawLine(this.selectedButtons[i - 1], x1, y1);
                }
            }else{
                if(!dialButton.isLineSnapped){
                    this.drawLine(dialButton, x, y);
                }
            }
        }
    }




    drawLine(dialButton, x1, y1){
        dialButton.line.clear();
        dialButton.line.lineStyle(this.calculateLineThickness(this.letters.length), wordPressParams.dial_line_color, 1.0);
        dialButton.line.beginPath();
        dialButton.line.lineBetween(x1, y1, dialButton.x, dialButton.y);
        dialButton.line.closePath();
        dialButton.line.strokePath();
    }




    calculateLineThickness(total){
        switch (total){
            case 3:
                return 20;
            case 4:
                return 18;
            case 5:
                return 16;
            case 6:
                return 14;
            case 7:
                return 12;
            case 8:
                return 10;
            default:
                return 10;
        }
    }




    createLineForDialButton(dialButton){
        if(dialButton.line == null){
            dialButton.line = this.scene.add.graphics();
            this.lineContainer.add(dialButton.line);
        }
    }



    mouseUp(){
        if(this.selectedButtons.length == 0) return;

        let answer = this.selectedButtonsToString();
        if(answer != null && answer.length > 0) this.gameController.selectingLettersFinished(answer);
        this.dragging = false;
    }



    selectedButtonsToString(){
        let text = "";

        for(let i = 0; i < this.selectedButtons.length; i++) text = text.concat(this.selectedButtons[i].char);
        return text;
    }




    shuffle(){
        SoundController.playSfx(this.scene, "shuffle");

        if( this.scene.tutorialController && 
            this.scene.tutorialController.tutorial && 
            this.scene.tutorialController.tutorial.step == Constants.TUTORIAL_SHUFFLE){
                this.scene.tutorialController.tutorial.hide();
        }
        
        this.scene.input.enabled = false;
        
        this.revolutions.length = 0;

        for(let i = 0; i < this.dialButtons.length; i++) this.revolutions.push(this.dialButtons[i].revolution);
        
        for(let i = 0; i < this.dialButtons.length; i++){
            while(this.dialButtons[i].revolution == this.revolutions[i]) Dial.shuffleArr(this.revolutions);
        }

        let radius = this.calculateRadius();

        this.scene.tweens.add({
            targets       : this,
            angle         : -360,
            duration      : this.shuffleTime(),
            easing        : "Quad.easeInOut",
            callbackScope : this,
            onComplete    : function name() {
                for(let i = 0; i < this.revolutions.length; i++){
                    let dialButton = this.dialButtons[i];
                    this.scene.tweens.add({
                        targets: dialButton,
                        x: Math.cos(Phaser.Math.DegToRad(dialButton.revolution)) * radius,
                        y: Math.sin(Phaser.Math.DegToRad(dialButton.revolution)) * radius,
                        duration: 100,
                        ease: "Cubic.easeOut",
                        callbackScope : this,
                        onComplete: function(){
                            this.scene.input.enabled = true;
                        }
                    });
                }
            }
        });

        let inside = radius - 5;

        this.scene.time.delayedCall(100, function(){
            for(let i = 0; i < this.revolutions.length; i++){
                let dialButton = this.dialButtons[i];
                dialButton.revolution = this.revolutions[i];
                dialButton.setPosition(Math.cos(Phaser.Math.DegToRad(dialButton.revolution)) * inside, Math.sin(Phaser.Math.DegToRad(dialButton.revolution)) * inside);
            }
        }, [], this);

    }



    shuffleTime(){
        switch(this.dialButtons.length){
            case 3: return 250;
            case 4: return 265;
            case 5: return 280;
            case 6: return 295;
            case 7: return 310;
            case 8: return 325;
        }
    }



    clearSelection(){
        for(let i = 0; i < this.selectedButtons.length; i++){
            let dialButton = this.selectedButtons[i];
            dialButton.setSelected(false);
        }

        this.selectedButtons.length = 0;
    }



    static shuffleArr(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
    }




    clearContent(){
        this.clearSelection();

        for(let i = 0; i < this.dialButtons.length; i++){
            this.remove(this.dialButtons[i]);
            this.dialButtons[i].setActive(false);
            this.dialButtons[i].setVisible(false);
        }

        this.dialButtons.length = 0;
    }


}

////////////////////////////////////////////////////////////////////////////////////////

class DialButton extends Phaser.GameObjects.Container{

    constructor(scene){
        super(scene);

        this.bg = scene.add.image(0, 0,  "sheet1", "dial_button");
        this.bg.visible = false;
        this.add(this.bg);
        this.setSize(this.bg.width, this.bg.height);
 
        this.id = -1;
        this.selected = false;
        this.line = null;
        this.isLineSnapped = false;
        this.char = null;
        this.revolution = 0;

        this.text = new Phaser.GameObjects.Text(this.scene,
            0, 
            0,
            "",
            {fontFamily: FONT, fontSize: 90, color: '#000', align: 'center', fontStyle: "bold" }
        ).setOrigin(0.5, 0.5);

        this.add(this.text);        
    }




    setData(id, char, revolution){
        this.id = id;
        this.char = char;
        this.revolution = revolution;
        this.text.setText(char);   
    }



    isSelected(){
        return this.selected;
    }




    setSelected(flag){
        this.selected = flag;
        if(flag){
            this.bg.visible = true;
            this.text.setColor("#fff");
        } else {
            this.bg.visible = false;
            this.text.setColor("#000");
            this.removeLine();
        }
    }



    removeLine(){
        this.isLineSnapped = false;
        if(this.line != null) {
            this.line.visible = false;
            this.line.clear();
        }
    }

}




