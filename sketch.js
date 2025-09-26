let particles = [];

function setup() {
  // SVG renderer umožní exportovať do vektora
  createCanvas(800, 800, SVG);
  background(255);
  strokeWeight(0.6);
  noFill();
}

function draw() {
  // prekresľovať netreba background, nechajme stopy
  for (let p of particles) {
    p.update();
    p.display();
  }
}

// keď ťaháš myšou, pridávajú sa nové "vlákna"
function mouseDragged() {
  for (let i = 0; i < 8; i++) {
    particles.push(new Particle(mouseX, mouseY));
  }
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(1, 3));
    this.life = 120;
  }

  update() {
    this.pos.add(this.vel);
    this.vel.mult(0.96); // spomalenie
    this.life--;
  }

  display() {
    stroke(150, 0, 200, map(this.life, 0, 120, 255, 50));
    point(this.pos.x, this.pos.y);
  }
}

// stlačením "s" uložíš SVG
function keyPressed() {
  if (key === 's') {
    save("fibers.svg");
  }
}
