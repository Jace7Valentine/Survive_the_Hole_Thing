var DefineThisBitch = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new gameLayer();
        this.addChild(new gameLayer());
    }
});

var gameLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size 
        var size = cc.winSize;       

        this.screenWidth = size.width;
        this.screenHeight = size.height;
        
        this.blackholeList = [];
               
        this.asteroids = [];        
        
        var bckgrnd = new cc.Sprite.create(asset.Background_png);
        //console.log("background" + bckgrnd, bckgrnd);
        bckgrnd.setAnchorPoint(cc.p(0.5,0.5));
        bckgrnd.setScaleX(size.width / bckgrnd.getContentSize().width);
        bckgrnd.setScaleY(size.height / bckgrnd.getContentSize().height);
        bckgrnd.setPosition(cc.p(size.width / 2, size.height / 2));
        this.addChild(bckgrnd, 0);
        

        this.blackholeList[0] = new blackhole(new Pos(size.width/2, size.height/2), new Vector(0,0)); 
        this.scheduleUpdate();
        //this.generateAsteroies();
        this.addChild(this.blackholeList[0]);
        this.schedule(this.generateAsteroies, 1);
        this.schedule(this.collidez);        
        
        return true;
    },
    
    update:function (dt) {        
        for(var i = 0; i < this.asteroids.length; i++) {
            var roid = this.asteroids[i];
            this.blackholeList[0].pull(roid);
            roid.move();
        }       
        this.blackholeList[0].move();
    },
    
    generateAsteroies:function() {
        
        
        //if (this.newSpawn > this.spawnRate) {  
           // this.newSpawn = 0;
            console.log("generate!");          
            
                var midX = this.screenWidth/2;
                var midY = this.screenHeight/2;

                var side = Math.floor(Math.random() * 4);
                var xPos = 0;
                var yPos = 0; 
                var xVol = 0;
                var yVol = 0;
                var minAngle = 0;
                var maxAngle = 180;
                var radTraj = Math.PI/2;
                var forth = Math.PI/2;
                
                if (side === 0) {
                    xPos = Math.floor(Math.random() * this.screenWidth);
                    yPos = -32;
                    
                    minAngle = ((forth)*(xPos/this.screenWidth)) + forth;
                    maxAngle = minAngle + forth;
                    radTraj = (Math.random() * (maxAngle - minAngle)) + minAngle;
                    xVol = Math.sin(radTraj);
                    yVol = Math.cos(radTraj);                        
                }
                else if (side === 1) {
                    xPos = -32;
                    yPos = Math.floor(Math.random() * this.screenHeight);
                    
                    minAngle = ((forth)*(yPos/this.screenHeight)) + forth;
                    maxAngle = minAngle - forth;
                    radTraj = (Math.random() * (maxAngle - minAngle)) + minAngle;
                    xVol = Math.sin(radTraj);
                    yVol = Math.cos(radTraj); 
                }
                else if (side === 2) {
                    xPos = Math.floor(Math.random() * this.screenHeight);
                    yPos = this.screenHeight + 32;
                    
                    minAngle = ((forth)*(xPos/this.screenWidth)) - forth;
                    maxAngle = minAngle + forth;
                    radTraj = -((Math.random() * (maxAngle - minAngle)) + minAngle);
                    xVol = Math.sin(radTraj);
                    yVol = Math.cos(radTraj); 
                }
                else if (side === 3) {
                    xPos = this.screenWidth + 32;
                    yPos = Math.floor(Math.random() * this.screenHeight);
                    
                    minAngle = ((forth)*(yPos/this.screenWidth)) - forth;
                    maxAngle = minAngle - forth;
                    radTraj = -((Math.random() * (maxAngle - minAngle)) + minAngle);
                    xVol = Math.sin(radTraj);
                    yVol = Math.cos(radTraj); 
                }
                
                var newRoid = new Asteroidz("lrg", 0.5, new Pos(xPos, yPos), new Vector(xVol, 0-yVol));
                newRoid.velocity.scale(SPD);                
                //console.log(newRoid);
                
                this.asteroids.push(newRoid);
                this.addChild(newRoid, 1);                
                
    },
    
    createAsteroid:function () {
        
        var roidType = Math.floor(Math.random() * 3);
        
        var roid = null;
        
        if (roidType === 0) {
            if (this.lrgAsteroid.length < this.maxLrg) {
                roid = new Asteroidz("lrg", 0.5, new Pos(1,2), 
                                     new Vector(0,0));                
            }
        }
        else if (roidType === 1) {
            if (this.medAsteroid.length < this.maxMed) {
                roid = new mediumAsteroid();
            }
        }
        else if (roidType === 2) {
            if (this.smlAsteroid.length < this.maxSml) {
                roid = new smallAsteroid();
            }
        }
        return roid;
    },   
    
    collidez:function() {
        for(var i = 0; i < this.asteroids.length; i++) {
            var roid1 = this.asteroids[i];
            var dist = roid1.posi.distanceTo(this.blackholeList[0].posi);
            if(dist < this.blackholeList[0].radius){
                this.removeChild(roid1);
                this.asteroids.splice(i--, 1);
            }
        }
        
        var collided = [];
        for(var i = 0; i < this.asteroids.length; i++) {
            var roid1 = this.asteroids[i];
            for(var j = 0; j < this.asteroids.length; j++) {
                var roid2 = this.asteroids[j];
                var dist = roid1.posi.distanceTo(roid2.posi);
                if(i !== j && dist < roid1.radius + roid2.radius) {
                    var roids1 = [roid1, roid2];
                    var roids2 = [roid2, roid1];
                    //console.log(roids1);
                    if(collided.indexOf(roids1) == -1 &&
                       collided.indexOf(roids2) == -1) {                        
                        collided[collided.length] = roids1;                        
                    }
                }
            }
        }       
        for(var i = 0; i < collided.length; i++) {
            var roids = collided[i];
            console.log(roids);
            if(this.asteroids.indexOf(roids[0]) !== -1 &&
               this.asteroids.indexOf(roids[1]) !== -1)
                this.breakApart(collided[i][0], collided[i][1]);
        }
    },
    
    breakApart:function(obj1, obj2) {
        
        this.removeChild(obj1); this.removeChild(obj2);
        
        var ratio = obj1.scale / obj2.scale;
        var MOR = 10;
        
        if(ratio == 2 || ratio == 0.5 || ratio == 1) {
            var colVector2 = obj1.posi.to(obj2.posi);
            colVector2.unitize();            
            var colVector1 = obj2.posi.to(obj1.posi);
            colVector1.unitize();            
            
            var ang = Math.PI/6;
            var exitVect1 = [];
            exitVect1[0] = rotateVect(colVector1, -ang);
            
            exitVect1[1] = rotateVect(colVector1, ang);
            
            var exitVect2 = [];
            exitVect2[0] = rotateVect(colVector2, -ang);
            
            exitVect2[1] = rotateVect(colVector2, ang);
                      
            
            var pos1 = [];
            pos1[0] = new Pos(obj1.x + obj1.radius*exitVect1[0].delx,
                              obj1.y + obj1.radius*exitVect1[0].dely);
            pos1[1] = new Pos(obj1.x - obj1.radius*exitVect1[1].delx,
                              obj1.y - obj1.radius*exitVect1[1].dely);
            var pos2 = [];
            pos2[0] = new Pos(obj2.x + obj2.radius*exitVect2[0].delx,
                              obj2.y + obj2.radius*exitVect2[0].dely);
            pos2[1] = new Pos(obj2.x - obj2.radius*exitVect2[1].delx,
                              obj2.y - obj2.radius*exitVect2[1].dely);
           
            exitVect1[0].scale(obj1.velocity.magnitude());            
            exitVect1[1].scale(obj1.velocity.magnitude());
            exitVect2[0].scale(obj2.velocity.magnitude());
            exitVect2[1].scale(obj2.velocity.magnitude());  
            
            if(obj1.scale > 0.125) {
                var subRoid1 = new Asteroidz("?", obj1.scale/2, pos1[0], exitVect1[0]);
                var subRoid2 = new Asteroidz("?", obj1.scale/2, pos1[1], exitVect1[1]);
                this.asteroids.push(subRoid1);
                this.asteroids.push(subRoid2);
                this.addChild(subRoid1);
                this.addChild(subRoid2);
            }
            if(obj2.scale > 0.125) {
                var subRoid1 = new Asteroidz("?", obj2.scale/2, pos2[0], exitVect2[0]);
                var subRoid2 = new Asteroidz("?", obj2.scale/2, pos2[1], exitVect2[1]);
                this.asteroids.push(subRoid1);
                this.asteroids.push(subRoid2);
                this.addChild(subRoid1);
                this.addChild(subRoid2);
            }
            this.asteroids.splice(this.asteroids.indexOf(obj1), 1);
            this.asteroids.splice(this.asteroids.indexOf(obj2), 1);
        }
        else if(obj1.scale > obj2.scale)
            this.asteroids.splice(this.asteroids.indexOf(obj2), 1);
        else
            this.asteroids.splice(this.asteroids.indexOf(obj1), 1);       
        
        
    }   
    
});



var ufo = cc.Sprite.extend({
    ctor:function(arg) {
      this._super(asset.Ufo_png);
      this.attr({
            name: "ufo",
            x: cc.winSize.width / 2,
            y: cc.winSize.height / 2,
            scale: 0.25,
            rotation: 0,
            xVelocity : 0,
            yVelocity : 0,
      });
    }
});

