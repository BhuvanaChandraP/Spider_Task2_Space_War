

let player;
let aliens = [];
let bullets = [];
let player1 = document.getElementById("player");

let alien11 = document.getElementById("alien");
let alien12 = document.getElementById("alien1");
let alien13 = document.getElementById("alien2");
let alien14 = document.getElementById("alien3");
let alien15 = document.getElementById("alien4");

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
let flg1 = 0;
let pause1 = document.getElementById("pause");
let play1 = document.getElementById("play");  
let level = document.getElementById("levelNo");
let score1 = document.getElementById("score1");

let alienCounter  =0;
score1.innerHTML = `&nbsp ${score}`;
play1.style.display = "none";
let userName = prompt("Enter your user name");
for(;userName == "" || userName == null;)
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


function pause ()
{
    clearInterval(GameCanvas.interval);
    pause1.style.display = "none";
    play1.style.display = "block";
}
function play()
{
    GameCanvas.intervalFunction();
    play1.style.display = "none";
    pause1.style.display = "block";
}


//let bg = document.getElementById("canvas1")

function startGame()
{
    
    GameCanvas.start();
    
    //bg1 = new Generator (1200,600,70,30,"bg");
    player = new Generator(70, 90, 560, 500,"player");
    alien = new Generator(50,50,50,50,"alien");
    //level  = new Generator("15px", "verdana", 120, 20, "text");
    //level  = new Generator(100, 20, 1150, 10, "text");
    

    
  
}


function shoot()
{
    flg1 = 1;
    bullets = new Generator (10,30,(player.x+ player.width/2 -5),player.y,"bullet");

    aliens.forEach(function(enemy){
    if(isCollidingWithBullet(bullets,enemy)){
        if(localStorage.getItem("type") == "score")
        {
            if(score <15)
            {
                score++;
            }
            else if(score < 50)
            {
                score = score +2;
            }
            else if (score < 100)
            {
                score = score +3;
            }
            else if(score < 180)
            {
                score = score +4;
            }
            else
            {
                score = score + 5;
            }
        }
        else 
        {
            if (GameCanvas.frameNo <1500)
            {
                score++;
            }
            else if (GameCanvas.frameNo < 3500)
            {
                score = score + 2 ;
            }
            else if (GameCanvas.frameNo < 7000)
            {
                score = score + 3 ;
            }
            else if (GameCanvas.frameNo < 12000)
            {
                score = score + 4 ;
            }
            else 
            {
                score = score + 5 ;
            }
        }
        score++;
        this.state = "inactive";
        console.log("enemy died");
        //let index = aliens.indexOf(enemy);
        setTimeout(function(){ 
            let index = aliens.indexOf(enemy);
            aliens.splice(index,1);
            score1.innerHTML = `&nbsp ${score}`;
            // blast2 = new Generator(50,50,enemy.x,enemy.y,"blast");
            // blast2 = new Generator(50,50,enemy.x,enemy.y,"blast");
            // blast2 = new Generator(50,50,enemy.x,enemy.y,"blast");
            // blast2 = new Generator(50,50,enemy.x,enemy.y,"blast");
            // blast2 = new Generator(50,50,enemy.x,enemy.y,"blast");
         }, 300);
        //aliens.splice(index,1);

       
        //blast2.update();
        }

    });
}


