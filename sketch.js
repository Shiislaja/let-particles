// pridaj si p5.js a p5.svg.js (https://github.com/zenozeng/p5.js-svg)

let particles = [];

function setup() {
  createCanvas(800, 800, SVG); // SVG renderer
  strokeWeight(0.6);
  noFill();
}

function draw() {
  background(255);

  // update & draw particles
  for (let p of particles) {
    p.update();
    p.display();
  }
}

function mouseDragged() {
  // vytvorenie novej "siete" vlákien pri pohybe myši
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
    this.vel.mult(0.98); // trocha spomalenie
    this.life--;
  }

  display() {
    stroke(150, 0, 200, map(this.life, 0, 200, 255, 0));
    point(this.pos.x, this.pos.y);
  }
}

// ak chceš uložiť do SVG, stlač klávesu 's'
function keyPressed() {
  if (key === 's') {
    save("fibers.svg");
  }
}
