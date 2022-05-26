import { CREME_COLORS } from "../../../utils/colors";
import { random } from "../../../utils/utils";

class DotEntity {
    constructor(config) {
        // this.config = { ...PARTICLE_CONFIG, ...this.config }

        this.x = config.x || 20;
        this.y = config.y || 20;

        this.direction = typeof config.direction === 'number' ? config.direction : 130;
        this.growthRate = config.growthRate || 0.005;

        // this.minR = 15;
        // this.maxR = 45;

        this.r = config.r || 15; //|| random(this.minR, this.maxR);

        //
        // this.decay = random(0.01, 0.5);
        this.decay = config.decay || 0.1;
        this.speed = config.speed || 0.1;

        this.hollow = random(0, 1) > 0.5;

        this.hsl = CREME_COLORS[parseInt(random(0, CREME_COLORS.length))];

        // this.maxLife = 40;

        // this.maxLife = random(10, 40);
        this.isAlive = true;
        // this.maxLife = 100;
        this.maxLife = random(20, 200);
        this.life = 0;
        this.lifeProgress = 0;

        // this.opacity = .81
        this.opacity = random(0.1, 1);

        // this.char = random(0, 100) > 90 ? String.fromCharCode(parseInt(random(48, 126))) : null;
    }

    update(canvas, delta) {
        if (!this.isAlive) return;

        // let a = this.direction
        // console.log(a);
        // this.y += this.speed;
        this.y += this.speed * delta * Math.sin(this.direction * (Math.PI / 180));
        this.x += this.speed * delta * Math.cos(this.direction * (Math.PI / 180));

        this.r += this.growthRate;

        this.life += this.decay * delta;

        this.lifeProgress = 1 - this.life / this.maxLife;
        if (this.life >= this.maxLife) {
            this.isAlive = false;
            // console.log(this, 'dies of old age');
        } else if (this.r < 1) {
            this.isAlive = false;
            // console.log(this, 'dies of shrink');
        } else if (
            this.x > canvas.width + this.r * 2 ||
            this.x < -this.r * 2 ||
            this.y > canvas.height + this.r * 2 ||
            this.y < -this.r * 2
        ) {
            // console.log(this, 'dies, out of viewport');
            this.isAlive = false;
        }
    }

    draw(context) {
        context.beginPath();

        context.fillStyle = `hsla(${this.hsl}, ${this.opacity * this.lifeProgress})`;
        context.strokeStyle = `hsla(${this.hsl}, ${this.opacity * this.lifeProgress})`;

        context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);


        if (this.char) {
            context.textBaseline = "middle";
            context.textAlign = "center";

            context.fillStyle = `hsla(${this.hsl}, ${this.opacity}`;
            context.font = parseInt(this.r * 0.5) + "px courier";

            context.fillText(
                this.char,
                this.x + this.r * 0.5,
                this.y + (this.r * 2) / 3
            );
        } else if (this.hollow) context.stroke();
        else context.fill();
    }
}

export default DotEntity;
