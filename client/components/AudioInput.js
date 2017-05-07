import React, { Component } from 'react';
// import { Link } from 'react-router'; 

export default class AudioInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
    if (! window.AudioContext) {
        if (! window.webkitAudioContext) {
            alert('no audiocontext found');
    }
        window.AudioContext = window.webkitAudioContext;
    }

    var context = new AudioContext();
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    // mic situation
    var hpFilter = context.createBiquadFilter();
    hpFilter.type = "highpass";
    hpFilter.frequency.value = 85;
    hpFilter.gain.value = 10;

    var lpFilter = context.createBiquadFilter();
    lpFilter.type = "lowpass";
    lpFilter.frequency.value = 900;
    lpFilter.gain.value = 10;

    var viz = context.createAnalyser();
    viz.fftSize = 2048;

    var arrayTwo = new Uint8Array(viz.frequencyBinCount);

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

        for(var i = 0; i < viz.frequencyBinCount; i++) {

            var v = arrayTwo[i] / 128.0;
            var y = v * canvas.height/2;

            if(i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
            
            x += sliceWidth;
        }

        ctx.lineTo(canvas.width, canvas.height/2);
        ctx.stroke();

    }

    draw();

    var constraints = { audio: true, video: false };
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {

        var mediaRecorder = new MediaRecorder(stream);

        var recording = [];

        mediaRecorder.ondataavailable = function(e) {
            recording.push(e.data);
        };

        var source = context.createMediaStreamSource(stream);
        source.connect(lpFilter);
        lpFilter.connect(hpFilter);
        hpFilter.connect(viz);

        var record = document.getElementById("record");
        var stop = document.getElementById("stop");

        var repeatDraw;

        // viz.getByteTimeDomainData(arrayTwo);

        record.onclick = function() {
        viz.connect(context.destination);
            mediaRecorder.start();
            repeatDraw = setInterval(() => {
                viz.getByteTimeDomainData(arrayTwo);
                console.log("arrayTwo", arrayTwo);
                draw();
            }, 100);
            record.style.background = "red";
            record.style.color = "black";
        }

        stop.onclick = function() {
            viz.disconnect(context.destination);
            mediaRecorder.stop();
            record.style.background = "";
            record.style.color = "";
            clearInterval(repeatDraw);
        }

        mediaRecorder.onstop = function(e) {
          console.log("recorder stopped");

          var clipName = prompt('Enter a name for your sound clip');

          var clipContainer = document.createElement('article');
          var clipLabel = document.createElement('p');
          var audio = document.createElement('audio');
          var deleteButton = document.createElement('button');

          clipContainer.classList.add('clip');
          audio.setAttribute('controls', '');
          deleteButton.innerHTML = "Delete";
          clipLabel.innerHTML = clipName;

          clipContainer.appendChild(audio);
          clipContainer.appendChild(clipLabel);
          clipContainer.appendChild(deleteButton);
          soundClips.appendChild(clipContainer);

          console.log("RECORDING pre-BLOB", recording);

          var blob = new Blob(recording, { 'type' : 'audio/ogg; codecs=opus' });
          recording = [];
          var audioURL = window.URL.createObjectURL(blob);
          audio.src = audioURL;

          console.log("BLOB", blob);

            var reader = new FileReader();
            reader.addEventListener("loadend", function() {

                console.log("reader.result", reader.result);

                var buffer = new Uint8Array(reader.result);

                console.log("POST-BLOB BUFFER", buffer);
                console.log("arrayTwo", arrayTwo);

                // var pitchCon = new PitchAnalyzer(44100);

                // var n = 1001;
                // var i = 1;

                // var tones = [];
                // var vols = [];

                // while (n < buffer.length && i < 50000) {

                //     pitchCon.input(buffer.slice(n-1000, n));
                //     pitchCon.process();

                //     var toneOne = pitchCon.findTone();

                //     if (toneOne === null) {
                //         console.log('No tone found!');
                //         tones.push(300);
                //         vols.push(0);
                //     } else {
                //         console.log('Found a toneOne, frequency:', toneOne.freq, 'volume:', toneOne.db);
                //         tones.push(toneOne.freq);
                //         vols.push(toneOne.db);
                //     }
                //     n = n+1000;
                //     i++;
                // }

                // console.log('tones', tones);
                // console.log('vols', vols);

            });
            reader.readAsArrayBuffer(blob);

          deleteButton.onclick = function(e) {
            var evtTgt = e.target;
            evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
          }
        }

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