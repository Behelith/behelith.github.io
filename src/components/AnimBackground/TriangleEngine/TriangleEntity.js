import { random } from "../../../utils/utils";

class TriangleEntity {
    constructor(x = 0, y = 0, hue = random(50, 80)) {
        this.x = x;
        this.y = y;

        this.height = 32
        this.width = 28

        // this.decay = random(0.01, 0.5);
        this.decay = .1;
        this.hollow = random(0, 1) > 0.5;

        // this.hue = 200;
        this.hue = hue;

        this.isAlive = true;
        // this.maxLife = 40;
        this.maxLife = random(10, 60);
        this.life = 0;
        this.lifeProgress = 0;

        // this.opacity = .81
        this.opacity = random(.1, .9)
    }

    update() {
        const config = {
        }

        if (!this.isAlive) return;
        // this.hue += 1
        // this.r += this.decay;
        // this.x += .1
        // this.y += this.decay;

        this.life += this.decay;
        this.lifeProgress = 1 - (this.life / this.maxLife)
        // console.log(this.life);

        if (this.life >= this.maxLife) this.isAlive = false;
    }

    draw(context) {
        context.beginPath();

        // context.fillStyle = `hsla(${this.hue},70%, 50%, ${1 - this.life})`;
        // context.strokeStyle = `hsla(${this.hue},70%, 50%, ${1 - this.life})`;
        context.fillStyle = `hsla(${this.hue},70%, 50%, ${this.opacity * this.lifeProgress})`;
        context.strokeStyle = `hsla(${this.hue},70%, 50%, ${this.opacity * this.lifeProgress})`;

        // context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        let region = this.fillRegion()

        if (this.hollow) context.stroke(region);
        else context.fill(region);
    }

    fillRegion() {
        const region = new Path2D();
        // region.moveTo(0, this.y + this.height);
        region.moveTo(this.x, this.y + this.height);
        region.lineTo(this.x + this.width, this.y + this.height);
        region.lineTo(this.x + this.width * .5, this.y);
        region.closePath();
        return region
    }

    fillRegionReverse() {
        const region = new Path2D();
        region.moveTo(this.x, this.y);
        region.lineTo(this.x + this.width, this.y);
        region.lineTo(this.x + this.width * .5, this.y + this.height);
        region.closePath();
        return region
    }
}

export default TriangleEntity;
