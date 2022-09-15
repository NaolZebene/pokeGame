

const monsters = {
    Emby:{
        position:{
            x:280, 
            y:325
        }, 
        image:{
            src:"./Images/embySprite.png"
        }, 
        frame:{
            max:4, 
        }, 
        animate:true, 
        isEnemy:false, 
        name:"emby", 
        attacks:[attacks.Tackle, attacks.Fireball]
    }, 
    Draggle:{
        position:{
            x:800, 
            y:100
        }, 
        image:{
            src:"./Images/draggleSprite.png"
        }, 
        frame:{
            max:4, 
        }, 
        animate:true, 
        isEnemy:true , 
        name:"draggle", 
        attacks:[attacks.Tackle, attacks.Fireball]
    }
}


