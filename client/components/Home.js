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
            <Paper style={styles.card1}>
                <div style={styles.textArea} >
                    <h1>What is a Tonal Language?</h1>
                    <br />
                    <p style={styles.p}>
                    Tonal languages use pitch to distinguish a word's meaning. Depending on the pitch, the same syllable could mean two totally different things! For example, in Thai, 'ma'' spoken in a high tone would mean 'horse' and in a low tone would mean 'dog.' For people who don't speak tonal languages, these tones are hard to perceive and reproduce.
                    </p>
                </div>
            </Paper>
             <Paper style={styles.card2}>
                <div style={styles.textArea} >
                    <h1>How InTone Works</h1>
                    <br />
                    <p style={styles.p}>
                    InTone gives you the tools needed to perceive and reproduce a language's tones. You are provided a series of vocabulary flashcards with audio of the word being spoken by a native speaker. You can then record yourself saying the word, and InTone will provide you with a graph comparing the target's pitch values alongside your own.
                    </p>
                </div>
            </Paper>
        </div>
    )}
}

const styles = {
    card1: {
        backgroundColor: 'purple',
        color: 'white',
        height: '250px',
        padding: '10px',

    },
    card2: {
        backgroundColor: 'white',
        color: 'black',
        height: '250px',
        padding: '10px',

    },
    p: {
        fontSize: '20px',
        marginLeft: '100px',
        marginRight: '100px',
        textAlign: 'block',
        paddingTop: '0px'

    },
    textArea: {
        paddingTop: '0px',
        textAlign: 'center'
    }
}
