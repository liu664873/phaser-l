import Phaser from "phaser"

const formatScore = (score) => `Score: ${score}`

export class ScoreText extends Phaser.GameObjects.Text {
    constructor(scene, x, y, score, style){
        super(scene, x, y, formatScore(score), style)
        this.score = score
    }
    getScore(){
        return this.score
    }
    setScore(score){
        this.score = score
        this.refresh()
    }
    add(point){
        this.setScore(this.score + point)
    }
    refresh(){
        this.setText(formatScore(this.score))
    }
}