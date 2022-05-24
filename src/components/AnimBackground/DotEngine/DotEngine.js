import { random } from "../../../utils/utils";
import DotEntity from "./DotEntity";

class DotEngine {
    constructor() {
        this.entities = []
        this.canvas = null

        this.decay = .1
        this.entitiesLimit = 10;
        this.particleSize = 25
        this.particleSpeed = .1
        this.speed = 3
        this.direction = 90
        this.growthRate = 0

        this.config = {
            entitiesLimit: {
                value: 15,
                min: 1,
                max: 150,
                step: 1,
            },
            decay: {
                value: .1,
                min: .001,
                max: 1,
                step: .001,
            },
            particleSize: {
                value: 10,
                min: 0,
                max: 150,
                step: 1,
            },
            particleSpeed: {
                value: .25,
                min: 0,
                max: 1,
                step: .05,
            },
            direction: {
                value: 90,
                min: 0,
                max: 360,
                step: 5,
            },
            growthRate: {
                value: -.01,
                min: -.5,
                max: .5,
                step: .005,
            },
        }

        this.advancedConfig = {
            xPosMin: {
                value: 0,
                min: 0,
                max: 1,
                step: .1,
            },
            xPosMax: {
                value: 1,
                min: 0,
                max: 1,
                step: .1,
            },
            yPosMin: {
                value: 0,
                min: 0,
                max: 1,
                step: .1,
            },
            yPosMax: {
                value: 1,
                min: 0,
                max: 1,
                step: .1,
            },

        }
    }



    // setDecay(decay) { this.decay = decay }
    // setEntitiesLimit(entitiesLimit) { this.entitiesLimit = entitiesLimit }
    // setSize(particleSize) { this.particleSize = particleSize }
    // setSpeed(particleSpeed) { this.particleSpeed = particleSpeed }
    // setDirection(direction) { this.direction = direction }
    // setGrowthRate(growthRate) { this.growthRate = growthRate }

    setConfig(config) { this.config = config }
    setAdvancedConfig(config) { this.advancedConfig = config }

    // getDecay() { return this.decay }
    // getEntitiesLimit() { return this.entitiesLimit }
    // getSize() { return this.particleSize }
    // getSpeed() { return this.particleSpeed }
    // getDirection() { return this.direction }
    // getGrowthRate() { return this.growthRate }

    getConfig() { return this.config }
    getAdvancedConfig() { return this.advancedConfig }

    // getDecay() { return this.decay }
    // getEntitiesLimit() { return this.entitiesLimit }

    getCoords(canvas, radius) {
        let xPosMin = canvas.width * this.advancedConfig.xPosMin.value - radius
        let xPosMax = canvas.width * this.advancedConfig.xPosMax.value + radius
        let yPosMin = canvas.height * this.advancedConfig.yPosMin.value - radius
        let yPosMax = canvas.height * this.advancedConfig.yPosMax.value + radius

        let x = random(xPosMin, xPosMax)
        let y = random(yPosMin, yPosMax)

        return { x, y }
    }

    update(canvas, delta) {
        if (!canvas) return
        for (let e of this.entities) e.update(canvas, delta * .1)

        this.entities = this.entities.filter(e => e.isAlive)

        // const decaySpan = .1
        // const sizeSpan = 30
        // const speedSpan = 2
        // const directionSpan = 0

        const decaySpan = .1
        const sizeSpan = .2 * this.config.particleSize.value
        const speedSpan = .2 * this.config.particleSpeed.value
        const directionSpan = 0

        if (this.entities.length < this.config.entitiesLimit.value) {
            // let missing = this.config.entitiesLimit.value - this.entities.length
            // for (let i = 0; i < missing; i++) {


            // let r = random(this.config.particleSize.value - sizeSpan * .5, this.config.particleSize.value + sizeSpan * .5)
            let r = random(this.config.particleSize.value - sizeSpan, this.config.particleSize.value + sizeSpan)
            if (r <= 0) r = this.config.particleSize.value
            let coords = this.getCoords(canvas, r)

            let decay = random(this.config.decay.value - decaySpan * .5, this.config.decay.value + decaySpan * .5)
            if (decay <= 0) decay = this.config.decay.value

            // let speed = this.speed
            // let speed = random(this.config.particleSpeed.value - speedSpan * .5, this.config.particleSpeed.value + speedSpan * .5)
            let speed = random(this.config.particleSpeed.value - speedSpan, this.config.particleSpeed.value + speedSpan)
            if (speed <= 0) speed = this.config.particleSpeed.value

            // let direction = random(this.config.direction.value - directionSpan * .5, this.config.direction.value + directionSpan * .5)
            // if (direction <= 0) 
            let direction = this.config.direction.value

            this.entities.push(
                new DotEntity({
                    ...coords,
                    r,
                    decay,
                    speed,
                    direction,
                    growthRate: this.config.growthRate.value
                }))
            // }
        }
    }

    draw(context) {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)


        // context.textBaseline = "middle";
        // context.textAlign = "center";

        // context.fillStyle = `#aab`;
        // context.font = "12px courier";

        // context.fillText(
        //     this.entities.length,
        //     50,
        //     50,
        // );

        // console.log(this.entities);

        for (let e of this.entities) {
            e.draw(context)
        }
    }
}

export default DotEngine