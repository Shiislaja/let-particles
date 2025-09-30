let fibers = [];
let numFibers = 80;
let center, radius, ringRadius;

function setup() {
  createCanvas(windowWidth, windowHeight);
  center = createVector(width / 2, height / 2);
  radius = min(width, height) * 0.45;
  ringRadius = radius * 0.5;

  for (let i = 0; i < numFibers; i++) {
    fibers.push(new Fiber(center.x, center.y));
  }

  frameRate(30);
  stroke(30, 150, 60, 100); // zelená, polopriehľadná
  noFill();
  textAlign(CENTER, CENTER);
}

function draw() {
  background(255, 20); // jemný fade efekt

  for (let f of fibers) {
    f.update();
    f.display();
  }

  drawTextRing();
}

class Fiber {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.prev = this.pos.copy();
    this.noff = createVector(random(1000), random(1000));
  }

  update() {
    this.prev = this.pos.copy();

    let angle = noise(this.noff.x, this.noff.y) * TWO_PI * 2;
    angle += random(-0.05, 0.05);

    let step = p5.Vector.fromAngle(angle).mult(2);
    this.pos.add(step);

    // jemný bias dohora
    let dir = p5.Vector.sub(this.pos, center).normalize().mult(0.5);
    if (this.pos.y > center.y) this.pos.y -= 0.4;
    this.pos.add(dir);

    this.noff.add(0.01, 0.01);

    // reset, ak sa dostane príliš ďaleko
    if (dist(this.pos.x, this.pos.y, center.x, center.y) > radius) {
      this.pos = center.copy();
    }
  }

  display() {
    line(this.prev.x, this.prev.y, this.pos.x, this.pos.y);
  }
}

// ─── Textový kruh ──────────────────────────────
function drawTextRing() {
  let word = "POSTDIGITAL";
  let chars = word.split("");
  let size = min(width, height) * 0.06;

  textSize(size);
  fill(30, 150, 60);
  noStroke();

  for (let i = 0; i < chars.length; i++) {
    let angle = map(i, 0, chars.length, 0, TWO_PI) - HALF_PI;
    let x = center.x + cos(angle) * ringRadius;
    let y = center.y + sin(angle) * ringRadius;

    push();
    translate(x, y);
    rotate(angle + HALF_PI);
    text(chars[i], 0, 0);
    pop();
  }
}
