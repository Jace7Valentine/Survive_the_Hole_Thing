var asset = {
    Asteroid_png : "asset/asteroid.png",
    Background_png : "asset/background.png",
    Blackhole_png : "asset/blackhole.png",
    Ufo_png : "asset/ufo.png",
    Screenshot_png : "asset/screenshot.png",
    Gameover_png : "asset/GameOver.png"
};

var sound = {
    ping1 : "asset/sound1.ogg",
    ping2 : "asset/sound2.ogg",
    ping3 : "asset/sound3.ogg",
    ping4 : "asset/sound4.ogg"
};


var g_resources = [];
for (var i in asset) {
    g_resources.push(asset[i]);
}

var s_resources = [];
for (var j in sound) {
    s_resources.push(sound[j]);    
}


//Constants:
var G = 5; //gravitational constant gravity
var TICK = 1.0/60.0;// sec per tick
var SPD = 200.0; // px per sec
//scale of the smallest asteroid
var SMALL_ASS_SIZE = 0.125;
// how many small asteroids 
var LARGE_ASS_SIZE = SMALL_ASS_SIZE*4;
// scales Ship and BlackHole images
var SCALE_PNG = 1;
