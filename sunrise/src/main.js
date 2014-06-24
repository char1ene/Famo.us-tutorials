define(function (require, exports, module) {

    // import dependencies
    var Engine = require('famous/core/Engine');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Easing = require('famous/transitions/Easing');

    // create the main context
    var mainContext = Engine.createContext();

    // sun image
    var sun = new ImageSurface({
        size: [200, 200],
        content: 'http://partysimplicity.com/wp-content/uploads/2012/10/Cute-kawaii-sun-150x150.png',
    });

    var stateModifier = new Modifier({
        origin: [0,1.3]
    });
/*
    originModifier.setTransform(
        Transform.translate(1000, -500, 0),
        { duration : 2000, curve: 'linear' }
    );
*/
    mainContext.add(stateModifier).add(sun);

    function animate() {
        stateModifier.setAlign([1,0], {duration: 2500})
        stateModifier.setAlign([0,1.3], {duration: 0} , animate);
    }
    animate()

/*   //another method to implement a looping surface

    setInterval(function(){
        stateModifier.setAlign([1,0], {duration: 2000})
        stateModifier.setAlign([0,1.3], {duration: 0})
    },2001);
*/

 });
