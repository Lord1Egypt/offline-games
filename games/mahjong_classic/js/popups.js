// --------------- MESSAGES -------------------

// message with yes, no, close buttons
function createGameMessagePUHandlerYNC(popup)
{
    let yOffset = 0; 
    // add background and panel
    let backGround = popup.scene.add.sprite(0, -0 + yOffset, 'white_bkg').setOrigin(0.5).setScale(2000).setTint(0x1C1F1F);
    backGround.setInteractive(); // block bottom controls
    popup.add(backGround);

    let panel = popup.scene.add.sprite(0, 0 + yOffset, 'message_panel').setOrigin(0.5);
    popup.add(panel);

    // add caption
    popup.captionText = popup.scene.add.bitmapText(0, -60 + yOffset, 'gameFont_0', 'Caption', 40, 1).setOrigin(0.5).setTint(0xafa6a0);
    popup.add(popup.captionText);

    // add message
    popup.messageText = popup.scene.add.bitmapText(0, 0 + yOffset, 'gameFont_0', 'Message', 40, 1).setOrigin(0.5).setTint(0xafa6a0);
    popup.add(popup.messageText);

    // add buttons
    popup.addButton('okButton','small_button', 'small_button_hover', false, -120, 180 + yOffset);
    popup.addButton('noButton','small_button', 'small_button_hover', false, 120, 180 + yOffset);
    popup.addButton('exitButton','exit_button', 'exit_button_hover', false, 275, -85 + yOffset);
    popup['okButton'].clickEvent.add(()=>{popup.scene.soundController.playClip('button_click', false);}, popup);
    popup['noButton'].clickEvent.add(()=>{popup.scene.soundController.playClip('button_click', false);}, popup);
    popup['exitButton'].clickEvent.add(()=>{popup.scene.soundController.playClip('button_click', false);}, popup);

    // add button text
    popup.okText = popup.scene.add.bitmapText(-120, 173 + yOffset, 'gameFont_1', 'Ok', 80, 1).setOrigin(0.5);
    popup.add(popup.okText);

    popup.noText = popup.scene.add.bitmapText(120, 173 + yOffset, 'gameFont_1', 'No', 80, 1).setOrigin(0.5);
    popup.add(popup.noText);
}

// message with close button
function createGameMessagePUHandler(popup)
{
    let yOffset = 0; 
    // add background and panel
    let backGround = popup.scene.add.sprite(0, -0 + yOffset, 'white_bkg').setOrigin(0.5).setScale(2000).setTint(0x1C1F1F);
    backGround.setInteractive(); // block bottom controls
    popup.add(backGround);

    let panel = popup.scene.add.sprite(0, 0 + yOffset, 'message_panel').setOrigin(0.5);
    popup.add(panel);

    // add caption
    popup.captionText = popup.scene.add.bitmapText(0, -60 + yOffset, 'gameFont_0', 'Caption', 40, 1).setOrigin(0.5).setTint(0xafa6a0);
    popup.add(popup.captionText);

    // add message
    popup.messageText = popup.scene.add.bitmapText(0, 0 + yOffset, 'gameFont_0', 'Message', 40, 1).setOrigin(0.5).setTint(0xafa6a0);
    popup.add(popup.messageText);

    // add buttons
    popup.addButton('exitButton','exit_button', 'exit_button_hover', false, 275, -85 + yOffset);
    popup['exitButton'].clickEvent.add(()=>{popup.scene.soundController.playClip('button_click', false);}, popup);
}
