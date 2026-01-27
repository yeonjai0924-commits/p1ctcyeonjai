let slider;
let img;
let invertBtn;

let cols, rows;
let size = 10;

let revealed = [];
let alphaGrid = [];

let isInverted = false;

function preload() {
  img = loadImage("ball.jpeg");
}

function setup() {
  createCanvas(400, 500);

  slider = createSlider(10, 60, size, 1);
  slider.position(10, 10);
  slider.size(120);

  invertBtn = createButton("INVERT");
  invertBtn.position(140, 8);
  invertBtn.mousePressed(() => {
    isInverted = !isInverted;
  });

  buildGrid();
}

function draw() {
 
  let g = slider.value();
  if (g !== size) {
    size = g;
    buildGrid();
  }

  
  if (isInverted) background(10);
  else background(240);

  img.resize(width, 0);

  cols = floor(width / size);
  rows = floor(height / size);

 
  let roundness = map(size, 10, 60, size * 0.5, 2);
  roundness = constrain(roundness, 2, size * 0.5);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * size;
      let y = j * size;

      
      if (revealed[i][j]) {
        alphaGrid[i][j] = min(255, alphaGrid[i][j] + 18);
      } else {
        alphaGrid[i][j] = max(0, alphaGrid[i][j] - 10);
      }

      
      noStroke();
      if (isInverted) fill(25);
      else fill(248);

      rect(x, y, size, size, roundness);

     
      if (alphaGrid[i][j] > 0) {
        let c = img.get(constrain(x, 0, img.width - 1), constrain(y, 0, img.height - 1));

        let r = red(c), g2 = green(c), b = blue(c);
        if (isInverted) {
          r = 255 - r;
          g2 = 255 - g2;
          b = 255 - b;
        }

        fill(r, g2, b, alphaGrid[i][j]);
        rect(x, y, size, size, roundness);
      }

      
      if (isInverted) stroke(255, 18);
      else stroke(0, 25);

      noFill();
      rect(x, y, size, size, roundness);
      noStroke();
    }
  }
}

function mouseDragged() {
  let i = floor(mouseX / size);
  let j = floor(mouseY / size);

 

  for (let di = -1; di <= 1; di++) {
    for (let dj = -1; dj <= 1; dj++) {
      let ii = i + di;
      let jj = j + dj;

      if (ii >= 0 && ii < cols && jj >= 0 && jj < rows) {
        revealed[ii][jj] = true;
      }
    }
  }
}

function buildGrid() {
  cols = floor(width / size);
  rows = floor(height / size);

  revealed = [];
  alphaGrid = [];

  for (let i = 0; i < cols; i++) {
    revealed[i] = [];
    alphaGrid[i] = [];
    for (let j = 0; j < rows; j++) {
      revealed[i][j] = false;
      alphaGrid[i][j] = 0;
    }
  }
}
