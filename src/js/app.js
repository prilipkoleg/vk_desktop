(function (document) {
    "use strict";
    var vis_config,
        visualizer_default_config =
    {
        visualizer_status   : "true",
        visualizer_name     : "frequency_bar",
        line_width          : "0.6",
        space_between       : "0.2"
    };
    if(!!localStorage.getItem("vis_config")){
        vis_config = localStorage.getItem("vis_config");
    }else {
        localStorage.vis_config = JSON.stringify(visualizer_default_config);
    }

    var app = document.querySelector('#app');
    var ipc = window.require('ipc');
    app.token = localStorage.getItem('authToken');
    app.player = document.querySelector('#app-player');
    app.vis_config = JSON.parse(localStorage.vis_config);
    app.player.start();
    app.route = "friends";

    app.navigate = function (e) {
        var router = e.target.getAttribute('data-route');
        app.route = router;
    };

    app.update_vis_config = function () {
        app.vis_config = JSON.parse(localStorage.vis_config);
        //this.say(this.vis_config);
    };
    app.set_vis_config = function (properties ) {
        localStorage.vis_config = properties;
        this.update_vis_config();
    };
    app.set_default_config = function () {
        localStorage.vis_config = JSON.stringify(visualizer_default_config);
        this.update_vis_config();
    };

    app.logout = function(){
        ipc.send('logout');
    };

    app.say = function( string, object ){
        console.log(string, object);
    };

})(document);


