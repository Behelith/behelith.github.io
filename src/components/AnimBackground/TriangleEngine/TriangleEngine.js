import { random } from "../../../utils/utils";
import TriangleEntity from "./TriangleEntity";



// let TRIANGLE_WIDTH = 32;
// let TRIANGLE_HEIGHT = 28;

let TRIANGLE_WIDTH = 64;
let TRIANGLE_HEIGHT = 52;


const generateTriangles = (canvas) => {
    // console.log('generate triangles');
    const arr = []

    let shift = true

    for (let yi = 0; yi * TRIANGLE_HEIGHT < canvas.height; yi++) {
        let y = yi * TRIANGLE_HEIGHT
        for (let xi = 0; xi * TRIANGLE_WIDTH < canvas.width; xi++) {
            let offset = shift ? TRIANGLE_WIDTH * .5 : 0

            let x = xi * TRIANGLE_WIDTH + offset
            arr.push(new TriangleEntity(x, y))
            arr.push(new TriangleEntity(x - TRIANGLE_WIDTH * .5, y, true))
        }
        shift = !shift
    }
    return arr
}

class TriangleEngine {
    constructor() {
        // this.entities = [new TriangleEntity(30, 30, 30)]
        this.entities = []
        this.entitiesLimit = 15;
        
    }

    generate(canvas) {
        // console.log('generate');
        this.entities = generateTriangles(canvas)
    }


    update(canvas) {

        for (let e of this.entities)
            e.update()

        this.entities = this.entities.filter(e => e.isAlive)

        if (!canvas) return
        // this.generate(canvas)

        // if (this.entities.length < this.entitiesLimit) {
        //     let missing = this.entitiesLimit - this.entities.length
        //     for (let i = 0; i < missing; i++)
        //         this.entities.push(new TriangleEntity(random(0, canvas.width), random(30, canvas.height), random(10, 20)))
        // }

    }

    draw(context) {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)

        for (let e of this.entities) {
            e.draw(context)
        }
    }
}

export default TriangleEngine