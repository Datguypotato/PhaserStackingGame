import Phaser, { Physics } from 'phaser';
import platform from './assets/platform.png';
import chickenwing from './assets/chickenwing.png';
import hotdog from './assets/hotdog.png';
import nypBox from './assets/nyp-box.png';
import nypPizzabox from './assets/nyp-Pizzabox.png';
import slicer from './assets/slicer.png';
import pizzaSlice from './assets/sprite-pizza-slice.png';
import statue from './assets/sprite-statue-of-liberty.png';

var currentObject;
var groundPlatform
var inventoryBoxes = []
var amount = 3;
var current = 0;

var textureNames = ['chickenwing', "hotdog", "nyp-box", "nyp-pizzabox", "slicer", "sprite-pizza-slice", "sprite-statue-of-liberty"]
class MyGame extends Phaser.Scene
{    

    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image(textureNames[0] , chickenwing);
        this.load.image(textureNames[1] , hotdog);
        this.load.image(textureNames[2] , nypBox);
        this.load.image(textureNames[3] , nypPizzabox);
        this.load.image(textureNames[4] , slicer);
        this.load.image(textureNames[5] , pizzaSlice);
        this.load.image(textureNames[6] , statue);

        this.load.image('platform', platform)
    }
    
    create ()
    {
        // create essentials stuff
        var index = Math.floor(Math.random() * textureNames.length);
        console.log(index);
        currentObject = this.add.image(100, 100, textureNames[index]);
        var tween = this.tweens.add({
            targets: currentObject,
            x: 700,
            duration: 2000,
            yoyo: true,
            repeat: -1
        });
        
        groundPlatform = this.physics.add.staticGroup();
        groundPlatform.create(400, 550, 'platform');

        var stackBlock = this.physics.add.group();
        var phy = this.physics;
        // input
        this.input.on('pointerdown', function()
        {
            stackBlock.create(currentObject.x, currentObject.y, currentObject.texture);
            currentObject.setTexture(textureNames[Math.floor(Math.random() * textureNames.length)]);

            phy.add.collider(stackBlock, stackBlock);
            
        });

        // add physics
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
