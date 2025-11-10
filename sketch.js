let images = [];
let displayedImages = [];
let gui;
let params = {
  shapeIsClosed: false
};
let isMouseOverGUI = false;

function preload() {
  for (let i = 1; i <= 6; i++) {
    let imgPath = `images/${String(i).padStart(2, '0')}.png`;
    images.push(loadImage(imgPath));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Créer l'interface dat.GUI
  gui = new dat.GUI();
  gui.add(params, 'shapeIsClosed').name('Fermer la forme');

  // Ajouter des écouteurs d'événements sur dat.GUI
  setTimeout(() => {
    let guiElement = document.querySelector('.dg.ac');
    if (guiElement) {
      guiElement.addEventListener('mouseenter', () => {
        isMouseOverGUI = true;
      });
      guiElement.addEventListener('mouseleave', () => {
        isMouseOverGUI = false;
      });
    }
  }, 100);
}

function draw() {
  background(255);

  // Dessiner la forme (ligne reliant les points)
  if (displayedImages.length > 1) {
    noFill();
    stroke(0);
    strokeWeight(2);

    beginShape();
    for (let img of displayedImages) {
      vertex(img.x, img.y);
    }
    if (params.shapeIsClosed) {
      endShape(CLOSE);
    } else {
      endShape();
    }
  }

  // Afficher toutes les images
  for (let img of displayedImages) {
    imageMode(CENTER);
    image(img.img, img.x, img.y, 120, 120);
  }
}

function mousePressed() {
  // Ne pas ajouter d'image si la souris est sur dat.GUI
  if (isMouseOverGUI) {
    return;
  }

  let randomImg = random(images);

  displayedImages.push({
    img: randomImg,
    x: mouseX,
    y: mouseY
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}