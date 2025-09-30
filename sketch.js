let fibers = [];
let center;
let radius;

function setup() {
  createCanvas(1080, 1080, SVG);
  background(255);

  center = createVector(width / 2, height / 2);
  radius = width * 0.45; // hlavný polomer kruhu

  for (let i = 0; i < 150; i++) {
    fibers.push(new Fiber(center.x, center.y));
  }

  noFill();
  strokeCap(ROUND);

  // nakresli text až navrch
  drawTextRing();
}

function draw() {
  for (let f of fibers) {
    f.update();
    f.display();
  }

  if (frameCount % 40 === 0) {
    for (let i = 0; i < 15; i++) {
      fibers.push(new Fiber(center.x, center.y));
    }
  }
}

class Fiber {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.prev = this.pos.copy();
    this.life = int(random(150, 400));
    this.weight = random(2, 5);
    this.col = color(30, 150, 60, 180); // zelená tráva
    this.noff = createVector(random(1000), random(1000));
  }

  update() {
    this.prev = this.pos.copy();

    let angle = noise(this.noff.x, this.noff.y) * TWO_PI * 2;
    // malá symetrická odchýlka
    angle += random(-0.05, 0.05);

    let step = p5.Vector.fromAngle(angle);
    step.mult(2.5);
    this.pos.add(step);

    // drift od stredu
    let dir = p5.Vector.sub(this.pos, center).normalize().mult(0.8);
    this.pos.add(dir);

    this.noff.add(0.01, 0.01);
    this.life--;
  }

  display() {
    if (p5.Vector.dist(this.pos, center) < radius) {
      stroke(this.col);
      strokeWeight(this.weight);
      line(this.prev.x, this.prev.y, this.pos.x, this.pos.y);
    }
  }
}

function drawTextRing() {
  let word = "POSTDIGITAL";
  let chars = word.split("");
  let ringRadius = radius * 0.5; // druhý prstenec

  textAlign(CENTER, CENTER);
  textSize(60); // môžeš doladiť podľa mierky
  fill(30, 150, 60); // rovnaká zelená

  for (let i = 0; i < chars.length; i++) {
    let angle = map(i, 0, chars.length, 0, TWO_PI) - HALF_PI;
    let x = center.x + cos(angle) * ringRadius;
    let y = center.y + sin(angle) * ringRadius;
    text(chars[i], x, y);
  }
}

function keyPressed() {
  if (key === 's') {
    save("postdigital-circle.svg");
  }
}
