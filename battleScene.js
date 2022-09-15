const battlebackground = new Image(); 
battlebackground.src = "./Images/battleBackground.png"

const battleBackground = new Sprite({
    position:{
        x:0, 
        y:0
    }, 
    image:battlebackground
})


let draggle 
let emby

let renderedSprites


let battleAnimationId;

let queue

function initBattle(){

    document.querySelector('#userInterface').style.display = 'block'
    document.querySelector('#dialogueBox').style.display = 'none'
    document.querySelector('#enemyHealthBar').style.width = '100%'
    document.querySelector('#playerHealthBar').style.width = '100%'
    document.querySelector('#attacksBox').replaceChildren();
    



    draggle = new Monster(monsters.Draggle)
    emby = new Monster(monsters.Emby)
    renderedSprites = [draggle,emby];

    emby.attacks.forEach(attack =>{
        const button = document.createElement('button');
        button.innerHTML = attack.name
        document.querySelector('#attacksBox').append(button)
    })

     queue = []

     document.querySelectorAll('button').forEach((button)=>{
        button.addEventListener('click',(e)=>{
            const selectedAttack = attacks[e.currentTarget.innerHTML]
            emby.attack({
                attack:selectedAttack, 
                recipient:draggle ,
                renderedSprites  
            })
    
            if(draggle.health<=0){
                queue.push(()=>{
                    draggle.faint()
                })
                queue.push(()=>{
                    gsap.to('#overlappingDiv',{
                        opacity:1, 
                        onComplete:()=>{
                            window.cancelAnimationFrame(battleAnimationId)
                            animate()
                            document.querySelector('#userInterface').style.display = 'none'
                            gsap.to('#overlappingDiv',{
                                opacity:0
                            })
                            battle.initiated = false; 
                            audio.Map.play();
                        }
                    })
                })   
            }
    
            const randomNumber = Math.floor(Math.random() * draggle.attacks.length)
            const randomAttack = draggle.attacks[randomNumber]
            queue.push(()=>{
                draggle.attack({
                    attack:randomAttack, 
                    recipient:emby, 
                    renderedSprites
                })
                if(emby.health<=0){
                    queue.push(()=>{
                        emby.faint()
                    })
                    queue.push(()=>{
                        gsap.to('#overlappingDiv',{
                            opacity:1, 
                            onComplete:()=>{
                                window.cancelAnimationFrame(battleAnimationId)
                                animate()
                                document.querySelector('#userInterface').style.display = 'none'
                                gsap.to('#overlappingDiv',{
                                    opacity:0
                                })
                                battle.initiated = false; 
                                audio.Map.play();
                            }
                        })
                    })   
                 
                }
            })
    
    
        })
    
        button.addEventListener('mouseenter',(e)=>{
            const selectedAttack = attacks[e.currentTarget.innerHTML]
            
            document.querySelector("#attackType").innerHTML = selectedAttack.type 
            document.querySelector("#attackType").style.color = selectedAttack.color 
        })
    })
}
function animateBattle(){
   battleAnimationId= window.requestAnimationFrame(animateBattle); 
    battleBackground.draw();
    renderedSprites.forEach(sprite =>{
        sprite.draw();
    })
}

animate()
// initBattle();
// animateBattle();





document.querySelector("#dialogueBox").addEventListener('click' , (e)=>{
    queue[0]()
    queue.shift()
    e.currentTarget.style.display = 'none'
})