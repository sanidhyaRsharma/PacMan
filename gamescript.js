var cell_size = 32;
var grid_size = 20;
var game = {
    canvas: document.createElement("canvas"),
    status: document.getElementById("game-status"),
    food_count: 0,
    grid: 
    [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1]],
    start: function () {
        this.canvas.width = 640;    
        this.canvas.height = 640;
        this.context = this.canvas.getContext("2d");
        this.clear();
        document.getElementById("game-container").appendChild(this.canvas);

        this.interval = setInterval(updateGameArea, 130);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = "#000";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = "#0055ff";
        for (var i = 0; i < grid_size; i++) {
            for (var j = 0; j < grid_size; j++) {
                if (this.grid[i][j] == 1) {
                    this.context.fillRect(i * cell_size, j * cell_size, cell_size, cell_size);
                }
                else if (this.grid[i][j] == 0) {
                    this.context.fillStyle = "yellow";
                    this.context.fillRect(i * cell_size + 14, j * cell_size + 14, 4, 4);
                    this.context.fillStyle = "#0055ff";
                }
            }
        }
    },
    stop: function () {
        clearInterval(this.interval);
    }
}

function startGame() {
    game.start();
    pacman = new component(1, 1, "yellow", 1, 1);
    enemy = new component(1, 1, "red", 8, 7);
    enemy2 = new component(1,1, "green", 10,7);
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.update = function () {
        ctx = game.context;
        ctx.fillStyle = color;
        ctx.fillRect(cell_size * this.x, cell_size * this.y, this.width * cell_size, this.height * cell_size);
       
    }
    this.newPos = function () {
        this.x = (this.x + this.speedX) % grid_size;
        this.x = this.x < 0 ? grid_size - 1 : this.x;
        this.y = (this.y + this.speedY) % grid_size;
        this.y = this.y < 0 ? grid_size - 1 : this.y;
        // console.log("TEST "+ this.x+ " "+ this.y);
        if (game.grid[this.x][this.y] == 1) {
            this.x = this.x - this.speedX;
            this.y = this.y - this.speedY;
            this.speedX = 0;
            this.speedY = 0;
        }
    }
}
function calculateScore() {
    game.grid[pacman.x][pacman.y] = 2;
    var count = 0;
    for (var i = 0; i < grid_size; i++) {
        for (var j = 0; j < grid_size; j++) {
            if (game.grid[i][j] == 0) {
                count++;
            }
        }
    }
    // console.log("COUNT ="+count);
    game.status.innerHTML = "Score = " + (201 - count);
    if (count <= 0) {
        game.stop();
        game.status.innerHTML = "You win!";
    }
}
function hasCollisionOccured(bot){
    return (bot.x == pacman.x && bot.y == pacman.y);
}
function hasBotStopped(bot){
    return (bot.speedX == 0 && bot.speedY == 0);
}
function updateGameArea() {
    if (hasCollisionOccured(enemy) || hasCollisionOccured(enemy2)){
        game.status.innerHTML = "You lose!";
        game.stop();
        return;
    }
    game.clear();
    pacman.newPos();
    pacman.update();

    if (hasCollisionOccured(enemy) || hasCollisionOccured(enemy2)){
        game.status.innerHTML = "You lose!";
        enemy.newPos();
        enemy.update();
        enemy2.newPos();
        enemy2.update();
        game.stop();
        return;
    }
    calculateScore();
    if(Math.random()>0.75||hasBotStopped(enemy) ){
        moveBot(enemy);
    }
    if(Math.random()>0.75 || (hasBotStopped(enemy2))){
        moveBot(enemy2);
    }
    enemy.newPos();
    enemy.update();
    enemy2.newPos();
    enemy2.update();
}
function changeSpeed(e) {
    e = e || window.event;
    if (e.keyCode == '37') {
        pacman.speedX = -1;
        pacman.speedY = 0;
    }
    if (e.keyCode == '38') {
        pacman.speedX = 0;
        pacman.speedY = -1;
    }
    if (e.keyCode == '39') {
        pacman.speedX = 1;
        pacman.speedY = 0;
    }
    if (e.keyCode == '40') {
        pacman.speedX = 0;
        pacman.speedY = 1;
    }
}
function moveBot(bot) {
    // if (enemy.speedX == 0 && enemy.speedY == 0){
    randnum = Math.floor(Math.random() * 4)
    switch (randnum) {
        case 0: bot.speedX = 1;
            bot.speedY = 0;
            break;
        case 1: bot.speedX = 0;
            bot.speedY = 1;
            break;
        case 2: bot.speedX = -1;
            bot.speedY = 0;
            break;
        case 3: bot.speedX = 0;
            bot.speedY = -1;
            break;
        // }
    }
}
window.onload = function () {
    startGame();
    document.onkeydown = changeSpeed;
}
