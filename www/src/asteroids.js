var mediumAsteroid = cc.Sprite.extend({
    ctor:function(arg) {
      this._super(asset.Asteroid_png);
      this.attr({
            name : "med",
            x: cc.winSize.width / 2,
            y: cc.winSize.height / 2,
            scale: 0.125,
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
            scale: 0.0625,
            rotation: 0,
            xVelocity : 0,
            yVelocity : 0,
      });
    }
});

//Asteroid with 		 pos: Pos
//          and 	velocity: Vector
//          and 	  	size: String
//          and  	 inWorld: Boolean
//          and enteredScene: Boolean
var Asteroidz = cc.Sprite.extend({
    ctor:function(name, scale, posi, vector) {
      this._super(asset.Asteroid_png);
      this.attr({
            name : name,
            x: posi.x,
            y: posi.y,
            scale: scale,
            rotation: 0,            
            radius : (this.getContentSize().width / 2 * scale),
      });
       this.posi = posi;
       this.velocity = vector;
       this.inWorld = false;	   
       this.move = function() {
            this.rotation += 5;
            this.posi.move(this.velocity);
            // wrap coordinates           
            if(this.posi.x < 0 - this.radius)
                this.posi.x = cc.winSize.width + this.radius;
            if(this.posi.x > cc.winSize.width + this.radius)
                this.posi.x = 0 - this.radius;
            if(this.posi.y < 0 - this.radius)
                this.posi.y = cc.winSize.height + this.radius;
            if(this.posi.y > cc.winSize.height + this.radius)
                this.posi.y = 0 - this.radius;
            //sync coordinates
            this.x = this.posi.x;
            this.y = this.posi.y;           
	   };
    }
});



