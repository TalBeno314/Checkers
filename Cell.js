class Cell {
    constructor(Color, x, y) {
        this.color = Color;
        this.posX = x;
        this.posY = y;
        this.deafult();
    }

    isKing;
    isSelected;
    isNextMove;
    origin;

    deafult() {
        this.color = "";
        this.isKing = false;
        this.isSelected = false;
        this.isNextMove = false;
        this.origin = {
            x: 9,
            y: 9
        }
    }

    choose(board, turn) {
        if (this.isNextMove) {
            let dx = this.posX - this.origin.x;
            let dy = this.posY - this.origin.y;
            if (abs(dx) >= 2) {
                let elimX = this.posX - (abs(dx) / dx);
                let elimY = this.posY - (abs(dy) / dy);
                board[elimY][elimX].deafult();
            }
            this.isNextMove = false;
            board[this.origin.y][this.origin.x].deafult();
            if (this.posY == ((this.color == "Red") ? (0) : (7))) {
                this.isKing = true;
            }
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    board[i][j].isSelected = false;
                    if (board[i][j].isNextMove) {
                        board[i][j].deafult();
                    }
                }
            }
        } else {
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    board[i][j].isSelected = false;
                    if (board[i][j].isNextMove) {
                        board[i][j].deafult();
                    }
                }
            }

            this.isSelected = true;
            let moves = this.nextMoves(board);
            for (let i = 0; i < moves.length; i++) {
                board[moves[i][0]][moves[i][1]].isNextMove = true;
                board[moves[i][0]][moves[i][1]].isKing = this.isKing;
                board[moves[i][0]][moves[i][1]].color = this.color;
                board[moves[i][0]][moves[i][1]].origin = {
                    x: this.posX,
                    y: this.posY
                }
            }
        }
    }

    nextMoves(board) {
        let moves = [];
        if (this.isKing) {
            let plusPlus = true;
            let plusMinus = true;
            let minusPlus = true;
            let minusMinus = true;
            for (let i = 1; i <= 7; i++) {
                if (plusPlus) {
                    if (this.posX + i < 8 && this.posY + i < 8) {
                        if (board[this.posY + i][this.posX + i].color == "") {
                            moves.push([this.posY + i, this.posX + i]);
                        } else if ((this.posX + (i + 1) < 8 && this.posY + (i + 1) < 8) && board[this.posY + i][this.posX + i].color != this.color) {
                            if (board[this.posY + (i + 1)][this.posX + (i + 1)].color == "") {
                                moves.push([this.posY + (i + 1), this.posX + (i + 1)]);
                            }
                            plusPlus = false;
                        } else {
                            plusPlus = false;
                        }
                    }
                }
                if (plusMinus) {
                    if (this.posX + i < 8 && this.posY - i >= 0) {
                        if (board[this.posY - i][this.posX + i].color == "") {
                            moves.push([this.posY - i, this.posX + i]);
                        } else if ((this.posX + (i + 1) < 8 && this.posY - (i + 1) >= 0) && board[this.posY - i][this.posX + i].color != this.color) {
                            if (board[this.posY - (i + 1)][this.posX + (i + 1)].color == "") {
                                moves.push([this.posY - (i + 1), this.posX + (i + 1)]);
                            }
                            plusMinus = false;
                        } else {
                            plusMinus = false;
                        }
                    }
                }
                if (minusPlus) {
                    if (this.posX - i >= 0 && this.posY + i < 8) {
                        if (board[this.posY + i][this.posX - i].color == "") {
                            moves.push([this.posY + i, this.posX - i]);
                        } else if ((this.posX - (i + 1) >= 0 && this.posY + (i + 1) < 8) && board[this.posY + i][this.posX - i].color != this.color) {
                            if (board[this.posY + (i + 1)][this.posX - (i + 1)].color == "") {
                                moves.push([this.posY + (i + 1), this.posX - (i + 1)]);
                            }
                            minusPlus = false;
                        } else {
                            minusPlus = false;
                        }
                    }
                }
                if (minusMinus) {
                    if (this.posX - i >= 0 && this.posY - i >= 0) {
                        if (board[this.posY - i][this.posX - i].color == "") {
                            moves.push([this.posY - i, this.posX - i]);
                        } else if ((this.posX - (i + 1) >= 0 && this.posY - (i + 1) >= 0) && board[this.posY - i][this.posX - i].color != this.color) {
                            if (board[this.posY - (i + 1)][this.posX - (i + 1)].color == "") {
                                moves.push([this.posY - (i + 1), this.posX - (i + 1)]);
                            }
                            minusMinus = false;
                        } else {
                            minusMinus = false;
                        }
                    }
                }
            }
        } else {
            let dir = (this.color == "Red") ? (-1) : (1);
            if ((this.posY + dir) >= 0 && (this.posY + dir) < 8) {
                if ((this.posX + 1) < 8 && board[this.posY + dir][this.posX + 1].color == "") {
                    moves.push([this.posY + dir, this.posX + 1]);
                }
                if ((this.posX - 1) >= 0 && board[this.posY + dir][this.posX - 1].color == "") {
                    moves.push([this.posY + dir, this.posX - 1]);
                }
            }
            if ((this.posY + 2 * dir) >= 0 && (this.posY + 2 * dir) < 8) {
                if ((this.posX + 2) < 8) {
                    let ocColor = board[this.posY + dir][this.posX + 1].color;
                    if (ocColor != "" && ocColor != this.color && board[this.posY + 2 * dir][this.posX + 2].color == "") {
                        moves.push([this.posY + 2 * dir, this.posX + 2]);
                    }
                }
                if ((this.posX - 2) >= 0) {
                    let ocColor = board[this.posY + dir][this.posX - 1].color;
                    if (((ocColor != "") && (ocColor != this.color) && (board[this.posY + 2 * dir][this.posX - 2].color == ""))) {
                        moves.push([this.posY + 2 * dir, this.posX - 2]);
                    }
                }
            }
        }
        return moves;
    }
}