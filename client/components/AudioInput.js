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
        console.log("AUDIO INPUT MOUNTED");
    // get the context from the canvas to draw on
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

    var arrayOne = new Float32Array(viz.frequencyBinCount);
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

        console.log("streaming", stream);

        var mediaRecorder = new MediaRecorder(stream);

        var recording = [];

        mediaRecorder.ondataavailable = function(e) {
            recording.push(e.data);
        };

        var source = context.createMediaStreamSource(stream);
        // viz.getByteTimeDomainData(arrayOne);
        source.connect(lpFilter);
        lpFilter.connect(hpFilter);
        hpFilter.connect(viz);

        var record = document.getElementById("record");
        var stop = document.getElementById("stop");

        var repeatDraw;

        // viz.getByteTimeDomainData(arrayTwo);

        var newArray = new Uint8Array(2048);

        record.onclick = function() {
        viz.connect(context.destination);
            mediaRecorder.start();
            repeatDraw = setInterval(() => {
                // mediaRecorder.requestData();
                viz.getByteTimeDomainData(arrayTwo);
                draw();
            }, 1000);
            record.style.background = "red";
            record.style.color = "black";
        }

        stop.onclick = function() {
        viz.disconnect(context.destination);
          mediaRecorder.requestData();
          mediaRecorder.stop();
          record.style.background = "";
          record.style.color = "";
          clearInterval(repeatDraw);
        }

        mediaRecorder.onstop = function(e) {
          console.log("recorder stopped");

          console.log("arrayOne", arrayOne);

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

          var blob = new Blob(recording, { 'type' : 'audio/ogg; codecs=opus' });
          recording = [];
          var audioURL = window.URL.createObjectURL(blob);
          audio.src = audioURL;

            var reader = new FileReader();
            reader.addEventListener("loadend", function() {
                // while (reader.result.byteLength % 4 !== 0) {
                //     console.log("BAD");

                // }
                var buffer = new Uint8Array(reader.result);

                console.log("DA BUFFER", buffer);

                // const findFundamentalFreq = (buffer, sampleRate) => {
                //     // We use autocorrelation to find the fundamental frequency.

                //     // In order to correlate the signal with itself (hence the name of the algorithm), we will check two points 'k' frames away.
                //     // The autocorrelation index will be the average of these products. At the same time, we normalize the values.
                //     // Source: http://www.phy.mty.edu/~suits/autocorrelation.html

                //     // the default sample rate, depending on the hardware, is 44100Hz or 48000Hz.
                //     // a 'k' range between 120 and 650 covers signals ranging from ~70Hz to ~350Hz, which is just a little broader than the average frequency range for human speech (80-260Hz, per Wikipedia).
                //     var n = 1024, bestR = 0, bestK = -1;
                //     for(var k = 120; k <= 650; k++){
                //         var sum = 0;

                //         for(var i = 0; i < n; i++){
                //             sum += ((buffer[i] - 128) / 128) * ((buffer[i + k] - 128) / 128);
                //         }

                //         var r = sum  / (n + k);

                //         if(r > bestR){
                //             bestR = r;
                //             bestK = k;
                //         }

                //         if(r > 0.95) {
                //             // Let's assume that this is good enough and stop right here
                //             break;
                //         }
                //     }

                //     console.log("bestR", bestR);

                //     if(bestR > 0.0025) {
                //         // The period (in frames) of the fundamental frequency is 'bestK'. Getting the frequency from there is trivial.
                //         var fundamentalFreq = sampleRate / bestK;
                //         return fundamentalFreq;
                //     }
                //     else {
                //         // We haven't found a good correlation
                //         return -1;
                //     }
                // };

                var pitchCon = new PitchAnalyzer(44100);

                var n = 1001;
                var i = 1;

                var tones = [];
                var vols = [];

                while (n < buffer.length && i < 50000) {

                    // console.log("f0....", findFundamentalFreq(newArray.slice(n-1000, n-99), 44100));
                    // console.log("newArray", newArray);
                    // console.log("f0", findFundamentalFreq(buffer.slice(n-1000, n-99), 44100));

                    pitchCon.input(buffer.slice(n-1000, n));
                    /* Process the current input in the internal buffer */
                    pitchCon.process();
                    // console.log("pitchCon instance", pitchCon);

                    var toneOne = pitchCon.findTone();

                    if (toneOne === null) {
                        console.log('No tone found!');
                        tones.push(300);
                        vols.push(0);
                    } else {
                        console.log('Found a toneOne, frequency:', toneOne.freq, 'volume:', toneOne.db);
                        tones.push(toneOne.freq);
                        vols.push(toneOne.db);
                    }
                    n = n+1000;
                    i++;
                }

                var tonesY = function() {
                    var array = [];
                    for (let i = 0; i < tones.length; i++) {
                        array.push(i);
                    }
                    return array;
                }

                var data = [{x:tonesY(), y:tones, type: 'tones'}];
                var layout = {fileopt : "overwrite", filename : "tones"};

                Plotly.plot(data, layout, function (err, msg) {
                    if (err) return console.log(err);
                    console.log(msg);
                });

                console.log('tones', tones);
                console.log('vols', vols);


            // see below for optional constructor parameters.
            const detectPitch = new Pitchfinder.YIN();


            const ianBuffer = fs.readFileSync('ian-ooo.wav');

            console.log("IAN BUFFER", ianBuffer);
            console.log("MY BUFFER", buffer);

            // const buffer = fs.readFileSync('ian-ooo.wav');
            // need this to read from the wav file
            const decoded = WavDecoder.decode(buffer)
            .then(data => {
                console.log("IN IAN");
              const float32Array = data.channelData[0]; // get a single channel of sound
              // const pitch = detectPitch(float32Array); // null if pitch cannot be identified
              let frequencies = Pitchfinder.frequencies(detectPitch, float32Array, {
                tempo: 500, // in BPM, defaults to 120
                quantization: 4, // samples per beat, defaults to 4 (i.e. 16th notes)
              });

              // filter out bad data - hacky for now, throws out nulls and high values
              frequencies = frequencies.filter(freq => {
                if (typeof freq === 'number') {
                  return freq < 10000
                }
                return false
              })

              console.log("IAN", frequencies)

            }) // get audio data from file using `wav-decoder`


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