class MenuDialog extends Dialog{

    constructor(scene, w, h){
        super(scene, w, h);

        this.setTitleLabel(Language.strings["menu_title"]);
        this.setCloseButton();

        if(AVAILABLE_LANGUAGES.length > 1) this.setLanguageSelection();

        let distance = this.content.width * 0.2;
        let y = distance;

        if(AVAILABLE_LANGUAGES.length == 1) y = this.content.width * 0.09;
        
        
        let mutefxx = wordPressParams.bg_music_enabled ? -distance : 0;

        this.muteFx = new SpriteButton(scene, mutefxx, y, "sheet1", "sfx_button_up", "sfx_button_down").setScale(1.2);
        this.muteFx.setCallback(this.toggleMuteFx, this);
        this.content.add(this.muteFx);

        let on = GameData.isFxSoundOn();

        this.fxOnIcon = new Phaser.GameObjects.Image(scene, this.muteFx.x, this.muteFx.y, "sheet1", "fx_on").setVisible(on);
        this.content.add(this.fxOnIcon);

        this.fxOffIcon = new Phaser.GameObjects.Image(scene, this.muteFx.x, this.muteFx.y, "sheet1", "fx_off").setVisible(!on);
        this.content.add(this.fxOffIcon);

        if(wordPressParams.bg_music_enabled){
            this.muteMusic = new SpriteButton(scene, distance, this.muteFx.y, "sheet1", "sfx_button_up", "sfx_button_down").setScale(1.2);
            this.muteMusic.setCallback(this.toggleMusicFx, this);
            this.content.add(this.muteMusic);

            on = GameData.isMusicSoundOn();
            this.musicOnIcon = new Phaser.GameObjects.Image(scene, this.muteMusic.x, this.muteMusic.y, "sheet1", "music_on").setVisible(on);
            this.content.add(this.musicOnIcon);
    
            this.musicOffIcon = new Phaser.GameObjects.Image(scene, this.muteMusic.x, this.muteMusic.y, "sheet1", "music_off").setVisible(!on);
            this.content.add(this.musicOffIcon);
        }
    }



    toggleMuteFx(){
        SoundController.playSfx(this.scene, "click");
        let on = !GameData.isFxSoundOn();
        GameData.setFxSoundOn(on);

        this.fxOnIcon.visible = on;
        this.fxOffIcon.visible = !on;
        SoundController.sfx_unmuted = on;
        
    }



    toggleMusicFx(){
        SoundController.playSfx(this.scene, "click");
        let on = !GameData.isMusicSoundOn();
        GameData.setMusicSoundOn(on);

        this.musicOnIcon.visible = on;
        this.musicOffIcon.visible = !on;

        if(on) SoundController.music.play();
        else SoundController.music.stop();
    }



    setLanguageSelection(){
        this.langLabelBg = new Phaser.GameObjects.Image(this.scene, 0, -30, "sheet1", "language_label");
        this.content.add(this.langLabelBg);

        this.arrowLeft = new SpriteButton(this.scene, 0, 0, "sheet1", "arrow_left_up", "arrow_left_down").setOrigin(1, 0.5);
        this.arrowLeft.x = this.langLabelBg.x - this.langLabelBg.width * 0.5 - 1;
        this.arrowLeft.y = this.langLabelBg.y;
        this.arrowLeft.setCallback(this.leftLangClick, this);
        this.content.add(this.arrowLeft);

        this.arrowRight = new SpriteButton(this.scene, 0, 0, "sheet1", "arrow_right_up", "arrow_right_down").setOrigin(0, 0.5);
        this.arrowRight.x = this.langLabelBg.x + this.langLabelBg.width * 0.5 + 1;
        this.arrowRight.y = this.langLabelBg.y;
        this.arrowRight.setCallback(this.rightLangClick, this);
        this.content.add(this.arrowRight);

        this.langContainer = new Phaser.GameObjects.Container(this.scene);
        this.langContainer.setPosition(this.langLabelBg.x, this.langLabelBg.y + this.langLabelBg.height * 0.36);
        this.langContainer.setSize(this.langLabelBg.width, this.langLabelBg.height)
        this.content.add(this.langContainer);

        this.setTextMask();

        let tempLangArr = [];
        this.currentLangCode;
        this.selectedLangCode;

        let selected;

        for(let i = 0; i < AVAILABLE_LANGUAGES.length; i++){
            if(AVAILABLE_LANGUAGES[i].code == Language.getCode()){
                selected = AVAILABLE_LANGUAGES[i];
                this.currentLangCode = this.selectedLangCode = selected.code;
            }else{
                tempLangArr.push(AVAILABLE_LANGUAGES[i]);
            }
        }

        tempLangArr.unshift(selected);
        
        let maxLabelWidth = this.langLabelBg.width * 0.85;
        this.langLabels = [];

        for(let i = 0; i < tempLangArr.length; i++){
            let label = new Phaser.GameObjects.Text(this.scene,
                i * this.langLabelBg.width, 
                this.langLabelBg.y,
                tempLangArr[i].label,
                {fontFamily: FONT, fontSize: 36, color: '#ffffff', align: 'center'}).setOrigin(0.5, 0.42);
            
            if(label.width > maxLabelWidth) label.setScale(maxLabelWidth / label.width);
            
            this.langContainer.add(label);
            this.langLabels.push(label);
            label.name = tempLangArr[i].code;
        }
    }



