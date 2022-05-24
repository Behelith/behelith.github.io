let FORCE_RERENDER = false;

let TRIANGLE_WIDTH = 32;
let TRIANGLE_HEIGHT = 28;

let MIN_HUE = 0;
let MAX_HUE = 60;

let OPACITY_DECAY = 0.005;
let OPACITY_GAIN = 0.005;

let RENDER_LETTERS = false;

class Triangle {
  constructor(x = 0, y = 0, reversed = false) {
    // DIMENSIONS
    this.reversed = reversed;
    this.x = x;
    this.y = y;
    this.width = TRIANGLE_WIDTH;
    this.height = TRIANGLE_HEIGHT;

    // VISUAL
    this.char = null;

    this.fading = random(0, 100) >= 50;
    // this.char = random(0, 100) > 99.9 ? String.fromCharCode(parseInt(random(48, 126))) : null;

    this.hue = random(MIN_HUE, MAX_HUE);
    this.opacity = random(0, 1);
    this.minFade = -random(0, 2);

    this.drawFill = random(0, 100) > 99;
    this.drawStroke = random(0, 100) > 99;

    // this.resetValues()
  }

  resetValues() {
    if (RENDER_LETTERS)
      this.char =
        random(0, 100) > 90
          ? String.fromCharCode(parseInt(random(48, 126)))
          : null;
    else this.char = null;

    this.hue = random(MIN_HUE, MAX_HUE);
    this.opacity = random(0, 1);
    this.minFade = -random(0, 2);

    this.drawFill = random(0, 100) > 99;
    this.drawStroke = random(0, 100) > 95;
  }

  update(delta) {
    // console.log({
    //     fading: this.fading,
    //     drawFill: this.drawFill,
    //     drawStroke: this.drawStroke,
    //     opacity: this.opacity
    // });

    if (this.fading) {
      if (this.opacity <= this.minFade) {
        this.fading = false;
        this.resetValues();
      } else this.opacity -= OPACITY_DECAY * delta;
    } else if (!this.fading) {
      if (this.opacity > 1) {
        this.fading = true;
      } else this.opacity += OPACITY_GAIN * delta;
    }
  }

  draw(context) {
    //   console.log(context);

    const opacity = this.opacity >= 0 ? this.opacity : 0;
    // const opacity = 1

    if (this.char) {
      context.fillStyle = `hsla(${this.hue},70%,50%, ${opacity}`;
      context.font = parseInt(TRIANGLE_HEIGHT * 0.5) + "px courier";

      if (this.reversed)
        context.fillText(
          this.char,
          this.x + this.width * 0.5,
          this.y + (this.height * 1) / 3
        );
      else
        context.fillText(
          this.char,
          this.x + this.width * 0.5,
          this.y + (this.height * 2) / 3
        );
      return;
    }

    let region = this.reversed ? this.fillRegionReverse() : this.fillRegion();
    if (this.drawFill) {
      context.fillStyle = `hsla(${this.hue},70%,50%, ${opacity}`;
      context.fill(region);
    }

    if (this.drawStroke) {
      context.strokeStyle = `hsla(${this.hue},70%,50%, ${opacity}`;
      context.lineWidth = 0.5;
      context.stroke(region);
    }
  }

  fillRegion() {
    const region = new Path2D();
    // region.moveTo(0, this.y + this.height);
    region.moveTo(this.x, this.y + this.height);
    region.lineTo(this.x + this.width, this.y + this.height);
    region.lineTo(this.x + this.width * 0.5, this.y);
    region.closePath();
    return region;
  }

  fillRegionReverse() {
    const region = new Path2D();
    region.moveTo(this.x, this.y);
    region.lineTo(this.x + this.width, this.y);
    region.lineTo(this.x + this.width * 0.5, this.y + this.height);
    region.closePath();
    return region;
  }
}

function random(min, max) {
  return max > min
    ? Math.random() * (max - min) + min
    : Math.random() * (min - max) + max;
}

function randomArrayElements(arr, length) {
  if (length >= arr.length) return arr;
  if (length <= 0) return [];

  const indices = [];
  const elements = [];
  while (elements.length < length) {
    let index = parseInt(random(0, arr.length));
    if (!indices.includes(index)) {
      indices.push(index);
      elements.push(arr[index]);
    }
  }

  return elements;
}

const generateTriangles = (columns, rows) => {
  const arr = [];

  let shift = true;

  for (let yi = 0; yi < rows; yi += 1) {
    let y = yi * TRIANGLE_HEIGHT;
    for (let xi = 0; xi < columns; xi++) {
      let offset = shift ? TRIANGLE_WIDTH * 0.5 : 0;
      let x = xi * TRIANGLE_WIDTH + offset;
      // console.log(x, y);
      arr.push(new Triangle(x, y));
      arr.push(new Triangle(x - TRIANGLE_WIDTH * 0.5, y, true));
    }
    shift = !shift;
  }
  return arr;
};

const generateTriangles2 = (canvas) => {
  console.log("generate triangles");
  const arr = [];

  let shift = true;

  for (let yi = 0; yi * TRIANGLE_HEIGHT < canvas.height; yi++) {
    let y = yi * TRIANGLE_HEIGHT;
    for (let xi = 0; xi * TRIANGLE_WIDTH < canvas.width; xi++) {
      let offset = shift ? TRIANGLE_WIDTH * 0.5 : 0;

      let x = xi * TRIANGLE_WIDTH + offset;
      arr.push(new Triangle(x, y));
      arr.push(new Triangle(x - TRIANGLE_WIDTH * 0.5, y, true));
    }
    shift = !shift;
  }
  return arr;
};

const triangles = () => {
  const canvas = document.createElement("canvas");
  // const canvasContainer = document.getElementById('canvasContainer')
  const canvasContainer = document.body;
  canvasContainer.append(canvas);
  canvas.id = "backgroundCanvas";
  const ctx = canvas.getContext("2d");
  let now = new Date();
  let delta;

  if (
    canvas.height != canvas.offsetHeight ||
    canvas.width != canvas.offsetWidth
  ) {
    canvas.height = canvas.offsetHeight;
    canvas.width = canvas.offsetWidth;
  }

  let entities = generateTriangles2(canvas);
  // let entities = generateTriangles(2, 2)

  // for (let yi = 0; yi < 25; yi += 1) {

  ctx.textBaseline = "middle";
  ctx.textAlign = "center";

  const update = () => {
    let then = now.getTime();
    now = new Date();
    delta = now.getTime() - then;

    // UPDATE CANVAS SIZE
    if (
      canvas.height != canvas.offsetHeight ||
      canvas.width != canvas.offsetWidth ||
      FORCE_RERENDER
    ) {
      canvas.height = canvas.offsetHeight;
      canvas.width = canvas.offsetWidth;
      entities = generateTriangles2(canvas);
      FORCE_RERENDER = false;
    }

    for (let t of entities) t.update(delta);
    // console.log(entities.length);
    // document.title = now.toJSON()
    draw();
    requestAnimationFrame(update);
  };

  // const t = new Triangle

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ctx.fillStyle = "hsla(120,70%,50%, .2"
    // const arr = randomArrayElements(entities, 100)
    // for (let t of arr) t.draw(ctx, delta)

    for (let t of entities) t.draw(ctx, delta);
  };

  // update()
  // setInterval(update, 150);
  requestAnimationFrame(update);
};

// triangles();
// export default Triangle_;
// export default Triangle;
export { Triangle, generateTriangles, generateTriangles2 };
// export default AnimBackground;
