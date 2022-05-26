import { CREME_COLORS } from "../../../utils/colors";
import { random } from "../../../utils/utils";

class TriangleEntity {
    constructor(config) {
        this.column = typeof config.column === "number" ? config.column : 0;
        this.row = typeof config.row === "number" ? config.row : 0;
        this.width = typeof config.size === "number" ? config.size : 10;
        this.height = Math.sqrt(3) * this.width * 0.5;

        this.isHollow = random(0, 1) > 0.5;

        this.shift = this.width * 0.5;
        this.posX = this.width * this.column * 0.5 - this.shift;
        this.posY = this.height * this.row;

        this.hsl = CREME_COLORS[parseInt(random(0, CREME_COLORS.length))];

        this.char = random(0, 1) > 0.5
            ? String.fromCharCode(parseInt(random(48, 126)))
            : null;

        this.charX = this.posX + this.width * 0.5;
        this.charY = this.posY + (this.height * 2) / 3;

        if ((this.column % 2 == 1 && this.row % 2 == 0) ||
            (this.column % 2 == 0 && this.row % 2 == 1)) {
            // inverted
            this.charY = this.posY + (this.height * 1) / 3;
        }

        this.life = 0;
        this.maxLife = random(50, 150);
        this.isAlive = true;
        this.lifeProgress = 0;

        this.decay = 0.752;

        this.opacity = random(0.1, 1);
    }

    update(canvas, delta) {
        // console.log(canvas);

        if (!canvas) return;

        if (!this.isAlive) return;

        this.life += this.decay;
        this.lifeProgress = 1 - this.life / this.maxLife;

        if (
            this.posX > canvas.width ||
            this.posX - this.shift < 0 ||
            this.posY + this.height > canvas.height ||
            this.posY - this.height < 0 ||
            this.life >= this.maxLife
        ) {
            this.isAlive = false;
        }
    }

    draw(context) {
        context.beginPath();

        let char = ".";
        this.charY;

        let charFillStyle = `hsla(${this.hsl},${this.opacity * this.lifeProgress * .8})`;
        let regionFillStyle = `hsla(${this.hsl},${this.opacity * this.lifeProgress * .8})`;
        let regionStrokeStyle = `hsla(${this.hsl},${this.opacity * this.lifeProgress * .8})`;

        let region;

        if ((this.column % 2 == 1 && this.row % 2 == 0) ||
            (this.column % 2 == 0 && this.row % 2 == 1)) {
            region = this.fillRegionReverse();
        } else {
            region = this.fillRegion();
        }

        if (this.drawDiag) {
            context.textAlign = "center";
            context.fillStyle = "#fff";
            context.font = "12px courier";
            context.fillText(
                // this.column + "," + this.row,
                this.lifeProgress.toFixed(2),
                this.charX,
                this.charY + 15
            );
        }

        // -----------

        // region.moveTo(0, this.y + this.height);

        if (this.char) {
            context.textBaseline = "middle";
            context.textAlign = "center";
            context.font = this.height / 3 + "px courier";

            context.fillStyle = charFillStyle;
            context.fillText(this.char, this.charX, this.charY);
        } else if (this.isHollow) {
            context.fillStyle = regionFillStyle;
            context.fill(region);
        } else {
            context.strokeStyle = regionStrokeStyle;
            context.stroke(region);
        }
    }

    fillRegion() {
        const region = new Path2D();
        region.moveTo(this.posX, this.posY + this.height);
        region.lineTo(this.posX + this.width, this.posY + this.height);
        region.lineTo(this.posX + this.width * 0.5, this.posY);
        region.closePath();
        return region;
    }

    fillRegionReverse() {
        const region = new Path2D();
        region.moveTo(this.posX, this.posY);
        region.lineTo(this.posX + this.width, this.posY);
        region.lineTo(this.posX + this.width * 0.5, this.posY + this.height);
        region.closePath();
        return region;
    }
}

export default TriangleEntity;
