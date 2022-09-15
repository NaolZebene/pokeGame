const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');


// console.log(gsap);
// console.log(Howl)

const offset = {
    x:-735, 
    y:-650
}

canvas.width = 1024
canvas.height = 576

let collisionsMap = []
for(let i=0; i<collisions.length;i+=70){
collisionsMap.push(collisions.slice(i,70+i))
}

let battleZoneMap = []; 
for(let i =0; i<battleZone.length; i+=70){
    battleZoneMap.push(battleZone.slice(i,70+i));
}


const boundaries = [];

collisionsMap.forEach((row, i) =>{
    row.forEach((symb,j)=>{ 
          if(symb == 1025){
            boundaries.push(new Boundary({position:{
                x:j*Boundary.width + offset.x, 
                y:i*Boundary.height + offset.y 
            }}))
        }
        
    })
})

const battlezones = [];

battleZoneMap.forEach((row, i) =>{
    row.forEach((symb,j)=>{ 
          if(symb == 1025){
            battlezones.push(new Boundary({position:{
                x:j*Boundary.width + offset.x, 
                y:i*Boundary.height + offset.y 
            }}))
        }
        
    })
})






c.fillStyle = "white";
c.fillRect(0,0,canvas.width, canvas.height);

let backgroundImage = new Image(); 
backgroundImage.src = "./Images/Pellet Town.png"

let playerDownImage = new Image(); 
playerDownImage.src = "./Images/playerDown.png";

let playerUpImage = new Image(); 
playerUpImage.src = "./Images/playerUp.png";

let playerLeftImage = new Image(); 
playerLeftImage.src = "./Images/playerLeft.png";

let playerRightImage = new Image(); 
playerRightImage.src = "./Images/playerRight.png";

let foregroundImage = new Image(); 
foregroundImage.src = "./Images/foreground.png"

const keys = {
    w:{
        pressed:false
    }, 
    a:{
        pressed:false
    }, 
    d:{
        pressed:false
    }, 
    s:{
        pressed:false
    }
}






const background = new Sprite({position:{
    x:offset.x, 
    y:offset.y
},
 image:backgroundImage, 

})

const foreground = new Sprite({position:{
    x:-302, 
    y:-508
},
 image:foregroundImage, 

})

const player = new Sprite({
    position:{
        x:canvas.width/2 - 192/4/2, 
        y:canvas.height/2 - 68/2
    },
    image: playerDownImage, 
    frame:{
        max:4
    }, 
    sprites:{
        up:playerUpImage, 
        right:playerRightImage, 
        left:playerLeftImage, 
        down:playerDownImage
    }
})



const movables = [background, ...boundaries,foreground,...battlezones]

function reactCollision({rectangle1, rectangle2}){
    return(rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width
        && rectangle1.position.y <=rectangle2.position.y+rectangle2.height&&
        rectangle1.position.y+rectangle1.height >= rectangle2.position.y)
}

battle = {
    initiated:false
}

