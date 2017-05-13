import React, { Component } from 'react';
import Pitchfinder from 'pitchfinder';
import Chart from 'chart.js'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillMount() {
    }

    componentDidMount() {
	// for edge case browser compatibility
        if (!window.AudioContext) {
            if (!window.webkitAudioContext) {
                alert('no audiocontext found');
        }
            window.AudioContext = window.webkitAudioContext;
        }

        // create audio context and canvas
        var context = new AudioContext();
        var canvas = document.getElementById("homeCanvas");
        var ctx = canvas.getContext("2d");

        // create analyzer node
        var viz = context.createAnalyser();
        viz.fftSize = 2048;

        // create array to hold data for wavform visualization
        var waveArray = new Uint8Array(viz.frequencyBinCount);

        // draw function to draw waveform
        function draw() {

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // ctx.fillStyle = 'rgb(214, 68, 68)';
            ctx.fillStyle = 'transparent';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.lineWidth = 10;
            ctx.strokeStyle = 'rgb(0, 0, 0)';
            // ctx.strokeStyle = 'white';

            ctx.beginPath();

            var sliceWidth = canvas.width * 1.0 / viz.frequencyBinCount;
            var x = 0;

            for (var i = 0; i < viz.frequencyBinCount; i++) {

                var v = waveArray[i] / 128.0;
                var y = v * canvas.height/2;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }

                x += sliceWidth;
            }

            ctx.lineTo(canvas.width, canvas.height/2);
            ctx.stroke();

        }

        // begin draw
        draw();

        // constraints object for getUserMedia stream (tells the getUserMedia what kind of data object it will receive)
        var constraints = { audio: true, video: false };
        // set up stream -- is a promise -- recording happens in .then off it
        navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {

            // create audioNode stream source with stream so we can route it through the audioContext
            var source = context.createMediaStreamSource(stream);
            // connect it to the nodes
            source.connect(viz);

            // declare setInterval variable outside so we can kill the interval in a separate function
            var repeatDraw = setInterval(() => {
                    viz.getByteTimeDomainData(waveArray);
                    draw();
                }, 100);

        })
    }

    render() {
        return (
        <div id='canvasContainer'>
    	    <canvas id='homeCanvas' width='1000' height='600'></canvas>
        </div>
    )}
}
