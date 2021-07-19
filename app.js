

let player;
let aliens = [];
let bullets = [];
let player1 = document.getElementById("player");
let alien11 = document.getElementById("alien1");
let bullet1 = document.getElementById("bullet");
let blast1 = document.getElementById("blast");
let blast2;
let W=1200,H=600;
let prev_counter = 0;
let counter = 0;
let score = 0;
let collect = [];
let names = [];
let i=0;
let flg = 0;
let userName = prompt("Enter your user name");
for(;userName == "" && userName == null;)
{
    userName = prompt("Enter your user name"); 
}
function scoreBoard(userName,highScore)
{
          
    names = JSON.parse(localStorage.getItem("array1"));
    
    //console.log(names);
    if(names == null)
    {
        names = [];
        names.push([userName,highScore]);
    }
    
    for(i=0;i<names.length;i++)
    {
        if(userName == names[i][0])
        {
            names[i][0] = userName;
            if(names[i][1]<highScore)
            {
                names[i][1] = highScore;
            }
            localStorage.setItem("array1", JSON.stringify(names));
            flg = 1;
        }
    }
    
    if((flg == 0) || (names.length == 0))
    {
        
        names.push([userName,highScore]);
        
    }
    localStorage.setItem("array1", JSON.stringify(names));
    
}

//let bg = document.getElementById("canvas1")

function startGame()
{
    
    GameCanvas.start();
    
    //bg1 = new Generator (1200,600,70,30,"bg");
    player = new Generator(70, 90, 560, 500,"player");
    alien = new Generator(50,50,50,50,"alien");
    

    
  
}


function shoot()
{
    bullets = new Generator (10,30,(player.x+ player.width/2 -5),player.y,"bullet");
    aliens.forEach(function(enemy){
    if(isCollidingWithBullet(bullets,enemy)){
        score++;
        this.state = "inactive";
        console.log("enemy died");
        //var index = aliens.indexOf(enemy);
        setTimeout(function(){ 
            var index = aliens.indexOf(enemy);
            aliens.splice(index,1);
            blast2 = new Generator(50,50,enemy.x,enemy.y,"blast");
            blast2 = new Generator(50,50,enemy.x,enemy.y,"blast");
            blast2 = new Generator(50,50,enemy.x,enemy.y,"blast");
            blast2 = new Generator(50,50,enemy.x,enemy.y,"blast");
            blast2 = new Generator(50,50,enemy.x,enemy.y,"blast");
         }, 300);
        //aliens.splice(index,1);

       
        //blast2.update();
        }

    });
}
function isCollidingWithBullet(r1,r2){
	var x_axis = Math.abs(r1.x - r2.x)<= Math.max(r1.width,r2.width);
	var y_axis = Math.abs(r1.y - r2.y)<= Math.max(r1.height,r2.height);

	return x_axis || y_axis;
}
function isColliding(r1,r2){
	var x_axis = Math.abs(r1.x - r2.x)+40<= Math.max(r1.width,r2.width);
	var y_axis = Math.abs(r1.y - r2.y)+40<= Math.max(r1.height,r2.height);

	return x_axis && y_axis;
}
let GameCanvas = {
    //function buttonGotPressed(e){
    
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

        

        document.addEventListener('keydown', function(e){
            if(e.key==" "){
                console.log("space");
                //GameCanvas.shoot();
                shoot();
            }
            if(e.key=="ArrowLeft"){
                player.x = player.x - player.dx;
                if(player.x<=0){
                    player.x= 0;
                }
            }
            if(e.key=="ArrowRight"){
                player.x = player.x + player.dx;
                if(player.x >= W-player.width){
                    player.x = W-player.width;
                }
            }
            if(e.key=="ArrowUp"){
                player.y = player.y - player.dy;
                if(player.y<=0){
                    player.y= 0;
                }
            }
            if(e.key=="ArrowDown"){
                player.y = player.y + player.dy;
                if(player.y >= H-player.width){
                    player.y = H-player.width;
                }
            }
        });

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
    this.dy = 10;
    this.dx = 10;
    //this.dx1 = Math.random()*10 +2;
    this.dx1 = 1;
    this.dy1 = 2;
    //this.img = img;
    this.update = function()
    {
        ctx = GameCanvas.context;
        if(this.type == "player")
        {
           
            ctx.drawImage(player1,this.x, this.y, this.width, this.height );
        }
        else if(this.type == "bg")
        {
            ctx.drawImage(bg,this.x, this.y, this.width, this.height );
        }
        else if(this.type == "alien")
        {
            ctx.drawImage(alien11,this.x, this.y, this.width, this.height );
        }
        else if(this.type == "bullet")
        {
            ctx.drawImage(bullet1,this.x, this.y, this.width, this.height );
        }
        else if(this.type == "blast")
        {
            ctx.drawImage(blast1,this.x, this.y, this.width, this.height );
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
    GameCanvas.clearCanvas();
    GameCanvas.frameNo += 1;
    player.newPos();
    player.update();
    //alien1.y += -0.5;
    aliens.forEach(function(enemy){
		enemy.update();
	});
    

    // for (let i = 0; i < aliens.length; i++) {
    //     aliens[i].x += aliens[i].dx;
    //     if(aliens[i].x<20 || aliens[i].x>1150)
    //     {
    //         aliens[i].dx *= -1;

    //     }
    //     aliens[i].update();
    //     // aliens[i].x += -1.5;
    //     // aliens[i].update();
    // }


    // alien1.x += alien1.dx;
    // if(alien1.x<20 || alien1.x>1150)
    // {
    //     alien1.dx *= -1;

    // }
    // alien1.update();


    var no =  Math.random();
    var num ;
    if(score > 5)
    {
        num = 0.05;
    }
    else
    {
        num = 0.01;
    }
	if(no< num){
		var x = Math.floor(Math.random()*(1200-50));
		// multiplied by 100 to generate enemies in the region from 0 to 100px.
		var y = Math.floor(Math.random()*50);

		var speed = Math.random()*1 +2;
		var negative = Math.random();
		if(negative<0.5){
			speed = -speed;
		}
        //aliens.push(new aliensfun(x,y,speed));
        aliens.push(new Generator (50,50,x,y,"alien"));
		// var e = new enemy(x,y,speed);
		// enemies.push(e);
	}
    aliens.forEach(function(alien1){
       
        alien1.x += alien1.dx1;
        alien1.y += alien1.dy1;
        if(alien1.x<=50 || alien1.x>=1150 || alien1.y <=50 || alien1.y >550)  //|| alien1.y <20 || alien1.y >560
        //if(this.x >= W-this.width || this.x <=0)
        {
            alien1.dx1 *= -1;
            //alien1.dy1 *= -1;

        }
        this.y += 0.5;
        alien1.update();
		//alien1.update();
	});

    // for(let i=0;i<aliens.length;i++)
    // {
    //     //aliens[i].x += -0.8;
    //     console.log("updating");
    //     aliens[i].x += aliens[i].dx;
    //     if(aliens[i].x>20 || aliens[i].x<1150)
    //     {
    //         aliens[i].dx *= -1;

    //     }
    //     aliens[i].update();
       

    // }
    aliens.forEach(function(enemy){
		if(isColliding(player,enemy)){
			alert(`Game over. Press OK to restart! your score:${score}`);
            //alert(`your score:${score}`);
            GameCanvas.stop();
            scoreBoard(userName,score);
			//gameover = true;
		}

	});


    bullets.y -= bullets.dy;
    if(bullets.y<20 || bullets.y>1150)
    {
        alien1.dy *= -1;

    }
    bullets.update();

}





startGame();