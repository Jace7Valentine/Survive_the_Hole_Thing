var largeAsteroid = cc.Sprite.extend({
    ctor:function(scale) {
      this._super(asset.Asteroid_png);
      this.attr({
            name : "lrg",
            x: cc.winSize.width / 2,
            y: cc.winSize.height / 2,
            scale: scale,
            rotation: 0,
            xVelocity : 0,
            yVelocity : 0,
            radius : (this.getContentSize().width / 4),
      });
    }
});

var mediumAsteroid = cc.Sprite.extend({
    ctor:function(arg) {
      this._super(asset.Asteroid_png);
      this.attr({
            name : "med",
            x: cc.winSize.width / 2,
            y: cc.winSize.height / 2,
            scale: 0.25,
            rotation: 0,
            xVelocity : 0,
            yVelocity : 0,
      });
    }
});

var smallAsteroid = cc.Sprite.extend({
    ctor:function(arg) {
      this._super(asset.Asteroid_png);
      this.attr({
            name : "sml",
            x: cc.winSize.width / 2,
            y: cc.winSize.height / 2,
            scale: 0.125,
            rotation: 0,
            xVelocity : 0,
            yVelocity : 0,
      });
    }
});

var Asteroidz = cc.Sprite.extend({
    ctor:function(name, scale, posi, vector) {
      this._super(asset.Asteroid_png);
      this.attr({
            name : name,
            x: posi.x,
            y: posi.y,
            scale: scale,
            rotation: 0,
            xVelocity : 0,
            yVelocity : 0,
            radius : (this.getContentSize().width / 2 * scale),
      });
       this.posi = posi;
       this.velocity = vector;
       this.inWorld = false;
	   this.enteredScene = false;
       this.move = function() {
		  this.posi.move(this.velocity);		
		  //add wrap position code
           this.x = this.posi.x;
           this.y = this.posi.y;           
	   };
    }
});
console.log(new Asteroidz("lrg", 0.5, new Pos(1,2)));
//Asteroid with 		 pos: Pos
//          and 	velocity: Vector
//          and 	  	size: String
//          and  	 inWorld: Boolean
//          and enteredScene: Boolean
function Asteroid (pos, velocity, size, inWorld, enteredScene) {
	this.pos = pos;
	this.velocity = velocity;
	this.size = size;
	this.inWorld = inWorld;
	this.enteredScene = enteredScene;
	
	this.move = function() {
		pos.move(velocity);		
		//add wrap position code
	};	
}