import { random } from "../../../utils/utils";
import TriangleEntity from "./TriangleEntity";

class TriangleEngine {
    constructor() {
        this.variant = 'triangle_engine'
        // this.entities = [new TriangleEntity(30, 30, 30)]
        this.entities = []
        this.entitiesLimit = 150;

        this.triangleWidth = 64
        this.triangleHeight = (Math.sqrt(3) * this.triangleWidth) * .5

        this.gridWidth = 0
        this.gridHeight = 0
    }

    getConfig() { return {} }
    getAdvancedConfig() { return {} }

    update(canvas, delta) {
        if (!canvas) return
        this.gridWidth = parseInt(canvas.width / this.triangleWidth * 2) + 2
        this.gridHeight = parseInt(canvas.height / this.triangleHeight) + 1

        for (let e of this.entities) e.update(canvas)

        this.entities = this.entities.filter(e => e.isAlive)

        if (!canvas) return


        if (0)
            if (this.entities.length < this.entitiesLimit) {
                let missing = this.entitiesLimit - this.entities.length
                for (let i = 0; i < missing; i++)
                    this.entities.push(
                        new TriangleEntity(random(0, canvas.width),
                            random(30, canvas.height),
                            random(10, 20)))
            }

        // if (this.entities.length < this.gridWidth * this.gridHeight) {
        if (this.entities.length < this.entitiesLimit) {
            // if (this.entities.length < this.gridWidth) {
            // if (this.entities.length < 1) {
            this.entities.push(new TriangleEntity({
                // column: 5,
                // row: 3,
                column: parseInt(random(0, this.gridWidth)),
                row: parseInt(random(0, this.gridHeight)),
                size: this.triangleWidth
            }))
        }


    }

    draw(context) {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
        if (0)
            for (let y = 0; y < this.gridHeight; y++) {
                for (let x = 0; x < this.gridWidth; x++) {
                    let shift = (this.triangleWidth * .5)
                    let posX = this.triangleWidth * x * .5 - shift;

                    // if (y % 2 == 0) posX -= this.triangleWidth * .5

                    let posY = this.triangleHeight * y;

                    const region = new Path2D();

                    let char = '.'
                    let charX = posX + this.triangleWidth * .5
                    let charY = posY + (this.triangleHeight * 2 / 3)

                    let charFillStyle = '#f00'
                    let regionFillStyle = '#f003'
                    let regionStrokeStyle = '#f00'

                    if (x % 2 == 0 && y % 2 == 0) {
                        charFillStyle = '#f00'
                        regionFillStyle = '#f003'
                        regionStrokeStyle = '#f00'

                        char = '1'

                        // regular
                        region.moveTo(posX, posY + this.triangleHeight);
                        region.lineTo(posX + this.triangleWidth, posY + this.triangleHeight);
                        region.lineTo(posX + this.triangleWidth * .5, posY);
                        region.closePath();
                    } else if (x % 2 == 1 && y % 2 == 0) {
                        charFillStyle = '#0fa'
                        regionFillStyle = '#0fa3'
                        regionStrokeStyle = '#0fa'

                        char = '2'
                        charY = posY + (this.triangleHeight * 1 / 3)

                        // inverted
                        region.moveTo(posX, posY);
                        region.lineTo(posX + this.triangleWidth, posY);
                        region.lineTo(posX + this.triangleWidth * .5, posY + this.triangleHeight);
                        region.closePath();
                    } else if (x % 2 == 0 && y % 2 == 1) {
                        charFillStyle = '#fa0'
                        regionFillStyle = '#fa03'
                        regionStrokeStyle = '#fa0'

                        char = '3'
                        charY = posY + (this.triangleHeight * 1 / 3)

                        // inverted
                        region.moveTo(posX, posY);
                        region.lineTo(posX + this.triangleWidth, posY);
                        region.lineTo(posX + this.triangleWidth * .5, posY + this.triangleHeight);
                        region.closePath();
                    } else if (x % 2 == 1 && y % 2 == 1) {
                        charFillStyle = '#af0'
                        regionFillStyle = '#af03'
                        regionStrokeStyle = '#af0'

                        char = '4'

                        // regular 
                        region.moveTo(posX, posY + this.triangleHeight);
                        region.lineTo(posX + this.triangleWidth, posY + this.triangleHeight);
                        region.lineTo(posX + this.triangleWidth * .5, posY);
                        region.closePath();
                    }


                    context.textBaseline = "middle";
                    context.textAlign = "center";
                    context.font = "15px courier";

                    context.fillStyle = charFillStyle
                    context.fillText(char, charX, charY)
                    context.fillText(x + ',' + y, charX, charY + 15)

                    // context.fillRect(posX, posY, this.triangleWidth, this.triangleHeight)
                    // context.strokeRect(posX, posY, this.triangleWidth, this.triangleHeight)


                    // -----------

                    // region.moveTo(0, this.y + this.height);

                    // context.fillStyle = regionFillStyle
                    // context.fill(region);
                    context.strokeStyle = regionStrokeStyle
                    context.stroke(region);



                }
            }



        if (0) {
            context.fillStyle = '#fff'
            context.textAlign = "left";
            context.font = "15px courier";

            context.fillText(JSON.stringify({
                triangleWidth: this.triangleWidth,
                triangleHeight: this.triangleHeight,
                gridWidth: this.gridWidth,
                gridHeight: this.gridHeight,
            }, null, 2), 40, 120)
        }

        for (let e of this.entities) {
            // console.log('draw ', e);
            e.draw(context)
        }
    }
}

export default TriangleEngine