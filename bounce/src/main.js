define(function(require, exports, module) {
    // import dependencies
    var Engine = require('famous/core/Engine');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var ImageSurface = require('famous/surfaces/ImageSurface');

    var StateModifier = require('famous/modifiers/StateModifier');
    var Transitionable = require('famous/transitions/Transitionable');
    var SpringTransition = require('famous/transitions/SpringTransition');
    Transitionable.registerMethod('spring', SpringTransition);

    // create the main context
    var mainContext = Engine.createContext();

    // your app here
    var logo = new ImageSurface({
        size: [200, 200],
        content: 'http://www.jumpusa.com/spalding_nbaball_hires.jpg'
        //classes: ['double-sided']
    });

    /*
    var initialTime = Date.now();
    var centerSpinModifier = new Modifier({
        origin: [0.5, 0.5],
        transform : function(){
            return Transform.rotateY(.002 * (Date.now() - initialTime));
        }
    });

    mainContext.add(centerSpinModifier).add(logo);
    */

    var stateModifier = new StateModifier({
        origin: [0.5, 0]
    });

    mainContext.add(stateModifier).add(logo);

    var spring = {
        method: 'spring',
        period: 800,
        dampingRatio: 0.2
    };

    stateModifier.setTransform(
        Transform.translate(0, 435, 0), spring
    );


});