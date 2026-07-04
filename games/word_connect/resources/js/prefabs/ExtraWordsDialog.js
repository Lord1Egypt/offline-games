class ExtraWordsDialog extends Dialog{

    constructor(scene, w, h){
        super(scene, w, h);

        this.setTitleLabel(Language.strings["bonus_dialog_title"]);
        this.setCloseButton();

        this.quantity = new Phaser.GameObjects.Text(this.scene,
            0.5, 
            -150,
            " ",
            {fontFamily: FONT, fontSize: 32, color: '#866ea0', align: 'center', fontStyle: "bold" }
        ).setOrigin(0.5, 1);

        this.content.add(this.quantity);
        this.progressbar = new Progressbar(this.scene);
        this.progressbar.y = this.quantity.y + this.quantity.height * 0.7;
        this.content.add(this.progressbar);
        this.progressbar.init();
        this.progressbar.setValue(0.5);

        this.labelWidth = this.content.width * 0.7;
        this.label = new Phaser.GameObjects.Text(this.scene,
            0.5, 
            0,
            " ",
            {fontFamily: FONT, fontSize: 28, color: '#866ea0', align: 'center', fontStyle: "bold", wordWrap: { width: this.labelWidth}}
        ).setOrigin(0.5, 1);

        

        
        this.content.add(this.label);
        this.textArea();
    }



    textArea(){
        let bg = this.scene.make.graphics();
        bg.clear();
        bg.lineStyle(3, 0xcdc1a7, 1.0);
        bg.fillStyle(0xe4dccb, 1.0);
        let bgWidth = this.content.width * 0.65;
        let bgHeight = 250;
        let corner = 15 * this.scene.gameScale;
        bg.fillRoundedRect(0, 0, bgWidth, bgHeight, corner);
        bg.strokeRoundedRect(0, 0, bgWidth, bgHeight, corner);
        bg.width = bgWidth;
        bg.height = bgHeight;
        bg.setPosition(-bgWidth * 0.5, 30);


        this.bg = bg;
        this.content.add(bg);

        

        let wordsWidth = bg.width * 0.95;

        this.text = new Phaser.GameObjects.Text(this.scene,
            bg.x + bg.width * 0.5, 
            bg.y + 5,
            " ",
            {fontFamily: FONT, fontSize: 28, color: '#cf5700', align: 'center', fontStyle: "bold", wordWrap: {width:wordsWidth}}
        ).setOrigin(0.5, 0);
        
        this.content.add(this.text);

        this.setTextMask();

        let diff = 0;
        this.dragging = false;

        bg.setInteractive();
        this.content.setInteractive();

        bg.on('pointerdown', function (pointer) {
            diff = this.text.y;
            this.dragging = true;
         }, this);

         bg.on('pointermove', function (pointer) {
            if(this.dragging){
                this.velocity = pointer.velocity.y * 0.1;
                let dy = pointer.y - pointer.downY;
                this.text.y = diff + dy;
                if(this.text.y > this.scrollTop) this.text.y = this.scrollTop;
                if(this.text.y < this.scrollBottom) this.text.y = this.scrollBottom;
            }
        }, this);

        this.content.on('pointermove', function (pointer) {
            if(this.dragging){
                let dy = pointer.y - pointer.downY;
                this.text.y = diff + dy;
                if(this.text.y > this.scrollTop) this.text.y = this.scrollTop;
                if(this.text.y < this.scrollBottom) this.text.y = this.scrollBottom;
            }
        }, this);

        bg.on('pointerup', function (ponter) {
            this.dragging = false;
        }, this);

        this.content.on('pointerup', function (ponter) {
            this.dragging = false;
        }, this);

        this.on('pointerup', function (ponter) {
            this.dragging = false;
        }, this);
    }




    setTextMask(){
        if(!this.bg) return;
        if(!this.graphics) this.graphics = this.scene.make.graphics();
        this.graphics.clear();
        this.graphics.fillRect(0, 0, this.bg.width * this.scene.gameScale, this.bg.height * this.scene.gameScale);

        let global = this.bg.getWorldTransformMatrix();
        this.graphics.setPosition(global.tx, global.ty);

        let mask = new Phaser.Display.Masks.GeometryMask(this.scene, this.graphics);
        this.text.setMask(mask);
    }



    updateSize(){
        super.updateSize();
        if(this.progressbar) this.progressbar.positionMask();
        this.setTextMask();
        this.positionLabel();
    }



    update(){
        if(!this.dragging){
            this.text.y += this.velocity;
            this.velocity *= 0.95;
            if(this.text.y > this.scrollTop) this.text.y = this.scrollTop;
            if(this.text.y < this.scrollBottom) this.text.y = this.scrollBottom;
        }
    }



    positionLabel(){
        this.label.y = this.bg.y - 7;
    }



    updateData(){
        this.quantity.setText(GameData.getExtraWordsCount() + "/" + wordPressParams.num_bonus_words_to_find_for_reward);
        this.progressbar.setValue(GameData.getExtraWordsCount() / wordPressParams.num_bonus_words_to_find_for_reward);

        if(this.label.text != null) this.label.setText(Language.strings["bonus_dialog_text"]);

        this.label.setFixedSize(this.labelWidth, this.label.height);
        this.positionLabel();

        let arr = GameData.getExtraWords();
        let comma = "";
        let text = "";

        for(let i = 0; i < arr.length; i++){
            text += comma;
            text += GameData.wordMap.get(arr[i])
            if(comma == "") comma = "\n";
        }

        this.text.setText(text);
    
        this.scrollTop      = this.text.y;
        this.scrollBottom   = this.scrollTop - Math.max(this.text.height, this.bg.height) + this.bg.height - 10;
        this.velocity       = 0;
    }




    show(){
        this.updateData();
        this.progressbar.alpha = 0;
        super.show();
    }



    openAnim(){
        this.text.alpha = 0;
        super.openAnim();
    }



    onShowComplete(){
        this.scene.tweens.add({
            targets     : [this.progressbar, this.text],
            alpha       : 1,
            duration    : 100
        });
    }



    hide(){
        this.scene.tweens.add({
            targets         : [this.progressbar, this.text],
            alpha           : 0,
            duration        : 100,
            callbackScope   : this,
            onComplete      : function(){
                this.close();
            }
        });
    }


    close(){
        super.hide();
    }


}