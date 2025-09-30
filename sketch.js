let walkers = [];
let numWalkers = 300; 
let center;
let radius;
let letters = "POSTDIGITAL".split("");

function setup() {
  createCanvas(800, 800, SVG); 
  center = createVector(width / 2, height / 2);
  radius = width * 0.4;

  for (let i = 0; i < numWalkers; i++) {
    walkers.push(new Walker(center.x, center.y));
  }

  noFill();
  stroke(34, 139, 34, 100);
  strokeWeight(1.5);
}

function draw() {
  for (let w of walkers) {
    w.update();
    w.display();
  }

  drawLetters();
}

// ─── Walker ──────────────────────────────
class Walker {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.prev = this.pos.copy();
    this.noff = createVector(random(1000), random(1000));
  }

  update() {
    this.prev = this.pos.copy();

    let angle = noise(this.noff.x, this.noff.y) * TWO_PI * 2;
    angle += random(-0.05, 0.05);

    // základný krok (náhodný pohyb)
    let step = p5.Vector.fromAngle(angle).mult(1.2);
    this.pos.add(step);

    // drift od stredu
    let dir = p5.Vector.sub(this.pos, center).normalize().mult(0.8);

    // ✨ preferencia hornej polovice
    if (this.pos.y > center.y) {
      dir.mult(0.6);  // stále má drift, len slabší dole
    } else {
      dir.mult(1.2);  // posilnený drift hore
    }

    this.pos.add(dir);

    // posun Perlin noise offsetu
    this.noff.add(0.01, 0.01);
  }

  display() {
    let d = dist(this.pos.x, this.pos.y, center.x, center.y);
    if (d < radius * 0.9 && d > radius * 0.25) { 
      line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);
    }
  }
}

// ─── Textový kruh ──────────────────────────────
function drawLetters() {
  let ringRadius = radius * 0.35; 
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(34, 139, 34);
  noStroke();

  for (let i = 0; i < letters.length; i++) {
    let angle = map(i, 0, letters.length, 0, TWO_PI) - HALF_PI;
    let x = center.x + cos(angle) * ringRadius;
    let y = center.y + sin(angle) * ringRadius;

    push();
    translate(x, y);
    rotate(angle + HALF_PI); 
    text(letters[i], 0, 0);
    pop();
  }
}
