import Phaser, { Physics } from 'phaser';
import logoImg from './assets/logo.png';
import pizzaBox from './assets/nyp-pizzabox.png';
import platform from './assets/platform.png';

var groundPlatform
var inventoryBoxes = []
var amount = 3;
var current = 0;

var stackBlock;
class MyGame extends Phaser.Scene
{    

    constructor ()
    {
        super();
    }

    

    preload ()
    {
        // load iamges
        this.load.image('logo', logoImg);
        this.load.image('pizzaBox', pizzaBox);
        this.load.image('platform', platform);
    }
    

    
    create ()
    {
        // create essentials stuff
        var pBox = this.add.image(100, 100, 'pizzaBox');
        var tween = this.tweens.add({
            targets: pBox,
            x: 700,
            duration: 2000,
            yoyo: true,
            repeat: -1
        });
        groundPlatform = this.physics.add.staticGroup();
        groundPlatform.create(400, 550, 'platform');

        var stackBlock = this.physics.add.group();


        // populate array
        for(var i = 0; i < amount; i++)
        {
            inventoryBoxes[i] = 'pizzaBox';
        }


        
        // input
        var phy = this.physics
        this.input.on('pointerdown', function()
        {
            //tween.stop();

            if(current > inventoryBoxes.length)
            {
                console.log("Reached max")
                return;
            }

            stackBlock.create(pBox.x, pBox.y, 'pizzaBox')


            current++;
        });

        // add physics
        this.physics.add.collider(pBox, platform);
        this.physics.add.collider(stackBlock, groundPlatform)
        this.physics.add.collider(stackBlock, stackBlock)
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
