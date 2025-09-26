function setup() {
  createCanvas(800, 800, SVG);
  background(255);
  stroke(200, 0, 200);
  strokeWeight(2);
}

function draw() {
  // nič sa nedeje v draw
}

function mouseDragged() {
  // pri ťahaní myšou kreslí čiary
  line(pmouseX, pmouseY, mouseX, mouseY);
}

function keyPressed() {
  if (key === 's') {
    save("test.svg");
  }
}
