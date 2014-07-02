/*** StarView ***/

define(function (require, exports, module) {
    var Engine        = require('famous/core/Engine');
    var Modifier      = require('famous/core/Modifier');
    var Transform     = require('famous/core/Transform');
    var Surface       = require('famous/core/Surface');
    var StateModifier = require('famous/modifiers/StateModifier');
    var View          = require('famous/core/View');

    function StarView() {
        View.apply(this, arguments);

        this.rootModifier = new StateModifier({
            origin: [0.5,0.5],
            size: this.options.size
        });

        // saving a reference to the new node
        this.mainNode = this.add(this.rootModifier);

        _createBackground.call(this);
        _createStars.call(this);

        var x = 0;
        var directions = [ 4, 2, 1.33, 1, 1.3, 2, 4, 0.01, 0.55, 0.66, 0.8, 0.66, 0.55, 0.01 ];

        Engine.on('keydown', function() {
            if (x == 14) {x = 0}
            this.rootModifier.setTransform(
                Transform.rotateZ(Math.PI/directions[x]),
                {duration: 8000}
            );

            x++;
        }.bind(this));

    } // StarView

    StarView.prototype = Object.create(View.prototype);
    StarView.prototype.constructor = StarView;

    StarView.DEFAULT_OPTIONS = {
        size: [undefined, undefined]
    };

    function _createBackground(){
        this.background = new Surface({
            properties: {
                backgroundColor: '#1F517A'
            }
        });
        this.mainNode.add(this.background);
    }


    function _createStars(){

        var stars = [
            {speed : 0.03, origin : [ 0.3, 1.3]},
            {speed : 0.01, origin : [ 0.7, 1.4]},
            {speed : 0.01, origin : [ 0.6, 1.2]},
            {speed : 0.01, origin : [ 0.4, 1.5]},
            {speed : 0.04, origin : [ 0.1, 1.2]},
            {speed : 0.03, origin : [   0, 1.5]},
            {speed : 0.01, origin : [-0.1, 0.4]},
            {speed : 0.01, origin : [-0.2, 1.3]},
            {speed : 0.03, origin : [-0.4, 0.7]},
            {speed : 0.02, origin : [-0.3, 0.8]},
            {speed : 0.01, origin : [-0.2, 1.0]}];


        for (var i = 0; i < stars.length; i++) {

            // star image
            var star = new Surface({
                size: [100, 100],
                content: '<div class="fa fa-star-o fa-3x fa-inverse"></div>'
            });

            var initTime = Date.now();
            var myFunc = _.bind(func, this, i);
            var animate = new Modifier({
                origin: stars[i].origin,
                transform: myFunc
            });

            function func(index){
                return Transform.translate(
                        (stars[index].speed * (Date.now() - initTime) )%1000,
                        (stars[index].speed * (initTime - Date.now()) )%1000,
                    0);
            }

            this.mainNode.add(animate).add(star);

        } //for

    } // _createStars

    module.exports = StarView;

});