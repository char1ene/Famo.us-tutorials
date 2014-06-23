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

    var Surface    = require("famous/core/Surface");
    var SnapTransition = require("famous/transitions/SnapTransition");
    Transitionable.registerMethod("snap", SnapTransition);

    var GenericSync = require("famous/inputs/GenericSync");
    var MouseSync   = require("famous/inputs/MouseSync");
    var TouchSync   = require("famous/inputs/TouchSync");



// register sync classes globally for later use in GenericSync
    GenericSync.register({
        "mouse" : MouseSync,
        "touch" : TouchSync
    });

// lesson default parameters
    var DISPLACEMENT_LIMIT = 500;
    var DISPLACEMENT_PEEK = 500;
    var DISPLACEMENT_THRESHOLD = 700;
    var VELOCITY_THRESHOLD = 0.2;
    var SURFACE_SIZE = [300, 300];

    var position = new Transitionable(0);

// funnel both mouse and touch input into a GenericSync
// and only read from the x-displacement
    var sync = new GenericSync(
        ["mouse", "touch"],
        {direction : GenericSync.DIRECTION_X}
    );

    var background = new Surface({
        size : SURFACE_SIZE,
        properties : {background : 'white'}
    });

    var draggableSurface = new Surface({
        size : SURFACE_SIZE,
        properties : {background : 'white'}
    });

    var logo = new ImageSurface({
        size: [150,150],
        content: 'http://upload.wikimedia.org/wikipedia/commons/5/5a/Flower_11.jpg'
        //classes: ['double-sided']
    });

    /*
    var textSurface = new Surface({
        size : SURFACE_SIZE,
        content : '.',
        properties : {
            fontSize : '100px',
            lineHeight : SURFACE_SIZE[1] + 'px',
            textAlign : 'center',
            pointerEvents : 'none',
            textShadow : '0 0 2px white'
        }
    });
*/
    draggableSurface.pipe(sync);

    sync.on('update', function(data){
        var currentPosition = position.get();
        var delta = data.delta;

        if (currentPosition + delta < DISPLACEMENT_LIMIT) {
            // move right until past the edge
            position.set(currentPosition + delta);
        }
        else{
            // otherwise, clamp at edge
            position.set(DISPLACEMENT_LIMIT);
        }

        if (currentPosition + delta < -DISPLACEMENT_PEEK) position.set(-DISPLACEMENT_PEEK);
    });

    sync.on('end', function(data){
        var currentPosition = position.get();
        var velocity = data.velocity;

        if (currentPosition > DISPLACEMENT_THRESHOLD || velocity > VELOCITY_THRESHOLD) {
            // transition right if the displacement, or velocity is above
            // the appropriate threshold
            position.set(DISPLACEMENT_LIMIT, {
                method   : 'snap',
                period   : 200,
                velocity : velocity
            });
        }
        else {
            // otherwise transition back to 0
            position.set(0, {
                method   : 'snap',
                period   : 200,
                velocity : velocity
            });
        }
    });

    var positionModifier = new Modifier({
        transform : function(){
            return Transform.translate(position.get(),0,0);
        }
    });

    var rotationModifier = new Modifier({
        transform : function(){
            var angle = Math.PI * (position.get() / (DISPLACEMENT_LIMIT/2));
            return Transform.rotateZ(angle);
        }
    });

    var centerModifier = new Modifier({origin : [.5,.5]});

// define the scene graphq1
    var mainContext = Engine.createContext();
    var centerNode = mainContext.add(centerModifier);
    centerNode.add(background);

    var moveableNode = centerNode.add(positionModifier);
    moveableNode.add(draggableSurface);
    moveableNode.add(rotationModifier).add(logo);
});