var asset = {
    Asteroid_png : "asset/asteroid.png",
    Background_png : "asset/background.png",
    Blackhole_png : "asset/blackhole.png",
    Ufo_png : "asset/ufo.png",
    Screenshot_png : "asset/screenshot.png",
    Gameover_png : "asset/GameOver.png"
};

var g_resources = [];
for (var i in asset) {
    g_resources.push(asset[i]);
}

//Constants:
var G = 2.5; //gravitational constant gravity
var TICK = 1/cc.frameRate;// sec per tick
