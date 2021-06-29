class Cell {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }
    isHeld = false;
    isKing = false;
}

let turn = "R";

let pieces = [];

for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        if ((j + i) % 2 == 1) {
            if (i < 3) {
                pieces.push(new Cell(j, i, "B"));
            }
            if (i >= 5) {
                pieces.push(new Cell(j, i, "R"));
            }
        }
    }
}

let cellSize;

function setup() {
    createCanvas(windowHeight, windowHeight);
    cellSize = windowHeight / 8;
}

function draw() {
    background(255);

    strokeWeight(0);
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if ((j + i) % 2 == 1) {
                fill(0)
                square(j * cellSize, i * cellSize, cellSize);
            }
        }
    }

    strokeWeight(3);
    stroke(255);
    let hold = pieces.find(piece => piece.isHeld);
    pieces.forEach(piece => {
        if (!piece.isHeld) {
            if (piece.color == "R") {
                fill(255, 0, 0);
            } else if (piece.color == "B") {
                fill(0);
            }
            circle((piece.x + 0.5) * cellSize, (piece.y + 0.5) * cellSize, 0.9 * cellSize);
        }
    });

    if (hold != undefined) {
        if (hold.color == "R") {
            fill(255, 0, 0);
        } else if (hold.color == "B") {
            fill(0);
        }
        circle(mouseX, mouseY, cellSize);
    }
}

function touchStarted() {
    let x = floor(mouseX / cellSize);
    let y = floor(mouseY / cellSize);
    if ((x + y) % 2 == 1) {
        let piece = pieces.find(piece => piece.x == x && piece.y == y);
        if (turn == piece.color) {
            piece.isHeld = true;
        }
    }
}

function touchEnded() {
    let x = floor(mouseX / cellSize);
    let y = floor(mouseY / cellSize);
    let heldPiece = pieces.find(piece => piece.isHeld);
    let over = pieces.find(piece => piece.x == x && piece.y == y);
    if (heldPiece != undefined) {
        let dir = (heldPiece.color != "R");
        if ((x + y) % 2 == 1 && over == undefined && (Math.abs(heldPiece.x - x) == Math.abs(heldPiece.y - y))) {
            if (!heldPiece.isKing && (heldPiece.y - y < 0) == dir) {
                if (Math.abs(heldPiece.x - x) == 1) {
                    heldPiece.x = x;
                    heldPiece.y = y;
                    turn = (turn == "R") ? ("B") : ("R");
                } else if (Math.abs(heldPiece.x - x) == 2) {
                    let eaten = pieces.find(middle => middle.x == (heldPiece.x + x) / 2 && middle.y == (heldPiece.y + y) / 2);
                    if (eaten != undefined) {
                        if (eaten.color != heldPiece.color) {
                            heldPiece.x = x;
                            heldPiece.y = y;
                            turn = (turn == "R") ? ("B") : ("R");
                            pieces.splice(pieces.indexOf(eaten), 1);
                        }
                    }
                }
            }
        }
        heldPiece.isHeld = false;
    }
}