function isCollidingWithBullet(r1,r2){
	let x_axis = Math.abs(r1.x - r2.x)<= Math.max(r1.width,r2.width);
	let y_axis = Math.abs(r1.y - r2.y)<= Math.max(r1.height,r2.height);

	return x_axis || y_axis;
}
function isColliding(r1,r2){
	let x_axis = Math.abs(r1.x - r2.x)+40<= Math.max(r1.width,r2.width);
	let y_axis = Math.abs(r1.y - r2.y)+40<= Math.max(r1.height,r2.height);

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
    this.dy1 = 1;
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
        else if(this.type == "alien1")
        {
            ctx.drawImage(alien12,this.x, this.y, this.width, this.height );
        }
        else if(this.type == "alien2")
        {
            ctx.drawImage(alien13,this.x, this.y, this.width, this.height );
        }
        else if(this.type == "alien3")
        {
            ctx.drawImage(alien14,this.x, this.y, this.width, this.height );
        }
        else if(this.type == "alien4")
        {
            ctx.drawImage(alien15,this.x, this.y, this.width, this.height );
        }
        else if(this.type == "bullet")
        {
            ctx.drawImage(bullet1,this.x, this.y, this.width, this.height );
        }
        else if(this.type == "blast")
        {
            ctx.drawImage(blast1,this.x, this.y, this.width, this.height );
        }
        else if(this.type == "text")
        {
            // ctx.font = this.width + " " + this.height;
            // ctx.font = "vernada";
            // ctx.fillStyle = "#fffff";
            ctx.font = '20px serif';
            ctx.fillText("level:", this.x, this.y);
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
    
    


    let no =  Math.random();
    let num ;
    //console.log(GameCanvas.frameNo);
    //console.log(localStorage.getItem("type"));
    if(localStorage.getItem("type") == "score")
    {
        if(score < 15)                        // GameCanvas.frameNo <1000
        {
            num = 0.01;
            level.innerHTML = `&nbsp  1`;
            for(let i=0;i<aliens.length;i++)
            {
                    
                    aliens[i].x += aliens[i].dx1;
                    if(aliens[i].x>1150 || aliens[i].x<50)
                    {
                        aliens[i].dx1 *= -1;
    
                    }
                    aliens[i].update();
                   
    
            }
            
        }
        else if(score < 50)         //  GameCanvas.frameNo >1000
        {
            num = 0.01;
            level.innerHTML = `&nbsp  2`;
            //GameCanvas.clearCanvas();
            for(let i=0;i<aliens.length;i++)
                {
                    
                    aliens[i].y += aliens[i].dy1;
                    // if(aliens[i].x>1150 || aliens[i].x<50)
                    // {
                    //     aliens[i].dx1 *= -1;
    
                    // }
                    aliens[i].update();
                   
    
                }
        }
        else
        {
            if(score < 100)
            {
                num = 0.009;
                level.innerHTML = ` &nbsp  3`;
            }
            else if (score < 180 )
            {
                num = 0.01;
                level.innerHTML = ` &nbsp  4`;
            }     
            else 
            {
                num = 0.03;
                level.innerHTML = ` &nbsp  5`;
            }    
            //level.innerHTML = ` &nbsp  2`;
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
           
        }
    
    
    }
    else 
    {
        if(GameCanvas.frameNo <1500)                        // GameCanvas.frameNo <1000
        {
            num = 0.01;
            level.innerHTML = `&nbsp  1`;
            for(let i=0;i<aliens.length;i++)
            {
                    
                    aliens[i].x += aliens[i].dx1;
                    if(aliens[i].x>1150 || aliens[i].x<50)
                    {
                        aliens[i].dx1 *= -1;
    
                    }
                    aliens[i].update();
                   
    
            }
            
        }
        else if(GameCanvas.frameNo < 3500)         //  GameCanvas.frameNo >1000
        {
            num = 0.01;
            level.innerHTML = `&nbsp  2`;
            //GameCanvas.clearCanvas();
            for(let i=0;i<aliens.length;i++)
                {
                    
                    aliens[i].y += aliens[i].dy1;
                    // if(aliens[i].x>1150 || aliens[i].x<50)
                    // {
                    //     aliens[i].dx1 *= -1;
    
                    // }
                    aliens[i].update();
                   
    
                }
        }
        else
        {
            if(GameCanvas.frameNo < 7000)
            {
                num = 0.009;
                level.innerHTML = ` &nbsp  3`;
            }
            else if (GameCanvas.frameNo < 12000 )
            {
                num = 0.01;
                level.innerHTML = ` &nbsp  4`;
            }     
            else 
            {
                num = 0.03;
                level.innerHTML = ` &nbsp  5`;
            }    
            //level.innerHTML = ` &nbsp  2`;
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
           
        }
    
    
    }

   if(localStorage.getItem("type") == "score")
   {
        if(no< num){
            let x = Math.floor(Math.random()*(1200-50));
            
            let y = Math.floor(Math.random()*50);
            alienCounter++;

            if(score <15)
            {
                
                if(alienCounter < 20)
                {
                    aliens.push(new Generator (50,50,x,y,"alien"));
                }
                // else
                // {
                //     aliens.push(new Generator (50,50,x,y,"alien1"));
                // }

                
            }
            
            else if(score < 50 )
            {
                console.log("reached level 2")
                if(alienCounter < 70)
                {
                    aliens.push(new Generator (50,50,x,y,"alien1"));
                }
                // else
                // {
                //     aliens.push(new Generator (50,50,x,y,"alien2"));
                // }
               
            }
            else
            {
                aliens.push(new Generator (50,50,x,y,"alien2"));
                // aliens.push(new Generator (50,50,x,y,"alien1"));
                // aliens.push(new Generator (50,50,x,y,"alien"));
            }
                
            
            
        }
   }
   else
   {
        if(no< num){
            let x = Math.floor(Math.random()*(1200-50));
            
            let y = Math.floor(Math.random()*50);
            alienCounter++;

            if(GameCanvas.frameNo <1500)
            {
                
                if(alienCounter < 20)
                {
                    aliens.push(new Generator (50,50,x,y,"alien"));
                }
                // else
                // {
                //     aliens.push(new Generator (50,50,x,y,"alien1"));
                // }

                
            }
            
            else if(GameCanvas.frameNo < 3500 )
            {
                console.log("reached level 2")
                if(alienCounter < 50)
                aliens.push(new Generator (50,50,x,y,"alien1"));
            }
            else
            {
                // aliens.push(new Generator (50,50,x,y,"alien2"));

                aliens.push(new Generator (50,50,x,y,"alien2"));
                // aliens.push(new Generator (50,50,x,y,"alien1"));
                // aliens.push(new Generator (50,50,x,y,"alien"));
            }
                
            
            
        }
   }



    aliens.forEach(function(enemy){
		if(isColliding(player,enemy)){
			alert(`Game over. Press OK to restart! your score:${score}`);
            //alert(`your score:${score}`);
            GameCanvas.stop();
            scoreBoard(userName,score);
			//gameover = true;
		}

	});

    if(flg1 != 0){
        bullets.y -= bullets.dy;
        bullets.update();
    }

}


startGame();

















