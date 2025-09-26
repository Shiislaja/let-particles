let particles = [];

function setup() {
  createCanvas(800, 800, SVG); // SVG renderer
  strokeWeight(0.6);
  noFill();
}

function draw() {
  background(255);

  for (let p of particles) {
    p.update();
    p.display();
  }
}

function mouseDragged() {
  for (let i = 0; i < 8; i++) {
    particles.push(new Particle(mouseX, mouseY));
  }
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(1, 3));
    this.life = 200;
  }

  update() {
    this.pos.add(this.vel);
    this.vel.mult(0.98);
    this.life--;
  }

  display() {
    stroke(150, 0, 200, map(this.life, 0, 200, 255, 0));
    point(this.pos.x, this.pos.y);
  }
}

function keyPressed() {
  if (key === 's') {
    save("fibers.svg");
  }
}
