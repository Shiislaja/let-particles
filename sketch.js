let curves = [];

function setup() {
  createCanvas(1920, 1080, SVG); // 16:9 plátno
  background(255);
  noFill();
  frameRate(30);

  // na začiatku pridáme pár kriviek
  for (let i = 0; i < 40; i++) {
    curves.push(new Swirl(width/2, height/2));
  }
}

function draw() {
  // nečistíme background, aby ostávali stopy
  for (let c of curves) {
    c.update();
    c.display();
  }

  // priebežne pridávaj nové krivky pre nekonečný pohyb
  if (frameCount % 10 === 0) {
    curves.push(new Swirl(width/2, height/2));
  }
}

// trieda pre vírivú krivku
class Swirl {
  constructor(x, y) {
    this.start = createVector(x, y);
    this.cp1 = p5.Vector.random2D().mult(random(200, 600)).add(this.start);
    this.cp2 = p5.Vector.random2D().mult(random(200, 600)).add(this.start);
    this.end = p5.Vector.random2D().mult(random(300, 800)).add(this.start);
    this.life = int(random(120, 300));
    this.weight = random(0.3, 2.5);
    this.col = color(random(50, 200), 0, random(100, 255), 180);
  }

  update() {
    this.life--;
  }

  display() {
    stroke(this.col);
    strokeWeight(this.weight);
    bezier(
      this.start.x, this.start.y,
      this.cp1.x, this.cp1.y,
      this.cp2.x, this.cp2.y,
      this.end.x, this.end.y
    );
  }
}

// uloženie vektorového SVG
function keyPressed() {
  if (key === 's') {
    save("swirl-fibers.svg");
  }
}
