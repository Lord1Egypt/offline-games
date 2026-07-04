class DictionaryDialog extends Dialog{

    static allWords;

    constructor(scene, w, h){
        super(scene, w, h);

        this.setTitleLabel(Language.strings["dict_dialog_title"]);
        this.setCloseButton();

        let logo = new Phaser.GameObjects.Image(scene, 0, -this.content.height * 0.28, "sheet1", "wordnik");
        this.content.add(logo);        
        this.textArea();
    }

 
    

    textArea(){
        let bg = this.scene.make.graphics();
        bg.clear();
        bg.lineStyle(3, 0xcdc1a7, 1.0);
        bg.fillStyle(0xe4dccb, 1.0);
        let bgWidth = this.content.width * 0.65;
        let bgHeight = 400;
        let corner = 15 * this.scene.gameScale;
        bg.fillRoundedRect(0, 0, bgWidth, bgHeight, corner);
        bg.strokeRoundedRect(0, 0, bgWidth, bgHeight, corner);
        bg.width = bgWidth;
        bg.height = bgHeight;
        bg.setPosition(-bgWidth * 0.5, -this.content.height * 0.2);


        this.bg = bg;

        this.content.add(bg);

        let wordsWidth = bg.width * 0.95;

        this.text = new Phaser.GameObjects.Text(this.scene,
            bg.x + bg.width * 0.5, 
            bg.y + 5,
            " ",
            {fontFamily: FONT, fontSize: 28, color: '#535353', align: 'left', fontStyle: "bold", wordWrap: {width:wordsWidth}}
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

        this.loading = new Phaser.GameObjects.Image(this.scene, 0, this.bg.y + this.bg.height * 0.5, "sheet1", "loading");

        this.content.add(this.loading);
    }



    updateSize(){
        super.updateSize();
        this.setTextMask();
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

    


    update(){
        if(!this.dragging){
            this.text.y += this.velocity;
            this.velocity *= 0.95;
            if(this.text.y > this.scrollTop) this.text.y = this.scrollTop;
            if(this.text.y < this.scrollBottom) this.text.y = this.scrollBottom;
        }
    }



    show(words){
        super.show();
        this.text.setText("");
        this.completedRequests = 0;
        this.accumulatedResponseString = "";
        this.words = words ? words : DictionaryDialog.allWords;
        this.showLoading();
    }



    showLoading(){
        this.loading.setVisible(true);
        this.loading.setActive(true);
        this.loadingTween = this.scene.tweens.add({
            targets: this.loading,
            angle: "-=360",
            duration: 1000,
            repeat: -1
        });
    }



    hideLoading(){
        this.loadingTween.stop();
        this.loading.setVisible(false);
        this.loading.setActive(false);
    }




    onShowComplete(){
        for(let i = 0; i < this.words.length; i++) this.sendRequest(this.words[i].answer);
    }



    stripText(str){
        let regex = /(<([^>]+)>)/ig
        return str.replace(regex, "");
    }



    onDefinitionComplete(word, text){
        this.completedRequests++;
        this.accumulatedResponseString += word + "\n" + text + "\n\n";
        if(this.completedRequests == this.words.length) {
            this.text.setText(this.stripText(this.accumulatedResponseString));
            this.text.x         = this.bg.x + this.bg.width * 0.5;
            this.text.y         = this.bg.y + 5;
            this.text.alpha     = 1;
            this.scrollTop      = this.text.y;
            this.scrollBottom   = this.scrollTop - Math.max(this.text.height, this.bg.height) + this.bg.height - 10;
            this.velocity       = 0;
            this.hideLoading();
        }
    }


    

    sendRequest(word){
        let xmlhttp = new XMLHttpRequest();
        let url = "https://api.wordnik.com/v4/word.json/" + word.toLowerCase() + "/definitions?limit=10&includeRelated=false&useCanonical=false&includeTags=false&api_key=" + wordPressParams.wordnik_api_key;
        console.log(url);
        xmlhttp.open("GET", url, true);

        let that = this;
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                if (xmlhttp.status == 200) {
                    that.parseResponse(word, xmlhttp.responseText)
                }else {
                    console.log("dictionary status: ", xmlhttp.status);
                    that.parseResponse(null);
                }
            }
        };
        xmlhttp.send();
    }




    parseResponse(word, text){
        let response;
        if(text == null) response = null;
        let jsonObject = JSON.parse(text);
        
        if(jsonObject["statusCode"]){
            if(jsonObject["message"]) response = jsonObject["message"];
            else if(jsonObject["error"]) response = jsonObject["error"];
            else response = jsonObject["statusCode"];
        }
        
        for(let i = 0; i < jsonObject.length; i++){
            if(jsonObject[i].text){
                response = jsonObject[i].text;
                break;
            }
        }

        this.onDefinitionComplete(word, response);
    }



    hide(){
        this.scene.tweens.add({
            targets         : this.text,
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