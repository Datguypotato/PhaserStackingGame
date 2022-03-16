import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import pizzaBox from './assets/nyp-pizzabox.png';
import platform from './assets/platform.png';


class MyGame extends Phaser.Scene
{    

    constructor ()
    {
        super();
    }

    

    preload ()
    {
        this.load.image('logo', logoImg);

        this.load.image('pizzaBox', pizzaBox);
        this.load.image('platform', platform);
    }
    

    
    create ()
    {
        var pBox = this.add.image(100, 100, 'pizzaBox');
        //var pForm = this.add.image('platform');
        //var logo = this.add.image(100, 100,'logo');
        var tween = this.tweens.add({
            targets: pBox,
            x: 700,
            duration: 2000,
            yoyo: true,
            repeat: -1
        });

        var phy = this.physics
        this.input.on('pointerdown', function()
        {
            tween.stop();

            console.log(pBox.x + " " + pBox.y)
            phy.add.sprite(pBox.x, pBox.y, 'platform')
        });

        var platform = this.physics.add.staticGroup();
        platform.create(400, 550, 'platform');
        this.physics.add.collider(pBox, platform);
    }



    update()
    {
        //pBox.x = Phaser.Math.Easing.Sine()
    }

}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    width: 800,
    height: 600,
    scene: MyGame
};

const game = new Phaser.Game(config);
