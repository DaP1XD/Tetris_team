const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");
const next=document.getElementById('next');
const next1=next.getContext("2d");
const ROW_next=5;
const COL_next=3;
const ROW = 20;
const COL = 10;
const SQ = 30;
const SQ_next=20;
const EMPTY = "#181c27"; // kolor pustego pola 
let kolejka = [];

// rysowanie kwadrata
function drawSquare(x,y,color){
    ctx.fillStyle = color;
    ctx.fillRect(x*SQ,y*SQ,SQ,SQ);

    ctx.strokeStyle = "#28323f";
    ctx.strokeRect(x*SQ,y*SQ,SQ,SQ);
}
function drawSquare2(x, y, color) {
    next1.fillStyle = color;
    next1.fillRect(x * SQ_next, y * SQ_next, SQ_next, SQ_next);
    next1.strokeStyle = "#28323f";
    next1.strokeRect(x * SQ_next, y * SQ_next, SQ_next, SQ_next);
}
let board2=[];
for(let i=0;i<ROW_next;i++){
    board2[i]=[];
    for(let a = 0; a < COL_next; a++){
        board2[0][a] = EMPTY; 
    }
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
function drawBoard_2(){
    for(i = 0; i < ROW_next; i++){
        for(a = 0; a < COL_next; a++){
            drawSquare2(i,a,board2[i][a])
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

kolejka = [randomPiece(),randomPiece()];

// inicjacja kawałka (rodzaj, kolor)
let p = kolejka[0];

function createNextPiece() {
    const nextPiece = kolejka[1]; // Generate a random piece
    next1.clearRect(0, 0, next.width, next.height); // Clear the canvas
    nextPiece.drawNext(); // Draw the next piece on the canvas
}

Piece.prototype.drawNext = function () {
    for (r = 0; r < this.activeTetromino.length; r++) {
        for (c = 0; c < this.activeTetromino.length; c++) {
            // Drawing only filled elements of the current piece (only 1, not 0)
            if (this.activeTetromino[r][c]) {
                drawSquare2(c, r, this.color);
            }
        }
    }
}

// kawałek
function Piece(tetromino, color){
    this.tetromino = tetromino; // 
    this.color = color;

    this.tetrominoNum = 0; // zaczyna się od pierwszego patternu 
    this.activeTetromino = this.tetromino[this.tetrominoNum];

    // pozycja i kontrola kawałka
    this.x = 3;
    this.y = -1;
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
        kolejka[0] = kolejka[1];
        kolejka[1] = randomPiece();
        p = kolejka[0];
        createNextPiece();
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

let destroyedRows = 0;
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
                alert("Game Over!");
                // zatrzymujemy request Animation Frame
                gameOver = true;
                break;
            }
            // lokujemy kawałek
            board[this.y + r][this.x + c] = this.color;
        }
    }

    let level = 1;
    // usuwanie zapełnionych wierszy
    for (r = 0; r < ROW; r++){
        let isRowFull = true;
        for (c = 0; c < COL; c++){
            isRowFull = isRowFull && (board[r][c] != EMPTY);
        }
        // jeżeli wiersz jest pełny to wszystkie kawałki ruszają się do dołu
        if (isRowFull){
            const score_place=document.querySelector('.score_1');
            let points = score_place.textContent;
            points = parseInt(points);
            points += 100;
            // liczby liczbe zniszczonych wierszy --> odpowiednia liczba zniszczonych wierszy zmniejsza czas opadania klockow
            destroyedRows++;
            // opadanie + poziom
            if (destroyedRows % 10 === 0){
                sec -= 50;
                level++;
                document.getElementById("level_place").innerHTML = "Level "+level;
            }
            document.getElementById("numRowsDestroyed").innerHTML = destroyedRows;
            score_place.innerHTML=points;
            for (y = r; y > 1; y--){
                for (c = 0; c < COL; c++){
                    board[y][c] = board[y-1][c];
                }
            }
        }
    }
   
 
    // aktualizacja planszy po wszystkich zmianach 
    drawBoard();
}

Piece.prototype.hardDrop = function(){
    while (!this.collision(0,1,this.activeTetromino)){
        p.moveDown();
    }
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
    }
    else if (event.keyCode == 38){
        p.rotate();
    }
    else if (event.keyCode == 39){
        p.moveRight();
    }
    else if (event.keyCode == 40){
        p.moveDown();
    }
    else if (event.keyCode == 70){
        p.hardDrop();
    }
}

let req;
let sec = 1000;
// ruszanie w dół kawałka co każdą sekundę 
let dropStart = Date.now();
let gameOver = false;  
function drop(){
    let now = Date.now();
    let delta = now - dropStart;
    // 1000 ms = 1 s
    if (delta > sec){
        p.moveDown();
        dropStart = Date.now();
    }
    if (!gameOver){
        req = requestAnimationFrame(drop);
    }
}

function PauseOrUnpause(e)
{
    if (e === 1){
        cancelAnimationFrame(req);
        document.querySelector('.container').style.opacity='0.3';
        document.querySelector('.menu_stop').style.display='flex';
        audio.pause();
    }
    else 
    {
        req = requestAnimationFrame(drop);
        document.querySelector('.container').style.opacity='1';
        document.querySelector('.menu_stop').style.display='none';
        audio.play();
    }
}
function timer() {
    const timerElement = document.querySelector('.timer');
    let value = parseInt(timerElement.textContent);
    value--;
    timerElement.textContent = value;
    if(value>0){
        setTimeout(timer, 1000);
    }
    else if (value==0) {
        timerElement.style.animation = '';
        timerElement.style.display = 'none';
        setTimeout(start,700);
    }
}
let audio=new Audio('music.mp3');
function start(){
    drop();
    drawBoard_2();
    createNextPiece();
    //start_music();
}
function start_music(){
    audio.play();
    setTimeout(start_music,86000);
}
function exit(){
    location.href='../index.html';
}
function how_to_play_show(){
    document.querySelector('.menu_stop').style.display='none';
    document.querySelector('.how_to_play_place').style.display='flex';
}
function hide_info(){
    document.querySelector('.how_to_play_place').style.display='none';
    document.querySelector('.menu_stop').style.display='flex';
}

window.onload = timer;
