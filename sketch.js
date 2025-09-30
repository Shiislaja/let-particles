let fibers = [];
let center;
let radius;
let ringRadius;

function setup() {
  createCanvas(1080, 1080, SVG);
  background(255);

  center = createVector(width / 2, height / 2);
  radius = width * 0.45;
  ringRadius = radius * 0.5;

  for (let i = 0; i < 80; i++) {   // menej vlákien pre ľahší SVG
    fibers.push(new Fiber(center.x, center.y));
  }

  noFill();
  strokeCap(ROUND);

  drawTextRing();
}

function draw() {
  for (let f of fibers) {
    f.update();
    f.display();
  }

  // pomalšie pridávanie vlákien
  if (frameCount % 80 === 0 && fibers.length < 200) {
    for (let i = 0; i < 8; i++) {
      fibers.push(new Fiber(center.x, center.y));
    }
  }
}

class Fiber {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.prev = this.pos.copy();
    this.life = int(random(80, 200));
    this.weight = random(2, 4);
    this.col = color(30, 150, 60, 160);
    this.noff = createVector(random(1000), random(1000));
  }

  update() {
    this.prev = this.pos.copy();

    let angle = noise(this.noff.x, this.noff.y) * TWO_PI * 2;
    angle += random(-0.05, 0.05);

    let step = p5.Vector.fromAngle(angle).mult(2.0);
    this.pos.add(step);

    // drift od stredu
    let dir = p5.Vector.sub(this.pos, center).normalize().mult(0.7);

    // ✨ bias do hornej polovice
    if (this.pos.y > center.y) {
      // ak je dole, malý posun nahor
      this.pos.y -= 0.8;
    } else {
      // ak je hore, podporíme expanziu
      dir.mult(1.1);
    }

    this.pos.add(dir);

    this.noff.add(0.01, 0.01);
    this.life--;
  }

  display() {
    let d = p5.Vector.dist(this.pos, center);
    let padding = 40;

    // kresli len mimo textového prstenca
    if (d < radius && (d < ringRadius - padding || d > ringRadius + padding)) {
      stroke(this.col);
      strokeWeight(this.weight);
      line(this.prev.x, this.prev.y, this.pos.x, this.pos.y);
    }
  }
}

function drawTextRing() {
  let word = "POSTDIGITAL";
  let chars = word.split("");

  textAlign(CENTER, CENTER);
  textSize(60);
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

function keyPressed() {
  if (key === 's') {
    save("postdigital-circle-biasUp.svg");
  }
}
