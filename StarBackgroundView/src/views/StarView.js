/*** StarView ***/

define(function (require, exports, module) {
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

        this.orientation = 0;
        this.xFactor = 1;
        this.yFactor = -1;
    } // StarView

    StarView.prototype = Object.create(View.prototype);
    StarView.prototype.constructor = StarView;

    StarView.DEFAULT_OPTIONS = {
        size: [undefined, undefined]
    };

    StarView.prototype.changeDirection = function() {
        this.orientation = (this.orientation+1)%4;
        if (this.orientation < 2) {
            this.xFactor = 1;
        } else this.xFactor = -1;
        if (this.orientation == 1 || this.orientation == 2) {
            this.yFactor = 1;
        } else {
            this.yFactor = -1;
        }
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
            {speed : 0.015, origin : [ 0.3, 1.3]},
            {speed : 0.01,  origin : [ 0.7, 1.4]},
            {speed : 0.033, origin : [ 0.6, 1.2]},
            {speed : 0.01,  origin : [ 0.4, 1.5]},
            {speed : 0.043, origin : [ 0.1, 1.2]},
            {speed : 0.03,  origin : [   0, 1.5]},
            {speed : 0.02,  origin : [-0.1, 0.3]},
            {speed : 0.015, origin : [-0.2, 1.3]},
            {speed : 0.04,  origin : [-0.4, 0.7]},
            {speed : 0.02,  origin : [-0.3, 0.8]},
            {speed : 0.018, origin : [-0.2, 1.0]}];

        var xPos = [];
        var yPos = [];
        for (var i = 0; i < stars.length; i++) {
            xPos[i] = 0;
            yPos[i] = 0;
            // star image
            var star = new Surface({
                size: [100, 100],
                content: '<div class="fa fa-star-o fa-3x fa-inverse"></div>'
            });

            var myFunc = _.bind(func, this, i);
            var animate = new Modifier({
                origin: stars[i].origin,
                transform: myFunc
            });

            function func(index){

                xPos[index] = (xPos[index] + this.xFactor*stars[index].speed*100);
                yPos[index] = (yPos[index] + this.yFactor*stars[index].speed*100);

                if (this.xFactor == 1 && this.yFactor == -1) {
                    if (xPos[index] > window.innerWidth) {xPos[index] = 0; yPos[index] = 0;}
                }

                if (this.xFactor == 1 && this.yFactor == 1) {
                    if (xPos[index] > window.innerWidth)  {xPos[index] = xPos[index] - 1.2*window.outerWidth;
                        yPos[index] = yPos[index] - 1.5*window.outerHeight;}
                }

                if (this.xFactor == -1 && this.yFactor == 1) {
                    if (yPos[index] > window.innerHeight) {xPos[index] = xPos[index] + window.innerWidth;
                        yPos[index] = yPos[index] - 2*window.innerHeight;}
                }

                if (this.xFactor == -1 && this.yFactor == -1) {
                    if (xPos[index] < 0) {xPos[index] = xPos[index] + 1.1*window.innerWidth;
                        yPos[index] = yPos[index] + 2*window.innerHeight;}
                }

                return Transform.translate(
                    xPos[index],
                    yPos[index],
                    0);
            }

            this.mainNode.add(animate).add(star);

        } //for
    } // _createStars

    module.exports = StarView;
});