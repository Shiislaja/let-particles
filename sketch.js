let fibers = [];

function setup() {
  createCanvas(1920, 1080, SVG);
  background(255);
  noFill();
  strokeCap(ROUND);

  // pridajme veľa vlákien
  for (let i = 0; i < 300; i++) {
    fibers.push(new Fiber(random(width), random(height)));
  }
}

function draw() {
  for (let f of fibers) {
    f.update();
    f.display();
  }

  // stále pridávame nové vlákna pre dynamiku
  if (frameCount % 50 === 0) {
    for (let i = 0; i < 30; i++) {
      fibers.push(new Fiber(random(width), random(height)));
    }
  }
}

class Fiber {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.prev = this.pos.copy();
    this.life = int(random(200, 600));
    this.weight = random(0.2, 2.5);
    this.col = color(120 + random(-40, 40), 0, 180 + random(-40, 40), 120);
    this.noff = createVector(random(1000), random(1000));
  }

  update() {
    this.prev = this.pos.copy();
    let angle = noise(this.noff.x, this.noff.y) * TWO_PI * 4;
    let step = p5.Vector.fromAngle(angle);
    step.mult(1.5);
    this.pos.add(step);
    this.noff.add(0.003, 0.003);
    this.life--;
  }

  display() {
    stroke(this.col);
    strokeWeight(this.weight);
    line(this.prev.x, this.prev.y, this.pos.x, this.pos.y);
  }
}

function keyPressed() {
  if (key === 's') {
    save("fluid-fibers.svg");
  }
}
