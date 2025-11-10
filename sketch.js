let images = [];
let displayedImages = [];
let shapeIsClosed = false;
let closeButton;

function preload() {
  for (let i = 1; i <= 6; i++) {
    let imgPath = `images/${String(i).padStart(2, '0')}.png`;
    images.push(loadImage(imgPath));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Créer le bouton pour fermer la forme
  closeButton = createButton('Fermer la forme');
  closeButton.position(20, 20);
  closeButton.mousePressed(closeShape);
  closeButton.style('padding', '10px 20px');
  closeButton.style('font-size', '16px');
  closeButton.style('cursor', 'pointer');
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
    if (shapeIsClosed) {
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
  // Ne pas ajouter d'image si on clique sur le bouton
  if (mouseX < 200 && mouseY < 60) {
    return;
  }

  let randomImg = random(images);

  displayedImages.push({
    img: randomImg,
    x: mouseX,
    y: mouseY
  });
}

function closeShape() {
  shapeIsClosed = !shapeIsClosed;

  if (shapeIsClosed) {
    closeButton.html('Ouvrir la forme');
  } else {
    closeButton.html('Fermer la forme');
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}