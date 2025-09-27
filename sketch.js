let fibers = [];
let center;

function setup() {
  createCanvas(1080, 1080, SVG);
  background(255);

  // stredová pozícia
  center = createVector(width / 2, height / 2);

  // inicializácia vlákien zo stredu
  for (let i = 0; i < 200; i++) {
    fibers.push(new Fiber(center.x, center.y));
  }

  noFill();
  strokeCap(ROUND);
}

function draw() {
  for (let f of fibers) {
    f.update();
    f.display();
  }

  // pridávaj nové vlákna zo stredu postupne
  if (frameCount % 30 === 0) {
    for (let i = 0; i < 20; i++) {
      fibers.push(new Fiber(center.x, center.y));
    }
  }
}

class Fiber {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.prev = this.pos.copy();
    this.life = int(random(150, 400));
    this.weight = random(0.5, 2.5);
    this.col = color(30, 150, 60, 150); // zelená (tráva)
    this.noff = createVector(random(1000), random(1000));
  }

  update() {
    this.prev = this.pos.copy();

    // Perlin noise riadi smer expanzie
    let angle = noise(this.noff.x, this.noff.y) * TWO_PI * 2;
    let step = p5.Vector.fromAngle(angle);
    step.mult(2); // rýchlosť rozťahovania
    this.pos.add(step);

    // jemný drift od centra
    let dir = p5.Vector.sub(this.pos, center).normalize().mult(0.5);
    this.pos.add(dir);

    this.noff.add(0.01, 0.01);
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
    save("organic-expansion.svg");
  }
}
