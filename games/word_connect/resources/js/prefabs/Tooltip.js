class Tooltip extends Phaser.GameObjects.Container{

    static ALIGN_LEFT = "ALIGN_LEFT";
    static ALIGN_RIGHT = "ALIGN_RIGHT";

    constructor(scene){
        super(scene);

        this.bg = new Phaser.GameObjects.Image(scene, 0, 0, "sheet1", "tooltip");        
        this.bg.setOrigin(0.5);
        this.add(this.bg);
        this.bg.alpha = 0.8;

        this.setSize(this.bg.width, this.bg.height);
        this.bg.x = this.width * 0.5;
    }




    setText(text){
        if(this.align == Tooltip.ALIGN_RIGHT) this.bg.scale = 1;
        else this.bg.scale = -1;

        let margin = 70;

        if(!this.label){
            this.label = new Phaser.GameObjects.Text(this.scene, 0, 0, "", {fontFamily: FONT, align: "center", fontSize: 28, color: '#e3e3e3', wordWrap: {width:this.width - margin}});
            this.label.setOrigin(0.5);
            this.add(this.label);
        }
        this.label.setPadding(20)
        this.label.setText(text);

        if(this.align == Tooltip.ALIGN_RIGHT) this.label.x = this.width * 0.5 - 20;
        else this.label.x = this.width * 0.5 + 20;
    }



    show(){
        if(this.tweenin) this.tweenin.stop();

        this.alpha = 0;
        this.tweenin = this.scene.tweens.createTimeline();

        this.tweenin.add({
            targets  : this,
            alpha    : 1,
            duration :300
        });

        this.tweenin.add({
            targets      : this,
            alpha        : 0,
            duration     : 300,
            delay        : 2000,
            callbackScope: this,
            onComplete: function(){
                this.setVisible(false);
                this.setActive(false);
            }
        });

        this.tweenin.play();
    }

}