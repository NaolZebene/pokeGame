const audio = {
    Map: new Howl({
        src:'./map.wav', 
        html5:true, 
        volume:0.1
    }) , 
    initBattle:new Howl({
        src:'./initBattle.wav', 
        html5:true, 
        volume:0.1
    }), 
    battle: new Howl({
        src:'./battle.mp3', 
        html5:true, 
        volume:0.1
    }), 
    tackle: new Howl({
        src:'./tackleHit.wav', 
        html5:true, 
        volume:0.1
    }), 
    fireballHit: new Howl({
        src:'fireballHit.wav', 
        html5:true, 
        volume:0.1
    }), 
   initFireball: new Howl({
    src:'./initFireball.wav', 
    html5:true, 
    volume:0.1
   }), 
   victory: new Howl({
    src:'./victory.wav', 
    html5:true, 
    volume:0.1
   })
}