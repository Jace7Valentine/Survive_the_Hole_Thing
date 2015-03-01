var DefineThisBitch = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new gameLayer();
        this.addChild(new gameLayer());
    }
});

var gameLayer = cc.Layer.extend({
    sprite:null,
    blackholeList:[],
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size 
        var size = cc.winSize;       

        this.gameOver = false;
        
        
        this.screenWidth = size.width;
        this.screenHeight = size.height;
        
        this.ship = new ufo(new Pos(size.width/4, size.height/2), new Vector(0,0));
               
        this.asteroids = [];      
        this.hpText = new cc.LabelTTF("HP: " + this.ship.hp, "Impact", 80);
        // position the label on the center of the screen
        this.hpText.x = size.width/2;
        this.hpText.y = 160;
        this.addChild(this.hpText, 5);
        
        var bckgrnd = new cc.Sprite.create(asset.Background_png);
        //console.log("background" + bckgrnd, bckgrnd);
        bckgrnd.setAnchorPoint(cc.p(0.5,0.5));
        bckgrnd.setScaleX(size.width / bckgrnd.getContentSize().width);
        bckgrnd.setScaleY(size.height / bckgrnd.getContentSize().height);
        bckgrnd.setPosition(cc.p(size.width / 2, size.height / 2));
        this.addChild(bckgrnd, 0);
        
        this.blackholeList[0] =  new blackhole(new Pos(size.width/2, size.height/2), new Vector(0,0));
        this.scheduleUpdate();
        //this.generateAsteroies();
        this.addChild(this.blackholeList[0]);
        this.addChild(this.ship);
        this.schedule(this.generateAsteroies, 1);
        this.schedule(this.collidez);
        this.schedule(this.dead);
        
        console.log("BHL" + this.blackholeList);
        console.log("BHL" + this.blackholeList[0].x);
        
        cc.eventManager.addListener({
            prevTouchId: -1,
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesEnded: function (touches, event) {
                console.log(touches.length);
                var target = event.getCurrentTarget();
                if (touches.length > 1) {
                    //console.log("HEY LIsSTEN");
                    target.blackholeList[0].x = 10000;
                    target.blackholeList[0].y = 10000;
                    target.blackholeList[0].posi.x = 10000;
                    target.blackholeList[0].posi.y = 10000;
                } 
                else { 
                    //console.log("ELSE BITHCH GET OUT THE WAY!");
                    var touch = touches[0];
                    //if (this.prevTouchId != touch.getID()) {
                      //  this.prevTouchId = touch.getID(); }
                   // else  {
                        //console.log("SUPER SAYYYIN BOYYA MOFO");
                        console.log(this.blackholeList);
                        var xP = touch.getLocation().x;
                        var yP = touch.getLocation().y;
                    
                        target.blackholeList[0].x = xP;
                        target.blackholeList[0].y = yP;
                        target.blackholeList[0].posi.x = xP;
                        target.blackholeList[0].posi.y = yP;
                  //  }
                }
            }
        }, this); 
        
        
        return true;
    },
    
    dead: function () {
        console.log(this.ship.hp);
        if (this.gameOver) { cc.director.runScene(new EndScene()); }
    },
    
    update:function (dt) { 
        this.blackholeList[0].pull(this.ship);
        for(var i = 0; i < this.asteroids.length; i++) {
            var roid = this.asteroids[i];
            this.blackholeList[0].pull(roid);
            roid.move();
        }       
        this.blackholeList[0].move();
        this.ship.move();
    },
    
    generateAsteroies:function() {
        
        
        //if (this.newSpawn > this.spawnRate) {  
           // this.newSpawn = 0;
            //console.log("generate!");          
            
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
                
                var newRoid = new Asteroidz("lrg", 0.25, new Pos(xPos, yPos), new Vector(xVol, 0-yVol));
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
        
        for(var i = 0; i < this.asteroids.length; i++) {
            var roid1 = this.asteroids[i];
            var dist = roid1.posi.distanceTo(this.ship.posi);
            if(dist < this.ship.radius + roid1.radius){
                this.removeChild(roid1);
                this.asteroids.splice(i--, 1);
                this.ship.hp -= (roid1.scale * 8);
            }
            
        }
        
        if (this.ship.posi.distanceTo(this.blackholeList[0].posi) < this.blackholeList[0].radius) 
            { this.ship.hp -= 10000000; }
        
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
                        var pick = Math.floor(Math.random()*4);
                        if(pick == 0)
                            cc.audioEngine.playMusic(sound.ping1, false);
                        if(pick == 1)
                            cc.audioEngine.playMusic(sound.ping2, false);
                        if(pick == 2)
                            cc.audioEngine.playMusic(sound.ping3, false);
                        if(pick == 3)
                            cc.audioEngine.playMusic(sound.ping4, false);
                        collided[collided.length] = roids1;                        
                    }
                }
            }
        }       
        for(var i = 0; i < collided.length; i++) {
            var roids = collided[i];
            //console.log(roids);
            if(this.asteroids.indexOf(roids[0]) !== -1 &&
               this.asteroids.indexOf(roids[1]) !== -1)
                this.breakApart(collided[i][0], collided[i][1]);
        }
        this.hpText.setString("HP: " + this.ship.hp);        
        
        if (this.ship.amDead()) { this.gameOver = true; }
    },
    
    breakApart:function(obj1, obj2) {        
       
        
        var ratio = obj1.scale / obj2.scale;
        var MOR = 10;
        
        if(ratio == 2 || ratio == 0.5 || ratio == 1) {
            var colVector2 = obj1.posi.to(obj2.posi);
            colVector2.unitize();            
            var colVector1 = obj2.posi.to(obj1.posi);
            colVector1.unitize();            
            
            var ang = Math.PI/4;
            var exitVect1 = [];
            exitVect1[0] = rotateVect(colVector1, -ang);
            
            exitVect1[1] = rotateVect(colVector1, ang);
            
            var exitVect2 = [];
            exitVect2[0] = rotateVect(colVector2, -ang);
            
            exitVect2[1] = rotateVect(colVector2, ang);
                      
            
            var pos1 = [];
            pos1[0] = new Pos(obj1.x + obj1.radius*exitVect1[0].delx,
                              obj1.y + obj1.radius*exitVect1[0].dely);
            pos1[1] = new Pos(obj1.x + obj1.radius*exitVect1[1].delx,
                              obj1.y + obj1.radius*exitVect1[1].dely);
            var pos2 = [];
            pos2[0] = new Pos(obj2.x + obj2.radius*exitVect2[0].delx,
                              obj2.y + obj2.radius*exitVect2[0].dely);
            pos2[1] = new Pos(obj2.x + obj2.radius*exitVect2[1].delx,
                              obj2.y + obj2.radius*exitVect2[1].dely);
           
            exitVect1[0].scale(obj1.velocity.magnitude());            
            exitVect1[1].scale(obj1.velocity.magnitude());
            exitVect2[0].scale(obj2.velocity.magnitude());
            exitVect2[1].scale(obj2.velocity.magnitude());  
            
            if(obj1.scale > 0.0625) {
                var subRoid1 = new Asteroidz("?", obj1.scale/2, pos1[0], exitVect1[0]);
                var subRoid2 = new Asteroidz("?", obj1.scale/2, pos1[1], exitVect1[1]);
                this.asteroids.push(subRoid1);
                this.asteroids.push(subRoid2);
                this.addChild(subRoid1);
                this.addChild(subRoid2);
            }
            if(obj2.scale > 0.0625) {
                var subRoid1 = new Asteroidz("?", obj2.scale/2, pos2[0], exitVect2[0]);
                var subRoid2 = new Asteroidz("?", obj2.scale/2, pos2[1], exitVect2[1]);
                this.asteroids.push(subRoid1);
                this.asteroids.push(subRoid2);
                this.addChild(subRoid1);
                this.addChild(subRoid2);
            }
            this.asteroids.splice(this.asteroids.indexOf(obj1), 1);
            this.asteroids.splice(this.asteroids.indexOf(obj2), 1);
            this.removeChild(obj1);
            this.removeChild(obj2);
        }
        else if(obj1.scale > obj2.scale){
            this.removeChild(obj2);
            this.asteroids.splice(this.asteroids.indexOf(obj2), 1);
        }
        else {
            this.removeChild(obj1);
            this.asteroids.splice(this.asteroids.indexOf(obj1), 1);    
        }
        
        
    }   
    
});





