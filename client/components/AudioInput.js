import React, { Component } from 'react';

export default class AudioInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            arrayBuffer: {},
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
        if (!window.AudioContext) {
            if (!window.webkitAudioContext) {
                alert('no audiocontext found');
        }
            window.AudioContext = window.webkitAudioContext;
        }

        // create audio context and canvas
        var context = new AudioContext();
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");

        // create filter nodes
        var hpFilter = context.createBiquadFilter();
        hpFilter.type = "highpass";
        hpFilter.frequency.value = 85;
        hpFilter.gain.value = 10;

        var lpFilter = context.createBiquadFilter();
        lpFilter.type = "lowpass";
        lpFilter.frequency.value = 900;
        lpFilter.gain.value = 10;

        // create analyzer node
        var viz = context.createAnalyser();
        viz.fftSize = 2048;

        // create array to hold data for wavform visualization
        var arrayTwo = new Uint8Array(viz.frequencyBinCount);

        // draw function to draw waveform
        function draw() {

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // ctx.fillStyle = 'rgb(214, 68, 68)';
            ctx.fillStyle = 'transparent';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.lineWidth = 10;
            ctx.strokeStyle = 'rgb(0, 0, 0)';

            ctx.beginPath();

            var sliceWidth = canvas.width * 1.0 / viz.frequencyBinCount;
            var x = 0;

            for (var i = 0; i < viz.frequencyBinCount; i++) {

                var v = arrayTwo[i] / 128.0;
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

        // capture reference to this component so we can set state below
        var self = this;

        // constraints object for getUserMedia stream
        var constraints = { audio: true, video: false };
        // set up stream -- is a promise -- recording happens in .then off it
        navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {

            // create MediaRecorder instance
            var mediaRecorder = new MediaRecorder(stream);

            // holder for audio
            var recording = [];

            // when data is available, push available data to recording array
            // as written, data is available when 'stop' is clicked which calls .stop on the mediaRecorder instance
            mediaRecorder.ondataavailable = function(e) {
                recording.push(e.data);
            };

            // create audioNode stream source with stream so we can route it through the audioContext
            var source = context.createMediaStreamSource(stream);
            // connect it to the nodes
            source.connect(lpFilter);
            lpFilter.connect(hpFilter);
            hpFilter.connect(viz);

            // grab DOM buttons
            var record = document.getElementById("record");
            var stop = document.getElementById("stop");

            // declare setInterval variable outside so we can kill the interval in a separate function
            var repeatDraw;

            // onclick handler for record button
            record.onclick = function() {
                // connect stream to speakers, making it audible        
                viz.connect(context.destination);
                // call .start on mediaRecorder instance
                mediaRecorder.start();
                // setInterval to continually rerender waveform
                repeatDraw = setInterval(() => {
                    viz.getByteTimeDomainData(arrayTwo);
                    draw();
                }, 100);
                record.style.background = "red";
                record.style.color = "black";
            }

            // onclick handler for stop button
            stop.onclick = function() {
                // disconnect from speakers, effectively muting stream
                viz.disconnect(context.destination);
                // call stop on mediaRecorder, firing a "data available" event which trigger .ondataavailable
                mediaRecorder.stop();
                record.style.background = "";
                record.style.color = "";
                clearInterval(repeatDraw);
            }

            // onstop handler for mediaRecorder -- when stopped, this says what to do with the recorded data
            mediaRecorder.onstop = function(e) {
                console.log("recorder stopped");

                // prompt to name the file
                var clipName = prompt('Enter a name for your sound clip');
                
                // create audio element to post to page
                var clipContainer = document.createElement('article');
                var clipLabel = document.createElement('p');
                var audio = document.createElement('audio');
                var deleteButton = document.createElement('button');

                // add created audio element to page
                clipContainer.classList.add('clip');
                audio.setAttribute('controls', '');
                deleteButton.innerHTML = "Delete";
                clipLabel.innerHTML = clipName;
                clipContainer.appendChild(audio);
                clipContainer.appendChild(clipLabel);
                clipContainer.appendChild(deleteButton);
                soundClips.appendChild(clipContainer);

                // create Blob for access by audio element, set as src for playback
                var blob = new Blob(recording, { 'type' : 'audio/ogg; codecs=opus' });
                recording = [];
                var audioURL = window.URL.createObjectURL(blob);
                audio.src = audioURL;

                // use FileReader to access the Blob data
                var reader = new FileReader();
                reader.addEventListener("loadend", function() {
                    // not sure yet if we need the raw reader.result or the Uint8Array version on state, and if it matters
                    var buffer = new Uint8Array(reader.result);
                    self.setState({
                        arrayBuffer: buffer
                    });
                    console.log("state: ", self.state);

                });
                // once read, fires "loadend" event, then above callback runs to set state
                reader.readAsArrayBuffer(blob);

                // delete button
                deleteButton.onclick = function(e) {
                    var evtTgt = e.target;
                    evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
                };
            };

        }).catch(function(err) {
            console.log(err);
        });
    }

    handleChange() {
    }

    render() {
        return (
        <div id='main'>
        <br />
					<br />
					<canvas id='canvas' width='1000' height='1000'></canvas>
					<div id='soundClips'></div>
					<div id="buttons">
					<br />
					<button id="record">RECORD</button>
					<button id="stop">STOP</button>
					<br />
					</div>
        </div>
    )}
}