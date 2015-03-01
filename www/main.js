cc.game.onStart = function(){
    cc.view.adjustViewPort(true);
    cc.view.setDesignResolutionSize(854, 480, cc.ResolutionPolicy.SHOW_ALL);
    //cc.view.setDesignResolutionSize(cc.view._frameSize.width, cc.view._frameSize.height, cc.ResolutionPolicy.EXACT_FIT);
    //cc.view.setDesignResolutionSize(window.landwidth, window.landheight, cc.ResolutionPolicy.EXACT_FIT);
    cc.view.resizeWithBrowserSize(true);
    cc.LoaderScene.preload(g_resources, function () { cc.director.runScene(new MenuScene()); }, this);
};
cc.game.run();