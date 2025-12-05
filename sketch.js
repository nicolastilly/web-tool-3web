let images = [];
let displayedImages = [];
let gui;
let params = {
  shapeIsClosed: false
};
let isMouseOverGUI = false;
let isRotating = false;
let rotationAngle = 0;
let draggedImage = null;
let offsetX = 0;
let offsetY = 0;
let fillColor = null; // Couleur de remplissage

function preload() {
  for (let i = 1; i <= 9; i++) {
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
  background("#FFFADC");

  // Incrémenter l'angle de rotation si la rotation est active
  if (isRotating) {
    rotationAngle += 0.02;
  }

  // Dessiner la forme (ligne reliant les points)
  if (displayedImages.length > 1) {
    // Appliquer le remplissage si une couleur est définie et que la forme est fermée
    if (params.shapeIsClosed && fillColor) {
      fill(fillColor);
    } else {
      noFill();
    }

    stroke("#4A102A");
    strokeWeight(8);

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

  // Afficher toutes les images avec rotation
  for (let img of displayedImages) {
    push();
    translate(img.x, img.y);
    rotate(rotationAngle);
    imageMode(CENTER);
    image(img.img, 0, 0, 120, 120);
    pop();
  }
}

function mousePressed() {
  // Ne pas interagir si la souris est sur dat.GUI
  if (isMouseOverGUI) {
    return;
  }

  // Vérifier si on clique sur une image existante (en parcourant en ordre inverse)
  for (let i = displayedImages.length - 1; i >= 0; i--) {
    let img = displayedImages[i];
    let d = dist(mouseX, mouseY, img.x, img.y);

    // Si la souris est sur une image (rayon de 60px)
    if (d < 60) {
      draggedImage = img;
      offsetX = img.x - mouseX;
      offsetY = img.y - mouseY;
      return;
    }
  }

  // Si on n'a cliqué sur aucune image, créer une nouvelle image
  let randomImg = random(images);
  displayedImages.push({
    img: randomImg,
    x: mouseX,
    y: mouseY
  });
}

function mouseDragged() {
  // Déplacer l'image si une image est sélectionnée
  if (draggedImage && !isMouseOverGUI) {
    draggedImage.x = mouseX + offsetX;
    draggedImage.y = mouseY + offsetY;
  }
}

function mouseReleased() {
  // Relâcher l'image
  draggedImage = null;
}

function keyPressed() {
  // Toggle rotation avec la touche 'm'
  if (key === 'm' || key === 'M') {
    isRotating = !isRotating;
  }

  // Générer une couleur aléatoire avec la barre espace
  if (key === ' ') {
    if (params.shapeIsClosed) {
      // Générer une couleur aléatoire
      fillColor = color(random(255), random(255), random(255), 180); // 180 pour un peu de transparence
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}