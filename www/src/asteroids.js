var largeAsteroid = cc.Sprite.extend({
    ctor:function(arg) {
      this._super(asset.Asteroid_png);
      this.attr({
            name : "lrg",
            x: cc.winSize.width / 2,
            y: cc.winSize.height / 2,
            scale: 0.25,
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