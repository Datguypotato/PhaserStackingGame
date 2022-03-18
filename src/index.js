import Phaser, { Physics } from "phaser";
import platform from "./assets/platform.png";
import chickenwing from "./assets/chickenwing.png";
import hotdog from "./assets/hotdog.png";
import nypBox from "./assets/nyp-box.png";
import nypPizzabox from "./assets/nyp-Pizzabox.png";
import slicer from "./assets/slicer.png";
import pizzaSlice from "./assets/sprite-pizza-slice.png";
import statue from "./assets/sprite-statue-of-liberty.png";

var currentObject;
var groundPlatform;
var score = 0;
var amount = 0; // debug puposes
var scoreText;

var totalTime = 30000; // in ms
var timerText;
var timer;
var isGameover = false;

var tweenX = 700;
var tweenY = 100;

var offset = 0;

var gameoverText;

var textureNames = [
  "chickenwing",
  "hotdog",
  "nyp-box",
  "nyp-pizzabox",
  "slicer",
  "sprite-pizza-slice",
  "sprite-statue-of-liberty",
];
class MyGame extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image(textureNames[0], chickenwing);
    this.load.image(textureNames[1], hotdog);
    this.load.image(textureNames[2], nypBox);
    this.load.image(textureNames[3], nypPizzabox);
    this.load.image(textureNames[4], slicer);
    this.load.image(textureNames[5], pizzaSlice);
    this.load.image(textureNames[6], statue);

    this.load.image("platform", platform);
  }

  create() {
    // create essentials stuff
    var index = Math.floor(Math.random() * textureNames.length);
    currentObject = this.add.image(100, 100, textureNames[index]);
    var tween = this.tweens.add({
      targets: currentObject,
      x: tweenX,
      y: tweenY,
      duration: 2000,
      yoyo: true,
      repeat: -1,
    });

    // setup the bottom platform
    groundPlatform = this.physics.add.staticGroup();
    groundPlatform.create(400, 550, "platform").setName("GroundPlatform");

    // text UI
    scoreText = this.add.text(
      16 + this.cameras.main.x,
      16 + this.cameras.main.y,
      "Score: 0",
      {
        fontSize: "32px",
        fill: "#f5ffff",
      }
    );

    timerText = this.add.text(400, 50, totalTime.toString(), {
      fontSize: "32px",
      fill: "#f5ffff",
    });

    gameoverText = this.add.text(320, 150, "", {
      fontSize: "32px",
      fill: "#f5ffff",
    });

    scoreText.setScrollFactor(0, 0);
    timerText.setScrollFactor(0, 0);
    gameoverText.setScrollFactor(0, 0);
    currentObject.setScrollFactor(0, 0);

    var stackBlock = this.physics.add.group();
    var phy = this.physics;
    var cam = this.cameras.main;

    // TODO add delay
    // input
    this.input.on("pointerdown", function () {
      if (isGameover) return;
      var newObject = stackBlock.create(
        currentObject.x,
        currentObject.y - offset,
        currentObject.texture
      );

      newObject.setName(amount);
      amount++;
      console.log("cam y :" + cam.y);

      currentObject.setTexture(
        textureNames[Math.floor(Math.random() * textureNames.length)]
      );

      if (timer.paused) {
        timer.paused = false;
      }
    });

    // add physics
    this.physics.add.collider(
      stackBlock,
      groundPlatform,
      function (first, second) {
        // first is dynamic
        // second is static
        // make new object that is static
        var placedObject = groundPlatform.create(
          first.x,
          first.y,
          first.texture
        );
        console.log("Dropped y: " + placedObject.y);
        if (550 - first.y > score) {
          score = 550 - placedObject.y;

          scoreText.setText("Score: " + Math.floor(score));

          if (score > 250) {
            cam.centerOnY(first.y);
            offset = 250 - first.y;
          }
        }

        first.destroy();
        console.log("Score: " + score);
      }
    );

    timer = this.time.addEvent({
      delay: totalTime,
      loop: false,
      paused: true,
      callback: function () {
        // show score and/or highscore
        var localScore = localStorage.getItem("Highscore");
        var highscoreText = "";
        console.log("Local storage: " + localScore);
        if (localScore == null || parseInt(localScore) < score) {
          console.log("new high score!");
          localStorage.setItem("Highscore", score.toString());
          highscoreText = "new highscore!";
        }
        gameoverText.setText("Gameover \n" + highscoreText);

        tween.stop();
        isGameover = true;
      },
    });
  }

  update() {
    if (timer.getRemaining() > 0)
      timerText.setText(Math.floor((timer.getRemaining() / 1000).toString()));
  }
}

const config = {
  type: Phaser.AUTO,
  parent: "game",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  width: 800,
  height: 600,
  scene: MyGame,
};

const game = new Phaser.Game(config);
console.log(game);
