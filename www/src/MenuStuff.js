var MenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MenuLayer();
        this.addChild(new MenuLayer());
    }
});

var MenuLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;  
        
        var midX = cc.winSize.width / 2;
        var midY = cc.winSize.height / 2;
        
        var bckgrnd = new cc.Sprite.create(asset.Screenshot_png);
        bckgrnd.setAnchorPoint(cc.p(0.5,0.5));
        bckgrnd.setScaleX(size.width / bckgrnd.getContentSize().width);
        bckgrnd.setScaleY(size.height / bckgrnd.getContentSize().height);
        bckgrnd.setPosition(cc.p(size.width / 2, size.height / 2));
        this.addChild(bckgrnd, 0);
        
        if (cc.sys.capabilities.hasOwnProperty('touches')) {
        cc.eventManager.addListener({
            prevTouchId: -1,
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesEnded: function (touches, event) {
                    var touch = touches[0];
                if (this.prevTouchId != touch.getID())
                    this.prevTouchId = touch.getID();
                else 
                    console.log("touch");
                    event.getCurrentTarget().processEvent(touches[0]);
            }
            }, this);
        }
        return true;
    },
    
    processEvent:function() {
        cc.director.runScene(new DefineThisBitch());
    }
});

var EndScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new EndLayer();
        this.addChild(new EndLayer());
    }
});

var EndLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;  
        
        var midX = cc.winSize.width / 2;
        var midY = cc.winSize.height / 2;
        
        var bckgrnd = new cc.Sprite.create(asset.Gameover_png);
        bckgrnd.setAnchorPoint(cc.p(0.5,0.5));
        bckgrnd.setScaleX(size.width / bckgrnd.getContentSize().width);
        bckgrnd.setScaleY(size.height / bckgrnd.getContentSize().height);
        bckgrnd.setPosition(cc.p(size.width / 2, size.height / 2));
        this.addChild(bckgrnd, 0);
        
        if (cc.sys.capabilities.hasOwnProperty('touches')) {
        cc.eventManager.addListener({
            prevTouchId: -1,
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesEnded: function (touches, event) {
                    var touch = touches[0];
                if (this.prevTouchId != touch.getID())
                    this.prevTouchId = touch.getID();
                else 
                    console.log("touch");
                    event.getCurrentTarget().processEvent(touches[0]);
            }
            }, this);
        }
        return true;
    },
    
    processEvent:function() {
        cc.director.runScene(new MenuScene());
    }
});

