import Phaser from "phaser"
import { ScoreText } from "../ui/Score"
import BombSpawner from "../ui/Bomb"

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
        this.scoreText = undefined
        this.BombSpawner = undefined
        this.stars = undefined

        this.gameOver = false
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

        this.bombSpawner = new BombSpawner(this, BOMB_KEY)

		const bombsGroup = this.bombSpawner.group
        const platforms = this.createPlatforms()
        this.player = this.createPlayer()
        this.stars = this.createStars()
        this.cursor = this.input.keyboard.createCursorKeys()
        this.scoreText = this.createScoreText(16, 16, 0)


        this.physics.add.collider(bombsGroup, platforms)
        this.physics.add.collider(this.player, platforms)
        this.physics.add.collider(this.stars, platforms)
        this.physics.add.collider(this.player, bombsGroup, this.over, null, this)
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this)

    }
    collectStar(player, star){
        star.disableBody(true,true)
        this.scoreText.add(10)
        if(this.stars.countActive(true) === 0){
            this.stars.children.iterate((child)=>{
                child.enableBody(true,child.x, 0,true,true)
            })
        }
        this.bombSpawner.spawn(player.x)
    }
    over(player, bomb){
        this.physics.pause()
        player.setTint("0xff0000")
        player.anims.play("turn")
        this.gameOver = true
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
        if(this.gameOver){
            return
        }

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
            key: "star",
            repeat:11,
            setXY:{x:12, y:0, stepX:70}
        })
        stars.children.iterate(function(children){
            children.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
        })

        return stars
    }
    createScoreText(x, y, score){
        const scoreText = new ScoreText(this, x, y, score, {fontSize:32, fill:"#ffffff"})
        this.add.existing(scoreText)
        return scoreText
    }
}