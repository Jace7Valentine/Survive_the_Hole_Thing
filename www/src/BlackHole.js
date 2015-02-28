
//BlackHole with 		 pos: Pos
//          and 	velocity: Vector
//          and 	  	mass: int
//          and  	 inWorld: Boolean
function BlackHole (pos, velocity, mass, inWorld) {
	this.pos = pos;
	this.x = pos.x;
	this.y = pos.y;
	this.velocity velocity;
	this.mass = mass;
	this.inWorld = inWorld;	
	
	this.move = function() {
		pos.move(velocity);	
		//add wrap position code
		this.x = pos.x;
		this.y = pos.y;	
	}	
	this.pull = function(object) {
		var d = pos.distanceTo(object.pos);
		//if d is > cut off don't do the below
		var accel = G*mass/d/d;
		var vect = object.pos.to(pos);
		vect.unitize();
		vect.scale(accel);
		object.velocity.accelerate(vect);		
	}
}; 