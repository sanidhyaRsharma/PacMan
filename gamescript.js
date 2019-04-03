var cell_size = 32;
var game = {
    canvas: document.createElement("canvas"),
    grid: [[1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1],
           [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
           [1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1,0,1],
           [1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1,0,0,0,1],
           [1,0,1,1,1,1,1,0,1,0,1,1,1,1,0,1,0,1,0,1],
           [1,0,0,0,0,0,0,0,1,0,1,0,0,1,0,1,0,1,0,1],
           [1,0,0,1,1,1,1,0,0,0,1,0,1,1,0,1,0,1,0,1],
           [1,0,0,1,0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,1],
           [1,0,0,1,0,0,1,0,1,0,1,0,1,1,1,1,1,1,0,1],
           [1,1,1,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,1],
           [1,1,1,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,1],
           [1,0,0,1,0,0,1,0,1,0,1,0,1,1,1,1,1,1,0,1],
           [1,0,0,1,0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,1],
           [1,0,0,1,1,1,1,0,0,0,1,0,1,1,0,1,0,1,0,1],
           [1,0,0,0,0,0,0,0,1,0,1,0,0,1,0,1,0,1,0,1],
           [1,0,1,1,1,1,1,0,1,0,1,1,1,1,0,1,0,1,0,1],
           [1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1,0,0,0,1],
           [1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1,0,1],
           [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
           [1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1]],
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
        this.context.fillStyle = "#444444";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = "#000000";
        for(var i = 0; i<20; i++){
            for (var j = 0; j<20; j++){
                if(this.grid[i][j] == 1){
                    this.context.fillRect(i*cell_size, j*cell_size, cell_size, cell_size);
                }
            }
        }
    },
    stop: function(){
        clearInterval(this.interval);
    }
}

function startGame() {
    game.start();
    pacman = new component(1, 1, "yellow", 1, 1);
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
        ctx.fillRect(cell_size*this.x, cell_size*this.y, this.width*cell_size, this.height*cell_size);
    }
    this.newPos = function() {
        this.x = (this.x+this.speedX) % 20 ;
        this.x = this.x < 0 ? 20 : this.x;
        this.y = (this.y+this.speedY) % 20;
        this.y = this.y < 0 ? 20 : this.y;
        if(game.grid[this.x][this.y] == 1){
            this.x = this.x-this.speedX;
            this.y = this.y-this.speedY;
            this.speedX = 0;
            this.speedY = 0;
        }
    }
}
function updateGameArea(){
    game.clear();
    pacman.newPos();
    pacman.update();

}
function changeSpeed(e){
    e = e || window.event;
    if(e.keyCode == '37'){
        pacman.speedX = -1;
        pacman.speedY = 0;
    }
    if(e.keyCode == '38'){
        pacman.speedX = 0;
        pacman.speedY = -1;
    }
    if(e.keyCode == '39'){
        pacman.speedX = 1;
        pacman.speedY = 0;
    }
    if(e.keyCode == '40'){
        pacman.speedX = 0;
        pacman.speedY = 1;
    }
}
window.onload = function () {
    startGame();
    document.onkeydown = changeSpeed;
}
