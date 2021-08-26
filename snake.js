
W = 1000;
H = 1000;
canvas = document.getElementById("mycanvas");
pen = canvas.getContext("2d");
var cs = 100;
food = Food();
game_over = false;
tail = new Image();
tail.src = ("tail.png")

head = new Image();
head.src = ("head.png")
food_img = new Image();
food_img.src = ("egg.png");
function init() {
    console.log("init function");


    game_over = false;
    snake = {
        init_len: 5,
        color: "blue",
        cells: [],
        direction: "right",
        createSnake: function () {
            for (var i = this.init_len; i > 0; i--) {
                this.cells.push({ x: i, y: 0 });
            }
        },
        drawSnake: function () {
            pen.fillStyle = this.color;
            for (let i = 1; i < this.cells.length; i++) {
                if (i == (1)) { pen.drawImage(head, this.cells[i].x * cs, this.cells[i].y * cs, cs - 2, cs - 2); }
                else {
                    pen.drawImage(tail, this.cells[i].x * cs, this.cells[i].y * cs, cs + 4, cs + 4);
                }
            }
        },
        updateSnake: function () {
            var X = this.cells[0].x;
            var Y = this.cells[0].y;
            if (X == food.x && Y == food.y) {
                food = Food();
            }
            else {
                this.cells.pop();
            }

            if (this.direction == "right") {
                X = X + 1;
            }
            else if (this.direction == "left") {
                X = X - 1;
            }
            else if (this.direction == "up") {
                Y = Y - 1;
            }
            else if (this.direction == "down") {
                Y = Y + 1;
            }


            this.cells.unshift({ x: X, y: Y });
            var last_x = 10;
            var last_y = 10;
            if (this.cells[0].x < -1 || this.cells[0].y < -1 || this.cells[0].y > last_y || this.cells[0].x > last_x) {
                game_over = true;

            }
            for (let i = 1; i < this.cells.length; i++) {
                if (X == this.cells[i].x && Y == this.cells[i].y) {
                    game_over = true;
                }
            }






        },
    }
    snake.createSnake();
    function keypresssed(temp) {
        let a = temp.key;
        if (a == "ArrowRight" || a == "d") {
            snake.direction = "right";

        }
        else if (a == "ArrowUp" || a == "w") {
            snake.direction = "up";

        }
        else if (a == "ArrowLeft" || a == "a") {
            snake.direction = "left";

        }
        else if (a == "ArrowDown" || a == "s") {
            snake.direction = "down";

        }
    }
    document.addEventListener("keydown", keypresssed);

}
function update() {
    console.log("update function");

    snake.updateSnake();





}
function draw() {
    console.log("draw function");
    pen.clearRect(0, 0, 1000, 1000);
    snake.drawSnake();
    pen.fillStyle = "red";
    pen.drawImage(food_img, food.x * cs, food.y * cs, cs, cs);


}
function Food() {
    Food_x = Math.floor(Math.random() * ((10) - 0) + 0);
    Food_y = Math.floor(Math.random() * ((10) - 0) + 0);
    food = {

        x: Food_x,
        y: Food_y,
    };
    return food;
}
function gameloop() {
    console.log("gameloop function");


    if (game_over == true) {
        clearInterval(loop);
        alert("Game Over . Click OK to start over");
        location.reload();
    }
    draw();
    update();


}
init();
loop = setInterval(gameloop, 150);