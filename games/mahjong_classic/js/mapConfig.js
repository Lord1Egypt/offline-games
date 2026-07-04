var mapConfig = {

    localOffsetX: 0,                            // x offset from center for all scene objects
    localOffsetY: 0,                            // y offset from center for all scene objects
 
    fonts: [
        {
            fontName: 'gameFont_0',
            filePNG:  'fonts/nunitoEB_60_0.webp',
            fileXML:  'fonts/nunitoEB_60_0.xml'
        },
        {
            fontName: 'gameFont_1',
            filePNG:  'fonts/nunitoEB_60_1.webp',
            fileXML:  'fonts/nunitoEB_60_1.xml'
        },
/*
        {
            fontName: 'gameFont_2',
            filePNG:  'fonts/*.webp',
            fileXML:  'fonts/*.xml'
        },
*/
    ],

    sprites: [
        // debug reference
        {
            fileName: null,
            name: 'debugreference'
        },

        // mahjong map
        {
            fileName: 'MapBackground.webp',
            name: 'map_background'
        }, 
        {
            fileName: 'GameTitle.webp',
            name: 'game_title'
        }, 
        {
            fileName: 'ButtonStart.webp',
            name: 'button_start'
        },
        {
            fileName: 'ButtonStartHover.webp',
            name: 'button_start_hover'
        },
        {
            fileName: 'ButtonSettings.webp',
            name: 'button_settings'
        },
        {
            fileName: 'ButtonSettingsHover.webp',
            name: 'button_settings_hover'
        },
        {
            fileName: 'gui/ButtonOn.webp',
            name: 'button_on'
        },
        {
            fileName: 'gui/ButtonOff.webp',
            name: 'button_off'
        },
        {
            fileName: 'gui/MessagePanel.webp',
            name: 'message_panel'
        },   
        {
            fileName: null,
            name: 'small_message_panel'
        }, 
        {
            fileName: 'gui/SettingsPanel.webp',
            name: 'settings_panel'
        }, 
        {
            fileName: 'gui/Logo.webp',
            name: 'logo'
        }, 
        {
            fileName: 'gui/ExitButton.webp',
            name: 'exit_button'
        }, 
        {
            fileName: 'gui/ExitButtonHover.webp',
            name: 'exit_button_hover'
        },     
        {
            fileName: 'gui/LongButton.webp', 
            name: 'long_button'
        }, 
        {
            fileName: 'gui/LongButtonHover.webp', 
            name: 'long_button_hover'
        }, 
        {
            fileName: 'gui/ExtraLongButton.webp', 
            name: 'extralong_button'
        }, 
        {
            fileName: 'gui/ExtraLongButtonHover.webp', 
            name: 'extralong_button_hover'
        },
        {
            fileName: 'gui/SmallButton.webp', 
            name: 'small_button'
        }, 
        {
            fileName: 'gui/SmallButtonHover.webp', 
            name: 'small_button_hover'
        },  
        {
            fileName: null, 
            name: 'pu_background'
        },   
        {
            fileName: 'gui/whiteBkg.webp', 
            name: 'white_bkg'
        }, 
        {
            fileName: 'gui/ThemeButton.webp', 
            name: 'theme_button'
        }, 
        {
            fileName: 'gui/ThemeButtonHover.webp', 
            name: 'theme_button_hover'
        },     
        {
            fileName: 'gui/SimpleTheme.webp', 
            name: 'simple_theme'
        },
        {
            fileName: 'gui/ClassicTheme.webp', 
            name: 'classic_theme'
        }, 
    ],
    
    createGraphic: function(scene){
        // scene.debugreference =  scene.addSpriteLocPos('debugreference', 0, 0).setDepth(2000).setAlpha(0.0);

        scene.background =  scene.addSpriteLocPos('map_background', 0, 0).setScale(1).setDepth(-1); 
        scene.title =  scene.addSpriteLocPos('game_title', 0, -290).setScale(1).setDepth(-1); 
    },

    createControls: function(scene) {
        let depth = 11;

        function addSprite (spriteName, posX, posY, _depth)
        {
          var _sprite =  scene.addSpriteLocPos(spriteName, posX, posY); 
          _sprite.setDepth(_depth); 
          return _sprite;
        }

        function addButton (spriteNormal, spriteHover, isSwitch, posX, posY, originX, originY, _depth)
        {
          var _button = new SceneButton(scene, spriteNormal, spriteHover, isSwitch);   
          scene.buttons.push(_button);
          _button.create(posX, posY, originX, originY,);
          _button.setDepth(_depth); 
          _button.button.setScale(1);
          return _button;
        }

        var offsetY = 840;
        var nextLevel = LevelHolder.getTopPassedLevel() + 1;
        scene.levelButton = addButton('button_start', 'button_start_hover', false, 0 , offsetY, 0.5, 0.5, depth);  
        scene.levelButton.addClickEvent(() => {LevelHolder.currentLevel = nextLevel;  scene.gotoGame();}, scene);  
        scene.levelNumberText = scene.add.bitmapText(scene.centerX + 0, scene.centerY + offsetY - 6, 'gameFont_1', 'Level ' + (nextLevel + 1), 80, 1).setOrigin(0.5).setDepth(depth);

        scene.settingsButton = addButton('button_settings', 'button_settings_hover', false, 400 , offsetY, 0.5, 0.5, depth);  
        scene.settingsButton.addClickEvent(()=>{ 
            console.log('settings click');
            var pu = scene.guiController.showPopUp(this.createSettingsPUHandler);
            scene.soundController.playClip('button_click');}, this);
    },

    createAboutPUHandler: function(popup)
    {     

    },

    createSettingsPUHandler: function(popup)
    {    
        function refreshIcons (popup)
        {
            popup.soundIcon.setTexture( popup.scene.soundController._soundOn ? 'soundon' : 'soundoff');
            popup.musicIcon.setTexture( popup.scene.soundController._musicOn ? 'musicon' : 'musicoff');
            console.log('refresh');
        }

        let yOffset = 110;   
        // add background and panel
        let backGround = popup.scene.add.sprite(0, 0 + yOffset, 'white_bkg').setOrigin(0.5).setScale(2000).setInteractive().setTint(0x1C1F1F);
        popup.add(backGround);

        let panel = popup.scene.add.sprite(0, -100 + yOffset, 'settings_panel').setOrigin(0.5);
        popup.add(panel);

        // add title
        popup.title = popup.scene.add.bitmapText(0, -492 + yOffset, 'gameFont_0', 'Settings', 80, 1).setOrigin(0.5).setTint(0xafa6a0);
        popup.add(popup.title);

        // sound, music, hLight text
        popup.soundText = popup.scene.add.bitmapText(-180, -330 + yOffset, 'gameFont_0', 'Sound', 40, 1).setOrigin(0.5).setTint(0xafa6a0);
        popup.add(popup.soundText);
        popup.musicText = popup.scene.add.bitmapText( 187 , -330 + yOffset, 'gameFont_0', 'Music', 40, 1).setOrigin(0.5).setTint(0xafa6a0);
        popup.add(popup.musicText);
        popup.hLightText = popup.scene.add.bitmapText(-150, -95 + yOffset, 'gameFont_0', 'Highlight Free\nTiles', 40, 1).setOrigin(0.5).setTint(0xafa6a0);
        popup.add(popup.hLightText);

        // sound, music, hLight buttons
        popup.addButton('soundButton','button_on', 'button_off', true, -150, -240 + yOffset);
        popup.addButton('musicButton','button_on', 'button_off', true,  150, -240 + yOffset);
        popup.addButton('hLightButton','button_on', 'button_off', true, 150, -90 + yOffset);

        popup['soundButton'].clickEvent.add(()=>{popup.scene.soundController.playClip('button_click', false);}, popup);
        popup['soundButton'].clickEvent.add(()=>{popup.scene.soundController.soundOn(!popup.scene.soundController._soundOn);}, popup);
        if(!popup.scene.soundController._soundOn) popup['soundButton'].setPressed();

        popup['musicButton'].clickEvent.add(()=>{popup.scene.soundController.playClip('button_click', false);}, popup);
        popup['musicButton'].clickEvent.add(()=>{popup.scene.soundController.musicOn(!popup.scene.soundController._musicOn);}, popup);
        if(!popup.scene.soundController._musicOn) popup['musicButton'].setPressed();

        popup['hLightButton'].clickEvent.add(()=>{popup.scene.soundController.playClip('button_click', false);}, popup);
        popup['hLightButton'].clickEvent.add(()=>{popup.scene.setHiglightFreeMode(!popup.scene.isHihglightFreeMode);}, popup);
        if(!popup.scene.isHihglightFreeMode) popup['hLightButton'].setPressed(); 

        // exit, about, theme buttons
        popup.addButton('exitButton','exit_button', 'exit_button_hover', false, 300, -405  + yOffset);
        popup.addButton('themeButton','long_button', 'long_button_hover', false, -2, 180 + yOffset);
        // popup.addButton('aboutButton','long_button', 'long_button_hover', false, -2, 220 + yOffset);

        popup['exitButton'].clickEvent.add(()=>{popup.scene.soundController.playClip('button_click', false);}, popup);
        popup['exitButton'].clickEvent.add(()=>{popup.scene.guiController.closePopUp(popup);});
        
        popup['themeButton'].clickEvent.add(()=>{popup.scene.soundController.playClip('button_click', false);}, popup);
        popup['themeButton'].clickEvent.add(()=>{popup.scene.guiController.showPopUp(mConfig.createThemePUHandler); }, popup);

        // popup['aboutButton'].clickEvent.add(()=>{popup.scene.soundController.playClip('button_click', false);}, popup);
        // popup['aboutButton'].clickEvent.add(()=>{popup.scene.guiController.showPopUp(mConfig.createAboutPUHandler); }, popup);

        // privacy ant terms buttons text
        popup.themeText = popup.scene.add.bitmapText(-2, 170 + yOffset, 'gameFont_1', 'Theme', 80, 1).setOrigin(0.5);
        popup.add(popup.themeText);
        // popup.aboutText = popup.scene.add.bitmapText(-2, 213 + yOffset, 'gameFont_1', 'About', 80, 1).setOrigin(0.5);
        // popup.add(popup.aboutText);
    },

    createThemePUHandler: function(popup)
    {   
        popup.theme = ThemeHolder.getThemeName();  //'simple', 'classic'
        function refreshTheme (popup)
        {

            if(popup.theme === 'simple') 
            {
                popup['themeSimpleButton'].setPressed();
                popup['themeClassicButton'].release();
            }
            else {
                popup['themeSimpleButton'].release();
                popup['themeClassicButton'].setPressed();
            }
        }

        let yOffset = 0;
        // add background and panel
        let backGround = popup.scene.add.sprite(0, 0 + yOffset, 'white_bkg').setOrigin(0.5).setScale(2000).setInteractive().setTint(0x1C1F1F);
        popup.add(backGround);

        let panel = popup.scene.add.sprite(0, 10 + yOffset, 'settings_panel').setOrigin(0.5);
        popup.add(panel);

        popup.title = popup.scene.add.bitmapText(0, -382 + yOffset, 'gameFont_0', 'Theme', 80, 1).setOrigin(0.5).setTint(0xafa6a0);
        popup.add(popup.title);

        // add buttons
        popup.addButton('themeSimpleButton','theme_button', 'theme_button_hover', true, -2, -145 + yOffset);
        popup.addButton('themeClassicButton','theme_button', 'theme_button_hover', true, -2, 63 + yOffset);
        popup.addButton('confirmButton','long_button', 'long_button_hover', false, -2, 293 + yOffset);
        popup.addButton('exitButton','exit_button', 'exit_button_hover', false, 300, -295  + yOffset);

        popup.simpleText = popup.scene.add.bitmapText(-220, -47 + yOffset, 'gameFont_0', 'Simple', 40, 1).setOrigin(0, 0.5).setTint(0xafa6a0);
        popup.add(popup.simpleText);
        popup.classicText = popup.scene.add.bitmapText(-220, 160 + yOffset, 'gameFont_0', 'Classic', 40, 1).setOrigin(0, 0.5).setTint(0xafa6a0);
        popup.add(popup.classicText);

        popup['confirmButton'].clickEvent.add(()=>{popup.scene.soundController.playClip('button_click', false);}, popup);
        popup['confirmButton'].clickEvent.add(()=>{ThemeHolder.saveThemeName(popup.theme); popup.scene.guiController.closePopUp(popup);}, popup);

        popup['themeSimpleButton'].clickEvent.add(()=>{popup.scene.soundController.playClip('button_click', false);}, popup);
        popup['themeSimpleButton'].clickEvent.add(()=>{popup.theme ='simple'; refreshTheme(popup); }, popup);

        popup['themeClassicButton'].clickEvent.add(()=>{popup.scene.soundController.playClip('button_click', false);}, popup);
        popup['themeClassicButton'].clickEvent.add(()=>{popup.theme ='classic'; refreshTheme(popup); }, popup);

        popup['exitButton'].clickEvent.add(()=>{popup.scene.soundController.playClip('button_click', false);}, popup);
        popup['exitButton'].clickEvent.add(()=>{popup.scene.guiController.closePopUp(popup);});

        let simpleTheme = popup.scene.add.sprite(0, -149 + yOffset, 'simple_theme').setOrigin(0.5);
        popup.add(simpleTheme);
        let classicTheme = popup.scene.add.sprite(0, 59 + yOffset, 'classic_theme').setOrigin(0.5);
        popup.add(classicTheme);

        popup.privacyText = popup.scene.add.bitmapText(-2, 282 + yOffset, 'gameFont_1', 'Confirm', 80, 1).setOrigin(0.5);
        popup.add(popup.privacyText);

        refreshTheme(popup);     
    },
}