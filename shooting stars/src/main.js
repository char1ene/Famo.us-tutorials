define(function (require, exports, module) {

    // import dependencies
    var Engine = require('famous/core/Engine');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var Surface = require('famous/core/Surface');
    var StateModifier = require('famous/modifiers/StateModifier');

    // create the main context
    var mainContext = Engine.createContext();


    var stars = [{speed : 0.2, origin : [ 0.6, 1.3]},
        {speed : 0.3, origin : [ 0.4, 1.4]},
        {speed : 0.6, origin : [ 0.2, 1.5]},
        {speed : 0.5, origin : [   0, 1.6]},
        {speed : 0.2, origin : [-0.2, 1.7]},
        {speed : 0.2, origin : [-0.4, 1.3]},
        {speed : 0.5, origin : [-0.6, 1.4]},
        {speed : 0.4, origin : [-0.3, 1.5]},
        {speed : 0.3, origin : [-0.5, 1.6]}];


    for (var i = 0; i < stars.length; i++) {

        // star image
        var star = new Surface({
            size: [100,100],
            content: '<div class="fa fa-star-o fa-3x fa-inverse"></div>'
        });

        var initialTime = Date.now();
        var myFunc = _.bind(func, this, i);
        var animate = new Modifier({
            origin: stars[i].origin,
            transform: myFunc
        });

        function func(index) {
            return Transform.translate((stars[index].speed * (Date.now() - initialTime))%1000,
                    (stars[index].speed * (initialTime - Date.now()))%1000, 0);
        }

        mainContext.add(animate).add(star);

    } // for

});
