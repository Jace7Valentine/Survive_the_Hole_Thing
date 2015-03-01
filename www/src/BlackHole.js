//BlackHole with 		 pos: Pos
//          and 	velocity: Vector
//          and 	  	mass: int
//          and  	 inWorld: Boolean 
var blackhole = cc.Sprite.extend({
    ctor:function(posi, vector) {
      this._super(asset.Blackhole_png);
      this.attr({
            name : "hole",
            x: posi.x,
            y: posi.y,            
            rotation: 0,            
            radius : (this.getContentSize().width / 4),
      });
       this.posi = posi;
       this.velocity = vector;
       this.inWorld = false;	
        this.mass = 1000000;
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
        this.pull = function(object) {
		  var d = this.posi.distanceTo(object.posi);
		  //if d is > cut off don't do the below
		  var accel = G*this.mass/d/d;
		  var vect = object.posi.to(this.posi);
		  vect.unitize();
		  vect.scale(accel);
		  object.velocity.accelarate(vect);		
	   };
    }
});

var ufo = cc.Sprite.extend({
    ctor:function(posi, vector) {
      this._super(asset.Ufo_png);
      this.attr({
            name : "ship",
            x: posi.x,
            y: posi.y,            
            rotation: 0,            
            radius : (this.getContentSize().width/2),
            hp : 100,
      });
        this.posi = posi;
        this.velocity = vector;
        this.move = function() {
            this.rotation -= 0.5;
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
        
        this.amDead = function() {
            if (this.hp > 0) { return false; }
            else { return true; }
        }
    }
});

