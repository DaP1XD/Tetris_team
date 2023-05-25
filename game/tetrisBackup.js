const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");
const ROW = 20;
const COL = 10;
const SQ = 30;
const EMPTY = "#181c27"; // kolor pustego pola 

// rysowanie kwadrata
function drawSquare(x,y,color){
    ctx.fillStyle = color;
    ctx.fillRect(x*SQ,y*SQ,SQ,SQ);

    ctx.strokeStyle = "#28323f";
    ctx.strokeRect(x*SQ,y*SQ,SQ,SQ);
}

// tworzenie planszy
let board = [];
for(r = 0; r < ROW; r++){
    board[r] = [];
    for(c = 0; c < COL; c++){
        board[r][c] = EMPTY; 
    }
}

// rysowanie planszy w canvasie
function drawBoard(){
    for(r = 0; r < ROW; r++){
        for(c = 0; c < COL; c++){
            drawSquare(c,r,board[r][c])
        }
    }
}
drawBoard();

// tworzenie kawałków
const PIECES = [
    [Z, "red"],
    [S, "green"],
    [T, "yellow"],
    [O, "blue"],
    [L, "purple"],
    [I, "cyan"],
    [J, "orange"]
];

// generowanie losowego kawałka
function randomPiece(){
    let r = randomN = Math.floor(Math.random() * PIECES.length) // liczby między 0 a 6
    return new Piece(PIECES[r][0],PIECES[r][1]);
}

let nextTetrominoes = [];
alert(nextTetrominoes.length);
if (nextTetrominoes.length < 3){
    if (nextTetrominoes.length === 0){
        for (let i = 0; i < 2; i++){
            nextTetrominoes.push(randomPiece());
        }
    }
    else{
        for (let i = 0; i < nextTetrominoes.length; i++){
            nextTetrominoes.push(randomPiece());
        }
    }
}
alert(nextTetrominoes.length);

// inicjacja kawałka (rodzaj, kolor)
let p = randomPiece();

// kawałek
function Piece(tetromino, color){
    this.tetromino = tetromino; // 
    this.color = color;

    this.tetrominoNum = 0; // zaczyna się od pierwszego patternu 
    this.activeTetromino = this.tetromino[this.tetrominoNum];

    // pozycja i kontrola kawałka
    this.x = 3;
    this.y = 0;
}

// wypelnienie 
Piece.prototype.fill = function(color){
    for(r = 0; r < this.activeTetromino.length; r++){
        for(c = 0; c < this.activeTetromino.length; c++){
            // rysowanie tylko zapełnionych elementów danego kawałka (tylko 1, bez 0)
            if (this.activeTetromino[r][c]){
                drawSquare(this.x + c,this.y + r, color);
            }
        }
    }
}

// rysowanie kawałka na planszy
Piece.prototype.draw = function(){
    this.fill(this.color);
}

// usuwanie kawałka z planszy
Piece.prototype.unDraw = function(){
    this.fill(EMPTY);
}

// Ruszanie kawałków do dołu
Piece.prototype.moveDown = function(){
    if (!this.collision(0,1,this.activeTetromino)){
        this.unDraw();
        this.y++;
        this.draw();
    }
    // w przeciwnym wypadku zatrzymujemy kawałek i generujemy nowy
    else{
        this.lock();
        p = randomPiece();
    }
}

// Ruszanie kawałków w prawo
Piece.prototype.moveRight = function(){
    if (!this.collision(1,0,this.activeTetromino)){
        this.unDraw();
        this.x++;
        this.draw();
    }
}

// Ruszanie kawałków w lewo
Piece.prototype.moveLeft = function(){
    if (!this.collision(-1,0,this.activeTetromino)){
        this.unDraw();
        this.x--;
        this.draw();
    }
}

// Rotacja kawałka
Piece.prototype.rotate = function(){
    let nextPattern = this.tetromino[(this.tetrominoNum + 1)%this.tetromino.length];
    let kick = 0;

    if (this.collision(0,0,nextPattern)){
        if (this.x > COL/2){
            // prawa ściana 
            kick = -1; // przeniesienie kawałka do lewej
        }
        else{
            // lewa ściana
            kick = 1; // przeniesienie kawałka do prawej
        }
    }

    if (!this.collision(kick,0,nextPattern)){
        this.unDraw();
        this.x += kick;
        this.tetrominoNum = (this.tetrominoNum + 1)%this.tetromino.length; // (0+1)%4 => 1
        this.activeTetromino = this.tetromino[this.tetrominoNum];
        this.draw();
    }
}

let score = 0;
Piece.prototype.lock = function(){
    for(r = 0; r < this.activeTetromino.length; r++){
        for(c = 0; c < this.activeTetromino.length; c++){
            // pomijamy puste pola
            if (!this.activeTetromino[r][c]){
                continue;
            }
            // sprawdzamy czy kawałki muszą zostać zlokowane na górze planszy = game over
            if (this.y + r < 0){
                alert("Game Over");
                // zatrzymujemy request Animation Frame
                gameOver = true;
                break;
            }
            // lokujemy kawałek
            board[this.y + r][this.x + c] = this.color;
        }
    }

    // usuwanie zapełnionych wierszy
    for (r = 0; r < ROW; r++){
        let isRowFull = true;
        for (c = 0; c < COL; c++){
            isRowFull = isRowFull && (board[r][c] != EMPTY);
        }
        // jeżeli wiersz jest pełny to wszystkie kawałki ruszają się do dołu
        if (isRowFull){
            for (y = r; y > 1; y--){
                for (c = 0; c < COL; c++){
                    board[y][c] = board[y-1][c];
                }
            }
            // wiersz powyżej nie ma wiersza nad nim
            for (c = 0; c < COL; c++){
                board[0][c] = empty;
            }

            // inkrementujemy punkty
            score += 100;
        }
    }
    // aktualizacja planszy po wszystkich zmianach 
    drawBoard();

    // aktualizacja wyniku
}

// Kolizje
Piece.prototype.collision = function(x,y,piece){
    for(r = 0; r < piece.length; r++){
        for(c = 0; c < piece.length; c++){
            // sprawdzanie czy pole jest puste - jeśli tak to pomijamy
            if (!piece[r][c]){
                continue;
            }
            // koordynaty kawałka po wykonaniu ruchu 
            let newX = this.x + c + x;
            let newY = this.y + r + y;

            if (newX < 0 || newX >= COL || newY >= ROW){
                return true;
            }

            // skip newY < 0 --> bo nie ma board z indeksem -1 -> board[-1] nie istnieje
            if (newY < 0){
                continue;
            }

            // sprawdzanie czy nie ma zablokowanego kawałka na planszy
            if (board[newY][newX] != EMPTY){
                return true;
            }
        }
    }
    return false; 
}


// Kontrola kawałka
document.addEventListener("keydown", CONTROL);

function CONTROL(event){
    if (event.keyCode == 37){
        p.moveLeft();
        dropStart = Date.now();
    }
    else if (event.keyCode == 38){
        p.rotate();
        dropStart = Date.now();
    }
    else if (event.keyCode == 39){
        p.moveRight();
        dropStart = Date.now();
    }
    else if (event.keyCode == 40){
        p.moveDown();
    }
}

// ruszanie w dół kawałka co każdą sekundę 
let dropStart = Date.now();
let gameOver = false;  
function drop(){
    let now = Date.now();
    let delta = now - dropStart;
    // 1000 ms = 1 s
    if (delta > 1000){
        p.moveDown();
        dropStart = Date.now();
    }
    if (!gameOver){
        requestAnimationFrame(drop);
    }
}

drop();