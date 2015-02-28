cc.game.onStart = function(){
    cc.view.adjustViewPort(true);
    cc.view.setDesignResolutionSize(cc.view._frameSize.width, cc.view._frameSize.height, cc.ResolutionPolicy.EXACT_FIT);
    //cc.view.setDesignResolutionSize(window.landwidth, window.landheight, cc.ResolutionPolicy.EXACT_FIT);
    cc.view.resizeWithBrowserSize(true);
    cc.LoaderScene.preload(g_resources, function () { cc.director.runScene(new DefineThisBitch()); }, this);
};
cc.game.run();