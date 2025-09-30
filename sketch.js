let fibers = [];
let center, radius, ringRadius;

function setup() {
  createCanvas(1080, 1080, SVG);
  background(255);

  center = createVector(width / 2, height / 2);
  radius = width * 0.45;
  ringRadius = radius * 0.5;

  // menej vlákien
  for (let i = 0; i < 50; i++) {
    fibers.push(new Fiber(center.x, center.y));
  }

  drawTextRing();

  // vykresli len raz
  noLoop();
}

class Fiber {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.noff = createVector(random(1000), random(1000));
    this.points = [];
    this.life = int(random(40, 80)); // kratší život
  }

  run() {
    for (let i = 0; i < this.life; i++) {
      this.update();
      this.points.push(this.pos.copy());
    }
    this.display();
  }

  update() {
    let angle = noise(this.noff.x, this.noff.y) * TWO_PI * 2 + random(-0.05, 0.05);
    let step = p5.Vector.fromAngle(angle).mult(3.0);
    this.pos.add(step);

    // drift + bias nahor
    let dir = p5.Vector.sub(this.pos, center).normalize().mult(1.0);
    if (this.pos.y > center.y) this.pos.y -= 0.5; 
    else dir.mult(1.2);
    this.pos.add(dir);

    this.noff.add(0.02, 0.02);
  }

  display() {
    let d;
    stroke(30, 150, 60, 180);
    strokeWeight(3);
    noFill();
    beginShape();
    for (let p of this.points) {
      d = p5.Vector.dist(p, center);
      let padding = 50;
      if (d < radius && (d < ringRadius - padding || d > ringRadius + padding)) {
        vertex(p.x, p.y);
      }
    }
    endShape();
  }
}

function draw() {
  for (let f of fibers) {
    f.run();
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
    save("postdigital-simplified.svg");
  }
}
