import Phaser from "phaser"

const GROUND_KEY = "ground"
const DUDE_KEY = "dude"
const SKY_KEY = "sky"
const BOMB_KEY = "bomb"
const STAR_KEY = "star"

export default class GameScene extends Phaser.Scene {
    constructor(){
        super("gameScene")
        this.player = undefined
        this.cursor = undefined
    }
    preload(){
        this.load.image(BOMB_KEY, "assets/bomb.png")
        this.load.image(GROUND_KEY, "assets/platform.png")
        this.load.image(SKY_KEY, "assets/sky.png")
        this.load.image(STAR_KEY, "assets/star.png")
        this.load.spritesheet(DUDE_KEY, "assets/dude.png",{frameWidth:32,frameHeight:48})
    }
    create(){
        this.add.image(400,300,"sky")

        const platforms = this.createPlatforms()
        this.player = this.createPlayer()

        this.physics.add.collider(this.player, platforms)

        this.cursor = this.input.keyboard.createCursorKeys()

    }
    createPlatforms(){
        const platforms = this.physics.add.staticGroup()
        platforms.create(400,568,GROUND_KEY).setScale(2).refreshBody()

        platforms.create(600, 400, GROUND_KEY)
        platforms.create(50, 250, GROUND_KEY)
        platforms.create(750,220, GROUND_KEY)

        return platforms
    }

    createPlayer(){
        let player = this.physics.add.sprite(100, 450, DUDE_KEY)
        player.setBounce(0.2)
        player.setCollideWorldBounds(true)
        // player.setVelocityY(300)

        this.anims.create({
            key:"left",
            frames: this.anims.generateFrameNames(DUDE_KEY, {start:0, end:3}),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key:"turn",
            // frames: [{key:DUDE_KEY, frame:4}],
            frames: this.anims.generateFrameNames(DUDE_KEY, {start:4, end:4}),
            frameRate: 20,
        })

        this.anims.create({
            key:"right",
            frames: this.anims.generateFrameNames(DUDE_KEY, {start:5, end:8}),
            frameRate: 10,
            repeat: -1
        })
        return player
    }
    update(){
        if(this.cursor.left.isDown){
            this.player.setVelocityX(-160)
            this.player.anims.play("left", true)
        } else if(this.cursor.right.isDown){
            this.player.setVelocityX(160)
            this.player.anims.play("right",true)
        } else {
            this.player.setVelocityX(0)
            this.player.anims.play("turn", true)
        }

        // && this.player.body.touching.down
        if(this.cursor.up.isDown && this.player.body.touching.down){
            this.player.setVelocityY(-300)
        }
    }

    createStars(){
        const stars = this.physics.add.group({
    
        })
    }
}