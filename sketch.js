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
  stroke(30, 150, 60, 120); // zelená, polopriehľadná
  strokeWeight(1.5);
  noFill();
  textAlign(CENTER, CENTER);
}

function draw() {
  // slabší fade (nevymazáva hneď)
  background(255, 8);

  for (let f of fibers) {
    // každý walker urobí viac krokov v jednom frame
    for (let s = 0; s < 3; s++) {
      f.update();
      f.display();
    }
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
    if (this.pos.y > center.y) {
      this.pos.y -= 0.4;
    }

    this.noff.add(0.01, 0.01);

    // ak je ďaleko → pomaly pritiahnuť späť
    let d = dist(this.pos.x, this.pos.y, center.x, center.y);
    if (d > radius) {
      let back = p5.Vector.sub(center, this.pos).setMag(1.2);
      this.pos.add(back);
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
