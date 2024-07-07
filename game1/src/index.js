import Phaser from "phaser"
import GameScene from "./scene/GameScene"

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics:{
        default:"arcade",
        arcade:{
            gravity: {y: 300}
        }
    },
    scene:[GameScene]
}

var game = new Phaser.Game(config)
