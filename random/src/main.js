define(function (require, exports, module) {

    // import dependencies
    var Engine = require('famous/core/Engine');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var Surface = require('famous/core/Surface');
    var StateModifier = require('famous/modifiers/StateModifier');

    // create the main context
    var mainContext = Engine.createContext();

    // plane image
    var plane = new Surface({
        size: [150, 150],
        content: '<div class="fa fa-paper-plane-o fa-5x"></div>'
    });

    var initialTime = Date.now();
    var animatePlane = new Modifier({
        origin: [0, 1.5],
        transform : function() {
            return Transform.translate((.2 * (Date.now() - initialTime))%820,
                                              (.2 * (initialTime - Date.now()))%820, 0);
        }
    });
    mainContext.add(animatePlane).add(plane);


    // cloud image
    var cloud = new Surface({
        size: [150, 150],
        content: '<div class="fa fa-cloud fa-5x"></div>'
    });

    var animateCloud = new Modifier({
        origin: [0.8, 1.5],
        transform : function() {
            return Transform.translate((.1 * (initialTime-Date.now() ))%820,
                    (.1 * (initialTime - Date.now()))%820, 0);
        }
    });
    mainContext.add(animateCloud).add(cloud);

    // sun image
    var sun = new Surface({
        size: [100, 100],
        content: '<div class="fa fa-sun-o fa-spin fa-5x"></div>'
    });

    var animateSun = new Modifier({
        origin: [0.3, -0.3],
        transform : function() {
            return Transform.translate(0.3,
                    (.3 * (Date.now() - initialTime))%810, 0);
        }
    });
    mainContext.add(animateSun).add(sun);

    // smile image
    var smile = new Surface({
        size: [100, 100],
        content: '<div class="fa fa-smile-o fa-spin fa-5x"></div>'
    });

    var animateSmile = new Modifier({
        origin: [-0.3, 0.5],
        transform : function() {
            return Transform.translate((.4 * (Date.now() - initialTime))%1800, 0.5, 0);
        }
    });
    mainContext.add(animateSmile).add(smile);

    // star image
    var star = new Surface({
        size: [150, 150],
        content: '<div class="fa fa-star-o fa-5x"></div>'
    });

    var animateStar = new Modifier({
        origin: [1.2, 0.2],
        transform : function() {
            return Transform.translate((.3 * (initialTime - Date.now()))%710,
                                       (.3 * (Date.now() - initialTime))%710,0);
            }
    });
    mainContext.add(animateStar).add(star);

    // heart image
    var heart = new Surface({
        size: [150, 150],
        content: '<div class="fa fa-heart-o fa-5x"></div>'
    });

    var stateModifier = new Modifier({
        origin: [1,0.5]
    });

    var initialTime = Date.now();
    var centerSpinModifier = new Modifier({
        //origin: [0.5, 0.5],
        transform : function() {
             return Transform.rotateY(.0015 * (Date.now() - initialTime));
        }
    });
    mainContext.add(centerSpinModifier).add(stateModifier).add(heart);


});