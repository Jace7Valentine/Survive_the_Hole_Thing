// vector with x px/sec
//         and y px/sec 
function Vector (x,y) {
    this.delx = x;
    this.dely = y;   
	this.scale = function(k) {
		this.delx = k*this.delx;
		this.dely = k*this.dely;
	};
	this.magnitude = function() {
		var x = this.delx;
		var y = this.dely;
		return Math.sqrt(x * x + y * y);
	}
	this.unitize = function() {
		var hat = 1/this.magnitude();
		this.scale(hat);
	}
	this.accelarate = function(vector) {
		this.delx += TICK * vector.delx;
		this.dely += TICK * vector.dely;		
	};
};

function Pos (x, y) {
	this.x = x;
	this.y = y;
	this.to = function(pos) {
		return new Vector(pos.x - this.x, pos.y - this.y);
	};
	this.distanceTo = function(pos) {
		var vector = this.to(pos);
		var x = vector.delx;
		var y = vector.dely;
		return Math.sqrt(x * x + y * y);
	}
	this.move = function(vector) {
		this.x += vector.delx;
		this.y += vector.dely;
	};
};