    updateSize(){
        super.updateSize();
        this.setTextMask();
    }



    setTextMask(){
        if(!this.langLabelBg) return;
        if(!this.graphics) this.graphics = this.scene.make.graphics();
        this.graphics.clear();
        this.graphics.fillRect(0, 0, this.langLabelBg.width, this.langLabelBg.height);
        this.graphics.scale = this.scene.gameScale;

        let global = this.langLabelBg.getWorldTransformMatrix();
        this.graphics.setPosition(global.tx - this.langLabelBg.width * this.scene.gameScale * 0.5, global.ty - this.langLabelBg.height * this.scene.gameScale * 0.5);

        let mask = new Phaser.Display.Masks.GeometryMask(this.scene, this.graphics);
        this.langContainer.setMask(mask);
    }



    leftLangClick(){
        this.scene.input.enabled = false;
        SoundController.playSfx(this.scene, "click");
        let last = this.langLabels.pop();
        last.x = this.langLabels[0].x - this.langLabelBg.width;
        this.langLabels.unshift(last);
        this.selectedLangCode = last.name;

        this.scene.tweens.add({
            targets: this.langLabels,
            x: "+=" + this.langLabelBg.width,
            duration: 300,
            ease: "Sine.easeInOut",
            callbackScope: this,
            onComplete:function(){
                this.scene.input.enabled = true;
            }
        });
    }



    rightLangClick(){
        this.scene.input.enabled = false;
        SoundController.playSfx(this.scene, "click");

        this.scene.tweens.add({
            targets: this.langLabels,
            x: "-=" + this.langLabelBg.width,
            duration: 300,
            ease: "Sine.easeInOut",
            callbackScope: this,
            onComplete:function(){
                let first = this.langLabels.shift();
                first.x = this.langLabels[this.langLabels.length - 1].x + this.langLabelBg.width;
                this.langLabels.push(first);
                this.selectedLangCode = this.langLabels[0].name
                this.scene.input.enabled = true;
            }
        });
    }



    openAnim(){
        if(this.langContainer) this.langContainer.alpha = 0;
        super.openAnim();
    }



    hide(){
        if(this.langContainer){
            this.scene.tweens.add({
                targets: this.langContainer,
                alpha: 0,
                duration: 100
            });
        }
        super.hide();
    }




    onShowComplete(){
        if(this.langContainer){
            this.scene.tweens.add({
                targets: this.langContainer,
                alpha: 1,
                duration: 100
            });
        }
        
        this.currentLangCode = Language.getCode();
    }



    onHideComplete(){
        super.onHideComplete();
        
        if(this.selectedLangCode && this.currentLangCode != this.selectedLangCode){
            Language.setNewLanguage(this.selectedLangCode, this.scene);
            this.scene.languageChanged();
            this.scene.input.enabled = false;           
        }
        
    }

}