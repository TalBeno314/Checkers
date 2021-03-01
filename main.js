let mainBoard = new Array(8);
for (let i = 0; i < 8; i++) {
    mainBoard[i] = new Array(8);
    for (let j = 0; j < 8; j++) {
        mainBoard[i][j] = new Cell("", j, i);
        if ((i + j) % 2 == 1 && i < 3) {
            mainBoard[i][j].color = "Black";
        }
        if ((i + j) % 2 == 1 && i > 4) {
            mainBoard[i][j].color = "Red";
        }
    }
}

let turn = "Red";
let cellSize;
let redCrown;
let blackCrown;

function preload() {
    redCrown = loadImage('https://i.imgur.com/tPV4WvM.png');
    blackCrown = loadImage('https://i.imgur.com/3VxLqnA.png');
}

function setup() {
    createCanvas(680, 680);
    cellSize = width / 8;
}

function draw() {
    background(255);
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if ((i + j) % 2 == 1) {
                fill(0);
                strokeWeight(0);
                square(j * cellSize, i * cellSize, cellSize);
            }
            if (mainBoard[i][j].color != "") {
                strokeWeight((mainBoard[i][j].isSelected) ? (4) : (2));
                stroke((mainBoard[i][j].isSelected) ? ("#0000FF") : ("FFFFFF"));
                fill((mainBoard[i][j].color == "Red") ? (255) : (0), 0, 0);
                if (mainBoard[i][j].isNextMove) {
                    if (mainBoard[i][j].color == "Red") {
                        fill(255, 0, 0, 100);
                        stroke(0);
                    }
                    if (mainBoard[i][j].color == "Black") {
                        fill(100, 200);
                        //stroke(255);
                    }
                }
                circle((j + 0.5) * cellSize, (i + 0.5) * cellSize, 0.9 * cellSize);
                if (mainBoard[i][j].isKing) {
                    image((mainBoard[i][j].color == "Red") ? (redCrown) : (blackCrown), (j + 0.15) * cellSize, (i + 0.15) * cellSize, 0.7 * cellSize, 0.7 * cellSize);
                }
            }
        }
    }
}

function mousePressed() {
    let i = floor(mouseY / cellSize);
    let j = floor(mouseX / cellSize);
    if (mouseButton === RIGHT) {
        mainBoard[i][j].color = "Black";
    } else {
        //console.log(mainBoard[i][j]);
        if (mainBoard[i][j].color == turn) {
            if (mainBoard[i][j].isNextMove) {
                turn = (turn == "Red") ? ("Black") : ("Red");
            }
            mainBoard[i][j].choose(mainBoard, turn);
        }
    }
}