var accelListen = cc.EventListener.create({ 
    event: cc.EventListener.ACCELERATION,
    callback: function (acc, event){ 
        var accel = cc.EventAcceleration();
        console.log(accel);
        var accelX = 0;
        var accelY = 0;
        
        //vector(x,y)
    }
}, sprite);
    

var touchListen = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ALL_AT_ONCE,
    swallowTouches: true,
    callback: function( ){
        onTouchesBegin: function (touches, event) {
            if (touches.length > 1) {
                //destroy blackhole
            }
            else {
                var touch = touches[0];
                if (this.prevTouchId != touch.getID())
                    this.prevTouchId = touch.getID();
                else    
                    var touchedHere = event.getCurrentTarget();
                    var x = touchedHere.x;
                    var y = touchedHere.y;
                    //set blackhole x and y;
            }
        }
    }
});