function animate(){
    const animationId = window.requestAnimationFrame(animate);
    background.draw()
    boundaries.forEach(boundary =>{
        boundary.draw();     
    })
    battlezones.forEach(battlezone =>{
        battlezone.draw();
    })
    player.draw();
    foreground.draw();
    
   let moving = true
   player.animate =false;

   if(battle.initiated) return 
   if (keys.w.pressed || keys.a.pressed || keys.d.pressed || keys.s.pressed){
    
    for(let i = 0; i<battlezones.length; i++){
        const battleZone = battlezones[i];
        const overlappingArea = (Math.min(player.position.x + player.width, battleZone.position.x+ battleZone.width)-
        Math.max(player.position.x,battleZone.position.x)) * (Math.min(player.position.y + player.height,battleZone.position.y+battleZone.height)
        - Math.max(player.position.y , battleZone.position.y))
        if(reactCollision({
            rectangle1:player,
            rectangle2:battleZone
        }) && overlappingArea > (player.width*player.height)/2 && Math.random() < 0.01) {
            
            console.log("battle zone collision")
            window.cancelAnimationFrame(animationId);
            audio.Map.stop()
            audio.initBattle.play(); 
            audio.battle.play();
            battle.initiated = true;

            gsap.to("#overlappingDiv",{
                opacity:1,
                repeat:3, 
                yoyo:true, 
                duration:0.4, 
                onComplete(){
                    gsap.to("#overlappingDiv", {
                        opacity:1, 
                        duration:0.4, 
                        onComplete(){
                            initBattle()
                            animateBattle();
                            gsap.to("#overlappingDiv",{
                                opacity:0, 
                                duration:0.4, 

                            })
                        }
                    })
                }
            })

            
            break;
        } 
    }
   }

    if(keys.w.pressed && lastkey =='w'){
         player.animate  = true
         player.image = player.sprites.up
        for(let i = 0; i<boundaries.length; i++){
            const boundary = boundaries[i];
            if(reactCollision({
                rectangle1:player,
                rectangle2:{
                    ...boundary, 
                    position:{
                        x:boundary.position.x,
                        y:boundary.position.y + 3
                    }
                }
            })) {
                moving=false;
                break;
            } 
        }

    
        if(moving){
        movables.forEach((movable)=>{
            movable.position.y+=3
        })
    }
    }
    else if(keys.a.pressed && lastkey == 'a'){
        player.animate  = true
        player.image = player.sprites.left
        for(let i = 0; i<boundaries.length; i++){
            const boundary = boundaries[i];
            if(reactCollision({
                rectangle1:player,
                rectangle2:{
                    ...boundary, 
                    position:{
                        x:boundary.position.x + 3,
                        y:boundary.position.y 
                    }
                }
            })) {
                moving = false
                break
            } 
        }

        if(moving){
        movables.forEach((movable)=>{
            movable.position.x+=3
        })
    }
    }
    else if(keys.d.pressed && lastkey == 'd'){
        player.animate  = true
        player.image = player.sprites.right;
        for(let i = 0; i<boundaries.length; i++){
            const boundary = boundaries[i];
            if(reactCollision({
                rectangle1:player,
                rectangle2:{
                    ...boundary, 
                    position:{
                        x:boundary.position.x-3,
                        y:boundary.position.y
                    }
                }
            })) {
                moving=false;
                break
            } 
        }
        if(moving){
        movables.forEach((movable)=>{
            movable.position.x-=3
        })
    }
    }
    else if(keys.s.pressed && lastkey == 's'){
        player.animate  = true
        player.image = player.sprites.down
        for(let i = 0; i<boundaries.length; i++){
            const boundary = boundaries[i];
            if(reactCollision({
                rectangle1:player,
                rectangle2:{
                    ...boundary, 
                    position:{
                        x:boundary.position.x,
                        y:boundary.position.y -3
                    }
                }
            })) {
               
                moving = false;
                break
            } 
        }
        if(moving){
        movables.forEach((movable)=>{
            movable.position.y-=3
        })
    }
    }
    
}

// animate();


let lastkey = ""
window.addEventListener('keydown', (e)=>{
   switch(e.key){
       case "w":
           keys.w.pressed = true;
           lastkey = 'w'
           break; 
        case "d":
            keys.d.pressed = true;
            lastkey='d'
            break; 
        case "a":
            keys.a.pressed = true;
            lastkey ='a'
            break;
        case "s":
            keys.s.pressed = true;
            lastkey = 's'
            break;
   }
 
})

window.addEventListener('keyup',(e)=>{
    switch(e.key){
        case "w":
            keys.w.pressed = false;
            break; 
         case "d":
             keys.d.pressed = false;
             break; 
         case "a":
             keys.a.pressed = false;
             break;
         case "s":
             keys.s.pressed = false;
             break;
    }
 

})

let clicked = false
addEventListener('click',()=>{
  if(!clicked){
    audio.Map.play()
    clicked=true 
  }
})