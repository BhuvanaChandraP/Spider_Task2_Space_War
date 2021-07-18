

let player;

let player1 = document.getElementById("player");
let bg = document.getElementById("canvas1")

function startGame()
{
    
    GameCanvas.start();
    
    //bg1 = new Generator (1200,600,70,30,"bg");
    player = new Generator(50, 50, 560, 500,"player");
  
}


let GameCanvas = {
    //canvas: document.createElement("canvas"),
    canvas: document.getElementById("canvas"),
    start: function(){
        this.canvas.width = 1200 ;
        this.canvas.height = 600;
        //this.canvas.setAttribute("id",gameArea);
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;
        document.body.appendChild(this.canvas);

        this.interval = setInterval(updateGameArea, 10);

    },
    intervalFunction: function(){
        this.interval = setInterval(updateGameArea, 10);
    },
    clearCanvas: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
    }
}



function Generator(width, height, x, y, type)
{
    this.width = width;
    this.type = type;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.dy = 2;
    this.dx = 2;
    //this.img = img;
    this.update = function()
    {
        ctx = GameCanvas.context;
        if(this.type == "player")
        {
            console.log("hi")
            ctx.drawImage(player1,this.x, this.y, this.width, this.height );
        }
        else if(this.type == "bg")
        {
            ctx.drawImage(bg,this.x, this.y, this.width, this.height );
        }
        else
        {
            ctx.font = this.width + " " + this.height;
            //ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        }
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.crashWith = function (holePosition) {
        let left = this.x;
        let right = this.x + (this.width);
        let top = this.y;
        let bottom = this.y + (this.height);
        let holeLeft = holePosition.x;
        let holeRight = holePosition.x + (holePosition.width);
        let holeTop = holePosition.y;
        let holeBottom = holePosition.y + (holePosition.height);
        let crash = true;
        
        if ((bottom < holeTop) || (top > holeBottom) || (right < holeLeft) || (left > holeRight)) {     
            crash = false;
        }
        return crash;
      
        
    }
}


function updateGameArea()
{
    // GameCanvas.clearCanvas();
    GameCanvas.frameNo += 1;
    player.newPos();
    player.update();
}


startGame();